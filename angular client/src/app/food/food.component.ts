import { Component, OnInit } from '@angular/core';
import { FoodService, RootObject } from '../services/food.service'

@Component({
    selector: 'food',
    templateUrl: './food.component.html'
})

export class FoodComponent implements OnInit{
    Food: RootObject[]

    constructor(private _svc: FoodService) { }

    ngOnInit() {
        this._svc.get().subscribe(result => this.Food = result);
    }

}