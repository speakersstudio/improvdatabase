"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// https://github.com/marcj/angular2-localstorage
var KEY_PREFIX = 'improvplus';
var WebStorageUtility = (function () {
    function WebStorageUtility() {
    }
    WebStorageUtility.generateStorageKey = function (key) {
        return KEY_PREFIX + "_" + key;
    };
    WebStorageUtility.get = function (storage, key) {
        var storageKey = WebStorageUtility.generateStorageKey(key);
        var value = storage.getItem(storageKey);
        return WebStorageUtility.getGettable(value);
    };
    WebStorageUtility.set = function (storage, key, value) {
        var storageKey = WebStorageUtility.generateStorageKey(key);
        storage.setItem(storageKey, WebStorageUtility.getSettable(value));
    };
    WebStorageUtility.remove = function (storage, key) {
        var storageKey = WebStorageUtility.generateStorageKey(key);
        storage.removeItem(storageKey);
    };
    WebStorageUtility.getSettable = function (value) {
        return typeof value === 'string' ? value : JSON.stringify(value);
    };
    WebStorageUtility.getGettable = function (value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    };
    return WebStorageUtility;
}());
exports.WebStorageUtility = WebStorageUtility;
var WebStorageService = (function () {
    function WebStorageService(storage) {
        this.storage = storage;
    }
    WebStorageService.prototype.get = function (key) {
        return WebStorageUtility.get(this.storage, key);
    };
    WebStorageService.prototype.set = function (key, value) {
        WebStorageUtility.set(this.storage, key, value);
    };
    WebStorageService.prototype.remove = function (key) {
        WebStorageUtility.remove(this.storage, key);
    };
    WebStorageService.prototype.clear = function () {
        this.storage.clear();
    };
    return WebStorageService;
}());
exports.WebStorageService = WebStorageService;
var LocalStorageService = (function (_super) {
    __extends(LocalStorageService, _super);
    function LocalStorageService() {
        return _super.call(this, localStorage) || this;
    }
    return LocalStorageService;
}(WebStorageService));
LocalStorageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], LocalStorageService);
exports.LocalStorageService = LocalStorageService;
var SessionStorageService = (function (_super) {
    __extends(SessionStorageService, _super);
    function SessionStorageService() {
        return _super.call(this, sessionStorage) || this;
    }
    return SessionStorageService;
}(WebStorageService));
SessionStorageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SessionStorageService);
exports.SessionStorageService = SessionStorageService;
function LocalStorage(key) {
    return exports.WebStorage(localStorage, key);
}
exports.LocalStorage = LocalStorage;
function SessionStorage(key) {
    return exports.WebStorage(sessionStorage, key);
}
exports.SessionStorage = SessionStorage;
var cache = {};
exports.WebStorage = function (webStorage, key) {
    return function (target, propertyName) {
        key = key || propertyName;
        var storageKey = WebStorageUtility.generateStorageKey(key);
        var storedValue = WebStorageUtility.get(webStorage, key);
        Object.defineProperty(target, propertyName, {
            get: function () {
                return WebStorageUtility.get(webStorage, key);
            },
            set: function (value) {
                if (!cache[key]) {
                    if (storedValue === null) {
                        WebStorageUtility.set(webStorage, key, value);
                    }
                    cache[key] = true;
                    return;
                }
                WebStorageUtility.set(webStorage, key, value);
            }
        });
    };
};
var WebStorageModule = (function () {
    function WebStorageModule() {
    }
    return WebStorageModule;
}());
WebStorageModule = __decorate([
    core_1.NgModule({
        providers: [LocalStorageService, SessionStorageService]
    })
], WebStorageModule);
exports.WebStorageModule = WebStorageModule;

//# sourceMappingURL=webstorage.util.js.map
