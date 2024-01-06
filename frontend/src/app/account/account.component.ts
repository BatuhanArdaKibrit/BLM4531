import { Component } from '@angular/core';
import { AuthService } from '../auth.service'
import { User } from '../Data/User';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { AccountSettingsService } from '../account-settings/account-settings.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  constructor(private authService:AuthService,private router:Router,
              private messageService:MessageService,
              private service:AccountSettingsService) {}
  visible:boolean = false 
  user:User = {
    name:this.authService.getName(),
    email:this.authService.getEmail(),
    password:"**********"
  }
  changeSettings(id:number){
    this.router.navigate(['/change_account_settings',id])
  }

  deleteUser(){
    this.service.deleteUser(this.authService.getEmail()).subscribe(()=>{
      this.messageService.setMessage('success','Hesabınız başarılı bir şekilde silinmiştir','')
      this.authService.removeToken()
      this.router.navigate(['/login'])
    },(error)=>{
      this.messageService.setMessage('error','Hata',error.error.message)
    })
  }
  acceptConfirm(){
    this.deleteUser()
    this.visible=false
  }


  rejectConfirm(){
    this.messageService.setMessage('info','Silme işlemi iptal edilmiştir','')
    this.visible=false
  }
  
}
