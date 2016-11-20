import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AppComponent    } from './app.component';
import { Tool } from '../view/toolbar.view';

@Component({
    moduleId: module.id,
    selector: ".page.about",
    templateUrl: "../template/about.component.html"
})
export class AboutComponent implements OnInit {
    scrollpos: number = 0;
    showToolbarScrollPosition: number = window.innerHeight * 0.14;

    title: string = "About";

    constructor(
        private _app: AppComponent,
        private router: Router
    ) { }

    private _tools: Tool[] = [
    ]

    ngOnInit(): void {

    }

    onScroll($event): void {
        this.scrollpos = $event.target.scrollTop;
    }
}
