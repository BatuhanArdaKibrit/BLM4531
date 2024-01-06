import { Component,OnInit } from '@angular/core';
import Food from '../Data/Food';
import { FoodService } from '../food.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrl: './user-recipes.component.css'
})
export class UserRecipesComponent implements OnInit {
  foods:Array<Food> = [] 
  constructor(private foodService:FoodService,private authService:AuthService){}
  emptyString:string = ""
  resultString:string = ""
  search:string = ""
  result:Array<Food> = []

  ngOnInit(): void {
    const email = this.authService.getEmail()
    this.foodService.getUserFood(email).subscribe((response:any) => {
      this.foods = response
      this.result = response
      this.emptyString = "Tarifiniz bulunmamaktadır hızlı bir şekilde tarif ekleyin...";
      this.resultString = "Gösterilecek tarif bulunmamaktadır..."
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

