import { 
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';

import { AppComponent } from './app.component';

import { Tool } from '../view/toolbar.view';
import { UserService } from "../service/user.service";

import { User } from "../model/user";

const MAX_ATTEMPTS = 5;

@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: "../template/user.component.html"
})
export class UserComponent implements OnInit, OnDestroy {

    email: string;
    password: string;
    passwordConfirm: string;

    loginError: string;

    errorCount: number;

    runaway: boolean;
    weGood: boolean;

    user: User;

    isPosting: boolean;

    userSubscription: Subscription;

    constructor(
        private userService: UserService,
        private router: Router,
        private location: Location,
        private _app: AppComponent
    ) { }

    ngOnInit(): void {
        this.errorCount = 0;
        this.weGood = true;

        this.user = this.userService.getLoggedInUser();
        this.userSubscription = this.userService.loginState$.subscribe(user => this.user = user);

        if (!this.user) {
            // show the login form
            this._app.login();
        }
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    goBack(): void {
        this.location.back();
    }

    logout(): void {
        this.userService.logout().then(() => {
            this.user = null;
            this.goBack();
        })
    }

    submitEditUser(): void {
        // TODO: updating the password
        // TODO: validation on the form to make sure the password and confirmation match

        this.isPosting = true;

        this.userService.updateUser()
            .then(() => {
                this.isPosting = false;
            })
            .catch(() => {
                this.isPosting = false;
            })
    }
}
