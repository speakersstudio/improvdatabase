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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
// import { MarketingSiteComponent } from './ms.component';
var app_component_1 = require("./app.component");
var anim_util_1 = require("../util/anim.util");
var WelcomeComponent = (function () {
    function WelcomeComponent(_app, router, http) {
        this._app = _app;
        this.router = router;
        this.http = http;
        this.toolbarheight = 48;
        this.pageStart = window.innerHeight - (this.toolbarheight + 24);
    }
    WelcomeComponent.prototype.ngOnInit = function () {
        this.setupSize();
    };
    WelcomeComponent.prototype.setupSize = function () {
    };
    WelcomeComponent.prototype.login = function () {
        this._app.login();
    };
    WelcomeComponent.prototype.showGetNotified = function () {
        this.getNotifiedDialogVisible = true;
    };
    WelcomeComponent.prototype.hideGetNotified = function () {
        this.getNotifiedDialogVisible = false;
        this.sent = false;
        this.sending = false;
    };
    WelcomeComponent.prototype.submitGetNotified = function () {
        var _this = this;
        if (!this.firstName || !this.lastName || !this.email) {
            this.error = "Please enter your name and email to be notified when ImprovPlus is ready.";
        }
        else {
            this.error = "";
            this.sending = true;
            this._app.showLoader();
            this.http.post('/getNotified', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email
            })
                .toPromise()
                .then(function (response) {
                _this._app.hideLoader();
                _this.sending = false;
                _this.sent = true;
            });
        }
    };
    return WelcomeComponent;
}());
WelcomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "welcome",
        templateUrl: "../template/ms.welcome.component.html",
        animations: [
            anim_util_1.DialogAnim.dialog,
            anim_util_1.FadeAnim.fade
        ]
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        http_1.Http])
], WelcomeComponent);
exports.WelcomeComponent = WelcomeComponent;

//# sourceMappingURL=ms.welcome.component.js.map
