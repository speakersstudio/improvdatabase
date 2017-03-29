import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/toPromise';

// import { MarketingSiteComponent } from './ms.component';
import { AppComponent } from './app.component';

import { DialogAnim, FadeAnim } from '../util/anim.util';

@Component({
    moduleId: module.id,
    selector: "welcome",
    templateUrl: "../template/ms.welcome.component.html",
    animations: [
        DialogAnim.dialog,
        FadeAnim.fade
    ]
})
export class WelcomeComponent implements OnInit {

    getNotifiedDialogVisible: boolean;

    firstName: string;
    lastName: string;
    email: string;

    error: string;

    sending: boolean;
    sent: boolean;
    
    toolbarheight = 48;
    pageStart = window.innerHeight - (this.toolbarheight + 24);

    constructor(
        private _app: AppComponent,
        private router: Router,
        private http: Http
    ) { }

    ngOnInit(): void {
        this.setupSize();
    }

    setupSize(): void {
    }

    login(): void {
        this._app.login();
    }

    showGetNotified(): void {
        this.getNotifiedDialogVisible = true;
    }
    hideGetNotified(): void {
        this.getNotifiedDialogVisible = false;
        this.sent = false;
        this.sending = false;
    }

    submitGetNotified(): void {
        if (!this.firstName || !this.lastName || !this.email) {
            this.error = "Please enter your name and email to be notified when ImprovPlus is ready."
        } else {
            this.error = "";
            
            this.sending = true;
            this._app.showLoader();
            this.http.post('/getNotified', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email
            })
                .toPromise()
                .then(response => {
                    this._app.hideLoader();
                    this.sending = false;
                    this.sent = true;
                });
        }
    }

}
