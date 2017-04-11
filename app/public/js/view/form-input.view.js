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
var FormInputView = (function () {
    function FormInputView() {
    }
    FormInputView.prototype.ngOnInit = function () {
        this.type = this.name == 'password' ? 'password' : 'text';
        this.blur();
    };
    FormInputView.prototype.focus = function () {
        this.label.nativeElement.className = 'active';
    };
    FormInputView.prototype.blur = function () {
        if (!this.input.nativeElement.value) {
            this.label.nativeElement.className = '';
        }
        else {
            this.focus();
        }
    };
    return FormInputView;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FormInputView.prototype, "text", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FormInputView.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FormInputView.prototype, "required", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FormInputView.prototype, "model", void 0);
__decorate([
    core_1.ViewChild('input'),
    __metadata("design:type", Object)
], FormInputView.prototype, "input", void 0);
__decorate([
    core_1.ViewChild('label'),
    __metadata("design:type", Object)
], FormInputView.prototype, "label", void 0);
FormInputView = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '.form-input-component',
        templateUrl: '../template/view/form-input.view.html'
    }),
    __metadata("design:paramtypes", [])
], FormInputView);
exports.FormInputView = FormInputView;

//# sourceMappingURL=form-input.view.js.map
