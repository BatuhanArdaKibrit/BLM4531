import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Food from '../Data/Food';
import { AuthService } from '../auth.service';
import { FoodService } from '../food.service';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrl: './food-detail.component.css'
})
export class FoodDetailComponent implements OnInit {
  food?:Food
  imageUrl:string = ""
  ingredients:Array<string> = []
  likeMessage:string = "" 
  isOwner:boolean = false
  visible:boolean = false
  constructor(private aroute:ActivatedRoute,
              private router:Router,
              private authService:AuthService,
              private foodService:FoodService,
              public location:Location,
              private messageService:MessageService,){ }
  ngOnInit(): void {
    this.isOwner = this.aroute.snapshot.data['isOwner']
    this.aroute.params.subscribe(params => {
      this.foodService.getFoodDetail(params['id'],this.authService.getEmail()).subscribe((response:any) =>{
        this.food = response
        this.ingredients = response.ingredients.split(',')
        this.imageUrl = `data:${this.food?.imageType};base64,${this.food?.image}`
        this.likeMessage = this.food?.isLiked ? "Favorilerden çıkar" : "Favoriler ekle"
      })
    })
  }
  likeRecipe(){
    this.food!.isLiked = !this.food!.isLiked
    this.likeMessage = this.food?.isLiked ? "Favorilerden çıkar" : "Favorilere ekle"
    if(this.food!.isLiked){
      this.foodService.likeFood(this.authService.getEmail(),this.food!.id).subscribe()
    }else{
      this.foodService.dislikeFood(this.authService.getEmail(),this.food!.id).subscribe()
    }
  }
  deleteRecipe(){
    this.foodService.deleteRecipe(this.food!.id).subscribe(()=>{
      this.messageService.setMessage('success','Tarif başarılı bir şekilde silinmiştir','')
    },(error)=>{
      this.messageService.setMessage('error','Hata',error.error.message)
    })
  }
  acceptConfirm(){
    this.deleteRecipe()
    this.visible=false
    this.location.back()
  }
  rejectConfirm(){
    this.messageService.setMessage('info','Silme işlemi iptal edilmiştir','')
    this.visible=false
  }
}
