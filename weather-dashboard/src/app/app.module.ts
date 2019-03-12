import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { BsHeaderComponent } from './bs-header/bs-header.component';
import { BsCurrentComponent } from './bs-current/bs-current.component';



@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    BsHeaderComponent,
    BsCurrentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

