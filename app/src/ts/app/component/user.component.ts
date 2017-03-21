import { 
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { AppComponent } from '../../component/app.component';

import { Tool } from '../view/toolbar.view';
import { UserService } from "../../service/user.service";

import { User } from "../../model/user";

const MAX_ATTEMPTS = 5;

@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: "../template/user.component.html"
})
export class UserComponent implements OnInit, OnDestroy {

    title: string = "Account";

    email: string;
    password: string;
    passwordConfirm: string;
    passwordMatchError: boolean;

    loginError: string;

    errorCount: number;

    runaway: boolean;
    weGood: boolean;

    user: User;

    isPosting: boolean;

    constructor(
        private userService: UserService,
        private router: Router,
        private location: Location,
        private _app: AppComponent,
        private fb: FormBuilder
    ) { }

    private _tools: Tool[] = [
        {
            icon: "fa-sign-out",
            name: "logout",
            text: "Log Out",
            active: false
        }
    ]

    ngOnInit(): void {
        this.errorCount = 0;
        this.weGood = true;

        this.user = this._app.user;
    }

    ngOnDestroy(): void {

    }

    logout(): void {
        this._app.logout();
    }

    submitEditUser(): void {
        this.passwordMatchError = false;

        if (this.password === this.passwordConfirm) {
            this.isPosting = true;

            this.userService.updateUser(this.password)
                .then(() => {
                    this.isPosting = false;
                    this.password = "";
                    this.passwordConfirm = "";
                })
                .catch(() => {
                    this.isPosting = false;
                })
        } else {
            this.passwordMatchError = true;
        }
    }

    onToolClicked(tool: Tool): void {
        this._app.showLoader();
        
        switch (tool.name) {
            case "logout":
                this.logout();
                break;
        }
    }
}
