import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { RequestOptions, Headers } from '@angular/http';
import { AppHttp } from '../data/app-http';

import { Package } from '../model/package';
import { MaterialItem, MaterialItemVersion } from '../model/material-item';
import { Subscription } from '../model/subscription';
import { Team } from '../model/team';

import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable()
export class LibraryService {
    private packageUrl = '/api/package';
    private materialsUrl = '/api/material/';
    private ownedMaterialsUrl = '/api/user/:_id/materials';

    private subscriptions: Subscription[];
    private packages: Package[];

    private materials: MaterialItem[];
    private teams: Team[];
    private adminTeams: Team[];

    constructor(
        private http: AppHttp,
        private userService: UserService
        ) { }

    private _packagePromise: Promise<Package[]>;
    private _getPackages(): Promise<Package[]> {
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

    /**
     * Get all available packages
     * @param type filter by a specific type (facilitator or improviser)
     * @param team filter by team-oriented packages or individual packages
     */
    getPackages(type?: string, team?: boolean): Promise<Package[]> {
        return new Promise<Package[]>((resolve, reject) => {
            this._getPackages().then(allPackages => {
                if (type != undefined || team != undefined) {
                    let selectedPackages = [];
                    allPackages.forEach(p => {
                        if ((team == undefined || p.team == team) &&
                            (type == undefined || p.type == type)) {
                                selectedPackages.push(p);
                            }
                    });
                    resolve(selectedPackages);
                } else {
                    resolve(allPackages);
                }
            })
        })
    }

    getOwnedMaterials(): Promise<MaterialItem[]> {
        return new Promise<MaterialItem[]>((res, rej) => {
            this.userService.fetchMaterials().then(user => {
                res(user.materials);
            });
        });
    }

    getTeamMaterials(): Promise<Team[]> {
        return new Promise<Team[]>((res, rej) => {
            this.userService.fetchMaterials().then(user => {
                res(<Team[]> user.memberOfTeams);
            });
        });
    }

    getAdminTeamMaterials(): Promise<Team[]> {
        return new Promise<Team[]>((res, rej) => {
            this.userService.fetchMaterials().then(user => {
                res(<Team[]> user.adminOfTeams);
            });
        });
    }

    downloadMaterial(id: string): void {
        this.http.get(this.materialsUrl + id)
            .toPromise()
            .then(response => {
                let url = response.json().url;
                window.open(location.origin + url);
            });
    }

    /**
     * Util method to sort a material item's versions
     * @param m the material item to find the latest version for
     */
    getLatestVersionForMaterialItem(m: MaterialItem): MaterialItemVersion {
        m.versions.sort((a, b) => {
            return b.ver - a.ver;
        });
        return m.versions[0];
    }

    // this is for admin - perhaps admin items should live in their own service?
    getAllMaterials(): Promise<MaterialItem[]> {
        return this.http.get(this.materialsUrl + 'all')
            .toPromise()
            .then(response => {
                return response.json() as MaterialItem[];
            });
    }

    saveMaterial(material: MaterialItem): Promise<MaterialItem> {
        if (!this.userService.isSuperAdmin()) {
            return;
        }
        return this.http.put(this.materialsUrl + material._id, material)
            .toPromise()
            .then(response => {
                return response.json() as MaterialItem;
            });
    }

    postNewVersion(materialItemId: string, version: MaterialItemVersion, file: File): Promise<MaterialItem> {
        if (!this.userService.isSuperAdmin()) {
            return;
        }

        let formData = new FormData();
        formData.append('ver', version.ver);
        formData.append('description', version.description);
        formData.append('file', file, file.name);

        return this.http.postFormData(this.materialsUrl + materialItemId + '/version', formData).toPromise()
            .then(response => {
                return response.json() as MaterialItem;
            });
    }

    deleteVersion(materialItemId: string, version: MaterialItemVersion): Promise<MaterialItem> {
        if (!this.userService.isSuperAdmin()) {
            return;
        }

        return this.http.delete(this.materialsUrl + materialItemId + '/version/' + version._id).toPromise()
            .then(response => {
                return response.json() as MaterialItem;
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    }
}