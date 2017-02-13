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
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var library_service_1 = require("../service/library.service");
var LibraryComponent = (function () {
    function LibraryComponent(_app, router, libraryService) {
        this._app = _app;
        this.router = router;
        this.libraryService = libraryService;
        this.title = '<span class="light">materials</span><strong>library</strong>';
        this.searchResults = [];
        this._tools = [];
    }
    LibraryComponent.prototype.ngOnInit = function () {
        this._app.showLoader();
        this.getLibrary();
    };
    LibraryComponent.prototype.onToolClicked = function (tool) {
    };
    LibraryComponent.prototype.getLibrary = function () {
        var _this = this;
        Promise.all([
            this.libraryService.getMaterials(),
            this.libraryService.getOwnedPackages()
        ]).then(function (items) {
            setTimeout(function () {
                _this._app.hideLoader();
                _this.materials = items[0];
                _this.packages = items[1];
            }, 150);
        });
    };
    LibraryComponent.prototype.getMaterials = function (packageId) {
        return this.materials.filter(function (material) { return material.PackageID === packageId && !material.Addon; });
    };
    LibraryComponent.prototype.getAddons = function () {
        return this.materials.filter(function (material) { return material.Addon; });
    };
    return LibraryComponent;
}());
LibraryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "library",
        templateUrl: "../template/library.component.html"
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        library_service_1.LibraryService])
], LibraryComponent);
exports.LibraryComponent = LibraryComponent;

//# sourceMappingURL=library.component.js.map
