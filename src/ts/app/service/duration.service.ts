import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Duration } from '../model/duration';

@Injectable()
export class DurationService {
    private durationUrl = '/api/duration'

    private durations: Duration[] = [];

    constructor(private http: Http) { }

    getDurations(): Promise<Duration[]> {
        if (this.durations.length === 0) {
            return this.http.get(this.durationUrl)
                .toPromise()
                .then(response => {
                    this.durations = response.json() as Duration[];
                    return this.durations;
                })
                .catch(this.handleError);
        } else {
            return Promise.resolve(this.durations);
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    }
}