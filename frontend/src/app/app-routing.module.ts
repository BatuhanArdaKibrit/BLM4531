import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AccountComponent } from './account/account.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { LikedRecipesComponent } from './liked-recipes/liked-recipes.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { FoodResolver } from './food-detail.resolver';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"account",component:AccountComponent,canActivate:[AuthGuard]},
  {path:"change_account_settings/:id",component:AccountSettingsComponent,canActivate:[AuthGuard]},
  {path:"my_recipes",component:UserRecipesComponent,canActivate:[AuthGuard]},
  {path:"add_recipe",component:AddRecipeComponent,canActivate:[AuthGuard]},
  {path:"edit_recipe/:id",component:EditRecipeComponent,canActivate:[AuthGuard],resolve:{isOwner : FoodResolver}},
  {path:"liked_recipes",component:LikedRecipesComponent,canActivate:[AuthGuard]},
  {path:"food_detail/:id",component:FoodDetailComponent,canActivate:[AuthGuard],resolve:{isOwner : FoodResolver}},
  {path:"**",redirectTo:"/home",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
