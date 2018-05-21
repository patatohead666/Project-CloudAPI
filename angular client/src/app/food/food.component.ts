import { Component, OnInit } from '@angular/core';
import { FoodService, RootObject } from '../services/food.service'
import { isNgTemplate } from '@angular/compiler';

@Component({
    selector: 'food',
    templateUrl: './food.component.html'
})

export class FoodComponent implements OnInit{
    Food: RootObject[]
    name: string
    calories: number
    fat: number
    sugars: number

    constructor(private _svc: FoodService) { }

    ngOnInit() {
        this._svc.get().subscribe(result => this.Food = result);
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
        
        this.name = ""
        this.calories = undefined
        this.fat = undefined
        this.sugars = undefined
        alert("ingredient added")
    }
}