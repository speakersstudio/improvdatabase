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
require("rxjs/Subject");
var router_1 = require("@angular/router");
var MarketingSiteComponent = (function () {
    function MarketingSiteComponent(router) {
        this.router = router;
        this.scrollpos = 0;
        this.toolbarheight = 48;
        this.pageStart = window.innerHeight - (this.toolbarheight + 24);
        this.pagepos = this.pageStart;
        this.loader = document.getElementById("siteLoader");
        this.loaderVisible = true;
    }
    MarketingSiteComponent.prototype.ngOnInit = function () {
        this.hideLoader();
    };
    MarketingSiteComponent.prototype.onScroll = function ($event) {
        this.scrollpos = $event.target.scrollingElement.scrollTop;
        this.pagepos = this.pageStart - this.scrollpos;
    };
    MarketingSiteComponent.prototype.showLoader = function () {
        this.loader.style.display = "block";
        this.loaderVisible = true;
    };
    MarketingSiteComponent.prototype.hideLoader = function () {
        this.loader.style.display = "none";
        this.loaderVisible = false;
    };
    return MarketingSiteComponent;
}());
MarketingSiteComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'improvplus',
        templateUrl: '../template/ms.component.html',
        animations: []
    }),
    __metadata("design:paramtypes", [router_1.Router])
], MarketingSiteComponent);
exports.MarketingSiteComponent = MarketingSiteComponent;

//# sourceMappingURL=ms.component.js.map
