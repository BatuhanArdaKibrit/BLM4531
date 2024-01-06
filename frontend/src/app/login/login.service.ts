import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../Data/User'
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  Register(user:User){
    return this.http.post("http://localhost:5066/api/auth/register",user)
  }
  Login(user:User){
    return this.http.post("http://localhost:5066/api/auth/login",user)
  }
}
