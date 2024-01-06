import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn:'root'
})
export class AccountSettingsService{
    constructor(private http:HttpClient,private authService:AuthService){}
    getHeaders(){
        const headers:HttpHeaders = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
          })
          return headers
    }
    changeSettings(request:Object,setting:string){
        const headers = this.getHeaders() 
        return this.http.put(`http://localhost:5066/api/account/${setting}`,request,{headers})
    }
    deleteUser(email:string){
        const headers = this.getHeaders()
        return this.http.delete(`http://localhost:5066/api/account/${email}`,{headers,body:email})
    }
}