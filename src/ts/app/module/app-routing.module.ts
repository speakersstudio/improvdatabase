import { NgModule }         from "@angular/core";
import { RouterModule, Routes }     from "@angular/router";

import { GameDatabaseComponent } from "../component/game-database.component"
import { AboutComponent }  from "../component/about.component";
import { ContactComponent } from "../component/contact.component";
import { GameDetailsComponent } from '../component/game-details.component';
import { UserComponent } from '../component/user.component';

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
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'user',
        component: UserComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {};
