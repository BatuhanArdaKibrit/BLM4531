import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import Food from '../Data/Food';
import { FoodService } from '../food.service';
import { LoadingService } from '../loading.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private authService:AuthService,
    private foodService:FoodService) { }
  foods:Array<Food>=[]
  emptyString:string = ""
  search:string = ""
  result:Array<Food> = []

  ngOnInit(): void {
    const email = this.authService.getEmail()
    this.foodService.getAllFood(email).subscribe((response:any) => {
      this.foods = response
      this.result = response
      this.emptyString = "Gösterilecek tarif bulunmamaktadır...";
    })
  }
  searchCheck(){
    if(this.search.length){
      const query = this.search.trim();
      this.result = this.foods.filter(food => food.name.toLowerCase().includes(query.toLowerCase()));
    }else{
      this.result = this.foods
    }
  }
}
