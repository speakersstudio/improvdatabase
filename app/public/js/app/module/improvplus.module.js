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
// main components
// import { AppComponent } from '../component/app.component';
var unauthorized_component_1 = require("../component/unauthorized.component");
var dashboard_component_1 = require("../component/dashboard.component");
var materials_library_component_1 = require("../component/materials-library.component");
var game_database_component_1 = require("../component/game-database.component");
var about_component_1 = require("../component/about.component");
var contact_component_1 = require("../component/contact.component");
var user_component_1 = require("../component/user.component");
var game_details_component_1 = require("../component/game-details.component");
var help_component_1 = require("../component/help.component");
var legal_component_1 = require("../component/legal.component");
// sub-views
var toolbar_view_1 = require("../view/toolbar.view");
var game_card_view_1 = require("../view/game-card.view");
var create_metadata_view_1 = require("../view/create-metadata.view");
var shared_module_1 = require("../../module/shared.module");
var improvplus_routing_module_1 = require("./improvplus-routing.module");
// utils
var ImprovPlusModule = (function () {
    function ImprovPlusModule() {
    }
    return ImprovPlusModule;
}());
ImprovPlusModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            shared_module_1.SharedModule,
            improvplus_routing_module_1.ImprovPlusRoutingModule
        ],
        declarations: [
            // AppComponent,
            unauthorized_component_1.UnauthorizedComponent,
            dashboard_component_1.DashboardComponent,
            materials_library_component_1.MaterialsLibraryComponent,
            game_database_component_1.GameDatabaseComponent,
            about_component_1.AboutComponent,
            contact_component_1.ContactComponent,
            user_component_1.UserComponent,
            help_component_1.HelpComponent,
            game_details_component_1.GameDetailsComponent,
            legal_component_1.LegalComponent,
            toolbar_view_1.ToolbarView,
            game_card_view_1.GameCardView,
            create_metadata_view_1.CreateMetadataView
        ],
        // bootstrap: [ AppComponent ],
        providers: []
    })
], ImprovPlusModule);
exports.ImprovPlusModule = ImprovPlusModule;

//# sourceMappingURL=improvplus.module.js.map
