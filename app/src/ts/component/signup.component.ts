import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { UserService } from '../service/user.service';

@Component({
    moduleId: module.id,
    selector: "signup",
    templateUrl: '../template/signup.component.html'
})
export class SignupComponent implements OnInit {

    constructor(
        private _app: AppComponent,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        
    }

}
