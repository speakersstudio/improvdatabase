import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Tool, ToolbarComponent } from './toolbar.component';

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "../template/login.component.html"
})

export class LoginComponent implements OnInit {

    email: string;
    password: string;

    constructor(
    ) { }

    ngOnInit(): void {
        
    }

    submitForm(): boolean {
        console.log(this.email, this.password);

        return false;
    }
}
