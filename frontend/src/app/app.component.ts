import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Yemek Tarifleri';
  message:Message[] = []
   constructor(private router: Router,
    private messageService:MessageService,
    public authService:AuthService) {}
  ngOnInit() {
    this.messageService.message$.subscribe((message)=>{
      this.message = message
    })
  }
}
