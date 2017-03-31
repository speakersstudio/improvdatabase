import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { AppHttp } from '../data/app-http';

import { Package } from '../model/package';
import { MaterialItem, MaterialItemVersion } from '../model/material-item';
import { Subscription } from '../model/subscription';

import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable()
export class LibraryService {
    private packageUrl = '/api/package';
    private materialsUrl = '/api/material/';
    private ownedMaterialsUrl = '/api/user/:_id/materials';

    private subscriptions: Subscription[];
    private materials: MaterialItem[];
    private packages: Package[];

    constructor(
        private http: AppHttp,
        private userService: UserService
        ) { }

    private _packagePromise: Promise<Package[]>;
    getPackages(): Promise<Package[]> {
        if (!this._packagePromise) {
            this._packagePromise = this.http.get(this.packageUrl)
                .toPromise()
                .then(response => {
                    this.packages = response.json() as Package[];
                    return this.packages;
                })
                .catch(this.handleError);
        }
        return this._packagePromise;
    }

    private _materialPromise: Promise<MaterialItem[]>;
    getOwnedMaterials(): Promise<MaterialItem[]> {
        let user = this.userService.getLoggedInUser();
        if (user) {
            if (user.materials && user.materials.length) {
                this._materialPromise = new Promise<MaterialItem[]>((res, rej) => {
                    res(user.materials);
                });
            } else {
                this._materialPromise = this._getOwnedMaterials();
            }
        } else {
            this._materialPromise = new Promise<MaterialItem[]>((res, rej) => {
                rej("No user");
            });
        }

        return this._materialPromise;
    }

    private _getOwnedMaterials(): Promise<MaterialItem[]> {
        let url = this.ownedMaterialsUrl.replace(':_id', this.userService.getLoggedInUser()._id);
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response.json() as MaterialItem[];
            })
            .catch(this.handleError);
    }

    downloadMaterial(id: string): void {
        this.http.get(this.materialsUrl + id)
            .toPromise()
            .then(response => {
                let url = response.json().url;
                window.open(location.origin + url);
            });
    }

    getLatestVersionForMaterialItem(m: MaterialItem): MaterialItemVersion {
        m.versions.sort((a, b) => {
            return b.ver - a.ver;
        });
        return m.versions[0];
    }

    private handleError(error: any): Promise<any> {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    }
}