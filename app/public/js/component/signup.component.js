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
var app_component_1 = require("./app.component");
var user_service_1 = require("../service/user.service");
var config_1 = require("../config");
var user_1 = require("../model/user");
var SignupComponent = (function () {
    function SignupComponent(_app, router, userService) {
        this._app = _app;
        this.router = router;
        this.userService = userService;
        this.isPostion = false;
        this.step = 1;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.user = new user_1.User();
        this.user.improvExp = 1;
        this.user.facilitationExp = 1;
    };
    SignupComponent.prototype.saveUser = function (user) {
        var _this = this;
        this.user = user;
        this.step = 3;
        setTimeout(function () {
            _this.stripe = Stripe(config_1.Config.STRIPE_KEY);
            var elements = _this.stripe.elements();
            _this.card = elements.create('card', {
                style: {
                    base: {
                        color: '#32325d',
                        lineHeight: '24px',
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSmoothing: 'antialiased',
                        fontSize: '16px',
                        '::placeholder': {
                            color: 'rgba(96,96,96,0.5)'
                        }
                    },
                    invalid: {
                        color: '#fa755a',
                        iconColor: '#fa755a'
                    }
                }
            });
            _this.card.mount('#card-element');
            _this.card.addEventListener('change', function (e) {
                if (e.error) {
                    _this.cardError = e.error.message;
                }
                else {
                    _this.cardError = '';
                }
            });
        }, 100);
    };
    SignupComponent.prototype.back = function () {
        this.step = 1;
    };
    SignupComponent.prototype.submitPayment = function () {
        var _this = this;
        this.stripe.createToken(this.card).then(function (result) {
            if (result.error) {
                _this.cardError = result.error.message;
            }
            else {
                var token = result.token;
                console.log('token!', _this.user, token);
            }
        });
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "signup",
        templateUrl: '../template/signup.component.html'
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        user_service_1.UserService])
], SignupComponent);
exports.SignupComponent = SignupComponent;

//# sourceMappingURL=signup.component.js.map
