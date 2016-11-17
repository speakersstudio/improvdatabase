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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var user_1 = require("../model/user");
var webstorage_util_1 = require("../util/webstorage.util");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.loginUrl = '/login';
        this.logoutUrl = '/logout';
        this.userUrl = '/api/user/';
    }
    // TODO: onInit, check the token expiration against Date.now() and clear the session if necessary
    UserService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(this.loginUrl, {
            username: email,
            password: password
        }).toPromise()
            .then(function (response) {
            var responseData = response.json();
            _this.token = responseData['token'];
            _this.loggedInUser = responseData['user'];
            return _this.loggedInUser;
            // TODO: save token to local storage
        });
    };
    UserService.prototype.getAuthorizationHeader = function () {
        var headers = new http_1.Headers();
        headers.append('x-access-token', this.getToken());
        return { headers: headers };
    };
    UserService.prototype.logout = function () {
        var _this = this;
        return this.http.post(this.logoutUrl, {}, this.getAuthorizationHeader())
            .toPromise()
            .then(function () {
            _this.token = null;
            _this.loggedInUser = null;
            return true;
        });
    };
    UserService.prototype.isLoggedIn = function () {
        return this.token != "";
    };
    UserService.prototype.getToken = function () {
        return this.token;
    };
    UserService.prototype.getLoggedInUser = function () {
        return this.loggedInUser;
    };
    UserService.prototype.updateUser = function () {
        var _this = this;
        return this.http.put(this.userUrl + this.loggedInUser.UserID, this.loggedInUser, this.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            _this.loggedInUser = response.json();
            return _this.loggedInUser;
        });
    };
    UserService.prototype.getPermissions = function () {
        var permObject = {};
        var perms = this.loggedInUser && this.loggedInUser.Permissions ? this.loggedInUser.Permissions : [];
        perms.forEach(function (perm) {
            /*
            let parts = perm.split('_');
            let cat = parts[0];
            let act = parts[1];
            if (!permObject[cat]) {
                permObject[cat] = {};
            }
            permObject[cat][act] = true;
            */
            permObject[perm] = true;
        });
        return permObject;
    };
    __decorate([
        webstorage_util_1.LocalStorage(), 
        __metadata('design:type', String)
    ], UserService.prototype, "token", void 0);
    __decorate([
        webstorage_util_1.LocalStorage(), 
        __metadata('design:type', Number)
    ], UserService.prototype, "tokenExpires", void 0);
    __decorate([
        webstorage_util_1.LocalStorage(), 
        __metadata('design:type', user_1.User)
    ], UserService.prototype, "loggedInUser", void 0);
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;

//# sourceMappingURL=user.service.js.map