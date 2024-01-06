import { Component,OnInit } from '@angular/core';
import { User } from '../Data/User';
import { AccountSettingsService } from './account-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

enum Pages {
  Name = 0,
  Email,
  Password
}

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit {

  constructor(private service:AccountSettingsService,
              private authService:AuthService,
              private messageService:MessageService,
              private router:Router,
              private route:ActivatedRoute,
              ) {}
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.routeId = parseInt(params['id'])
      if(!(this.routeId in Pages)) this.router.navigate(['/home'])
      },(error)=>{
        this.router.navigate(['/home'])
      }
      )
    }
  loading:boolean = false
  routeId:number = 0
  user:User = {
    name:"",
    email:"",
    password:""
  }
  old_password = ""
  saveName(){
    this.loading=true
    const request={
      name:this.user.name,
      email:this.authService.getEmail()
    }
    this.service.changeSettings(request,"name").subscribe((response:any) => {
      this.authService.removeToken()
      this.authService.setToken(response.token)
      this.loading=false;
      this.messageService.setMessage("success",response.message,"")
      this.router.navigate(['/account'])
    },(error)=>{
      this.messageService.setMessage("error",error.error.message,"")
      this.loading=false;
      this.authService.setEmptyString(this.user)
    }
    )
  }
  saveEmail(){
    this.loading=true
    const request={
      email:this.user.email,
      old_email:this.authService.getEmail()
    }
    this.service.changeSettings(request,"email").subscribe((response:any) => {
      this.authService.removeToken()
      this.authService.setToken(response.token)
      this.loading=false;
      this.messageService.setMessage("success",response.message,"")
      this.router.navigate(['/account'])
    },(error)=>{
      this.messageService.setMessage("error","Hata",error.error.message)
      this.loading=false;
      this.authService.setEmptyString(this.user)
    }
    )
  }
  savePassword(){
    this.loading=true
    const request={
      password:this.user.password,
      old_password:this.old_password,
      email:this.authService.getEmail()
    }
    this.service.changeSettings(request,"passwd").subscribe((response:any) => {
      this.authService.removeToken()
      this.authService.setToken(response.token)
      this.loading=false;
      this.messageService.setMessage("success",response.message,"")
      this.router.navigate(['/account'])
    },(error)=>{
      this.messageService.setMessage("error","Hata",error.error.message)
      this.loading=false;
      this.authService.setEmptyString(this.user)
    }
    )
  }
}
