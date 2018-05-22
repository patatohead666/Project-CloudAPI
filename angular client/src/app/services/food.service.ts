import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { interceptingHandler } from "@angular/common/http/src/module";
import { post } from "selenium-webdriver/http";


@Injectable()
export class FoodService {
    constructor(private _http: HttpClient) { }

    getIngredients(page): Observable<RootObject[]> {
        return this._http.get<RootObject[]>("http://localhost:5000/api/v1/ingredients?length=5&page="+page)
    }

    postIngredient(ingredient: RootObject ): Observable<RootObject[]> {
        return this._http.post<RootObject[]>("http://localhost:5000/api/v1/ingredients", ingredient)
    }

}

export interface RootObject {
    id: number;
    name: string;
    calories: number;
    fat: number;
    sugars: number;
  }