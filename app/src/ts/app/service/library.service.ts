import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Package } from '../model/package';
import { MaterialItem, MaterialItemVersion } from '../model/material-item';
import { Subscription } from '../model/subscription';

import { UserService } from './user.service';

@Injectable()
export class LibraryService {
    private subscriptionUrl = '/api/subscription';
    private materialsUrl = '/api/material/';

    private subscriptions: Subscription[];
    private materials: MaterialItem[];
    private packages: Package[];

    constructor(
        private http: Http,
        private userService: UserService
        ) { }

    // getLibrary(): Promise<Subscription[]> {
    //     // TODO: add videos?
    //     return Promise.all([this.getSubscriptions()])
    //         .then(() => {
    //             // TODO: sort?
    //             return this.subscriptions;
    //         });
    // }

    private _subscriptionPromise: Promise<Subscription[]>;
    getSubscriptions(): Promise<Subscription[]> {
        if (!this._subscriptionPromise) {
            this._subscriptionPromise = this.http.get(this.subscriptionUrl, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(response => {
                    this.subscriptions = response.json() as Subscription[];
                    this.subscriptions.forEach(sub => {
                        this._sortMaterials(sub);
                    });
                    return this.subscriptions;
                })
                .catch(this.handleError);
        }
        return this._subscriptionPromise;
    }

    getSubscription(slug: string): Promise<Subscription> {
        if (this._subscriptionPromise) {
            return new Promise<Subscription>((resolve, reject) => {
                this.getSubscriptions().then(subscriptions => {
                    subscriptions.forEach(s => {
                        if (s.package.slug === slug) {
                            resolve(this._sortMaterials(s));
                        }
                    });
                });
            });
        } else {
            return this.http.get(this.subscriptionUrl + '/' + slug, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(response => {
                    return this._sortMaterials(response.json() as Subscription);
                })
                .catch(this.handleError);
        }
    }

    _sortMaterials(sub: Subscription): Subscription {
        sub.package.materials.sort((a, b) => {
            if (a.addon) {
                return 1;
            } else if (b.addon) {
                return -1;
            }
        });
        return sub;
    }

    downloadMaterial(id: string): void {
        this.http.get(this.materialsUrl + id, this.userService.getAuthorizationHeader())
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

    // private _packagePromise: Promise<Package[]>;
    // getPackages(): Promise<Package[]> {
    //     if (!this._packagePromise) {
    //         this._packagePromise = this.http.get(this.packageUrl, this.userService.getAuthorizationHeader())
    //             .toPromise()
    //             .then(response => {
    //                 this.packages = response.json() as Package[];
    //                 return this.packages;
    //             })
    //             .catch(this.handleError);
    //     } 
    //     return this._packagePromise;
    // }

    // getOwnedPackages(): Promise<Package[]> {
    //     return new Promise<Package[]>((resolve, reject) => {
    //         this.getPackages().then(packages => {
    //             let owned: Package[] = [];
    //             packages.forEach(p => {
    //                 if (p.Owned) {
    //                     owned.push(p);
    //                 }
    //                 resolve(owned);
    //             })
    //         })
    //     });
    // }

    // private _materialsPromise: Promise<MaterialItem[]>;
    // getMaterials(): Promise<MaterialItem[]> {
    //     if (!this._materialsPromise) {
    //         this._materialsPromise = this.http.get(this.materialsUrl, this.userService.getAuthorizationHeader())
    //             .toPromise()
    //             .then(response => {
    //                 this.materials = response.json() as MaterialItem[];
    //                 return this.materials;
    //             })
    //             .catch(this.handleError);
    //     } 
    //     return this._materialsPromise;
    // }

    private handleError(error: any): Promise<any> {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    }
}