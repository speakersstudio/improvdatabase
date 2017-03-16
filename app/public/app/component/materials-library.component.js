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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var library_service_1 = require("../service/library.service");
var MaterialsLibraryComponent = (function () {
    function MaterialsLibraryComponent(_app, router, route, libraryService, pathLocationStrategy) {
        this._app = _app;
        this.router = router;
        this.route = route;
        this.libraryService = libraryService;
        this.pathLocationStrategy = pathLocationStrategy;
        this.title = '<span class="light">materials</span><strong>library</strong>';
        this.searchResults = [];
        this._tools = [];
    }
    MaterialsLibraryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var slug;
        this.route.params.forEach(function (params) {
            slug = params['packageSlug'];
        });
        this.getLibrary(slug);
        this.pathLocationStrategy.onPopState(function () {
            _this.selectedSubscription = null;
            _this.getLibrary('');
        });
    };
    MaterialsLibraryComponent.prototype.onToolClicked = function (tool) {
    };
    MaterialsLibraryComponent.prototype.getLibrary = function (slug) {
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
        this._app.showLoader();
        if (slug) {
            this.libraryService.getSubscription(slug)
                .then(function (sub) {
                _this.selectSubscription(sub);
            });
        }
        else {
            this._app.showBackground(true);
            this.libraryService.getSubscriptions()
                .then(function (subs) {
                _this.subscriptions = subs;
                _this._app.hideLoader();
            });
        }
    };
    MaterialsLibraryComponent.prototype.selectSubscription = function (sub) {
        this.selectedSubscription = sub;
        this._app.showBackground(false);
        this._app.hideLoader();
        var newPath = '/materials/' + sub.package.slug;
        this._app.setPath(newPath);
        window.scrollTo(0, 0);
    };
    MaterialsLibraryComponent.prototype.clearFilter = function () {
        if (this.selectedSubscription) {
            this.pathLocationStrategy.back();
        }
    };
    MaterialsLibraryComponent.prototype.selectMaterial = function (material) {
        this.libraryService.downloadMaterial(material._id);
    };
    MaterialsLibraryComponent.prototype.versionTag = function (m) {
        var v = this.libraryService.getLatestVersionForMaterialItem(m);
        // TODO: show the date this was released
        return "version " + v.ver;
    };
    return MaterialsLibraryComponent;
}());
MaterialsLibraryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "packages",
        templateUrl: "../template/materials-library.component.html"
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        router_1.ActivatedRoute,
        library_service_1.LibraryService,
        common_1.PathLocationStrategy])
], MaterialsLibraryComponent);
exports.MaterialsLibraryComponent = MaterialsLibraryComponent;

//# sourceMappingURL=materials-library.component.js.map
