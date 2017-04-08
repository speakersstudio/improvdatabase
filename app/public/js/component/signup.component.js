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
var anim_util_1 = require("../util/anim.util");
var SignupComponent = (function () {
    function SignupComponent(_app, router, userService, libraryService, cartService) {
        this._app = _app;
        this.router = router;
        this.userService = userService;
        this.libraryService = libraryService;
        this.cartService = cartService;
        this.isLoadingPackages = false;
        this.isPosting = false;
        this.cardComplete = false;
    }
    SignupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._app.showBackground(true);
        this.isLoadingPackages = true;
        this.libraryService.getPackages().then(function (packages) {
            _this.isLoadingPackages = false;
        });
        this.stripe = Stripe(config_1.Config.STRIPE_KEY);
        var elements = this.stripe.elements();
        this.card = elements.create('card', {
            // value: {postalCode: this.user.zip},
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
        this.card.addEventListener('change', function (e) {
            _this.cardComplete = e.complete;
            if (e.error) {
                _this.cardError = e.error.message;
            }
            else {
                _this.cardError = '';
            }
        });
    };
    SignupComponent.prototype.selectCard = function (option, value, cardToOpen, cardToClose) {
        var _this = this;
        if (this[option] == value) {
            return;
        }
        this[option] = '';
        if (option == 'userType') {
            this.teamOption = '';
        }
        if (option == 'teamOption') {
            this.userName = '';
            this.teamName = '';
            this.showPackages(value == 'team');
        }
        anim_util_1.CardAnim.openCard(cardToOpen, 200);
        anim_util_1.CardAnim.closeCard(cardToClose, 200);
        setTimeout(function () {
            _this[option] = value;
        }, 400);
    };
    SignupComponent.prototype.reset = function () {
        var _this = this;
        this._app.scrollTo(0, 600);
        setTimeout(function () {
            _this.userType = '';
            _this.teamOption = '';
            _this.email = '';
            _this.password = '';
            _this.userName = '';
            _this.teamName = '';
            _this.selectedPackage = null;
            anim_util_1.CardAnim.openCard(_this.facilitatorCard.nativeElement, 200);
            anim_util_1.CardAnim.openCard(_this.improviserCard.nativeElement, 200);
        }, 600);
    };
    SignupComponent.prototype.selectFacilitator = function () {
        this.selectCard('userType', 'facilitator', this.facilitatorCard.nativeElement, this.improviserCard.nativeElement);
    };
    SignupComponent.prototype.selectImproviser = function () {
        this.selectCard('userType', 'improviser', this.improviserCard.nativeElement, this.facilitatorCard.nativeElement);
    };
    SignupComponent.prototype.selectYourself = function () {
        this.selectCard('teamOption', 'individual', this.yourselfCard.nativeElement, this.yourTeamCard.nativeElement);
    };
    SignupComponent.prototype.selectYourTeam = function () {
        this.selectCard('teamOption', 'team', this.yourTeamCard.nativeElement, this.yourselfCard.nativeElement);
    };
    SignupComponent.prototype.showPackages = function (team) {
        var _this = this;
        this.selectedPackage = null;
        this.libraryService.getPackages(this.userType, team).then(function (p) {
            _this.packages = p;
        });
    };
    SignupComponent.prototype.selectPackage = function ($event, pack, cardClicked) {
        var _this = this;
        if (pack == this.selectedPackage) {
            return;
        }
        this.selectedPackage = null;
        this.packageCards.forEach(function (card) {
            if (card.nativeElement != cardClicked) {
                anim_util_1.CardAnim.closeCard(card.nativeElement, 200);
            }
        });
        anim_util_1.CardAnim.openCard(cardClicked, 200);
        setTimeout(function () {
            _this.selectedPackage = pack;
            // setup the stripe credit card input
            _this.card.unmount();
            setTimeout(function () {
                _this.card.mount('#card-element');
            }, 400);
        }, 200);
    };
    SignupComponent.prototype.isFormValid = function () {
        if (!this.email) {
            return false;
        }
        if (!this.password) {
            return false;
        }
        if (!this.teamOption || !this.userType) {
            return false;
        }
        if (this.teamOption == 'team' && !this.teamName) {
            return false;
        }
        if (this.teamOption == 'individual' && !this.userName) {
            return false;
        }
        if (this.cardError || !this.cardComplete) {
            return false;
        }
        return true;
    };
    SignupComponent.prototype.submitPayment = function () {
        var _this = this;
        if (!this.isFormValid()) {
            return;
        }
        var user = new user_1.User();
        if (this.userName && this.userName.length) {
            var nameArray = this.userName.split(' ');
            if (nameArray[0]) {
                user.firstName = nameArray[0];
            }
            if (nameArray[1]) {
                user.lastName = nameArray[1];
            }
        }
        user.email = this.email;
        user.password = this.password;
        this._app.showLoader();
        this.isPosting = true;
        this.stripe.createToken(this.card).then(function (result) {
            if (result.error) {
                _this.cardError = result.error.message;
            }
            else {
                _this.cartService.setUser(user);
                _this.cartService.charge(result.token)
                    .catch(function (response) {
                    _this._app.hideLoader();
                    _this.isPosting = false;
                    var msg = response.json();
                    if (msg.error && msg.error == 'email already exists') {
                        _this.emailError = "That email address is already registered.";
                        var card = _this.facilitatorCard.nativeElement;
                        _this._app.scrollTo(card.offsetTop, 600);
                    }
                })
                    .then(function (u) {
                    _this._app.hideLoader();
                    if (u) {
                        return _this.userService.login(user.email, user.password);
                    }
                });
            }
        });
    };
    return SignupComponent;
}());
__decorate([
    core_1.ViewChild('facilitatorCard'),
    __metadata("design:type", core_1.ElementRef)
], SignupComponent.prototype, "facilitatorCard", void 0);
__decorate([
    core_1.ViewChild('improviserCard'),
    __metadata("design:type", core_1.ElementRef)
], SignupComponent.prototype, "improviserCard", void 0);
__decorate([
    core_1.ViewChild('yourselfCard'),
    __metadata("design:type", core_1.ElementRef)
], SignupComponent.prototype, "yourselfCard", void 0);
__decorate([
    core_1.ViewChild('yourTeamCard'),
    __metadata("design:type", core_1.ElementRef)
], SignupComponent.prototype, "yourTeamCard", void 0);
__decorate([
    core_1.ViewChildren('packageCard'),
    __metadata("design:type", core_1.QueryList)
], SignupComponent.prototype, "packageCards", void 0);
SignupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "signup",
        templateUrl: '../template/signup.component.html',
        animations: [
            anim_util_1.FadeAnim.fadeAbsolute,
            anim_util_1.DialogAnim.dialogSlow
        ]
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        user_service_1.UserService,
        library_service_1.LibraryService,
        cart_service_1.CartService])
], SignupComponent);
exports.SignupComponent = SignupComponent;

//# sourceMappingURL=signup.component.js.map
