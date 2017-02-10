import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AppComponent    } from './app.component';
import { Tool } from '../view/toolbar.view';

@Component({
    moduleId: module.id,
    selector: "unauthorized",
    templateUrl: "../template/unauthorized.component.html"
})
export class UnauthorizedComponent implements OnInit {

    title: string = '';

    constructor(
        private _app: AppComponent,
        private router: Router
    ) { }

    private _tools: Tool[] = [
    ]

    ngOnInit(): void {
    }

}
