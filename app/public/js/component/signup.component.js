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
var team_service_1 = require("../service/team.service");
var library_service_1 = require("../service/library.service");
var cart_service_1 = require("../service/cart.service");
var config_1 = require("../config");
var user_1 = require("../model/user");
var team_1 = require("../model/team");
var anim_util_1 = require("../util/anim.util");
var bracket_card_directive_1 = require("../view/bracket-card.directive");
var SignupComponent = (function () {
    function SignupComponent(_app, router, userService, libraryService, cartService, teamService) {
        this._app = _app;
        this.router = router;
        this.userService = userService;
        this.libraryService = libraryService;
        this.cartService = cartService;
        this.teamService = teamService;
        this.isLoadingPackages = false;
        this.isPosting = false;
        this.cardComplete = false;
    }
    SignupComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.userService.isLoggedIn()) {
            this.router.navigate(['/app/dashboard'], { replaceUrl: true });
        }
        this._app.showBackground(true);
        this.isLoadingPackages = true;
        this.libraryService.getPackages().then(function (packages) {
            _this.isLoadingPackages = false;
        });
        this.stripe = Stripe(config_1.Config.STRIPE_KEY);
        var elements = this.stripe.elements();
        this.creditCard = elements.create('card', {
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
        this.creditCard.addEventListener('change', function (e) {
            _this.cardComplete = e.complete;
            if (e.error) {
                _this.cardError = e.error.message;
            }
            else {
                _this.cardError = '';
            }
        });
    };
    SignupComponent.prototype.emailInput = function () {
        var _this = this;
        clearTimeout(this.emailTimer);
        this.emailError = '';
        this.emailTimer = setTimeout(function () {
            _this.validateEmail();
        }, 500);
    };
    SignupComponent.prototype.validateEmail = function () {
        var _this = this;
        var user = new user_1.User();
        if (this.email.indexOf('@') > -1 && this.email.indexOf('.') > -1) {
            user.email = this.email;
            this.userService.validate(user).then(function (message) {
                _this.emailError = message;
            });
        }
        else {
            this.emailError = 'This does not seem to be a valid email address.';
        }
    };
    SignupComponent.prototype.teamInput = function () {
        var _this = this;
        clearTimeout(this.teamTimer);
        this.teamError = '';
        this.teamTimer = setTimeout(function () {
            _this.validateTeam();
        }, 500);
    };
    SignupComponent.prototype.validateTeam = function () {
        var _this = this;
        var team = new team_1.Team();
        team.name = this.teamName;
        this.teamService.validate(team).then(function (message) {
            _this.teamError = message;
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
        var delay = 400;
        if (cardToOpen.isOpen) {
            delay = 200;
        }
        cardToOpen.open(delay);
        cardToClose.close(delay);
        setTimeout(function () {
            _this[option] = value;
        }, delay * 2);
    };
    SignupComponent.prototype.reset = function () {
        var _this = this;
        this._app.scrollTo(0);
        setTimeout(function () {
            _this.userType = '';
            _this.teamOption = '';
            _this.email = '';
            _this.password = '';
            _this.userName = '';
            _this.teamName = '';
            _this.selectedPackage = null;
            _this.facilitatorCard.open(500);
            _this.improviserCard.open(500);
        }, 600);
    };
    SignupComponent.prototype.selectFacilitator = function () {
        this.selectCard('userType', 'facilitator', this.facilitatorCard, this.improviserCard);
    };
    SignupComponent.prototype.selectImproviser = function () {
        this.selectCard('userType', 'improviser', this.improviserCard, this.facilitatorCard);
    };
    SignupComponent.prototype.selectYourself = function () {
        this.selectCard('teamOption', 'individual', this.yourselfCard, this.yourTeamCard);
    };
    SignupComponent.prototype.selectYourTeam = function () {
        this.selectCard('teamOption', 'team', this.yourTeamCard, this.yourselfCard);
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
            if (card.card != cardClicked) {
                card.close(200);
            }
            else {
                card.open(200);
            }
        });
        setTimeout(function () {
            _this.selectedPackage = pack;
            // setup the stripe credit card input
            _this.creditCard.unmount();
            setTimeout(function () {
                _this.creditCard.mount('#card-element');
            }, 400);
        }, 400);
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
        if (this.cardError || !this.cardComplete || this.teamError) {
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
        this.stripe.createToken(this.creditCard).then(function (result) {
            if (result.error) {
                _this.cardError = result.error.message;
            }
            else {
                _this.cartService.setUser(user);
                _this.cartService.signup(result.token, _this.email, _this.password, _this.selectedPackage, _this.userName, _this.teamName)
                    .catch(function (response) {
                    _this._app.hideLoader();
                    _this.isPosting = false;
                    var msg = response.json();
                    if (msg.error && msg.error == 'email already exists') {
                        _this.emailError = "That email address is already registered.";
                        // let card: HTMLElement = this.facilitatorCard.nativeElement;
                        // this._app.scrollTo(card.offsetTop);
                    }
                })
                    .then(function (u) {
                    if (u && u.email) {
                        return _this.userService.login(user.email, user.password);
                    }
                    else {
                        // uh oh?
                        _this._app.hideLoader();
                    }
                });
            }
        });
    };
    return SignupComponent;
}());
__decorate([
    core_1.ViewChild('facilitatorCard', { read: bracket_card_directive_1.BracketCardDirective }),
    __metadata("design:type", bracket_card_directive_1.BracketCardDirective)
], SignupComponent.prototype, "facilitatorCard", void 0);
__decorate([
    core_1.ViewChild('improviserCard', { read: bracket_card_directive_1.BracketCardDirective }),
    __metadata("design:type", bracket_card_directive_1.BracketCardDirective)
], SignupComponent.prototype, "improviserCard", void 0);
__decorate([
    core_1.ViewChild('yourselfCard', { read: bracket_card_directive_1.BracketCardDirective }),
    __metadata("design:type", bracket_card_directive_1.BracketCardDirective)
], SignupComponent.prototype, "yourselfCard", void 0);
__decorate([
    core_1.ViewChild('yourTeamCard', { read: bracket_card_directive_1.BracketCardDirective }),
    __metadata("design:type", bracket_card_directive_1.BracketCardDirective)
], SignupComponent.prototype, "yourTeamCard", void 0);
__decorate([
    core_1.ViewChildren('packageCard', { read: bracket_card_directive_1.BracketCardDirective }),
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
        cart_service_1.CartService,
        team_service_1.TeamService])
], SignupComponent);
exports.SignupComponent = SignupComponent;

//# sourceMappingURL=signup.component.js.map
