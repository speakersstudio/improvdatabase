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
var core_1 = require('@angular/core');
require('rxjs/Subject');
var router_1 = require('@angular/router');
var user_service_1 = require('../service/user.service');
var AppComponent = (function () {
    function AppComponent(_renderer, router, userService) {
        this._renderer = _renderer;
        this.router = router;
        this.userService = userService;
        this.loader = document.getElementById("siteLoader");
        this.showMenu = false;
        this.showFullscreen = false;
        /* I won't use this, but here is how to subscribe to router events!
        // when changing route, reset the toolbar
        router.events.subscribe(val => {
            if (val instanceof RoutesRecognized) {
                this.setTitle("");
                this.setTools([]);
            }
        })
        */
    }
    AppComponent.prototype.ngOnInit = function () {
        this.hideLoader();
        this.user = this.userService.getLoggedInUser();
    };
    AppComponent.prototype.showLoader = function () {
        this.loader.style.display = "block";
    };
    AppComponent.prototype.hideLoader = function () {
        this.loader.style.display = "none";
    };
    AppComponent.prototype.toggleNav = function () {
        this.showMenu = !this.showMenu;
    };
    AppComponent.prototype.fullscreen = function () {
        // are we full-screen?
        if (document.fullscreenElement ||
            document.webkitFullscreenElement) {
            // exit full-screen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            this.showFullscreen = false;
        }
        else {
            var i = document.body;
            // go full-screen
            if (i.requestFullscreen) {
                i.requestFullscreen();
            }
            else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            }
            this.showFullscreen = true;
        }
    };
    AppComponent.prototype.onScroll = function (distance) {
        console.log(distance);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: '../template/app.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, router_1.Router, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
