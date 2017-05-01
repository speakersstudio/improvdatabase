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
import { AdminComponent } from '../component/admin.component';
import { TeamListComponent } from '../component/team-list.component';
import { TeamDetailsComponent } from '../component/team-details.component';

// sub-views
import { ToolbarView } from '../view/toolbar.view';
import { GameCardView } from '../view/game-card.view';
import { CreateMetadataView } from '../view/create-metadata.view';
import { MaterialsPageView } from '../view/materials-page.view';
import { UserCardView } from '../view/user-card.view';
import { EditableMetadataView } from '../view/editable-metadata.view';
import { DashboardMessageListView } from '../view/dashboard-message-list.view';

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
        UnauthorizedComponent,
        DashboardComponent,
        MaterialsLibraryComponent,
        GameDatabaseComponent,
        AboutComponent,
        ContactComponent,
        UserComponent,
        HelpComponent,
        TeamListComponent,
        TeamDetailsComponent,
        GameDetailsComponent,
        LegalComponent,
        AdminComponent,
        
        ToolbarView,
        GameCardView,
        CreateMetadataView,
        MaterialsPageView,
        UserCardView,
        EditableMetadataView,
        DashboardMessageListView
    ],
    // bootstrap: [ AppComponent ],
    providers: [
        
    ]
})

export class ImprovPlusModule { }
