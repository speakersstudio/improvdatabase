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
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/toPromise");
var app_http_1 = require("../data/app-http");
var user_1 = require("../model/user");
var webstorage_util_1 = require("../util/webstorage.util");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.loginUrl = '/login';
        this.logoutUrl = '/logout';
        this.refreshUrl = '/refreshToken';
        this.userUrl = '/api/user/';
        this.validateUrl = this.userUrl + 'validate';
        this.logginStateSource = new Rx_1.Subject();
        this.loginState$ = this.logginStateSource.asObservable();
    }
    UserService.prototype.checkTokenExpiration = function () {
        if (!this.http.checkTokenExpiration()) {
            this.loggedInUser = null;
            return false;
        }
        else {
            return true;
        }
    };
    UserService.prototype.announceLoginState = function () {
        this.logginStateSource.next(this.loggedInUser);
    };
    UserService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(this.loginUrl, {
            email: email,
            password: password
        }).toPromise()
            .then(function (response) { return _this._handleLoginRequest(response); });
    };
    UserService.prototype.refreshToken = function () {
        var _this = this;
        if (this.checkTokenExpiration()) {
            return this.http.post(this.refreshUrl, {})
                .toPromise()
                .then(function (response) { return _this._handleLoginRequest(response); });
        }
    };
    UserService.prototype._handleLoginRequest = function (response) {
        var responseData = response.json();
        this.http.setToken(responseData['token'], responseData['expires']);
        // this.token = responseData['token'];
        // this.tokenExpires = responseData['expires'];
        this.loggedInUser = responseData['user'];
        // don't save the password
        this.loggedInUser.password = "";
        this.announceLoginState();
        return this.loggedInUser;
    };
    // appendAuthorizationHeader(headers: Headers): Headers {
    //     // TODO: somehow make this asynchronous so we can refresh the token if necessary?
    //     if (this.checkTokenExpiration()) {
    //         headers.append('x-access-token', this.getToken());
    //     }
    //     return headers;
    // }
    // getAuthorizationHeader (): Object {
    //     return { headers: this.appendAuthorizationHeader(new Headers()) };
    // }
    UserService.prototype.logout = function () {
        var _this = this;
        return this.http.post(this.logoutUrl, {})
            .toPromise()
            .then(function () {
            _this.http.setToken(null, 0);
            // this.token = null;
            _this.loggedInUser = null;
            _this.announceLoginState();
            return true;
        });
    };
    UserService.prototype.isLoggedIn = function () {
        return this.loggedInUser && true;
    };
    // private getToken(): string {
    //     return this.token;
    // }
    UserService.prototype.getLoggedInUser = function () {
        if (this.checkTokenExpiration()) {
            return this.loggedInUser;
        }
        else {
            return null;
        }
    };
    /**
     * Change information on the current user
     */
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        return this.http.put(this.userUrl + this.loggedInUser._id, user)
            .toPromise()
            .then(function (response) {
            _this.loggedInUser = response.json();
            return _this.loggedInUser;
        });
    };
    UserService.prototype.setPreference = function (key, val) {
        var _this = this;
        return this.http.post(this.userUrl + this.loggedInUser._id + '/preference', {
            key: key,
            val: val
        }).toPromise()
            .then(function (response) {
            _this.loggedInUser = response.json();
            return _this.loggedInUser;
        });
    };
    UserService.prototype.getPreference = function (key) {
        var value = '';
        if (this.loggedInUser.preferences) {
            this.loggedInUser.preferences.forEach(function (pref) {
                if (pref.key == key) {
                    value = pref.value;
                }
            });
        }
        return value;
    };
    UserService.prototype.can = function (key) {
        if (!this.loggedInUser || !this.loggedInUser.actions.length) {
            return false;
        }
        else {
            return this.loggedInUser.actions.indexOf(key) > -1;
        }
    };
    UserService.prototype.isSuperAdmin = function () {
        return this.loggedInUser && this.loggedInUser.superAdmin;
    };
    UserService.prototype.validate = function (user) {
        return this.http.post(this.validateUrl, user)
            .toPromise()
            .then(function (response) {
            var data = response.json();
            if (data.conflict) {
                return data.conflict;
            }
            else {
                return '';
            }
        });
    };
    return UserService;
}());
__decorate([
    webstorage_util_1.LocalStorage(),
    __metadata("design:type", user_1.User)
], UserService.prototype, "loggedInUser", void 0);
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [app_http_1.AppHttp])
], UserService);
exports.UserService = UserService;

//# sourceMappingURL=user.service.js.map
