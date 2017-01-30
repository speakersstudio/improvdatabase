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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var DurationService = (function () {
    function DurationService(http) {
        this.http = http;
        this.durationUrl = '/api/duration';
        this.durations = [];
    }
    DurationService.prototype.getDurations = function () {
        var _this = this;
        if (this.durations.length === 0) {
            return this.http.get(this.durationUrl)
                .toPromise()
                .then(function (response) {
                _this.durations = response.json();
                return _this.durations;
            })
                .catch(this.handleError);
        }
        else {
            return Promise.resolve(this.durations);
        }
    };
    DurationService.prototype.handleError = function (error) {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    };
    DurationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DurationService);
    return DurationService;
}());
exports.DurationService = DurationService;

//# sourceMappingURL=duration.service.js.map
