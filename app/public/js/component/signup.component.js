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
var library_service_1 = require("../service/library.service");
var cart_service_1 = require("../service/cart.service");
var config_1 = require("../config");
var user_1 = require("../model/user");
var SignupComponent = (function () {
    function SignupComponent(_app, router, userService, libraryService, cartService) {
        this._app = _app;
        this.router = router;
        this.userService = userService;
        this.libraryService = libraryService;
        this.cartService = cartService;
        this.isLoadingPackages = false;
        this.isPosting = false;
        this.step = 1;
    }
    SignupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = new user_1.User();
        this.user.improvExp = 1;
        this.user.facilitationExp = 1;
        this.isLoadingPackages = true;
        this.libraryService.getPackages().then(function (packages) {
            _this.packages = packages;
            _this.isLoadingPackages = false;
        });
        this.step1();
    };
    SignupComponent.prototype.step1 = function () {
        this.step = 1;
        this.cartService.reset();
    };
    SignupComponent.prototype.selectPackage = function (pack) {
        this.selectedPackage = pack;
        this.cartService.addPackage(pack);
        this.showUser();
    };
    SignupComponent.prototype.showUser = function () {
        this.step = 2;
    };
    SignupComponent.prototype.saveUser = function (user) {
        var _this = this;
        this.user = user;
        this.cartService.setUser(this.user);
        this.step = 3;
        var button = document.querySelector('.button.raised'), color = document.defaultView.getComputedStyle(button)['background-color'];
        // setup the stripe credit card input
        setTimeout(function () {
            _this.stripe = Stripe(config_1.Config.STRIPE_KEY);
            var elements = _this.stripe.elements();
            _this.card = elements.create('card', {
                value: { postalCode: _this.user.zip },
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
    SignupComponent.prototype.submitPayment = function () {
        var _this = this;
        this.isPosting = true;
        this.stripe.createToken(this.card).then(function (result) {
            if (result.error) {
                _this.cardError = result.error.message;
            }
            else {
                _this.cartService.charge(result.token)
                    .then(function (user) {
                    return _this.userService.login(_this.user.email, _this.user.password);
                });
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
        user_service_1.UserService,
        library_service_1.LibraryService,
        cart_service_1.CartService])
], SignupComponent);
exports.SignupComponent = SignupComponent;

//# sourceMappingURL=signup.component.js.map
