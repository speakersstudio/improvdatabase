import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPlusView } from '../view/iplus.view';
import { LoginView } from '../view/login.view';
import { UserFormView } from '../view/user-form.view';
import { LandingHeroView } from '../view/landing-hero.view';
import { FormInputView } from '../view/form-input.view';

// services
import { GameDatabaseService } from "../service/game-database.service";
import { LibraryService } from "../service/library.service";
import { UserService } from "../service/user.service";
import { AuthGuard } from "../service/auth-guard.service";
import { CartService } from '../service/cart.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        IPlusView,
        LoginView,
        UserFormView,
        LandingHeroView,
        FormInputView
    ],
    exports: [
        IPlusView,
        LoginView,
        UserFormView,
        LandingHeroView,
        FormInputView
    ],
    providers: [
        GameDatabaseService,
        LibraryService,
        UserService,
        AuthGuard,
        CartService
    ]
})

export class SharedModule { }
