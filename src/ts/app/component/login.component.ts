import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Tool, ToolbarComponent } from './toolbar.component';
import { UserService } from "../service/user.service";

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "../template/login.component.html"
})

export class LoginComponent implements OnInit {

    email: string;
    password: string;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        
    }

    submitForm(): void {
        console.log(this.email, this.password);

        this.userService.login(this.email, this.password);
    }
}
