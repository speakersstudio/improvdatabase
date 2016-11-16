import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PathLocationStrategy } from '@angular/common';

// main components
import { AppComponent } from '../component/app.component';
import { GameDatabaseComponent } from '../component/game-database.component';
import { AboutComponent } from '../component/about.component';
import { ContactComponent } from '../component/contact.component';
import { UserComponent } from '../component/user.component';

// sub-views
// TODO: rename these files to .view and put them in a view folder
import { ToolbarComponent } from '../component/toolbar.component';
import { GameCardComponent } from '../component/game-card.component';
import { GameDetailsComponent } from '../component/game-details.component';
import { AlphaSignUpComponent } from '../component/alpha-sign-up.component';

import { GameDatabaseService } from "../service/game-database.service";
import { UserService } from "../service/user.service";

import { AppRoutingModule } from './app-routing.module';

import { GameFilterPipe } from '../pipe/game-filter.pipe';

// utils
import { WebStorageService, WebStorageSubscriber } from "../util/webstorage.util";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
     ],
    declarations: [
        AppComponent,
        GameDatabaseComponent,
        AboutComponent,
        ContactComponent,
        UserComponent,
        
        ToolbarComponent,
        GameCardComponent,
        GameDetailsComponent,
        AlphaSignUpComponent,

        GameFilterPipe
    ],
    bootstrap: [ AppComponent ],
    providers: [ 
        GameDatabaseService,
        UserService,
        PathLocationStrategy,
        WebStorageService
    ],
    entryComponents: [
        AlphaSignUpComponent
    ]
})

export class AppModule { }
