import { Injectable } from '@angular/core';
import { 
    Headers,
    Http,
    Request,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Response
} from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LocalStorage } from "../util/webstorage.util";

import { UserService } from '../service/user.service';

@Injectable()
export class AppHttp {

    @LocalStorage()
    private token: string;

    @LocalStorage()
    private tokenExpires: number;

    constructor(
        private http: Http,
        private router: Router
    ) {}

    checkTokenExpiration(): boolean {
        if (!this.token || !this.tokenExpires || this.tokenExpires <= Date.now()) {
            this.token = '';
            this.tokenExpires = null;
            return false;
        } else {
            return true;
        }
    }

    setToken(token: string, expires: number): void {
        this.token = token;
        this.tokenExpires = expires;
    }

    getToken(): string {
        return this.token;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(this.http.request(url, this.getRequestOptionArgs(options)));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(this.http.get(url, this.getRequestOptionArgs(options)));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(this.http.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(this.http.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(this.http.delete(url, this.getRequestOptionArgs(options)));
    }
    
    appendAuthorizationHeader(headers: Headers): Headers {
        // TODO: somehow make this asynchronous so we can refresh the token if necessary?
        if (this.checkTokenExpiration()) {
            headers.append('x-access-token', this.token);
        }
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        this.appendAuthorizationHeader(options.headers);
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status == 401 && err.url.indexOf('/login') == -1) {
                this.router.navigate(['/app/unauthorized']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }

}