"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_service_1 = require("../service/auth-guard.service");
var login_screen_component_1 = require("../component/login-screen.component");
var dashboard_component_1 = require("../component/dashboard.component");
var library_component_1 = require("../component/library.component");
var help_component_1 = require("../component/help.component");
var unauthorized_component_1 = require("../component/unauthorized.component");
var game_database_component_1 = require("../component/game-database.component");
var about_component_1 = require("../component/about.component");
var contact_component_1 = require("../component/contact.component");
var game_details_component_1 = require("../component/game-details.component");
var user_component_1 = require("../component/user.component");
var legal_component_1 = require("../component/legal.component");
var routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_screen_component_1.LoginScreenComponent
    },
    {
        path: 'unauthorized',
        component: unauthorized_component_1.UnauthorizedComponent
    },
    {
        path: '',
        canActivateChild: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: dashboard_component_1.DashboardComponent,
                data: {
                    action: 'dashboard_view'
                }
            },
            {
                path: 'library',
                component: library_component_1.LibraryComponent,
                data: {
                    action: 'library_poo'
                }
            },
            {
                path: 'games',
                component: game_database_component_1.GameDatabaseComponent,
                data: {
                    action: 'games_view'
                }
            },
            {
                path: 'game/:id',
                component: game_details_component_1.GameDetailsComponent,
                data: {
                    action: 'games_view'
                }
            },
            {
                path: 'user',
                component: user_component_1.UserComponent,
                data: {
                    action: 'account_edit'
                }
            }
        ]
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent
    },
    {
        path: 'contact',
        component: contact_component_1.ContactComponent
    },
    {
        path: 'help',
        component: help_component_1.HelpComponent
    },
    {
        path: 'legal',
        component: legal_component_1.LegalComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
;

//# sourceMappingURL=app-routing.module.js.map
