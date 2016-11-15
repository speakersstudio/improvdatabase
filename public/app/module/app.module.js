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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
// main components
var app_component_1 = require('../component/app.component');
var game_database_component_1 = require('../component/game-database.component');
var about_component_1 = require('../component/about.component');
var contact_component_1 = require('../component/contact.component');
var login_component_1 = require('../component/login.component');
// sub-views
// TODO: rename these files to .view and put them in a view folder
var toolbar_component_1 = require('../component/toolbar.component');
var game_card_component_1 = require('../component/game-card.component');
var game_details_component_1 = require('../component/game-details.component');
var alpha_sign_up_component_1 = require('../component/alpha-sign-up.component');
var game_database_service_1 = require("../service/game-database.service");
var app_routing_module_1 = require('./app-routing.module');
var game_filter_pipe_1 = require('../pipe/game-filter.pipe');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                game_database_component_1.GameDatabaseComponent,
                about_component_1.AboutComponent,
                contact_component_1.ContactComponent,
                login_component_1.LoginComponent,
                toolbar_component_1.ToolbarComponent,
                game_card_component_1.GameCardComponent,
                game_details_component_1.GameDetailsComponent,
                alpha_sign_up_component_1.AlphaSignUpComponent,
                game_filter_pipe_1.GameFilterPipe
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                game_database_service_1.GameDatabaseService,
                common_1.PathLocationStrategy
            ],
            entryComponents: [
                alpha_sign_up_component_1.AlphaSignUpComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
