import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {
  @Input() name:string = ""
  constructor(private authService:AuthService,private router:Router) { 
    
  }

  signOut(){
    this.authService.removeToken()
    this.router.navigate(['/login'])
  }
}
