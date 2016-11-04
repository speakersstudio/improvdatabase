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

// sub-views
// TODO: rename these files to .view and put them in a view folder
import { ToolbarComponent } from '../component/toolbar.component';
import { GameCardComponent } from '../component/game-card.component';
import { GameDetailsComponent } from '../component/game-details.component';
import { AlphaSignUpComponent } from '../component/alpha-sign-up.component';

import { GameDatabaseService } from "../service/game-database.service";

import { AppRoutingModule } from './app-routing.module';

import { GameFilterPipe } from '../pipe/game-filter.pipe';

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
        
        ToolbarComponent,
        GameCardComponent,
        GameDetailsComponent,
        AlphaSignUpComponent,

        GameFilterPipe
    ],
    bootstrap: [ AppComponent ],
    providers: [ 
        GameDatabaseService,
        PathLocationStrategy
    ],
    entryComponents: [
        AlphaSignUpComponent
    ]
})

export class AppModule { }
