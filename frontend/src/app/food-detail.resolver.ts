import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { FoodService } from './food.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class FoodResolver implements Resolve<boolean> {
  constructor(private foodService: FoodService,
              private authService:AuthService) {}

  resolve(route: ActivatedRouteSnapshot):Observable<boolean>{
    const foodId = route.params['id'];
    return this.foodService.checkOwnership(foodId).pipe(
      map(response => this.authService.getEmail() === response),
      catchError(() => of(false))
    ) 
  }

}
