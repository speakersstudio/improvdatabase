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
// https://github.com/marcj/angular2-localstorage
var WebStorageEmitter = (function () {
    function WebStorageEmitter() {
    }
    WebStorageEmitter.register = function (ngZone) {
        var index = WebStorageEmitter.ngZones.indexOf(ngZone);
        if (index === -1) {
            index = WebStorageEmitter.ngZones.push(ngZone) - 1;
        }
        WebStorageEmitter.subscribed[index] = ngZone.onMicrotaskEmpty.subscribe(function () {
            for (var _i = 0, _a = WebStorageEmitter.subscribers; _i < _a.length; _i++) {
                var callback = _a[_i];
                callback();
            }
        });
    };
    WebStorageEmitter.subscribe = function (callback) {
        WebStorageEmitter.subscribers.push(callback);
    };
    WebStorageEmitter.unregister = function (ngZone) {
        var index = WebStorageEmitter.ngZones.indexOf(ngZone);
        if (index >= 0) {
            WebStorageEmitter.subscribed[index].unsubscribe();
        }
    };
    WebStorageEmitter.subscribed = [];
    WebStorageEmitter.ngZones = [];
    WebStorageEmitter.subscribers = [];
    return WebStorageEmitter;
}());
exports.WebStorageEmitter = WebStorageEmitter;
var WebStorageService = (function () {
    function WebStorageService(ngZone) {
        this.ngZone = ngZone;
        WebStorageEmitter.register(this.ngZone);
    }
    WebStorageService.prototype.ngOnDestroy = function () {
        WebStorageEmitter.unregister(this.ngZone);
    };
    WebStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], WebStorageService);
    return WebStorageService;
}());
exports.WebStorageService = WebStorageService;
function WebStorageSubscriber(appPromise) {
    appPromise.then(function (bla) {
        bla.injector.get(WebStorageService);
    });
}
exports.WebStorageSubscriber = WebStorageSubscriber;
// the @LocalStorage() decorator
function LocalStorage(storageKeyOrOptions) {
    if (storageKeyOrOptions === void 0) { storageKeyOrOptions = {}; }
    if ("string" === typeof storageKeyOrOptions) {
        return WebStorage(localStorage, { storageKey: storageKeyOrOptions });
    }
    else {
        return WebStorage(localStorage, storageKeyOrOptions);
    }
}
exports.LocalStorage = LocalStorage;
// the @SessionStorage() decorator
function SessionStorage(storageKeyOrOptions) {
    if (storageKeyOrOptions === void 0) { storageKeyOrOptions = {}; }
    if ("string" === typeof storageKeyOrOptions) {
        return WebStorage(sessionStorage, { storageKey: storageKeyOrOptions });
    }
    else {
        return WebStorage(sessionStorage, storageKeyOrOptions);
    }
}
exports.SessionStorage = SessionStorage;
function WebStorage(webStorage, options) {
    return function (target, decoratedPropertyName) {
        if (!webStorage) {
            return;
        }
        if (!options.storageKey) {
            options.storageKey = "" + "/" + decoratedPropertyName;
        }
        if (!options.serialize) {
            options.serialize = JSON.stringify;
        }
        if (!options.deserialize) {
            options.deserialize = JSON.parse;
        }
        Object.defineProperty(target, "_" + decoratedPropertyName + "_mapped", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: false
        });
        var instances = [];
        var values = {};
        var storageValue = webStorage.getItem(options.storageKey) || null;
        var storageValueJSON = storageValue;
        if ("string" === typeof storageValue) {
            try {
                storageValue = options.deserialize(storageValue);
            }
            catch (e) {
                storageValue = null;
                storageValueJSON = "null";
            }
        }
        var oldJSONValues = {};
        Object.defineProperty(target, decoratedPropertyName, {
            get: function () {
                if (false === this["_" + decoratedPropertyName + "_mapped"]) {
                    this["_" + decoratedPropertyName + "_mapped"] = instances.length;
                    // first registration triggers a setting to localStorage value
                    values[instances.length] = storageValue;
                    oldJSONValues[instances.length] = storageValueJSON;
                    instances.push(this);
                }
                return values[this["_" + decoratedPropertyName + "_mapped"]];
            },
            set: function (newValue) {
                if (false === this["_" + decoratedPropertyName + "_mapped"]) {
                    this["_" + decoratedPropertyName + "_mapped"] = instances.length;
                    // first registration triggers a setting to localStorage value
                    values[instances.length] = storageValue;
                    oldJSONValues[instances.length] = storageValueJSON;
                    instances.push(this);
                    // first "set" call is ignored if we have already a value from the localStorage
                    if (storageValue) {
                        return;
                    }
                }
                values[this["_" + decoratedPropertyName + "_mapped"]] = newValue;
            },
            enumerable: true,
            configurable: true
        });
        WebStorageEmitter.subscribe(function () {
            for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
                var instance = instances_1[_i];
                var currentValue = options.serialize(instance[decoratedPropertyName]);
                var oldJSONValue = oldJSONValues[instance["_" + decoratedPropertyName + "_mapped"]];
                if (currentValue !== oldJSONValue) {
                    oldJSONValues[instance["_" + decoratedPropertyName + "_mapped"]] = currentValue;
                    webStorage.setItem(options.storageKey, currentValue);
                }
            }
        });
    };
}

//# sourceMappingURL=webstorage.util.js.map
