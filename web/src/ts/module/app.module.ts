import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PathLocationStrategy } from '@angular/common';

// main components
import { AppComponent } from '../component/app.component';
import { HomeComponent } from '../component/home.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
     ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ ]
})

export class AppModule { }
