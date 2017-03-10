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
var PackageListComponent = (function () {
    // packages: Package[];
    // materials: MaterialItem[];
    function PackageListComponent(_app, router, route, libraryService) {
        this._app = _app;
        this.router = router;
        this.route = route;
        this.libraryService = libraryService;
        this.title = '<span class="light">materials</span><strong>library</strong>';
        this.searchResults = [];
        this._tools = [];
    }
    PackageListComponent.prototype.ngOnInit = function () {
        this._app.showLoader();
        this._app.showBackground(true);
        this.getLibrary();
        this.route.params.forEach(function (params) {
            var packageSlug = params['packageSlug'];
            if (packageSlug) {
            }
        });
    };
    PackageListComponent.prototype.onToolClicked = function (tool) {
    };
    PackageListComponent.prototype.getLibrary = function () {
        var _this = this;
        // Promise.all([
        //         this.libraryService.getLibrary()
        //     ]).then((items) => {
        //         setTimeout(() => {
        //             this._app.hideLoader();
        //             this.materials = items[0];
        //             this.packages = items[1];
        //         }, 150);
        //     });
        this.libraryService.getSubscriptions().then(function (subs) {
            _this.subscriptions = subs;
            _this._app.hideLoader();
        });
    };
    return PackageListComponent;
}());
PackageListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "packages",
        templateUrl: "../template/package-list.component.html"
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        router_1.ActivatedRoute,
        library_service_1.LibraryService])
], PackageListComponent);
exports.PackageListComponent = PackageListComponent;

//# sourceMappingURL=package-list.component.js.map
