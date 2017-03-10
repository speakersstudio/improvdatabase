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
require("rxjs/Subject");
require("rxjs/add/operator/filter");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var user_service_1 = require("../service/user.service");
var auth_guard_service_1 = require("../service/auth-guard.service");
var anim_util_1 = require("../util/anim.util");
var AppComponent = (function () {
    function AppComponent(_renderer, router, userService, authGuard, pathLocationStrategy) {
        this._renderer = _renderer;
        this.router = router;
        this.userService = userService;
        this.authGuard = authGuard;
        this.pathLocationStrategy = pathLocationStrategy;
        this.loader = document.getElementById("siteLoader");
        this.showMenu = false;
        this.showFullscreen = false;
        this.showToolbarScrollPosition = 20;
        this.showDialog = false;
        this.dialogTitle = "";
        this.dialogMessage = "";
        this.dialogConfirm = "";
        this.version = "1.1.0";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.filter(function (event) { return event instanceof router_1.NavigationStart; }).subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                _this.showBackground(false);
                _this.closeOverlays();
            }
        });
        this.setUser(this.userService.getLoggedInUser());
        this.hideLoader();
        this.userSubscription = this.userService.loginState$.subscribe(function (user) {
            if (!_this.user) {
                // we just logged in
                var path_1 = [];
                if (_this.authGuard.redirect) {
                    _this.authGuard.redirect.forEach(function (segment) {
                        path_1.push('/' + segment.path);
                    });
                }
                else {
                    path_1.push('/dashboard');
                }
                _this.router.navigate(path_1);
            }
            if (!user) {
                // we just logged out
                _this.router.navigate(['/login']);
                _this.hideLoader();
            }
            _this.setUser(user);
        });
        if (this.userService.getLoggedInUser()) {
            console.log('Refreshing user');
            // TODO: where is the best place for this?
            this.userService.refreshToken();
        }
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.userSubscription.unsubscribe();
    };
    AppComponent.prototype.onScroll = function ($event) {
        this.scrollpos = $event.target.scrollingElement.scrollTop;
        this.toolbarVisible = this.scrollpos > this.showToolbarScrollPosition;
    };
    AppComponent.prototype.showBackground = function (show) {
        this.backgroundVisible = show;
    };
    AppComponent.prototype.setUser = function (user) {
        this.user = user;
    };
    AppComponent.prototype.showLoader = function () {
        this.loader.style.display = "block";
    };
    AppComponent.prototype.hideLoader = function () {
        this.loader.style.display = "none";
    };
    AppComponent.prototype.toggleNav = function () {
        this.showMenu = !this.showMenu;
        this.showBackdrop = this.showMenu;
    };
    AppComponent.prototype.closeOverlays = function () {
        this.showDialog = false;
        this.showMenu = false;
        this.showLogin = false;
        this.showBackdrop = false;
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
        this.showBackdrop = true;
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
    AppComponent.prototype.login = function () {
        this.closeOverlays();
        this.showLogin = true;
        this.showBackdrop = true;
    };
    AppComponent.prototype.handleLogin = function (user) {
        this.closeOverlays();
    };
    AppComponent.prototype.logout = function () {
        this.showLoader();
        this.userService.logout();
    };
    AppComponent.prototype.setPath = function (path) {
        var pathRoot = path.split('/')[1];
        if (this.pathLocationStrategy.path().indexOf('/' + pathRoot + '/') > -1) {
            this.pathLocationStrategy.replaceState({}, '', path, '');
        }
        else {
            this.pathLocationStrategy.pushState({}, '', path, '');
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: '../template/app.component.html',
        animations: [
            anim_util_1.DialogAnim.dialog
        ]
    }),
    __metadata("design:paramtypes", [core_1.Renderer,
        router_1.Router,
        user_service_1.UserService,
        auth_guard_service_1.AuthGuard,
        common_1.PathLocationStrategy])
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
