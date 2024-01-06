import { Input, NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModules } from './primeng';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { MenubarComponent } from './menubar/menubar.component';
import { NgMaterialModules } from './angular-material';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { FoodCardComponent } from './food-card/food-card.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { LikedRecipesComponent } from './liked-recipes/liked-recipes.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { FooterComponent } from './footer/footer.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AccountComponent,
    MenubarComponent,
    AccountSettingsComponent,
    UserRecipesComponent,
    FoodCardComponent,
    AddRecipeComponent,
    LikedRecipesComponent,
    FoodDetailComponent,
    LoadingIndicatorComponent,
    FooterComponent,
    EditRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...PrimeNgModules,
    ...NgMaterialModules
  ],
  providers: [importProvidersFrom(HttpClientModule)],
  bootstrap: [AppComponent]
})
export class AppModule { }
