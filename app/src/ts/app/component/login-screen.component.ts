import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';

@Component({
    moduleId: module.id,
    selector: "login-screen",
    template: `<div class="page"></div>`
})
export class LoginScreenComponent implements OnInit {

    constructor(
        private _app: AppComponent,
        private router: Router
    ) { }

    ngOnInit(): void {
        this._app.showBackground(true);
        this._app.login();
    }

}
