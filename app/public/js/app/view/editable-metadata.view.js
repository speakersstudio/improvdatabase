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
var EditableMetadataView = (function () {
    function EditableMetadataView() {
        this.type = 'text';
        this.save = new core_1.EventEmitter();
        this.saveAddress = new core_1.EventEmitter();
    }
    EditableMetadataView.prototype.ngOnInit = function () {
        if (this.address) {
            this.type = 'address';
        }
        if (this.type == 'address') {
            this.setupAddress();
        }
    };
    EditableMetadataView.prototype._focusInput = function () {
        this.inputElement.nativeElement.focus();
    };
    EditableMetadataView.prototype.setupAddress = function () {
        var address = this.address || '', city = this.city || '', state = this.state || '', zip = this.zip || '', country = this.country || '';
        this.text = address;
        if (address && (city || state || zip)) {
            this.text += '<br />';
        }
        this.text += city + ' ' + state;
        if ((city || state) && zip) {
            this.text += ',';
        }
        this.text += ' ' + zip;
        if (this.text && country) {
            this.text += '<br />';
        }
        this.text += country;
        this.text = this.text.trim();
    };
    EditableMetadataView.prototype.showEdit = function () {
        var _this = this;
        if (this.canEdit) {
            this.editModel = this.text;
            this.editShown = true;
            setTimeout(function () {
                _this._focusInput();
            });
        }
    };
    EditableMetadataView.prototype.closeEdit = function () {
        this.editShown = false;
        this.editModel = this.text;
    };
    EditableMetadataView.prototype.pressEnter = function () {
        this.inputElement.nativeElement.blur();
    };
    EditableMetadataView.prototype.saveEdit = function () {
        if (this.type == 'address') {
            this.setupAddress();
            this.saveAddress.emit({
                address: this.address,
                city: this.city,
                state: this.state,
                zip: this.zip,
                country: this.country
            });
        }
        else if (this.editModel && this.editModel != this.text) {
            this.text = this.editModel;
            this.save.emit(this.editModel);
        }
        this.closeEdit();
    };
    return EditableMetadataView;
}());
__decorate([
    core_1.ViewChild('metadataInput'),
    __metadata("design:type", Object)
], EditableMetadataView.prototype, "inputElement", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EditableMetadataView.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EditableMetadataView.prototype, "text", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EditableMetadataView.prototype, "blankText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EditableMetadataView.prototype, "canEdit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EditableMetadataView.prototype, "type", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EditableMetadataView.prototype, "save", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EditableMetadataView.prototype, "saveAddress", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EditableMetadataView.prototype, "address", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EditableMetadataView.prototype, "city", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EditableMetadataView.prototype, "state", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EditableMetadataView.prototype, "zip", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EditableMetadataView.prototype, "country", void 0);
EditableMetadataView = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '.improvplus-editable-metadata',
        templateUrl: '../template/view/editable-metadata.view.html'
    }),
    __metadata("design:paramtypes", [])
], EditableMetadataView);
exports.EditableMetadataView = EditableMetadataView;

//# sourceMappingURL=editable-metadata.view.js.map
