import { Component, OnInit } from '@angular/core';
import { BeerService, RootObject } from '../services/beer.service'
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'search-beer',
    templateUrl: './searchBeer.component.html'
})
export class SearchBeerComponent implements OnInit
{
    BeerData: iBeerDetails[]
    id: number = 1
    foodPairing: string
    beerName: string
    brewedBefore: string
    brewedAfter: string
    
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
                    foodPairings: result[i].food_pairing,
                })
            }
        }
    }
    findId(){
        this._svc.searchId(this.id).subscribe(result => this.extractData(result));
    }
    filter(){
        var searchString: string = "?"

        if (this.foodPairing != undefined && this.foodPairing !="")
            searchString+="food="+this.foodPairing+"&"
        if (this.beerName != undefined && this.beerName != "")
            searchString+="beer_name="+this.beerName+"&"
        if (this.brewedBefore != undefined && this.brewedBefore != "")
            searchString+="brewed_before="+this.brewedBefore+"&"
        if (this.brewedAfter != undefined && this.brewedAfter != "")
            searchString+="brewed_after="+this.brewedAfter+"&"

        if (searchString=="?")
            searchString = "/" + this.id

        this._svc.filter(searchString).subscribe(result => this.extractData(result));
        alert(searchString)
    }
}

export interface iBeerDetails {
    id: number;
    name: string;
    tagline: string;
    description: string;
    image: string;
    firstBrewed: string;
    foodPairings: string[];
}