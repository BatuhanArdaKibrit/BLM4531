import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import Food from './Data/Food';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private http:HttpClient,
              private authService:AuthService) {
  }
  getHeaders(){
    const headers:HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    return headers
  }

  saveFood(formData:FormData){
    const headers = this.getHeaders()
    return this.http.post("http://localhost:5066/api/food",formData,{headers})
  }

  getAllFood(email:string){
    const headers = this.getHeaders()
    const params = new HttpParams().set('email', email);
    return this.http.get<Array<Food>>("http://localhost:5066/api/food/all",{params,headers})
  }
  getUserFood(email:string){
    const headers = this.getHeaders()
    const params = new HttpParams().set('email', email);
    return this.http.get<Array<Food>>("http://localhost:5066/api/food/user",{params,headers})
  }
  likeFood(email:string,foodId:number){
    const headers = this.getHeaders()
    return this.http.post("http://localhost:5066/api/food/like",{email,foodId},{headers})
  }
  dislikeFood(email:string,foodId:number){
    const headers = this.getHeaders()
    return this.http.post("http://localhost:5066/api/food/dislike",{email,foodId},{headers})
  }
  getLikedFood(email:string){
    const headers = this.getHeaders()
    const params = new HttpParams().set('email',email)
    return this.http.get<Array<Food>>("http://localhost:5066/api/food/like",{params,headers})
  }
  getFoodDetail(id:number,email:string){
    const headers = this.getHeaders()
    const params = new HttpParams().set('email',email)
    return this.http.get<Food>(`http://localhost:5066/api/food/${id}`,{params,headers})
  }
  checkOwnership(id:number){
    const headers = this.getHeaders()
    return this.http.get(`http://localhost:5066/api/food/${id}/check_ownership`,{responseType:'text',headers})
  }
  deleteRecipe(id:number){
    const headers = this.getHeaders()
    return this.http.delete(`http://localhost:5066/api/food/${id}`,{headers})
  }
  editFood(id:number,formData:FormData){
    const headers = this.getHeaders()
    return this.http.put(`http://localhost:5066/api/food/${id}`,formData,{headers})
  }
}
