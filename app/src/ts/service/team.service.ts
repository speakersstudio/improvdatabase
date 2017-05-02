import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { AppHttp } from '../data/app-http';

import { User } from "../model/user";
import { Team } from '../model/team';

@Injectable()
export class TeamService {

    private teamUrl = '/api/team/';
    private validateUrl = this.teamUrl + 'validate';

    private teams: Team[] = [];

    constructor(
        private http: AppHttp
    ) {
    }

    addTeams(teams: Team[]): void {
        teams.forEach(team => {
            this.addTeam(team);
        });
    }

    addTeam(team: Team): void {
        let index = this.teams.findIndex(t => {
            return t._id === team._id;
        });
        
        if (index > -1) {
            this.teams.splice(index, 1);
        }

        this.teams.push(team);
    }

    findTeamById(id: string): Team {
        let selectedTeam = null;
        this.teams.forEach(team => {
            if (team._id == id) {
                selectedTeam = team;
            }
        })
        return selectedTeam;
    }

    getTeam(id: string): Promise<Team> {
        let team = this.findTeamById(id);
        if (team) {
            return new Promise<Team>((res, rej) => {
                res(team);
            });
        } else {
            return this.http.get(this.teamUrl + id)
                .toPromise()
                .then(response => {
                    return response.json() as Team;
                });
        }
    }

    saveTeam(team: Team): Promise<Team> {
        return this.http.put(this.teamUrl + team._id, team)
            .toPromise()
            .then(response => {
                let team = response.json() as Team;
                this.addTeam(team);
                return team;
            })
    }

    validate(team: Team): Promise<string> {
        return this.http.post(this.teamUrl + 'validate', team)
            .toPromise()
            .then(response => {
                let data = response.json();
                if (data.conflict == 'name') {
                    return 'A team with that name is already registered on ImprovPlus';
                } else {
                    return '';
                }
            });
    }

    invite(team: Team, email: string): Promise<string> {
        return this.http.post(this.teamUrl + team._id + '/invite', {email: email})
            .toPromise()
            .then(response => {
                let data = response.json();
                if (data.subscription) {
                    let teamId = data.subscription.team._id ? data.subscription.team._id : data.subscription.team;
                    this.findTeamById(teamId).subscription = data.subscription;
                }

                return data.msg;
            })
    }

}