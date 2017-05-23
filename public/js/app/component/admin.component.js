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
var router_1 = require("@angular/router");
var app_component_1 = require("../../component/app.component");
var library_service_1 = require("../service/library.service");
var history_service_1 = require("../service/history.service");
var material_item_1 = require("../../model/material-item");
var user_service_1 = require("../../service/user.service");
var time_util_1 = require("../../util/time.util");
var app_http_1 = require("../../data/app-http");
var util_1 = require("../../util/util");
var anim_util_1 = require("../../util/anim.util");
var AdminComponent = (function () {
    function AdminComponent(_app, router, libraryService, userService, historyService, http) {
        this._app = _app;
        this.router = router;
        this.libraryService = libraryService;
        this.userService = userService;
        this.historyService = historyService;
        this.http = http;
        this.title = '<span class="light">super</span><strong>admin</strong>';
        this.tabs = [
            {
                name: 'Material Items',
                id: 'materials',
                icon: 'file'
            },
            {
                name: 'Packages',
                id: 'packages',
                icon: 'book'
            },
            {
                name: 'History',
                id: 'history',
                icon: 'history'
            }
        ];
        this.selectedTab = 'materials';
        this._tools = [
            {
                icon: "fa-database",
                name: "backup",
                text: "Back Up Database"
            }
        ];
    }
    AdminComponent.prototype.onToolClicked = function (tool) {
        switch (tool.name) {
            case "backup":
                this.doBackup();
                break;
        }
    };
    AdminComponent.prototype.ngOnInit = function () {
        this.showMaterials();
        this.showPackages();
        this.getHistory();
    };
    AdminComponent.prototype.selectTab = function (tab) {
        this.selectedTab = tab.id;
    };
    AdminComponent.prototype.back = function () {
        this.selectedMaterial = null;
        this.selectedPackage = null;
    };
    AdminComponent.prototype.simpleDate = function (date) {
        return time_util_1.TimeUtil.simpleDate(date);
    };
    AdminComponent.prototype.simpleDateTime = function (date) {
        return time_util_1.TimeUtil.simpleDate(date) + ' ' + time_util_1.TimeUtil.simpleTime(date);
    };
    AdminComponent.prototype.showMaterials = function () {
        var _this = this;
        this.libraryService.getAllMaterials()
            .then(function (materials) {
            _this._app.hideLoader();
            _this.materialItems = materials;
        });
    };
    AdminComponent.prototype.showPackages = function () {
        var _this = this;
        this.libraryService.getAllPackages()
            .then(function (packages) {
            _this.packages = packages;
        });
    };
    AdminComponent.prototype.getHistory = function () {
        var _this = this;
        this.historyService.getAllHistory().then(function (histories) {
            _this.rawHistories = histories;
            _this.filterHistory();
        });
    };
    AdminComponent.prototype.getHistoryIcon = function (history) {
        switch (history.action) {
            case 'game_edit':
                return 'fa-rocket';
            case 'material_view':
                return 'fa-file-pdf-o';
            case 'change_password':
                return 'fa-key';
            default:
                return 'fa-history';
        }
    };
    AdminComponent.prototype.filterHistory = function () {
        var _this = this;
        this.histories = this.rawHistories.filter(function (h) {
            if (!_this.historyShowRefresh && h.action == 'refresh') {
                return false;
            }
            else if (!_this.historyShowLogin && (h.action == 'login' || h.action == 'logout')) {
                return false;
            }
            return true;
        });
    };
    AdminComponent.prototype.selectMaterial = function (material) {
        this.newVersion = new material_item_1.MaterialItemVersion();
        this.selectedMaterial = material;
    };
    AdminComponent.prototype.selectPackage = function (p) {
        this.selectedPackage = p;
        this.selectedPackageDescription = p.description.join('\n');
    };
    AdminComponent.prototype.createMaterial = function () {
        var _this = this;
        this.libraryService.createMaterial().then(function (m) {
            _this.materialItems.push(m);
            _this.selectMaterial(m);
        });
    };
    AdminComponent.prototype.createPackage = function () {
        var _this = this;
        this.libraryService.createPackage().then(function (p) {
            _this.packages.push(p);
            _this.selectPackage(p);
        });
    };
    AdminComponent.prototype.saveMaterial = function () {
        var _this = this;
        if (typeof (this.selectedMaterial.tags) == 'string') {
            var tags = this.selectedMaterial.tags;
            var tagArray_1 = [];
            tags.split(',').forEach(function (t) {
                tagArray_1.push(t.trim());
            });
            this.selectedMaterial.tags = tagArray_1;
        }
        this.libraryService.saveMaterial(this.selectedMaterial).then(function () {
            _this._app.toast('It is done.');
        });
    };
    AdminComponent.prototype.savePackage = function () {
        var _this = this;
        var descArray = this.selectedPackageDescription.split('\n');
        this.selectedPackage.description = descArray;
        this.libraryService.savePackage(this.selectedPackage).then(function () {
            _this._app.toast('It is done.');
        });
    };
    AdminComponent.prototype.fileChange = function () {
        var fileInput = this.versionFileInput.nativeElement;
        this.newVersionFile = fileInput.files[0];
    };
    AdminComponent.prototype.saveVersion = function () {
        var _this = this;
        this.libraryService.postNewVersion(this.selectedMaterial._id, this.newVersion, this.newVersionFile).then(function (m) {
            _this.selectedMaterial.versions = m.versions;
            _this.userService.refreshToken();
        });
    };
    AdminComponent.prototype.deleteVersion = function (version) {
        var _this = this;
        this.libraryService.deleteVersion(this.selectedMaterial._id, version).then(function (m) {
            _this.selectedMaterial.versions = m.versions;
        });
    };
    AdminComponent.prototype.doBackup = function () {
        var _this = this;
        this.http.get('/api/backup').toPromise().then(function (response) {
            var data = response.json();
            _this._app.toast(data.timestamp);
        });
    };
    AdminComponent.prototype.deleteMaterial = function () {
        var _this = this;
        this._app.showLoader();
        this.libraryService.deleteMaterial(this.selectedMaterial).then(function () {
            var index = util_1.Util.indexOfId(_this.materialItems, _this.selectedMaterial);
            if (index > -1) {
                _this.materialItems.splice(index, 1);
            }
            _this.selectedMaterial = null;
            _this._app.hideLoader();
        });
    };
    AdminComponent.prototype.deletePackage = function () {
        var _this = this;
        this._app.showLoader();
        this.libraryService.deletePackage(this.selectedPackage).then(function () {
            var index = util_1.Util.indexOfId(_this.packages, _this.selectedPackage);
            if (index > -1) {
                _this.packages.splice(index, 1);
            }
            _this.selectedPackage = null;
            _this._app.hideLoader();
        });
    };
    AdminComponent.prototype.removePackageFromPackage = function (pkg) {
        var _this = this;
        var index = util_1.Util.indexOfId(this.selectedPackage.packages, pkg);
        this.selectedPackage.packages.splice(index, 1);
        this.libraryService.savePackagePackages(this.selectedPackage)
            .then(function () {
            _this._app.toast('Package Packages saved');
        });
    };
    AdminComponent.prototype.removeMaterialFromPackage = function (material) {
        var _this = this;
        var index = util_1.Util.indexOfId(this.selectedPackage.materials, material);
        this.selectedPackage.materials.splice(index, 1);
        this.libraryService.savePackageMaterials(this.selectedPackage)
            .then(function () {
            _this._app.toast('Package Materials saved');
        });
    };
    AdminComponent.prototype.packagePackagesDropped = function (droppedId, ontoId) {
        var _this = this;
        var indexFrom, indexTo;
        indexFrom = util_1.Util.indexOfId(this.selectedPackage.packages, droppedId);
        indexTo = util_1.Util.indexOfId(this.selectedPackage.packages, ontoId);
        var packageToMove = this.selectedPackage.packages[indexFrom];
        this.selectedPackage.packages.splice(indexFrom, 1);
        this.selectedPackage.packages.splice(indexTo, 0, packageToMove);
        this.libraryService.savePackagePackages(this.selectedPackage)
            .then(function () {
            _this._app.toast('Package Packages saved');
        });
    };
    AdminComponent.prototype.packageMaterialsDropped = function (droppedId, ontoId) {
        var _this = this;
        var indexFrom, indexTo;
        indexFrom = util_1.Util.indexOfId(this.selectedPackage.materials, droppedId);
        indexTo = util_1.Util.indexOfId(this.selectedPackage.materials, ontoId);
        var materialToMove = this.selectedPackage.materials[indexFrom];
        this.selectedPackage.materials.splice(indexFrom, 1);
        this.selectedPackage.materials.splice(indexTo, 0, materialToMove);
        this.libraryService.savePackageMaterials(this.selectedPackage)
            .then(function () {
            _this._app.toast('Package Materials saved');
        });
    };
    AdminComponent.prototype.cancelSelectMaterialDialog = function () {
        this.selectMaterialDialogVisible = false;
        this.selectPackageDialogVisible = false;
        this._app.backdrop(false);
    };
    AdminComponent.prototype.showSelectMaterialDialog = function () {
        this.selectMaterialDialogVisible = true;
        this.selectPackageDialogVisible = false;
        this._app.backdrop(true);
    };
    AdminComponent.prototype.showSelectPackageDialog = function () {
        this.selectPackageDialogVisible = true;
        this.selectMaterialDialogVisible = false;
        this._app.backdrop(true);
    };
    AdminComponent.prototype.selectPackageForPackage = function (pkg) {
        var _this = this;
        this.selectedPackage.packages.push(pkg);
        this.libraryService.savePackagePackages(this.selectedPackage)
            .then(function () {
            _this._app.toast('Package Packages saved');
        });
    };
    AdminComponent.prototype.selectMaterialForPackage = function (material) {
        var _this = this;
        this.selectedPackage.materials.push(material);
        this.libraryService.savePackageMaterials(this.selectedPackage)
            .then(function () {
            _this._app.toast('Package Materials saved');
        });
    };
    return AdminComponent;
}());
__decorate([
    core_1.ViewChild('versionFileInput'),
    __metadata("design:type", core_1.ElementRef)
], AdminComponent.prototype, "versionFileInput", void 0);
AdminComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "admin",
        templateUrl: "../template/admin.component.html",
        animations: [anim_util_1.DialogAnim.dialog]
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        library_service_1.LibraryService,
        user_service_1.UserService,
        history_service_1.HistoryService,
        app_http_1.AppHttp])
], AdminComponent);
exports.AdminComponent = AdminComponent;

//# sourceMappingURL=admin.component.js.map
