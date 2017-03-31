import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AppComponent    } from '../../component/app.component';
import { Tool } from '../view/toolbar.view';

import { UserService } from '../../service/user.service';

@Component({
    moduleId: module.id,
    selector: "unauthorized",
    templateUrl: "../template/unauthorized.component.html"
})
export class UnauthorizedComponent implements OnInit {

    title: string = '';

    constructor(
        private _app: AppComponent,
        private router: Router,
        private userService: UserService
    ) { }

    private _tools: Tool[] = [
    ]

    ngOnInit(): void {
    }

    can(permission: string): boolean {
        return this.userService.can(permission);
    }

}
