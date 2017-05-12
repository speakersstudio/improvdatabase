"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
// import { BrowserModule } from '@angular/platform-browser';
var forms_1 = require("@angular/forms");
var iplus_view_1 = require("../view/iplus.view");
var login_view_1 = require("../view/login.view");
var user_form_view_1 = require("../view/user-form.view");
var landing_hero_view_1 = require("../view/landing-hero.view");
// services
var user_service_1 = require("../service/user.service");
var cart_service_1 = require("../service/cart.service");
var app_service_1 = require("../service/app.service");
var form_input_directive_1 = require("../view/form-input.directive");
var bracket_card_directive_1 = require("../view/bracket-card.directive");
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            // BrowserModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            router_1.RouterModule
        ],
        declarations: [
            iplus_view_1.IPlusView,
            login_view_1.LoginView,
            user_form_view_1.UserFormView,
            landing_hero_view_1.LandingHeroView,
            form_input_directive_1.FormInputDirective,
            bracket_card_directive_1.BracketCardDirective
        ],
        exports: [
            iplus_view_1.IPlusView,
            login_view_1.LoginView,
            user_form_view_1.UserFormView,
            landing_hero_view_1.LandingHeroView,
            form_input_directive_1.FormInputDirective,
            bracket_card_directive_1.BracketCardDirective
        ],
        providers: [
            app_service_1.AppService,
            user_service_1.UserService,
            cart_service_1.CartService
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;

//# sourceMappingURL=shared.module.js.map
