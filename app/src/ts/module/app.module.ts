import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PathLocationStrategy } from '@angular/common';

import { WebStorageService, WebStorageSubscriber } from "../util/webstorage.util";

// main components
// import { MarketingSiteComponent } from '../component/ms.component';
import { AppComponent } from '../component/app.component';
import { WelcomeComponent } from '../component/ms.welcome.component';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared.module';
import { ImprovPlusModule } from '../app/module/improvplus.module';

import { LoginScreenComponent } from '../component/login-screen.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        AppRoutingModule,
        ImprovPlusModule
     ],
    declarations: [
        LoginScreenComponent,
        AppComponent,
        WelcomeComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [
        PathLocationStrategy,
        WebStorageService
    ]
})

export class AppModule { }
