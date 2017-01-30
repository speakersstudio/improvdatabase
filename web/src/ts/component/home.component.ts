import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "../template/home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(
        private _app: AppComponent,
        private router: Router
    ) { }

    ngOnInit(): void {
        
    }

}
