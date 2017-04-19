import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { TeamService } from '../service/team.service';

import { FormInputDirective } from '../view/form-input.directive';
import { BracketCardDirective } from '../view/bracket-card.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        IPlusView,
        LoginView,
        UserFormView,
        LandingHeroView,
        FormInputView,
        FormInputDirective,
        BracketCardDirective
    ],
    exports: [
        IPlusView,
        LoginView,
        UserFormView,
        LandingHeroView,
        FormInputView,
        FormInputDirective,
        BracketCardDirective
    ],
    providers: [
        GameDatabaseService,
        LibraryService,
        UserService,
        AuthGuard,
        CartService,
        TeamService
    ]
})

export class SharedModule { }
