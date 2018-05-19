import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { interceptingHandler } from "@angular/common/http/src/module";

@Injectable()
export class BeerService {
    constructor(private _http: HttpClient) { }

    get(): Observable<RootObject[]> {
        return this._http.get<RootObject[]>("https://api.punkapi.com/v2/beers")
    }
    paging(items, page): Observable<RootObject[]> {
        return this._http.get<RootObject[]>("https://api.punkapi.com/v2/beers?page="+page+"&per_page="+items)
    }
    searchId(id): Observable<RootObject[]>{
        return this._http.get<RootObject[]>("https://api.punkapi.com/v2/beers/"+id)
    }
    filter(search): Observable<RootObject[]>{
        return this._http.get<RootObject[]>("https://api.punkapi.com/v2/beers"+search)
    }
}

export interface RootObject {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number;
    ibu?: number;
    target_fg: number;
    target_og: number;
    ebc?: number;
    srm?: number;
    ph?: number;
    attenuation_level: number;
    volume: Volume;
    boil_volume: Volume;
    method: Method;
    ingredients: Ingredients;
    food_pairing: string[];
    brewers_tips: string;
    contributed_by: string;
}

export interface Ingredients {
    malt: Malt[];
    hops: Hop[];
    yeast: string;
}

export interface Hop {
    name: string;
    amount: Volume;
    add: string;
    attribute: string;
}

export interface Malt {
    name: string;
    amount: Volume;
}

export interface Method {
    mash_temp: Mashtemp[];
    fermentation: Fermentation;
    twist?: string;
}

export interface Fermentation {
    temp: Volume;
}

export interface Mashtemp {
    temp: Volume;
    duration?: number;
}

export interface Volume {
    value: number;
    unit: string;
}
