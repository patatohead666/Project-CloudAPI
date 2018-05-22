import { Component, OnInit } from '@angular/core';
import { FoodService, RootObject } from '../services/food.service'
import { isNgTemplate } from '@angular/compiler';

@Component({
    selector: 'food',
    templateUrl: './ingredients.component.html'
})

export class IngredientComponent implements OnInit{
    ingredients: RootObject[]
    page: number=0
    name: string
    calories: number
    fat: number
    sugars: number


    constructor(private _svc: FoodService) { }

    ngOnInit() {
        this._svc.getIngredients(this.page).subscribe(result => this.ingredients = result);
    }
    addIngredient(){
        var ingredient : RootObject = ({
            id: 0,
            name: this.name,
            calories:this.calories,
            fat:this.calories,
            sugars:this.sugars
        })

        this._svc.postIngredient(ingredient).subscribe()  
        
        alert("ingredient added")
        window.location.reload() //reload page after adding ingredient
    }
    ClickBack(){

        if(this.page>0){
            this.page--
            this._svc.getIngredients(this.page).subscribe(result => this.ingredients = result);
        }
    }
    ClickNext()
    {
        this.page++
        this._svc.getIngredients(this.page).subscribe(result => this.ingredients = result);
    }
}