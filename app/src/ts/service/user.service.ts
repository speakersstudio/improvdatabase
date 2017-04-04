import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { AppHttp } from '../data/app-http';

import { User } from "../model/user";

import { LocalStorage } from "../util/webstorage.util";

@Injectable()
export class UserService {

    private loginUrl = '/login';
    private logoutUrl = '/logout';
    private refreshUrl = '/refreshToken';
    private userUrl = '/api/user/';
    private validateUrl = this.userUrl + 'validate';

    // @LocalStorage() token: string;
    // @LocalStorage() tokenExpires: number;
    @LocalStorage() loggedInUser: User;

    private logginStateSource = new Subject<User>();

    loginState$ = this.logginStateSource.asObservable();

    constructor(
        private http: AppHttp
    ) {
    }

    checkTokenExpiration(): boolean {
        if (!this.http.checkTokenExpiration()) {
            this.loggedInUser = null;
            return false;
        } else {
            return true;
        }
    }

    announceLoginState() {
        this.logginStateSource.next(this.loggedInUser);
    }

    login(email: string, password: string): Promise<User> {
        return this.http.post(this.loginUrl, {
                email: email,
                password: password
            }).toPromise()
            .then(response => this._handleLoginRequest(response));
    }

    refreshToken(): Promise<User> {
        if (this.checkTokenExpiration()) {
            return this.http.post(this.refreshUrl, {})
                .toPromise()
                .then(response => this._handleLoginRequest(response));
        }
    }

    _handleLoginRequest(response): User {
        let responseData = response.json();

        this.http.setToken(responseData['token'], responseData['expires']);

        // this.token = responseData['token'];
        // this.tokenExpires = responseData['expires'];
        this.loggedInUser = responseData['user'];

        // don't save the password
        this.loggedInUser.password = "";

        this.announceLoginState();

        return this.loggedInUser;
    }

    // appendAuthorizationHeader(headers: Headers): Headers {
    //     // TODO: somehow make this asynchronous so we can refresh the token if necessary?
    //     if (this.checkTokenExpiration()) {
    //         headers.append('x-access-token', this.getToken());
    //     }
    //     return headers;
    // }

    // getAuthorizationHeader (): Object {
    //     return { headers: this.appendAuthorizationHeader(new Headers()) };
    // }

    logout(): Promise<boolean> {
        return this.http.post(this.logoutUrl, {})
            .toPromise()
            .then(() => {
                this.http.setToken(null, 0);
                // this.token = null;
                this.loggedInUser = null;

                this.announceLoginState();
                return true;
            });
    }

    isLoggedIn(): boolean {
        return this.loggedInUser && true;
    }

    // private getToken(): string {
    //     return this.token;
    // }

    getLoggedInUser(): User {
        if (this.checkTokenExpiration()) {
            return this.loggedInUser;
        } else {
            return null;
        }
    }

    /**
     * Change information on the current user
     */
    updateUser(user: User): Promise<User> {
        return this.http.put(this.userUrl + this.loggedInUser._id, user)
            .toPromise()
            .then((response) => {
                this.loggedInUser = response.json() as User;
                return this.loggedInUser;
            });
    }

    setPreference(key: string, val: string): Promise<User> {
        return this.http.post(this.userUrl + this.loggedInUser._id + '/preference', {
            key: key,
            val: val
        }).toPromise()
            .then((response) => {
                this.loggedInUser = response.json() as User;
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
        if (!this.loggedInUser || !this.loggedInUser.actions.length) {
            return false;
        } else {
            return this.loggedInUser.actions.indexOf(key) > -1;
        }
    }

    validate (user: User): Promise<String> {
        return this.http.post(this.validateUrl, user)
            .toPromise()
            .then((response) => {
                let data = response.json();
                if (data.conflict) {
                    return data.conflict;
                } else {
                    return '';
                }
            })
    }

}