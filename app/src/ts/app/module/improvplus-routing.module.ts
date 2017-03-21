import { NgModule }         from "@angular/core";
import { RouterModule, Routes }     from "@angular/router";

import { AuthGuard } from '../../service/auth-guard.service';
import { DashboardComponent } from "../component/dashboard.component";
import { MaterialsLibraryComponent } from "../component/materials-library.component";
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
        path: 'app',
        children: [
            {
                path: '',
                redirectTo: '/app/dashboard',
                pathMatch: 'full'
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
                        path: 'materials',
                        component: MaterialsLibraryComponent,
                        data: {
                            action: 'materials_view'
                        }
                    },
                    {
                        path: 'materials/:packageSlug',
                        component: MaterialsLibraryComponent,
                        data: {
                            action: 'materials_view'
                        }
                    },
                    {
                        path: 'games',
                        component: GameDatabaseComponent,
                        data: {
                            action: 'game_view'
                        }
                    },
                    {
                        path: 'game/:id',
                        component: GameDetailsComponent,
                        data: {
                            action: 'game_view'
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
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ImprovPlusRoutingModule {};
