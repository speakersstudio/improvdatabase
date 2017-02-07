"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
// main components
var app_component_1 = require("../component/app.component");
var login_screen_component_1 = require("../component/login-screen.component");
var dashboard_component_1 = require("../component/dashboard.component");
var library_component_1 = require("../component/library.component");
var game_database_component_1 = require("../component/game-database.component");
var about_component_1 = require("../component/about.component");
var contact_component_1 = require("../component/contact.component");
var user_component_1 = require("../component/user.component");
var game_details_component_1 = require("../component/game-details.component");
var help_component_1 = require("../component/help.component");
var legal_component_1 = require("../component/legal.component");
// sub-views
var iplus_view_1 = require("../view/iplus.view");
var toolbar_view_1 = require("../view/toolbar.view");
var game_card_view_1 = require("../view/game-card.view");
var login_view_1 = require("../view/login.view");
var create_metadata_view_1 = require("../view/create-metadata.view");
// services
var game_database_service_1 = require("../service/game-database.service");
var user_service_1 = require("../service/user.service");
var app_routing_module_1 = require("./app-routing.module");
var game_filter_pipe_1 = require("../pipe/game-filter.pipe");
// utils
var webstorage_util_1 = require("../util/webstorage.util");
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
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            login_screen_component_1.LoginScreenComponent,
            dashboard_component_1.DashboardComponent,
            library_component_1.LibraryComponent,
            game_database_component_1.GameDatabaseComponent,
            about_component_1.AboutComponent,
            contact_component_1.ContactComponent,
            user_component_1.UserComponent,
            help_component_1.HelpComponent,
            game_details_component_1.GameDetailsComponent,
            legal_component_1.LegalComponent,
            iplus_view_1.IPlusView,
            toolbar_view_1.ToolbarView,
            game_card_view_1.GameCardView,
            login_view_1.LoginView,
            create_metadata_view_1.CreateMetadataView,
            game_filter_pipe_1.GameFilterPipe
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            game_database_service_1.GameDatabaseService,
            user_service_1.UserService,
            common_1.PathLocationStrategy,
            webstorage_util_1.WebStorageService
        ]
    })
], AppModule);
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
