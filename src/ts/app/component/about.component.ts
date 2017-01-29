import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AppComponent    } from './app.component';
import { Tool } from '../view/toolbar.view';

@Component({
    moduleId: module.id,
    selector: "history",
    templateUrl: "../template/about.component.html"
})
export class AboutComponent implements OnInit {

    title: string = '<span class="light">about</span><strong>us</strong>';

    constructor(
        private _app: AppComponent,
        private router: Router
    ) { }

    private _tools: Tool[] = [
    ]

    ngOnInit(): void {

    }

}
