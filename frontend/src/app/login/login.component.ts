import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { LoginService } from './login.service';
import {User} from '../Data/User'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

type Response = {
  message:string,
  token:string
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  user:User = {
    name:"",
    email:"",
    password:""
  }
  isLoginFail = false
  pageSwitch = "Kayıt ol"
  isLoginPage = true
  error_message=""
  loading=false

  constructor(
    private service:LoginService,
    private router:Router,
    private authService : AuthService,
    private messageService: MessageService
    ) {}
  
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/home'])
    }
  }

  onLogin(){
    this.loading=true
    this.service.Login(this.user).subscribe((response:Response | any) =>{
      this.authService.setToken(response.token)
      this.loading=false
      this.router.navigate(['/home'])
    },
    (error) => {
      this.authService.setEmptyString(this.user)
      this.isLoginFail=true
      this.error_message = error.error.message
      this.messageService.setMessage("error","Hata",this.error_message)
      this.loading=false
    })
    
  }
  onRegister(){
    this.service.Register(this.user).subscribe(response => {
      this.error_message = ""
      this.messageService.setMessage("success",'Kayıt başarılı bir şekilde gerçekleşmiştir',this.error_message);
      this.changePage()
    },
    (error)=>{
      this.error_message = error.error.message
      this.messageService.setMessage("error","Hata",this.error_message);
      this.authService.setEmptyString(this.user)
    })
  }
  changePage(){
    this.isLoginPage = !this.isLoginPage
    this.pageSwitch = this.isLoginPage ? "Kayıt ol" : "Giriş ekranı"
    this.authService.setEmptyString(this.user)
  }
}
