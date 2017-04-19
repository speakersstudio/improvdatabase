import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WebStorageModule, LocalStorageService } from "../util/webstorage.util";

import { AppHttp } from '../data/app-http';

// main components
// import { MarketingSiteComponent } from '../component/ms.component';
import { AppComponent } from '../component/app.component';
import { WelcomeComponent } from '../component/ms.welcome.component';

import { AppRoutingModule } from './app-routing.module';

// the shared module is where all of the views and services live
import { SharedModule } from './shared.module';

// the improvplus module is the app
import { ImprovPlusModule } from '../app/module/improvplus.module';

import { LoginScreenComponent } from '../component/login-screen.component';
import { SignupComponent } from '../component/signup.component';

// import { FormInputDirective } from '../view/form-input.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        WebStorageModule,
        SharedModule,
        AppRoutingModule,
        ImprovPlusModule
     ],
    declarations: [
        LoginScreenComponent,
        AppComponent,
        WelcomeComponent,
        SignupComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [
        PathLocationStrategy,
        LocalStorageService,
        AppHttp
    ]
})

export class AppModule { }
