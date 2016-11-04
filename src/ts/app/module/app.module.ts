import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PathLocationStrategy } from '@angular/common';

// main components
import { AppComponent } from '../component/app.component';
import { GameDatabaseComponent } from '../component/game-database.component';
import { AboutComponent } from '../component/about.component';

// sub-views
import { ToolbarComponent } from '../component/toolbar.component';
import { GameCardComponent } from '../component/game-card.component';
import { GameDetailsComponent } from '../component/game-details.component';

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
        ToolbarComponent,
        GameCardComponent,
        GameDetailsComponent,
        GameFilterPipe
    ],
    bootstrap: [ AppComponent ],
    providers: [ 
        GameDatabaseService,
        PathLocationStrategy
    ]
})

export class AppModule { }
