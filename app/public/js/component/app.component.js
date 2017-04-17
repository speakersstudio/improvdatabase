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
require("rxjs/Subject");
require("rxjs/add/operator/filter");
var common_1 = require("@angular/common");
var Subject_1 = require("rxjs/Subject");
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
        this.version = "1.1.0";
        this.scrollpos = 0;
        this.showToolbarScrollPosition = 20;
        this.scrollSource = new Subject_1.Subject();
        this.onScroll$ = this.scrollSource.asObservable();
        // loader = document.getElementById("siteLoader");
        this.loaderVisible = true;
        this.showMenu = false;
        this.showFullscreen = false;
        this.whiteBrackets = false;
        // generic dialogs
        this.showDialog = false;
        this.dialogTitle = "";
        this.dialogMessage = "";
        this.dialogConfirm = "";
        this.toastMessageQueue = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hideLoader();
        this.router.events.filter(function (event) { return event instanceof router_1.NavigationStart; }).subscribe(function (event) {
            _this.showBackground(false);
            _this.showWhiteBrackets(false);
            _this.closeOverlays();
            _this.hideLoader();
            if (event.url.indexOf('/app') > -1) {
                _this.inApp = true;
            }
            else {
                _this.inApp = false;
            }
        });
        this.setUser(this.userService.getLoggedInUser());
        this.userSubscription = this.userService.loginState$.subscribe(function (user) {
            if (!_this.user) {
                // we just logged in
                var path_1 = [];
                if (_this.authGuard.redirect) {
                    path_1.push('app');
                    _this.authGuard.redirect.forEach(function (segment) {
                        path_1.push(segment.path);
                    });
                }
                else {
                    path_1.push('app/dashboard');
                }
                setTimeout(function () {
                    _this.router.navigate(path_1, { replaceUrl: true });
                }, 0);
            }
            if (!user) {
                // we just logged out
                _this.router.navigate(['/']);
                _this.hideLoader();
            }
            _this.setUser(user);
        });
        if (this.userService.getLoggedInUser()) {
            // TODO: where is the best place for this?
            this.userService.refreshToken();
        }
        var siteLoader = document.getElementById("siteLoader");
        siteLoader.style.opacity = "0";
        setTimeout(function () {
            siteLoader.remove();
        }, 500);
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.userSubscription.unsubscribe();
    };
    AppComponent.prototype.onScroll = function ($event) {
        this.scrollpos = $event.target.scrollingElement.scrollTop;
        this.toolbarVisible = this.scrollpos > this.showToolbarScrollPosition;
        this.scrollSource.next(this.scrollpos);
    };
    AppComponent.prototype.showLoader = function () {
        // this.loader.style.display = "block";
        this.loaderVisible = true;
        this.showBackdrop = true;
    };
    AppComponent.prototype.hideLoader = function () {
        // this.loader.style.display = "none";
        this.loaderVisible = false;
        this.showBackdrop = false;
    };
    AppComponent.prototype.showBackground = function (show) {
        this.backgroundVisible = show;
    };
    AppComponent.prototype.showWhiteBrackets = function (show) {
        this.whiteBrackets = show;
    };
    AppComponent.prototype.setUser = function (user) {
        this.user = user;
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
    AppComponent.prototype.backdrop = function (show) {
        this.showBackdrop = show;
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
    AppComponent.prototype.toast = function (message) {
        this.toastMessageQueue.push(message);
        if (!this.toastMessage) {
            this.hideToast();
        }
    };
    AppComponent.prototype.hideToast = function () {
        var _this = this;
        clearTimeout(this._toastTimer);
        if (this.toastMessageQueue.length) {
            this.toastMessage = this.toastMessageQueue.shift();
            this._toastTimer = setTimeout(function () {
                _this.hideToast();
            }, 5000);
        }
        else {
            this.toastMessage = '';
        }
    };
    AppComponent.prototype.login = function () {
        if (this.user) {
            this.router.navigate(['/app']);
        }
        else {
            this.closeOverlays();
            this.showLogin = true;
            this.showBackdrop = true;
        }
    };
    AppComponent.prototype.handleLogin = function (user) {
        this.closeOverlays();
        if (this.inApp || this.router.url == '/login') {
            this.router.navigate(['welcome']);
        }
    };
    AppComponent.prototype.logout = function () {
        this.showLoader();
        this.userService.logout();
    };
    AppComponent.prototype.setPath = function (path) {
        var pathWithoutApp = path.replace('/app', ''), pathRoot = pathWithoutApp.split('/')[1];
        if (this.pathLocationStrategy.path().indexOf('/' + pathRoot + '/') > -1) {
            this.pathLocationStrategy.replaceState({}, '', path, '');
        }
        else {
            this.pathLocationStrategy.pushState({}, '', path, '');
        }
    };
    AppComponent.prototype.scrollTo = function (to, duration) {
        var maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll < to) {
            duration = duration * (maxScroll / to);
            to = maxScroll;
        }
        var from = window.scrollY, difference = to - from, perTick = duration > 0 ? difference / duration * 10 : difference;
        duration = duration || Math.abs(difference);
        var easeInOutQuad = function (time, start, end, duration) {
            var reverse = false, s, e, val;
            if (start > end) {
                reverse = true;
                s = end;
                e = start;
            }
            else {
                s = start;
                e = end;
            }
            time /= duration / 2;
            if (time < 1)
                val = e / 2 * time * time + s;
            time--;
            val = -e / 2 * (time * (time - 2) - 1) + s;
            if (reverse) {
                return end - val;
            }
            else {
                return val;
            }
        };
        var startTime = 0;
        var scrollFunc = function (time) {
            if (startTime === 0) {
                startTime = time;
            }
            if (window.scrollY === to || (time - startTime) >= duration) {
                return;
            }
            window.scroll(0, easeInOutQuad((time - startTime), from, to, duration));
            requestAnimationFrame(scrollFunc);
        };
        requestAnimationFrame(scrollFunc);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'improvplus',
        templateUrl: '../template/app.component.html',
        animations: [
            anim_util_1.DialogAnim.dialog,
            anim_util_1.FadeAnim.fade
        ]
    }),
    __metadata("design:paramtypes", [core_1.Renderer2,
        router_1.Router,
        user_service_1.UserService,
        auth_guard_service_1.AuthGuard,
        common_1.PathLocationStrategy])
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
