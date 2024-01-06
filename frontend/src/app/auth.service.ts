import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
import { User } from "./Data/User";


@Injectable({
    providedIn:'root'
})
export class AuthService{
    private readonly TOKEN_KEY = "auth_token"
    private user:User = {
        name: "",
        email: "",
        role:""
    }
    private jwtHelper:JwtHelperService = new JwtHelperService()
    public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    constructor(private router:Router) {
        this.checkToken();
    }
    private checkToken():void{
        const token = localStorage.getItem(this.TOKEN_KEY)
        
        if(token && !this.jwtHelper.isTokenExpired(token)){
            this.setClaims(token)
            this.isAuthenticated$.next(true)
        }else{
            this.isAuthenticated$.next(false)
        }
    }

    public setToken(token:string):void{
        localStorage.setItem(this.TOKEN_KEY,token)
        this.setClaims(token)
        this.isAuthenticated$.next(true)

    }
    public getToken(): string | null{
        return localStorage.getItem(this.TOKEN_KEY)
        
    }
    public removeToken():void{
        localStorage.removeItem(this.TOKEN_KEY)
        this.isAuthenticated$.next(false)
    }
    public isAuthenticated():boolean{
        const token = this.getToken()
        if(token){
            this.setClaims(token)    
        }
        return token ? !this.jwtHelper.isTokenExpired(token):false
    }
    public setClaims(token:string):any{
        if(!token){
            return
        }
        const claims = this.jwtHelper.decodeToken(token);
        [this.user.name,this.user.email,this.user.role] = Object.values(claims)
    }
    public getName():string{
        return this.user.name!
    }
    public getEmail():string{
        return this.user.email!
    }
    public setEmptyString(obj:any):any{
        Object.entries(obj).forEach(([key]) => {
            obj[key] = ''
        })
    }

}