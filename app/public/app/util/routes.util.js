"use strict";
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
exports.RouteArray = [
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
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: 'library',
                component: library_component_1.LibraryComponent
            },
            {
                path: 'games',
                component: game_database_component_1.GameDatabaseComponent,
                data: {
                    action: "games_view"
                }
            },
            {
                path: 'game/:id',
                component: game_details_component_1.GameDetailsComponent,
                data: {
                    action: "games_view"
                }
            },
            {
                path: 'user',
                component: user_component_1.UserComponent
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

//# sourceMappingURL=routes.util.js.map
