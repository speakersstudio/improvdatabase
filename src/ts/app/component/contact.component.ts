import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';

import {AppComponent    } from './app.component';
import { Tool } from '../view/toolbar.view';
import { FormsModule } from '@angular/forms';

//TODO: import models

@Component({
    moduleId: module.id,
    selector: ".page.contact",
    templateUrl: "../template/contact.component.html",
    styles: [`
        .description {
            margin: 0 10%;
        }

        textarea {
            width: 100%;
            font-size: 1.2em;
        }

        #contactSigOutput {
            font-family: 'Alex Brush';
            font-size: 52px;
            transform: rotateZ(-5deg);
            transform-origin: 0%;
            color: #333;
        }

        .pull-right {
            text-align: right;
        }

        .center {
            text-align: center;
            margin: 0;
        }

        .center p {
            margin: 0;
        }

        button {
            margin: 0;
        }
    `]
})
export class ContactComponent implements OnInit {
    scrollpos: number = 0;
    showToolbarScrollPosition: number = window.innerHeight * 0.14;

    title: string = "Contact";

    month: string;
    day: number;
    year: number

    data: {
        name: string;
        email: string;
        wishto: string;
        caused: string;
        seeking: string;
        demand: string;
        message: string;
        jingers: string;
    }

    error: string;
    errorField: string;

    sending: boolean;
    sent: boolean;

    constructor(
        private _app: AppComponent,
        private router: Router,
        private http: Http
    ) { }

    private _tools: Tool[] = [

    ]

    ngOnInit(): void {
        this.data = {
            "name": "",
            "email": "",
            "wishto": "discuss an important matter",
            "caused": "waste valuable seconds of my life",
            "seeking": "your response",
            "demand": "do something about this",
            "message": "",
            "jingers": "robot"
        };

        let d = new Date();
        this.day = d.getDate();
        this.year = d.getFullYear();

        switch(d.getMonth()) {
            case 0:
                this.month = "January";
                break;
            case 1:
                this.month = "February";
                break;
            case 2:
                this.month = "March";
                break;
            case 3:
                this.month = "April";
                break;
            case 4:
                this.month = "May";
                break;
            case 5:
                this.month = "June";
                break;
            case 6:
                this.month = "July";
                break;
            case 7:
                this.month = "August";
                break;
            case 8:
                this.month = "September";
                break;
            case 9:
                this.month = "October";
                break;
            case 10:
                this.month = "November";
                break;
            case 11:
                this.month = "December";
                break;
        }
    }

    onScroll($event): void {
        this.scrollpos = $event.target.scrollTop;
    }

    submit(): void {
        if (this.data.jingers == "robot") {
            this.error = "Sorry, no robots.";
            this.errorField = 'jingers';
        } else if (!this.data.message) {
            this.error = "We appreciate the attention, but you should actually say something."
            this.errorField = 'message';
        } else {
            this.error = "";
            this.errorField = "";

            /*
            Backbone.ajax({
                        url: '/contact',
                        type: 'POST',
                        data: data,
                        success: function () {
                            self.showContactSuccess();
                        },
                        error: function (e) {
                            console.log('error', e);
                            self.$('.about-contact .error').show().text('Sorry, some sort of error happened. Feel free to contact us directly at contact@improvdatabase.com.');
                        }
                    });
                    */
            
            this.sending = true;
            this._app.showLoader();
            this.http.post('/contact', this.data)
                .toPromise()
                .then(response => {
                    this._app.hideLoader();
                    this.sending = false;
                    this.sent = true;
                });
        }
    }
}
