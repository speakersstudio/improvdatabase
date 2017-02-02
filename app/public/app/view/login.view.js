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
var user_service_1 = require("../service/user.service");
var anim_util_1 = require("../util/anim.util");
var MAX_ATTEMPTS = 5;
var LoginView = (function () {
    function LoginView(userService) {
        this.userService = userService;
        this.done = new core_1.EventEmitter();
    }
    LoginView.prototype.ngOnInit = function () {
        this.errorCount = 0;
        this.weGood = true;
    };
    LoginView.prototype.submitLogin = function () {
        var _this = this;
        this.loginError = "";
        this.userService.login(this.email, this.password)
            .then(function (user) {
            //this.router.navigate(['/games']);
            _this.done.emit(user);
        })
            .catch(function (reason) {
            _this.errorCount++;
            if (reason.status == 500) {
                _this.loginError = "Some sort of server error happened. Sorry.";
            }
            else {
                if (_this.errorCount < MAX_ATTEMPTS) {
                    _this.loginError = "<a href=\"/images/password-incorrect.png\" target=\"_blank\">Die wanna wanga!</a>";
                }
                else if (_this.errorCount == MAX_ATTEMPTS) {
                    _this.loginError = "I'll let you take one more crack at it.";
                }
                else {
                    _this.loginError = "That's it, I'm out of here.";
                    _this.runaway = true;
                    setTimeout(function () {
                        _this.weGood = false;
                        _this.done.emit(null);
                    }, 7100);
                }
            }
        });
    };
    LoginView.prototype.cancel = function () {
        this.done.emit(null);
        return false;
    };
    return LoginView;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LoginView.prototype, "show", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LoginView.prototype, "done", void 0);
LoginView = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "login",
        templateUrl: "../template/view/login.view.html",
        animations: [
            anim_util_1.DialogAnim.dialog
        ]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], LoginView);
exports.LoginView = LoginView;

//# sourceMappingURL=login.view.js.map
