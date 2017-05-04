import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { AppHttp } from '../data/app-http';

import { User } from "../model/user";
import { Team } from '../model/team';
import { Purchase } from '../model/purchase';
import { Invite } from '../model/invite';

import { TeamService } from './team.service';

import { Library } from '../model/library';

class LoginResponse {
    user: User;
    token: string;
    expires: number;
}

@Injectable()
export class UserService {

    private USER_STORAGE_KEY = 'improvplus_user';

    private loginUrl = '/login';
    private passwordRecoveryUrl = '/recoverPassword';
    private passwordRecoveryTokenCheckUrl = '/checkPasswordToken';
    private passwordChangeUrl = '/changePassword';
    private logoutUrl = '/logout';
    private refreshUrl = '/refreshToken';
    private userUrl = '/api/user/';
    private validateUrl = this.userUrl + 'validate';
    private inviteUrl = '/api/invite/';

    loggedInUser: User;

    isLoggingIn: boolean;
    loginPromise: Promise<User>;

    private logginStateSource = new Subject<User>();

    loginState$ = this.logginStateSource.asObservable();

    constructor(
        private http: AppHttp,
        private teamService: TeamService
    ) {
        this.loadUserData();
    }

    private loadUserData(): void {
        let data = localStorage.getItem(this.USER_STORAGE_KEY);
        if (data) {
            this.loggedInUser = JSON.parse(data) as User;
        } else {
            this.loggedInUser = null;
        }
    }

    private saveUserData(newUser: User): void {
        this.loggedInUser = newUser;

        // don't save the password
        this.loggedInUser.password = "";
        
        localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(this.loggedInUser));
    }

    private clearUserData(): void {
        this.loggedInUser = null;
        this._subscriptionPromise = null;
        localStorage.removeItem(this.USER_STORAGE_KEY);
    }

    checkTokenExpiration(): boolean {
        if (!this.http.checkTokenExpiration()) {
            this.clearUserData();
            return false;
        } else {
            return true;
        }
    }

    announceLoginState() {
        this.logginStateSource.next(this.loggedInUser);
    }

    login(email: string, password: string): Promise<User> {
        this.isLoggingIn = true;
        this.loginPromise = this.http.post(this.loginUrl, {
                email: email,
                password: password
            }).toPromise()
            .then(response => this._handleLoginRequest(response));
        
        return this.loginPromise;
    }

    recoverPassword(email: string): Promise<boolean> {
        return this.http.post(this.passwordRecoveryUrl, {
            email: email
        }).toPromise()
        .then(response => {
            if (response.status == 200) {
                return true;
            } else {
                return false;
            }
        })
    }

    checkPasswordRecoveryToken(token: string): Promise<boolean> {
        return this.http.post(this.passwordRecoveryTokenCheckUrl, {
            token: token
        }).toPromise()
        .then(response => {
            let data = response.json();
            if (data['message'] && data['message'] == 'Okay') {
                return true;
            } else {
                return false;
            }
        })
    }

    changePassword(token: string, password: string): Promise<User> {
        return this.http.post(this.passwordChangeUrl, {
            password: password,
            token: token
        }).toPromise()
        .then(response => {
            return response.json() as User;
        })
    }

    refreshToken(): Promise<User> {
        if (this.checkTokenExpiration()) {
            this.isLoggingIn = true;
            this.loginPromise = this.http.post(this.refreshUrl, {})
                .toPromise()
                .then(response => this._handleLoginRequest(response));
            
            return this.loginPromise;
        }
    }

    _handleLoginRequest(response): User {
        if (response) {
            let responseData = response.json() as LoginResponse;

            this.http.setToken(responseData.token, responseData.expires);

            this.saveUserData(responseData.user);

            this.isLoggingIn = false;
            this.announceLoginState();
        } else {
            this.clearUserData();
        }

        return this.loggedInUser;
    }

    logout(): Promise<boolean> {
        return this.http.post(this.logoutUrl, {})
            .toPromise()
            .then(() => {
                this.http.reset();
                this.clearUserData();
                this.announceLoginState();
                return true;
            });
    }

    isLoggedIn(): boolean {
        return this.loggedInUser && true;
    }

    getLoggedInUser(): User {
        if (this.checkTokenExpiration()) {
            return this.loggedInUser;
        } else {
            return null;
        }
    }

    getAdminTeams(): Team[] | string[] {
        return this.getLoggedInUser().adminOfTeams;
    }

    getTeams(): Team[] | string[] {
        return this.getLoggedInUser().memberOfTeams;
    }

    getUserName(): string {
        return this.loggedInUser.firstName + ' ' + this.loggedInUser.lastName;
    }

    /**
     * Change information on the current user
     */
    updateUser(user: User): Promise<User> {
        return this.http.put(this.userUrl + this.loggedInUser._id, user)
            .toPromise()
            .then((response) => {
                let user = response.json() as User;
                this.saveUserData(user);
                return this.loggedInUser;
            });
    }

    setPreference(key: string, val: string): Promise<User> {
        return this.http.post(this.userUrl + this.loggedInUser._id + '/preference', {
            key: key,
            val: val
        }).toPromise()
            .then((response) => {
                let user = response.json() as User;
                this.saveUserData(user);
                return this.loggedInUser;
            });
    }

    getPreference(key: string): string {
        let value: string = '';

        if (this.loggedInUser.preferences) {
            this.loggedInUser.preferences.forEach(pref => {
                if (pref.key == key) {
                    value = pref.value;
                }
            });
        }

        return value;
    }

    can (key: string): boolean {
        if (!this.loggedInUser || !this.loggedInUser.actions || !this.loggedInUser.actions.length || this.isLocked()) {
            return false;
        } else {
            return this.loggedInUser.actions.indexOf(key) > -1;
        }
    }

    isAdminOfTeam(team: Team): boolean {
        return this.isUserAdminOfTeam(this.loggedInUser, team);
    }

    isUserAdminOfTeam(user: User, team: Team): boolean {
        if (!user || !team) {
            return false;
        }

        if (!user.adminOfTeams || !user.adminOfTeams.length) {
            return false;
        } else if ((<Team> user.adminOfTeams[0])._id) {
            return (<Team[]> user.adminOfTeams).findIndex(t => {
                return t._id === team._id;
            }) > -1;
        } else {
            return (<string[]> user.adminOfTeams).indexOf(team._id) > -1;
        }
    }

    isSuperAdmin(): boolean {
        return this.loggedInUser && this.loggedInUser.superAdmin;
    }

    isLocked(): boolean {
        return this.loggedInUser.locked;
    }

    isExpired(): boolean {
        return (new Date(this.loggedInUser.subscription.expiration)).getTime() <= Date.now();
    }

    validate (user: User): Promise<string> {
        return this.http.post(this.validateUrl, user)
            .toPromise()
            .then((response) => {
                let data = response.json();
                if (data.conflict == 'email') {
                    return 'That email address is already registered on ImprovPlus.';
                } else {
                    return '';
                }
            })
    }

    cancelInvite(invite: Invite): Promise<boolean> {
        return this.http.delete(this.inviteUrl + invite._id)
            .toPromise()
            .then(response => {
                return true;
            })
    }

    acceptInvite(inviteId: string, email: string, password: string, name: string): Promise<User> {
        return this.http.post(this.userUrl, {
            email: email,
            password: password,
            invite: inviteId,
            name: name
        }).toPromise()
        .then(response => {
            return response.json() as User;
        });
    }

    leaveTeam(team: Team): Promise<User> {
        return this.http.put(this.userUrl + this.loggedInUser._id + '/leaveTeam/' + team._id, {}).toPromise()
            .then(response => {
                let user = response.json() as User;

                this.saveUserData(user);
                this.announceLoginState();

                return this.loggedInUser;
            })
    }

    /**
     * The following functions get various expanded properties on the user object. They don't change the logged in user data
     */
    fetchPurchases(): Promise<Purchase[]> {
        return this.http.get(this.userUrl + this.loggedInUser._id + '/purchases')
            .toPromise()
            .then(response => {
                return response.json() as Purchase[];
            });
    }

    private _subscriptionPromise: Promise<User>;
    fetchSubscription(): Promise<User> {
        if (!this._subscriptionPromise) {
            this._subscriptionPromise = this.http.get(this.userUrl + this.loggedInUser._id + '/subscription')
                .toPromise()
                .then(response => {
                    return response.json() as User;
                });
        }
        return this._subscriptionPromise;
    }

    private _teamPromise: Promise<User>;
    fetchTeams(): Promise<User> {
        if (!this._teamPromise) {
            this._teamPromise = this.http.get(this.userUrl + this.loggedInUser._id + '/teams')
                .toPromise()
                .then(response => {
                    let user = response.json() as User;
                        
                    this.teamService.addTeams(<Team[]> user.adminOfTeams);
                    this.teamService.addTeams(<Team[]> user.memberOfTeams);

                    return user;
                });
        }
        return this._teamPromise;
    }

}