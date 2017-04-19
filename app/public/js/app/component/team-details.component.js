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
var team_1 = require("../../model/team");
var user_service_1 = require("../../service/user.service");
var team_service_1 = require("../../service/team.service");
var TeamDetailsComponent = (function () {
    function TeamDetailsComponent(_app, route, userService, teamService) {
        this._app = _app;
        this.route = route;
        this.userService = userService;
        this.teamService = teamService;
        this.adminActions = [
            'team_edit'
        ];
        this._tools = [];
    }
    TeamDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.userService.getLoggedInUser();
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.teamService.getTeam(id)
                .then(function (team) { return _this.setTeam(team); });
        });
    };
    TeamDetailsComponent.prototype.can = function (action) {
        var can = this.userService.can(action);
        if (this.adminActions.indexOf(action)) {
            return can && this.isUserAdmin();
        }
        else {
            return can;
        }
    };
    TeamDetailsComponent.prototype.isUserAdmin = function () {
        return this.userService.isAdminOfTeam(this.team);
    };
    TeamDetailsComponent.prototype.setTeam = function (team) {
        this.team = team;
        this.remainingSubs = team.subscription.subscriptions - team.subscription.children.length;
    };
    TeamDetailsComponent.prototype.saveEditName = function (name) {
        this.team.name = name;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.saveEditPhone = function (phone) {
        this.team.phone = phone;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.saveEditEmail = function (email) {
        this.team.email = email;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.saveEditUrl = function (url) {
        this.team.url = url;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.saveEditCompany = function (company) {
        this.team.company = company;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.saveEditAddress = function (address) {
        this.team.address = address.address;
        this.team.city = address.city;
        this.team.state = address.state;
        this.team.zip = address.zip;
        this.team.country = address.country;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.showEditDescription = function () {
        if (this.can('team_edit')) {
            this.newDescriptionText = this.team.description;
            this.editDescriptionShown = true;
        }
    };
    TeamDetailsComponent.prototype.cancelDescription = function () {
        this.editDescriptionShown = false;
    };
    TeamDetailsComponent.prototype.saveDescription = function () {
        this.team.description = this.newDescriptionText;
        this.teamService.saveTeam(this.team);
        this.cancelDescription();
    };
    TeamDetailsComponent.prototype.selectUser = function (user) {
        if (this.selectedUser !== user) {
            this.selectedUser = user;
        }
        else {
            this.selectedUser = null;
        }
    };
    TeamDetailsComponent.prototype.invite = function () {
        this._app.toast("This button doesn't work yet. Sorry.");
    };
    TeamDetailsComponent.prototype.leave = function () {
        this._app.toast("This button doesn't work yet. I'm afraid you're stuck for now.");
    };
    return TeamDetailsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", team_1.Team)
], TeamDetailsComponent.prototype, "team", void 0);
TeamDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "team-details",
        templateUrl: "../template/team-details.component.html"
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.ActivatedRoute,
        user_service_1.UserService,
        team_service_1.TeamService])
], TeamDetailsComponent);
exports.TeamDetailsComponent = TeamDetailsComponent;

//# sourceMappingURL=team-details.component.js.map
