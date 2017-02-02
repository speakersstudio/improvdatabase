import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AppComponent    } from './app.component';
import { Tool, SearchResult } from '../view/toolbar.view';

@Component({
    moduleId: module.id,
    selector: "dashboard",
    templateUrl: "../template/library.component.html"
})
export class LibraryComponent implements OnInit {

    title: string = '<span class="light">materials</span><strong>library</strong>';

    filter: boolean; // TODO
    searchResults: SearchResult[] = [];

    constructor(
        private _app: AppComponent,
        private router: Router
    ) { }

    private _tools: Tool[] = [
    ]

    ngOnInit(): void {
        
    }

    onToolClicked(tool: Tool): void {
        
    }


}
