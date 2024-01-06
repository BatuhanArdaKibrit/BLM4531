import { Component } from '@angular/core';
import Food from '../Data/Food';
import { FoodService } from '../food.service';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent{
  foodData:FormData = new FormData()
  ingredients:Array<string> = []
  imageUrl:string = ""
  files:File[] = []
  isOwner:boolean = false
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
              private aroute:ActivatedRoute,
              private messageService:MessageService,
              private authService:AuthService,
              private router:Router,
              public location:Location) {}

  ngOnInit(): void {
    this.isOwner = this.aroute.snapshot.data['isOwner']
    if(!this.isOwner){
      this.router.navigate(['/home'])
    }
    this.aroute.params.subscribe(params => {
      this.foodService.getFoodDetail(params['id'],this.authService.getEmail()).subscribe((response:any) =>{
        this.food = response
        this.food.ingredients = response.ingredients.split(',')
        const binaryString = atob(response.image);

        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          byteArray[i] = binaryString.charCodeAt(i);
        }
        this.food.image = new Blob([byteArray], { type: this.food.imageType });
        const file = new File([this.food.image], this.food.imageName, { type: this.food.imageType });
        this.files = [file]
        this.food.createdBy = this.authService.getEmail()
        this.foodData.set("imageName",this.food.imageName)
        this.foodData.set("image",this.food.image)
      })
    })
  }

  saveTheImage(event:any){
    this.food.image = event.files[0]
    this.food.imageName = event.files[0].name
    this.foodData.set("imageName",this.food.imageName)
    this.foodData.set("image",this.food.image)
  }
  onSubmit(){
    this.foodData.set("name",this.food.name)
    this.foodData.set("type",this.food.type)
    this.foodData.set("recipe",this.food.recipe)
    const arrayOfIngre:string = this.food.ingredients.join(',')
    this.foodData.set("ingredients",arrayOfIngre)
    this.foodData.set("createdBy",this.food.createdBy)
    this.foodService.editFood(this.food.id,this.foodData).subscribe(() => {
      this.messageService.setMessage("success","Yemek başarılı bir şekilde düzenlenmiştir...","")
      this.location.back()
    },() => {
      this.messageService.setMessage("error","Kaydedilirken bir hata meydana geldi","")
    }
    )
  }
}
