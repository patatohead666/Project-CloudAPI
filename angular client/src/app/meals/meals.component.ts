import { Component, OnInit } from '@angular/core';
import { FoodService, RootObject } from '../services/food.service'
import { isNgTemplate } from '@angular/compiler';

@Component({
    selector: 'meal',
    templateUrl: './meals.component.html'
})

export class MealComponent implements OnInit{
    Food: RootObject[]


    constructor(private _svc: FoodService) { }

    ngOnInit() {
        //this._svc.getIngredients().subscribe(result => this.Food = result);
    }
}