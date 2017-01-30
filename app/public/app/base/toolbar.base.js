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
var core_1 = require('@angular/core');
require('rxjs/Subject');
var Tool = (function () {
    function Tool() {
        this.active = false;
    }
    return Tool;
}());
exports.Tool = Tool;
var SearchResult = (function () {
    function SearchResult() {
    }
    return SearchResult;
}());
exports.SearchResult = SearchResult;
var BaseToolbar = (function () {
    function BaseToolbar(_app, router) {
        /* I won't use this, but here is how to subscribe to router events!
        // when changing route, reset the toolbar
        router.events.subscribe(val => {
            if (val instanceof RoutesRecognized) {
                this.setTitle("");
                this.setTools([]);
            }
        })
        */
        this._app = _app;
        this.router = router;
        this.title = "";
        this.tools = [];
        this.showBack = false;
        this.showFilterClear = false;
        this.showSearch = false;
        this.searchResults = [];
        this.toolClicked = new core_1.EventEmitter();
        this.goBack = new core_1.EventEmitter();
        this.search = new core_1.EventEmitter();
        this.searchResultClick = new core_1.EventEmitter();
        this.searchOpen = false;
        // TODO: pre-populate results with history and favorites
    }
    BaseToolbar.prototype.ngOnInit = function () {
    };
    BaseToolbar.prototype.setTitle = function (title) {
        this.title = title;
    };
    BaseToolbar.prototype.setTools = function (tools) {
        this.tools = tools;
    };
    BaseToolbar.prototype.toolClick = function (tool) {
        this.toolClicked.emit(tool);
    };
    BaseToolbar.prototype.toggleNav = function () {
        this._app.toggleNav();
    };
    BaseToolbar.prototype.back = function () {
        this.goBack.emit();
    };
    BaseToolbar.prototype.openSearch = function () {
        this.searchOpen = true;
    };
    BaseToolbar.prototype.closeSearch = function () {
        this.searchOpen = false;
    };
    BaseToolbar.prototype.clearSearch = function () {
        this.searchTerm = "";
        this.closeSearch();
    };
    BaseToolbar.prototype.typeSearch = function (event) {
        var _this = this;
        if (event.keyCode == 13) {
            this.searchResultClick.emit({
                "type": "search",
                "text": this.searchTerm,
                "id": 0
            });
            this.clearSearch();
        }
        else {
            clearTimeout(this._typeDebounce);
            this._typeDebounce = setTimeout(function () {
                _this.search.emit(_this.searchTerm);
            }, 300);
        }
    };
    BaseToolbar.prototype.clickResult = function (result) {
        this.searchResultClick.emit(result);
        this.clearSearch();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaseToolbar.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BaseToolbar.prototype, "tools", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BaseToolbar.prototype, "showBack", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BaseToolbar.prototype, "showFilterClear", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BaseToolbar.prototype, "showSearch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BaseToolbar.prototype, "searchResults", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BaseToolbar.prototype, "toolClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BaseToolbar.prototype, "goBack", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BaseToolbar.prototype, "search", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BaseToolbar.prototype, "searchResultClick", void 0);
    return BaseToolbar;
}());
exports.BaseToolbar = BaseToolbar;

//# sourceMappingURL=toolbar.base.js.map
