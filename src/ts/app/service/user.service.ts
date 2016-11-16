import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

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

    constructor(private http: Http) { }

    // TODO: onInit, check the token expiration against Date.now() and clear the session if necessary

    login(email: string, password: string): Promise<User> {
        return this.http.post(this.loginUrl, {
                username: email,
                password: password
            }).toPromise()
            .then(response => {
                let responseData = response.json();

                this.token = responseData['token'];
                this.loggedInUser = responseData['user'];

                return this.loggedInUser;

                // TODO: save token to local storage
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

}