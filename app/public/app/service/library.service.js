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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var user_service_1 = require("./user.service");
var LibraryService = (function () {
    function LibraryService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.packageUrl = '/api/package';
        this.materialsUrl = '/api/library';
    }
    LibraryService.prototype.getLibrary = function () {
        var _this = this;
        // TODO: add videos?
        return Promise.all([this.getPackages(), this.getMaterials()])
            .then(function () {
            // TODO: sort?
            return _this.materials;
        });
    };
    LibraryService.prototype.getPackages = function () {
        var _this = this;
        if (!this._packagePromise) {
            this._packagePromise = this.http.get(this.packageUrl, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(function (response) {
                _this.packages = response.json();
                return _this.packages;
            })
                .catch(this.handleError);
        }
        return this._packagePromise;
    };
    LibraryService.prototype.getOwnedPackages = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getPackages().then(function (packages) {
                var owned = [];
                packages.forEach(function (p) {
                    if (p.Owned) {
                        owned.push(p);
                    }
                    resolve(owned);
                });
            });
        });
    };
    LibraryService.prototype.getMaterials = function () {
        var _this = this;
        if (!this._materialsPromise) {
            this._materialsPromise = this.http.get(this.materialsUrl, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(function (response) {
                _this.materials = response.json();
                return _this.materials;
            })
                .catch(this.handleError);
        }
        return this._materialsPromise;
    };
    LibraryService.prototype.handleError = function (error) {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    };
    return LibraryService;
}());
LibraryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        user_service_1.UserService])
], LibraryService);
exports.LibraryService = LibraryService;

//# sourceMappingURL=library.service.js.map
