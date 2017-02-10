import { NgModule }         from "@angular/core";
import { RouterModule, Routes }     from "@angular/router";

import { AuthGuard } from '../service/auth-guard.service';

import { LoginScreenComponent } from '../component/login-screen.component';
import { DashboardComponent } from "../component/dashboard.component";
import { LibraryComponent } from "../component/library.component";
import { HelpComponent } from "../component/help.component";
import { UnauthorizedComponent } from "../component/unauthorized.component";
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
        path: 'login',
        component: LoginScreenComponent
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    action: 'dashboard_view'
                }
            },
            {
                path: 'library',
                component: LibraryComponent,
                data: {
                    action: 'library_view'
                }
            },
            {
                path: 'games',
                component: GameDatabaseComponent,
                data: {
                    action: 'games_view'
                }
            },
            {
                path: 'game/:id',
                component: GameDetailsComponent,
                data: {
                    action: 'games_view'
                }
            },
            {
                path: 'user',
                component: UserComponent,
                data: {
                    action: 'account_edit'
                }
            }
        ]
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
