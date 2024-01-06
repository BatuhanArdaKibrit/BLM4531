import { Component, OnChanges, OnInit} from '@angular/core';
import Food from '../Data/Food';
import { AuthService } from '../auth.service';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-liked-recipes',
  templateUrl: './liked-recipes.component.html',
  styleUrl: './liked-recipes.component.css'
})
export class LikedRecipesComponent implements OnInit {
  foods:Array<Food> = [] 
  constructor(private foodService:FoodService,private authService:AuthService){}
  emptyString:string = ""
  resultString:string = ""
  search:string = ""
  result:Array<Food> = []

  removeRecipe(recipeId:number){
    this.foods = this.foods.filter(recipe => recipe.id != recipeId)
    this.result = this.result.filter(recipe => recipe.id != recipeId)
  }

  ngOnInit(): void {
    const email = this.authService.getEmail()
    this.foodService.getLikedFood(email).subscribe((response:any) => {
      this.foods = response
      this.result = response
      this.emptyString = "Favorilerinizde hiçbir tarif bulunmamaktadır...";
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

