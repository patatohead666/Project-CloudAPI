import { Component, OnInit } from '@angular/core';
import { BeerService, RootObject } from '../services/beer.service'

@Component({
    selector: 'search-beer',
    templateUrl: './searchBeer.component.html'
})
export class SearchBeerComponent implements OnInit
{
    BeerData: iBeerDetails[]
    id: number = 1
    
    constructor(private _svc: BeerService) { }

    ngOnInit() {
        this._svc.searchId(this.id).subscribe(result => this.extractData(result));
    }
    extractData(result: RootObject[]) {
        if (result != null) {
            this.BeerData = new Array(result.length)
            for (var i = 0; i < result.length; i++) {
                this.BeerData[i] = ({
                    id: result[i].id,
                    name: result[i].name,
                    tagline: result[i].tagline,
                    description: result[i].description,
                    image: result[i].image_url,
                    firstBrewed: result[i].first_brewed,
                })
            }
        }
    }
    findId(){
        this._svc.searchId(this.id).subscribe(result => this.extractData(result));
    }
}

export interface iBeerDetails {
    id: number;
    name: string;
    tagline: string;
    description: string;
    image: string;
    firstBrewed: string;
}