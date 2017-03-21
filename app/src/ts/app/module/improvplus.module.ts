import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PathLocationStrategy } from '@angular/common';

// main components
// import { AppComponent } from '../component/app.component';
import { UnauthorizedComponent } from "../component/unauthorized.component";
import { DashboardComponent } from '../component/dashboard.component';
import { MaterialsLibraryComponent } from "../component/materials-library.component";
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
import { CreateMetadataView } from '../view/create-metadata.view';

import { SharedModule } from '../../module/shared.module';
import { ImprovPlusRoutingModule } from './improvplus-routing.module';

// utils

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        SharedModule,
        ImprovPlusRoutingModule
     ],
    declarations: [
        // AppComponent,
        UnauthorizedComponent,
        DashboardComponent,
        MaterialsLibraryComponent,
        GameDatabaseComponent,
        AboutComponent,
        ContactComponent,
        UserComponent,
        HelpComponent,
        GameDetailsComponent,
        LegalComponent,
        
        ToolbarView,
        GameCardView,
        CreateMetadataView
    ],
    // bootstrap: [ AppComponent ],
    providers: [
        
    ]
})

export class ImprovPlusModule { }
