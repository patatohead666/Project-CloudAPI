import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BeerComponent } from './beer/beer.component'

import { HttpClientModule } from '@angular/common/http';
import { BeerService } from './services/beer.service';
import { SearchBeerComponent } from './SearchBeer/searchBeer.component';
import { FoodService } from './services/food.service';

import { MealComponent } from './meals/meals.component';
import { IngredientComponent } from './ingredients/ingredients.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BeerComponent,
    SearchBeerComponent,
    IngredientComponent,
    MealComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent},
      { path: '', component: HomeComponent},
      { path: 'beer', component: SearchBeerComponent},
      { path: 'food', component: IngredientComponent},
      { path: 'meals', component: MealComponent},
      { path: '*', component: HomeComponent}
    ], { useHash: true }),
    FormsModule,
    HttpClientModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    BeerService,
    FoodService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
