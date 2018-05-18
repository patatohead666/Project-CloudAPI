import { Component, OnInit } from '@angular/core';
import { BeerService, RootObject } from '../services/beer.service'

@Component({
    selector: 'beer',
    templateUrl: './beer.component.html'
})

export class BeerComponent implements OnInit{
    BeerData: iBeerDetails[]
    test: number
    _nr: number = 0;
    testimage: string;

    constructor(private _svc: BeerService) { }

    ngOnInit() {
        this._svc.get().subscribe(result => this.extractData(result));
    }
    extractData(result: RootObject[]) {
        this.test = 5
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
            this.testimage= result[1].image_url
        }
    }

    get ClickDropdown() {
        return this._nr;
    }

    set ClickDropdown(value: number) {
        this._nr = value;
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
