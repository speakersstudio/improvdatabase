import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Package } from '../model/package';
import { MaterialItem } from '../model/material-item';

import { UserService } from './user.service';

@Injectable()
export class LibraryService {
    private packageUrl = '/api/package';
    private materialsUrl = '/api/library';

    private materials: MaterialItem[];
    private packages: Package[];

    constructor(
        private http: Http,
        private userService: UserService
        ) { }

    getLibrary(): Promise<MaterialItem[]> {
        // TODO: add videos?
        return Promise.all([this.getPackages(), this.getMaterials()])
            .then(() => {
                // TODO: sort?
                return this.materials;
            });
    }

    private _packagePromise: Promise<Package[]>;
    getPackages(): Promise<Package[]> {
        if (!this._packagePromise) {
            this._packagePromise = this.http.get(this.packageUrl, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(response => {
                    this.packages = response.json() as Package[];
                    return this.packages;
                })
                .catch(this.handleError);
        } 
        return this._packagePromise;
    }

    getOwnedPackages(): Promise<Package[]> {
        return new Promise<Package[]>((resolve, reject) => {
            this.getPackages().then(packages => {
                let owned: Package[] = [];
                packages.forEach(p => {
                    if (p.Owned) {
                        owned.push(p);
                    }
                    resolve(owned);
                })
            })
        });
    }

    private _materialsPromise: Promise<MaterialItem[]>;
    getMaterials(): Promise<MaterialItem[]> {
        if (!this._materialsPromise) {
            this._materialsPromise = this.http.get(this.materialsUrl, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(response => {
                    this.materials = response.json() as MaterialItem[];
                    return this.materials;
                })
                .catch(this.handleError);
        } 
        return this._materialsPromise;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    }
}