import { NgModule }         from "@angular/core";
import { RouterModule, Routes }     from "@angular/router";

import { DashboardComponent } from "../component/dashboard.component";
import { LibraryComponent } from "../component/library.component";
import { HelpComponent } from "../component/help.component";
import { GameDatabaseComponent } from "../component/game-database.component";
import { AboutComponent }  from "../component/about.component";
import { ContactComponent } from "../component/contact.component";
import { GameDetailsComponent } from '../component/game-details.component';
import { UserComponent } from '../component/user.component';
import { LegalComponent } from "../component/legal.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'library',
        component: LibraryComponent
    },
    {
        path: 'games',
        component: GameDatabaseComponent
    },
    {
        path: 'game/:id',
        component: GameDetailsComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'help',
        component: HelpComponent
    },
    {
        path: 'legal',
        component: LegalComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {};
