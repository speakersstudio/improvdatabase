import { NgModule }         from "@angular/core";
import { RouterModule, Routes }     from "@angular/router";

import { GameDatabaseComponent } from "../component/game-database.component"
import { AboutComponent }  from "../component/about.component";
import { GameDetailsComponent } from '../component/game-details.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/games',
        pathMatch: 'full'
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
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {};
