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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var app_component_1 = require("../../component/app.component");
var user_service_1 = require("../../service/user.service");
var MAX_ATTEMPTS = 5;
var UserComponent = (function () {
    function UserComponent(userService, router, location, _app, fb) {
        this.userService = userService;
        this.router = router;
        this.location = location;
        this._app = _app;
        this.fb = fb;
        this.title = "Account";
        this._tools = [
            {
                icon: "fa-sign-out",
                name: "logout",
                text: "Log Out",
                active: false
            }
        ];
    }
    UserComponent.prototype.ngOnInit = function () {
        this.errorCount = 0;
        this.weGood = true;
        this.user = this._app.user;
    };
    UserComponent.prototype.ngOnDestroy = function () {
    };
    UserComponent.prototype.logout = function () {
        this._app.logout();
    };
    UserComponent.prototype.submitEditUser = function () {
        var _this = this;
        this.passwordMatchError = false;
        if (this.password === this.passwordConfirm) {
            this.isPosting = true;
            this.userService.updateUser(this.password)
                .then(function () {
                _this.isPosting = false;
                _this.password = "";
                _this.passwordConfirm = "";
            })
                .catch(function () {
                _this.isPosting = false;
            });
        }
        else {
            this.passwordMatchError = true;
        }
    };
    UserComponent.prototype.onToolClicked = function (tool) {
        this._app.showLoader();
        switch (tool.name) {
            case "logout":
                this.logout();
                break;
        }
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
        app_component_1.AppComponent,
        forms_1.FormBuilder])
], UserComponent);
exports.UserComponent = UserComponent;

//# sourceMappingURL=user.component.js.map
