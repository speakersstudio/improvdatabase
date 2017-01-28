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
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var user_service_1 = require("../service/user.service");
var MAX_ATTEMPTS = 5;
var UserComponent = (function () {
    function UserComponent(userService, router, location, _app) {
        this.userService = userService;
        this.router = router;
        this.location = location;
        this._app = _app;
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errorCount = 0;
        this.weGood = true;
        this.user = this.userService.getLoggedInUser();
        this.userSubscription = this.userService.loginState$.subscribe(function (user) { return _this.user = user; });
        if (!this.user) {
            // show the login form
            this._app.login();
        }
    };
    UserComponent.prototype.ngOnDestroy = function () {
        this.userSubscription.unsubscribe();
    };
    UserComponent.prototype.goBack = function () {
        this.location.back();
    };
    UserComponent.prototype.logout = function () {
        var _this = this;
        this.userService.logout().then(function () {
            _this.user = null;
            _this.goBack();
        });
    };
    UserComponent.prototype.submitEditUser = function () {
        // TODO: updating the password
        // TODO: validation on the form to make sure the password and confirmation match
        var _this = this;
        this.isPosting = true;
        this.userService.updateUser()
            .then(function () {
            _this.isPosting = false;
        })
            .catch(function () {
            _this.isPosting = false;
        });
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "user",
        templateUrl: "../template/user.component.html"
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.Router,
        common_1.Location,
        app_component_1.AppComponent])
], UserComponent);
exports.UserComponent = UserComponent;

//# sourceMappingURL=user.component.js.map
