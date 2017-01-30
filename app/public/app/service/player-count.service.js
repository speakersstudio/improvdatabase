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
var PlayerCountService = (function () {
    function PlayerCountService(http) {
        this.http = http;
        this.playerCountUrl = '/api/playerCount';
        this.playercounts = [];
    }
    PlayerCountService.prototype.getPlayerCounts = function () {
        var _this = this;
        if (this.playercounts.length === 0) {
            return this.http.get(this.playerCountUrl)
                .toPromise()
                .then(function (response) {
                _this.playercounts = response.json();
                return _this.playercounts;
            })
                .catch(this.handleError);
        }
        else {
            return Promise.resolve(this.playercounts);
        }
    };
    PlayerCountService.prototype.handleError = function (error) {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    };
    PlayerCountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayerCountService);
    return PlayerCountService;
}());
exports.PlayerCountService = PlayerCountService;

//# sourceMappingURL=player-count.service.js.map
