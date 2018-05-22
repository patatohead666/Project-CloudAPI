import { Component, OnInit } from '@angular/core';
import { FoodService, RootObject, Meal } from '../services/food.service'
import { isNgTemplate } from '@angular/compiler';

@Component({
    selector: 'meal',
    templateUrl: './meals.component.html'
})

export class MealComponent implements OnInit{
    Meals: Meal[]
    page: number=0
    name: string
    ingredient: string
    constructor(private _svc: FoodService) { }

    ngOnInit() {
        this._svc.getMeals(this.page).subscribe(result => this.Meals = result);
    }
    addMeal(){
        var meal : Meal = ({
            id: 0,
            name: this.name,
            mostUsedIngredient: 
                ({id: 0,
                name: this.ingredient,
                calories: 0,
                fat: 0,
                sugars: 0})
            
        })

        this._svc.postMeals(meal).subscribe()  
        
        alert("Meal added")
        window.location.reload() //reload page after adding ingredient
    }
    ClickBack(){

        if(this.page>0){
            this.page--
            this._svc.getMeals(this.page).subscribe(result => this.Meals = result);        }
    }
    ClickNext()
    {
        this.page++
        this._svc.getMeals(this.page).subscribe(result => this.Meals = result);
    }
}