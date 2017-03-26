import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPlusView } from '../view/iplus.view';
import { LoginView } from '../view/login.view';
import { UserFormView } from '../view/user-form.view';

// services
import { GameDatabaseService } from "../service/game-database.service";
import { LibraryService } from "../service/library.service";
import { UserService } from "../service/user.service";
import { AuthGuard } from "../service/auth-guard.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        IPlusView,
        LoginView,
        UserFormView
    ],
    exports: [
        IPlusView,
        LoginView,
        UserFormView
    ],
    providers: [
        GameDatabaseService,
        LibraryService,
        UserService,
        AuthGuard
    ]
})

export class SharedModule { }
