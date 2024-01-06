import { Component ,OnInit} from '@angular/core';
import Food from '../Data/Food';
import { FoodService } from '../food.service';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent{
  foodData:FormData = new FormData()
  food:Food={
    id:0,
    name:"",
    type:"",
    recipe:"",
    ingredients:[],
    image:new Blob(),
    createdBy:this.authService.getEmail(),
    imageName:""
  }
  constructor(private foodService:FoodService,
              private messageService:MessageService,
              private authService:AuthService,
              public router:Router) {}
  saveTheImage(event:any){
    this.food.image = event.files[0]
    this.food.imageName = event.files[0].name
  }
  
  onSubmit(){
    this.foodData.set("name",this.food.name)
    this.foodData.set("type",this.food.type)
    this.foodData.set("recipe",this.food.recipe)
    const arrayOfIngre:string = this.food.ingredients.join(',')
    this.foodData.set("ingredients",arrayOfIngre)
    this.foodData.set("createdBy",this.food.createdBy)
    this.foodData.set("imageName",this.food.imageName)
    this.foodData.set("image",this.food.image)
    this.foodService.saveFood(this.foodData).subscribe(() => {
      this.messageService.setMessage("success","Yemek başarılı bir şekilde kaydedilmiştir...","")
      this.router.navigate(['/my_recipes'])
    },error => {
      this.messageService.setMessage("error","Kaydedilirken bir hata meydana geldi","")
    }
    )

  }
}
