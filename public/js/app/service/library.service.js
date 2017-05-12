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
require("rxjs/add/operator/toPromise");
var app_http_1 = require("../../data/app-http");
var user_service_1 = require("../../service/user.service");
var LibraryService = (function () {
    function LibraryService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.packageUrl = '/api/package/';
        this.materialsUrl = '/api/material/';
        this.ownedMaterialsUrl = '/api/user/:_id/materials';
        this.userUrl = '/api/user/';
        this.teamUrl = '/api/team/';
    }
    /**
     * Get the materials that you own
     */
    LibraryService.prototype.getOwnedMaterials = function () {
        return this.http.get(this.userUrl + this.userService.getLoggedInUser()._id + '/materials')
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    /**
     * Get the materials that a team owns (will die )
     */
    LibraryService.prototype.getTeamMaterials = function (teamId) {
        return this.http.get(this.teamUrl + teamId + '/materials')
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    LibraryService.prototype.downloadMaterial = function (id) {
        this.http.get(this.materialsUrl + id)
            .toPromise()
            .then(function (response) {
            var url = response.json().url;
            window.open(location.origin + url);
        });
    };
    LibraryService.prototype.downloadPackage = function (id) {
        this.http.get(this.packageUrl + id)
            .toPromise()
            .then(function (response) {
            var url = response.json().url;
            window.open(location.origin + url);
        });
    };
    /**
     * Util method to sort a material item's versions
     * @param m the material item to find the latest version for
     */
    LibraryService.prototype.getLatestVersionForMaterialItem = function (m) {
        m.versions.sort(function (a, b) {
            return b.ver - a.ver;
        });
        return m.versions[0];
    };
    // this is for admin - perhaps admin items should live in their own service?
    LibraryService.prototype.getAllMaterials = function () {
        return this.http.get(this.materialsUrl + 'all')
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    LibraryService.prototype.saveMaterial = function (material) {
        if (!this.userService.isSuperAdmin()) {
            return;
        }
        return this.http.put(this.materialsUrl + material._id, material)
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    LibraryService.prototype.postNewVersion = function (materialItemId, version, file) {
        if (!this.userService.isSuperAdmin()) {
            return;
        }
        var formData = new FormData();
        formData.append('ver', version.ver + '');
        formData.append('description', version.description);
        formData.append('file', file, file.name);
        return this.http.postFormData(this.materialsUrl + materialItemId + '/version', formData).toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    LibraryService.prototype.deleteVersion = function (materialItemId, version) {
        if (!this.userService.isSuperAdmin()) {
            return;
        }
        return this.http.delete(this.materialsUrl + materialItemId + '/version/' + version._id).toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    LibraryService.prototype.handleError = function (error) {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    };
    return LibraryService;
}());
LibraryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [app_http_1.AppHttp,
        user_service_1.UserService])
], LibraryService);
exports.LibraryService = LibraryService;

//# sourceMappingURL=library.service.js.map
