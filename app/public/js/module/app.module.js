"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var webstorage_util_1 = require("../util/webstorage.util");
var app_http_1 = require("../data/app-http");
// main components
// import { MarketingSiteComponent } from '../component/ms.component';
var app_component_1 = require("../component/app.component");
var ms_welcome_component_1 = require("../component/ms.welcome.component");
var app_routing_module_1 = require("./app-routing.module");
// the shared module is where all of the views and services live
var shared_module_1 = require("./shared.module");
// the improvplus module is the app
var improvplus_module_1 = require("../app/module/improvplus.module");
var login_screen_component_1 = require("../component/login-screen.component");
var signup_component_1 = require("../component/signup.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            shared_module_1.SharedModule,
            app_routing_module_1.AppRoutingModule,
            improvplus_module_1.ImprovPlusModule
        ],
        declarations: [
            login_screen_component_1.LoginScreenComponent,
            app_component_1.AppComponent,
            ms_welcome_component_1.WelcomeComponent,
            signup_component_1.SignupComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            common_1.PathLocationStrategy,
            webstorage_util_1.WebStorageService,
            app_http_1.AppHttp
        ]
    })
], AppModule);
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
