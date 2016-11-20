import { 
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from "../service/user.service";

import { User } from "../model/user";

import { DialogAnim } from '../util/anim.util';

const MAX_ATTEMPTS = 5;

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "../template/view/login.view.html",
    animations: [
        DialogAnim.dialog
    ]
})
export class LoginView implements OnInit {

    email: string;
    password: string;

    loginError: string;

    errorCount: number;

    runaway: boolean;

    @Input() show: boolean;

    @Output() done: EventEmitter<User> = new EventEmitter();

    isPosting: boolean;

    weGood: boolean;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.errorCount = 0;
        this.weGood = true;
    }

    submitLogin(): void {
        this.loginError = "";
        this.userService.login(this.email, this.password)
            .then((user) => {
                //this.router.navigate(['/games']);
                this.done.emit(user);
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
                            this.done.emit(null);
                        }, 7100);
                    }
                }
            });
    }

    cancel(): boolean {
        this.done.emit(null);
        return false;
    }

}
