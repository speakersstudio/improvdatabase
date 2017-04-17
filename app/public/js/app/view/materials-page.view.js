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
var library_service_1 = require("../../service/library.service");
var team_1 = require("../../model/team");
var MaterialsPageView = (function () {
    function MaterialsPageView(libraryService) {
        this.libraryService = libraryService;
        this.materials = [];
    }
    MaterialsPageView.prototype.ngOnInit = function () {
        if (this.team && this.materials) {
            this.materials = this.team.materials;
        }
    };
    MaterialsPageView.prototype.selectMaterial = function (material) {
        this.libraryService.downloadMaterial(material._id);
    };
    MaterialsPageView.prototype.versionTag = function (m) {
        var v = this.libraryService.getLatestVersionForMaterialItem(m);
        // TODO: show the date this was released
        if (v) {
            return "version " + v.ver;
        }
        else {
            return "no version published";
        }
    };
    return MaterialsPageView;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MaterialsPageView.prototype, "materials", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", team_1.Team)
], MaterialsPageView.prototype, "team", void 0);
MaterialsPageView = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '.materials-page',
        templateUrl: '../template/view/materials-page.view.html'
    }),
    __metadata("design:paramtypes", [library_service_1.LibraryService])
], MaterialsPageView);
exports.MaterialsPageView = MaterialsPageView;

//# sourceMappingURL=materials-page.view.js.map
