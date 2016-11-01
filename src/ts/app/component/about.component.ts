import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    AppComponent,
    Tool,
    ToolService } from './app.component';

//TODO: import models

@Component({
    selector: "about",
    template: "<h2>About</h2>"
})

export class AboutComponent implements OnInit {
    constructor(
        private _app: AppComponent,
        private router: Router,
        private toolService: ToolService
    ) { }

    private _tools: Tool[] = [

    ]

    ngOnInit(): void {
        this._app.setTitle("About");
        //this._app.setTools(this._tools);

        this.toolService.tool$.subscribe(tool => {

        })
    }
}
