import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from "../model/user";

@Injectable()
export class UserService {

    private loginUrl = '/api/login';
    private token: string;
    private loggedInUser: User;

    constructor(private http: Http) { }

    login(email: string, password: string): Promise<User> {
        console.log('trying to log in');

        return this.http.post(this.loginUrl, {
                username: email,
                password: password
            }).toPromise()
            .then(response => {
                console.log("Login response: ", response);
                this.token = response['token'];
                this.loggedInUser = response['user'];
                return this.loggedInUser;

                // TODO: save token to local storage
            })
            .catch(error => {
                console.log("Login error", error);
            })
    }

}