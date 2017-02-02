import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PathLocationStrategy } from '@angular/common';

// main components
import { AppComponent } from '../component/app.component';
import { DashboardComponent } from '../component/dashboard.component';
import { LibraryComponent } from "../component/library.component";
import { GameDatabaseComponent } from '../component/game-database.component';
import { AboutComponent } from '../component/about.component';
import { ContactComponent } from '../component/contact.component';
import { UserComponent } from '../component/user.component';
import { GameDetailsComponent } from '../component/game-details.component';
import { HelpComponent } from "../component/help.component";
import { LegalComponent } from "../component/legal.component";

// sub-views
import { ToolbarView } from '../view/toolbar.view';
import { GameCardView } from '../view/game-card.view';
import { LoginView } from '../view/login.view';
import { CreateMetadataView } from '../view/create-metadata.view';

// services
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
        DashboardComponent,
        LibraryComponent,
        GameDatabaseComponent,
        AboutComponent,
        ContactComponent,
        UserComponent,
        HelpComponent,
        GameDetailsComponent,
        LegalComponent,
        
        ToolbarView,
        GameCardView,
        LoginView,
        CreateMetadataView,

        GameFilterPipe
    ],
    bootstrap: [ AppComponent ],
    providers: [ 
        GameDatabaseService,
        UserService,
        PathLocationStrategy,
        WebStorageService
    ]
})

export class AppModule { }
