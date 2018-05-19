import { Component, OnInit } from '@angular/core';
import { BeerService, RootObject } from '../services/beer.service'

@Component({
    selector: 'beer',
    templateUrl: './beer.component.html'
})

export class BeerComponent implements OnInit{
    BeerData: iBeerDetails[]
    itemsPerPage: number = 25;
    page: number = 1;

    constructor(private _svc: BeerService) { }

    ngOnInit() {
        this._svc.get().subscribe(result => this.extractData(result));
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

    get ClickDropdown() {
        return 0;
    }

    set ClickDropdown(value: number) {
        this.itemsPerPage = value;
        this._svc.paging(this.itemsPerPage, this.page).subscribe(result => this.extractData(result));
    }

    public ClickBack(){
        if (this.page>1)
            this.page--;
        this._svc.paging(this.itemsPerPage, this.page).subscribe(result => this.extractData(result));
    }

    public ClickNext(){
        this.page++;
        this._svc.paging(this.itemsPerPage, this.page).subscribe(result => this.extractData(result));
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