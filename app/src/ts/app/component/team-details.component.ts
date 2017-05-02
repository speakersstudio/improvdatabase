import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AppComponent} from '../../component/app.component';
import { Tool } from '../view/toolbar.view';

import { User } from '../../model/user';
import { Team } from '../../model/team';
import { Address } from '../../model/address';

import { UserService } from '../../service/user.service';
import { TeamService } from '../../service/team.service';

import { TimeUtil } from '../../util/time.util';

import { DialogAnim, ToggleAnim } from '../../util/anim.util';

@Component({
    moduleId: module.id,
    selector: "team-details",
    templateUrl: "../template/team-details.component.html",
    animations: [DialogAnim.dialog]
})
export class TeamDetailsComponent implements OnInit {

    @Input() team: Team;
    user: User;

    private adminActions = [
        'team_edit'
    ]

    address: string;
    remainingSubs: number;
    pendingInvites: number;

    selectedUser: User;

    isPosting: boolean;

    constructor(
        private _app: AppComponent,
        private route: ActivatedRoute,
        private userService: UserService,
        private teamService: TeamService
    ) { }

    private _tools: Tool[] = [
    ]

    _timeUtil = TimeUtil;

    ngOnInit(): void {
        this.user = this.userService.getLoggedInUser();

        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.getTeam(id);
        });
    }

    getTeam(id: string): void {
        this.teamService.getTeam(id)
            .then(team => this.setTeam(team));
    }

    can(action: string): boolean {
        let can = this.userService.can(action);

        if (this.adminActions.indexOf(action)) {
            return can && this.isUserAdmin();
        } else {
            return can;
        }
    }

    isUserAdmin(): boolean {
        return this.userService.isAdminOfTeam(this.team);
    }

    setTeam(team: Team): void {
        this.team = team;

        console.log(this.team);

        this.remainingSubs = team.subscription.subscriptions - team.subscription.children.length;
        this.pendingInvites = team.subscription.invites.length;
    }

    saveEditName(name: string): void {
        this.team.name = name;
        this.teamService.saveTeam(this.team);
    }

    saveEditPhone(phone: string): void {
        this.team.phone = phone;
        this.teamService.saveTeam(this.team);
    }

    saveEditEmail(email: string): void {
        this.team.email = email;
        this.teamService.saveTeam(this.team);
    }

    saveEditUrl(url: string): void {
        this.team.url = url;
        this.teamService.saveTeam(this.team);
    }

    saveEditCompany(company: string): void {
        this.team.company = company;
        this.teamService.saveTeam(this.team);
    }

    saveEditAddress(address: Address): void {
        this.team.address = address.address;
        this.team.city = address.city;
        this.team.state = address.state;
        this.team.zip = address.zip;
        this.team.country = address.country;

        this.teamService.saveTeam(this.team);
    }

    newDescriptionText: string;
    editDescriptionShown: boolean;
    showEditDescription(): void {
        if (this.can('team_edit')) {
            this.newDescriptionText = this.team.description;
            this.editDescriptionShown = true;
        }
    }

    cancelDescription(): void {
        this.editDescriptionShown = false;
    }

    saveDescription(): void {
        this.team.description = this.newDescriptionText;
        this.teamService.saveTeam(this.team);
        this.cancelDescription();
    }

    selectUser(user: User): void {
        if (this.selectedUser !== user) {
            this.selectedUser = user;
        } else {
            this.selectedUser = null;
        }
    }

    showInviteDialog: boolean;
    inviteEmail: string;
    inviteStatus: string;

    invite(): void {
        this._app.backdrop(true);

        this.showInviteDialog = true;
        this.inviteEmail = '';
    }

    cancelInvite(): void {
        this._app.backdrop(false);
        
        this.showInviteDialog = false;
        this.inviteStatus = '';
    }

    submitInvite(): void {
        this.isPosting = true;

        this.teamService.invite(this.team, this.inviteEmail)
            .then(msg => {
                this.isPosting = false;
                this.inviteStatus = 'wait';
                setTimeout(() => {
                    this.inviteStatus = msg;
                    this.getTeam(this.team._id);
                }, 300);
            })
    }

    leave(): void {
        this._app.toast("This button doesn't work yet. I'm afraid you're stuck for now.");
    }

}
