import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: ".alpha-sign-up",
    templateUrl: "../template/view/alpha-sign-up.view.html"
})

export class AlphaSignUpView implements OnInit {
    constructor(
    ) { }

    ngOnInit(): void {
        console.log('sign up init!');
    }
}
