import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Tool, ToolbarComponent } from './toolbar.component';
import { UserService } from "../service/user.service";

import { User } from "../model/user";

const MAX_ATTEMPTS = 5;

@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: "../template/user.component.html"
})
export class UserComponent implements OnInit {

    email: string;
    password: string;

    passwordConfirm: string;

    loginError: string;

    errorCount: number;

    runaway: boolean;
    weGood: boolean;

    user: User;

    isPosting: boolean;

    constructor(
        private userService: UserService,
        private router: Router,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.errorCount = 0;
        this.weGood = true;

        this.user = this.userService.getLoggedInUser();
    }

    goBack(): void {
        this.location.back();
    }

    submitLogin(): void {
        this.loginError = "";
        this.userService.login(this.email, this.password)
            .then((user) => {
                this.router.navigate(['/games']);
            })
            .catch((reason) => {
                this.errorCount++;
                if (reason.status == 500) {
                    this.loginError = "Some sort of server error happened. Sorry.";
                } else {
                    if (this.errorCount < MAX_ATTEMPTS) {
                        this.loginError = `<a href="/images/password-incorrect.png" target="_blank">Die wanna wanga!</a>`;
                    } else if (this.errorCount == MAX_ATTEMPTS) {
                        this.loginError = "I'll let you take one more crack at it.";
                    } else {
                        this.loginError = "That's it, I'm out of here.";

                        this.runaway = true;

                        setTimeout(() => {
                            this.weGood = false;
                        }, 5500);
                    }
                }
            });
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
