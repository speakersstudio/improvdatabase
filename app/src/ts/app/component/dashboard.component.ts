import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../../component/app.component';
import { Tool } from '../view/toolbar.view';

import { UserService } from '../../service/user.service';

import { PreferenceUtil } from '../../util/preference.util';

@Component({
    moduleId: module.id,
    selector: "dashboard",
    templateUrl: "../template/dashboard.component.html"
})
export class DashboardComponent implements OnInit {

    title: string = '<span class="light">dash</span><strong>board</strong>';

    welcomeMessageVisible: boolean;

    constructor(
        private _app: AppComponent,
        private router: Router,
        private userService: UserService
    ) { }

    private _tools: Tool[] = [
    ]

    ngOnInit(): void {
        this._app.showBackground(true);

        this.welcomeMessageVisible = this.userService.getPreference(PreferenceUtil.hide_welcome_message) != 'true';
    }

    hideWelcomeMessage(): void {
        this.userService.setPreference(PreferenceUtil.hide_welcome_message, 'true');
        this.welcomeMessageVisible = false;
    }

}
