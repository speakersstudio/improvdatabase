import { NgModule }         from "@angular/core";
import { RouterModule, Routes }     from "@angular/router";

import { GameDatabaseComponent } from "./component/game-database.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/games',
        pathMatch: 'full'
    },
    {
        path: 'games',
        component: GameDatabaseComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {};
