import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ChangePasswordComponent } from '../component/change-password.component'
import { InviteComponent } from '../component/invite.component';
import { ImprovisersComponent } from '../component/improvisers.component';

// import { FormInputDirective } from '../view/form-input.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        ImprovPlusModule
     ],
    declarations: [
        LoginScreenComponent,
        AppComponent,
        WelcomeComponent,
        SignupComponent,
        ChangePasswordComponent,
        InviteComponent,
        ImprovisersComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [
        PathLocationStrategy,
        AppHttp
    ]
})

export class AppModule { }
