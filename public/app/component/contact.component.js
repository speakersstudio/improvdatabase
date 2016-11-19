"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
//TODO: import models
var ContactComponent = (function () {
    function ContactComponent(_app, router, http) {
        this._app = _app;
        this.router = router;
        this.http = http;
        this.scrollpos = 0;
        this.showToolbarScrollPosition = window.innerHeight * 0.14;
        this.title = "Contact";
        this._tools = [];
    }
    ContactComponent.prototype.ngOnInit = function () {
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
        var d = new Date();
        this.day = d.getDate();
        this.year = d.getFullYear();
        switch (d.getMonth()) {
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
    };
    ContactComponent.prototype.onScroll = function ($event) {
        this.scrollpos = $event.target.scrollTop;
    };
    ContactComponent.prototype.submit = function () {
        var _this = this;
        if (this.data.jingers == "robot") {
            this.error = "Sorry, no robots.";
            this.errorField = 'jingers';
        }
        else if (!this.data.message) {
            this.error = "We appreciate the attention, but you should actually say something.";
            this.errorField = 'message';
        }
        else {
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
                .then(function (response) {
                _this._app.hideLoader();
                _this.sending = false;
                _this.sent = true;
            });
        }
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: ".page.contact",
        templateUrl: "../template/contact.component.html",
        styles: ["\n        .description {\n            margin: 0 10%;\n        }\n\n        textarea {\n            width: 100%;\n            font-size: 1.2em;\n        }\n\n        #contactSigOutput {\n            font-family: 'Alex Brush';\n            font-size: 52px;\n            transform: rotateZ(-5deg);\n            transform-origin: 0%;\n            color: #333;\n        }\n\n        .pull-right {\n            text-align: right;\n        }\n\n        .center {\n            text-align: center;\n            margin: 0;\n        }\n\n        .center p {\n            margin: 0;\n        }\n\n        button {\n            margin: 0;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        http_1.Http])
], ContactComponent);
exports.ContactComponent = ContactComponent;

//# sourceMappingURL=contact.component.js.map
