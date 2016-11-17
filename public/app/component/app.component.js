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
var DIALOG_STYLE_IN = {
    transform: 'translate(-50%, -50%)',
    opacity: 1
};
var DIALOG_STYLE_OUT = {
    transform: 'translate(-50%, -150%)',
    opacity: 0
};
var DIALOG_ANIM_DURATION = 200;
var AppComponent = (function () {
    function AppComponent(_renderer, router, userService) {
        this._renderer = _renderer;
        this.router = router;
        this.userService = userService;
        this.loader = document.getElementById("siteLoader");
        this.showMenu = false;
        this.showFullscreen = false;
        this.showDialog = false;
        this.dialogTitle = "";
        this.dialogMessage = "";
        this.dialogConfirm = "";
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
    AppComponent.prototype.closeOverlays = function () {
        this.showDialog = false;
        this.showMenu = false;
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
    AppComponent.prototype.dialog = function (title, body, button, onConfirm) {
        this.dialogTitle = title;
        this.dialogMessage = body;
        this.dialogConfirm = button;
        this.dialogOnConfirm = onConfirm;
        this.showDialog = true;
    };
    AppComponent.prototype.onDialogDismiss = function () {
        this.closeOverlays();
    };
    AppComponent.prototype.onDialogConfirm = function () {
        if (this.dialogOnConfirm) {
            if (this.dialogOnConfirm() !== false) {
                this.closeOverlays();
            }
        }
        else {
            this.closeOverlays();
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: '../template/app.component.html',
            animations: [
                core_1.trigger('dialog', [
                    core_1.state('in', core_1.style(DIALOG_STYLE_IN)),
                    core_1.transition('void => *', [
                        core_1.style(DIALOG_STYLE_OUT),
                        core_1.animate(DIALOG_ANIM_DURATION + 'ms ease-out')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate(DIALOG_ANIM_DURATION + 'ms ease-in', core_1.style(DIALOG_STYLE_OUT))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, router_1.Router, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
