import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';




import { HttpClientModule } from '@angular/common/http';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent},
      { path: '', component: HomeComponent}
    ], { useHash: true }),
    FormsModule,
    HttpClientModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
