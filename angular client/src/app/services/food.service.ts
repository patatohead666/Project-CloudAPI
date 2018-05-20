import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { interceptingHandler } from "@angular/common/http/src/module";

@Injectable()
export class FoodService {
    constructor(private _http: HttpClient) { }

    get(): Observable<RootObject[]> {
        return this._http.get<RootObject[]>("https://localhost:5001/api/v1/ingredients")
    }
}

export interface RootObject {
    id: number;
    name: string;
    calories: number;
    fat: number;
    sugars: number;
  }