import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import Food from '../Data/Food';
import { FoodService } from '../food.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.css'
})
export class FoodCardComponent implements OnInit,OnChanges{
  @Input() food?:Food
  imageUrl:string = ""
  @Output() removeItemEvent = new EventEmitter<number>();
  
  constructor(private foodService:FoodService,private authService:AuthService) {}
  ngOnInit(){
    this.imageUrl = `data:${this.food!.imageType};base64,${this.food?.image}`
  }
  ngOnChanges() {
    this.imageUrl = `data:${this.food!.imageType};base64,${this.food?.image}`
  }

  likeRecipe(){
    this.food!.isLiked = !this.food!.isLiked
    if(this.food!.isLiked){
      this.foodService.likeFood(this.authService.getEmail(),this.food!.id).subscribe()
    }else{
      this.foodService.dislikeFood(this.authService.getEmail(),this.food!.id).subscribe()
    }
    this.removeItemEvent.emit(this.food!.id)
  }

}
