import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: ".alpha-sign-up",
    templateUrl: "../template/alpha-sign-up.component.html"
})

export class AlphaSignUpComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit(): void {
        console.log('sign up init!');
    }
}
