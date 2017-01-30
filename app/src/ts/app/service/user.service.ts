import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Subject } from 'rxjs/Subject';

import { User } from "../model/user";

import { LocalStorage } from "../util/webstorage.util";

@Injectable()
export class UserService {

    private loginUrl = '/login';
    private logoutUrl = '/logout';
    private userUrl = '/api/user/';

    @LocalStorage() token: string;
    @LocalStorage() tokenExpires: number;
    @LocalStorage() loggedInUser: User;

    private logginStateSource = new Subject<User>();

    loginState$ = this.logginStateSource.asObservable();

    constructor(
        private http: Http
    ) { }

    // TODO: onInit, check the token expiration against Date.now() and clear the session if necessary

    announceLoginState() {
        this.logginStateSource.next(this.loggedInUser);
    }

    login(email: string, password: string): Promise<User> {
        return this.http.post(this.loginUrl, {
                username: email,
                password: password
            }).toPromise()
            .then(response => {
                let responseData = response.json();

                this.token = responseData['token'];
                this.tokenExpires = responseData['expires'];
                this.loggedInUser = responseData['user'];

                this.announceLoginState();

                return this.loggedInUser;
            });
    }

    getAuthorizationHeader (): Object {
        let headers = new Headers();
        headers.append('x-access-token', this.getToken());
        return { headers: headers };
    }

    logout(): Promise<boolean> {
        return this.http.post(this.logoutUrl, {},
            this.getAuthorizationHeader())
            .toPromise()
            .then(() => {
                this.token = null;
                this.loggedInUser = null;

                this.announceLoginState();
                return true;
            });
    }

    isLoggedIn(): boolean {
        return this.token != "";
    }

    private getToken(): string {
        return this.token;
    }

    getLoggedInUser(): User {
        return this.loggedInUser;
    }

    updateUser(): Promise<User> {
        return this.http.put(this.userUrl + this.loggedInUser.UserID, this.loggedInUser, 
            this.getAuthorizationHeader())
            .toPromise()
            .then((response) => {
                this.loggedInUser = response.json() as User;
                return this.loggedInUser;
            });
    }

    getPermissions (): Object {
        let permObject = {};
        let perms = this.loggedInUser && this.loggedInUser.Permissions ? this.loggedInUser.Permissions : [];
        perms.forEach((perm) => {
            /*
            let parts = perm.split('_');
            let cat = parts[0];
            let act = parts[1];
            if (!permObject[cat]) {
                permObject[cat] = {};
            }
            permObject[cat][act] = true;
            */
            permObject[perm] = true;
        });
        return permObject;
    }

    can (key: string): boolean {
        if (!this.loggedInUser || !this.loggedInUser.Permissions.length) {
            return false;
        } else {
            return this.loggedInUser.Permissions.indexOf(key) > -1;
        }
    }

}