import { NgModule }         from "@angular/core";
import { RouterModule, Routes }     from "@angular/router";

import { AuthGuard } from '../service/auth-guard.service';

import { WelcomeComponent } from '../component/ms.welcome.component';

import { LoginScreenComponent } from '../component/login-screen.component';
import { SignupComponent } from '../component/signup.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'login',
        component: LoginScreenComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {};
