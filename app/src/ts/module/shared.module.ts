import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPlusView } from '../view/iplus.view';
import { LoginView } from '../view/login.view';
import { UserFormView } from '../view/user-form.view';
import { LandingHeroView } from '../view/landing-hero.view';

// services
import { UserService } from "../service/user.service";
import { CartService } from '../service/cart.service';
import { AppService } from '../service/app.service';

import { FormInputDirective } from '../view/form-input.directive';
import { BracketCardDirective } from '../view/bracket-card.directive';

@NgModule({
    imports: [
        // BrowserModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        IPlusView,
        LoginView,
        UserFormView,
        LandingHeroView,
        FormInputDirective,
        BracketCardDirective
    ],
    exports: [
        IPlusView,
        LoginView,
        UserFormView,
        LandingHeroView,
        FormInputDirective,
        BracketCardDirective
    ],
    providers: [
        AppService,
        UserService,
        CartService
    ]
})

export class SharedModule { }
