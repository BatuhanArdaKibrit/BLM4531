import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageContext = new BehaviorSubject<Message[]>([])
  message$ = this.messageContext.asObservable()
  setMessage(severity:string,summary:string,error_message:string){
    const message = { severity: `${severity}`, summary: `${summary}`, detail: `${error_message}` }
    this.messageContext.next([message])
    timer(2500).subscribe(() => {this.messageContext.next([])})
  }

}
