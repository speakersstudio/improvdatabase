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
require("rxjs/add/operator/toPromise");
var app_http_1 = require("../data/app-http");
var TeamService = (function () {
    function TeamService(http) {
        this.http = http;
        this.teamUrl = '/api/team/';
        this.validateUrl = this.teamUrl + 'validate';
        this.teams = [];
    }
    TeamService.prototype.addTeams = function (teams) {
        var _this = this;
        teams.forEach(function (team) {
            _this.addTeam(team);
        });
    };
    TeamService.prototype.addTeam = function (team) {
        var index = this.teams.findIndex(function (t) {
            return t._id === team._id;
        });
        if (index > -1) {
            this.teams.splice(index, 1);
        }
        this.teams.push(team);
    };
    TeamService.prototype.findTeamById = function (id) {
        var selectedTeam = null;
        this.teams.forEach(function (team) {
            if (team._id == id) {
                selectedTeam = team;
            }
        });
        return selectedTeam;
    };
    TeamService.prototype.getTeam = function (id) {
        var team = this.findTeamById(id);
        if (team) {
            return new Promise(function (res, rej) {
                res(team);
            });
        }
        else {
            return this.http.get(this.teamUrl + id)
                .toPromise()
                .then(function (response) {
                return response.json();
            });
        }
    };
    TeamService.prototype.saveTeam = function (team) {
        var _this = this;
        return this.http.put(this.teamUrl + team._id, team)
            .toPromise()
            .then(function (response) {
            var team = response.json();
            _this.addTeam(team);
            return team;
        });
    };
    TeamService.prototype.validate = function (team) {
        return this.http.post(this.teamUrl + 'validate', team)
            .toPromise()
            .then(function (response) {
            var data = response.json();
            if (data.conflict == 'name') {
                return 'A team with that name is already registered on ImprovPlus';
            }
            else {
                return '';
            }
        });
    };
    TeamService.prototype.invite = function (team, email) {
        var _this = this;
        return this.http.post(this.teamUrl + team._id + '/invite', { email: email })
            .toPromise()
            .then(function (response) {
            var invite = response.json();
            var teamToUpdate = _this.findTeamById(team._id);
            if (teamToUpdate) {
                teamToUpdate.subscription.invites.push(invite);
            }
            return invite;
        });
    };
    TeamService.prototype.removeUserFromTeam = function (team, user) {
        var _this = this;
        return this.http.put(this.teamUrl + team._id + '/removeUser/' + user._id, {})
            .toPromise()
            .then(function (response) {
            var team = response.json();
            _this.addTeam(team);
            return team;
        });
    };
    TeamService.prototype.promoteUser = function (team, user) {
        var _this = this;
        return this.http.put(this.teamUrl + team._id + '/promote/' + user._id, {})
            .toPromise()
            .then(function (response) {
            var team = response.json();
            _this.addTeam(team);
            return team;
        });
    };
    TeamService.prototype.demoteUser = function (team, user) {
        var _this = this;
        return this.http.put(this.teamUrl + team._id + '/demote/' + user._id, {})
            .toPromise()
            .then(function (response) {
            var team = response.json();
            _this.addTeam(team);
            return team;
        });
    };
    TeamService.prototype.fetchPurchases = function (team) {
        return this.http.get(this.teamUrl + team._id + '/purchases')
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    return TeamService;
}());
TeamService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [app_http_1.AppHttp])
], TeamService);
exports.TeamService = TeamService;

//# sourceMappingURL=team.service.js.map
