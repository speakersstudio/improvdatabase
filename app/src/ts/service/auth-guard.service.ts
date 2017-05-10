import { Injectable } from '@angular/core';
import { CanActivateChild, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { AppComponent } from '../component/app.component';

import { User } from "../model/user";
import { UserService } from '../service/user.service';

@Injectable() 
export class AuthGuard implements CanActivateChild {

    redirect: UrlSegment[];

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>|boolean {
        //console.log(this.userService.getLoggedInUser());

        if (this.userService.isLoggingIn) {
            return this.userService.loginPromise.then(user => {
                return Promise.resolve(this.canActivateChild(route, state));
            });
        }

        if (this.userService.getLoggedInUser()) {
            let data:any = route.data;
            //console.log(data, this.userService.can(data.action));
            if (data.admin && this.userService.isSuperAdmin()) {
                return true;
            } else if (!data.action || this.userService.can(data.action)) {
                return true;
            } else {
                this.router.navigate(['/app/unauthorized'], { replaceUrl: true });
            }
        } else {
            this.redirect = route.url;
            this.router.navigate(['/login'], { replaceUrl: true });
        }
        return false;
    }


}