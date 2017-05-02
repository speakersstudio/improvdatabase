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

import { Library } from '../model/library';

@Injectable()
export class LibraryService {
    private packageUrl = '/api/package/';
    private materialsUrl = '/api/material/';
    private ownedMaterialsUrl = '/api/user/:_id/materials';

    private userUrl = '/api/user/';
    private teamUrl = '/api/team/';

    private subscriptions: Subscription[];
    private packages: Package[];

    constructor(
        private http: AppHttp,
        private userService: UserService
        ) { }

    /**
     * Get all of the available packages!
     */
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

    /**
     * Get the materials that you own
     */
    getOwnedMaterials(): Promise<Library> {
        return this.http.get(this.userUrl + this.userService.getLoggedInUser()._id + '/materials')
            .toPromise()
            .then(response => {
                return response.json() as Library;
            });
    }

    /**
     * Get the materials that a team owns (will die )
     */
    getTeamMaterials(teamId: string): Promise<Library> {
        return this.http.get(this.teamUrl + teamId + '/materials')
            .toPromise()
            .then(response => {
                return response.json() as Library;
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

    downloadPackage(id: string): void {
        this.http.get(this.packageUrl + id)
            .toPromise()
            .then(response => {
                let url = response.json().url;
                window.open(location.origin + url);
            })
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
        formData.append('ver', version.ver + '');
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