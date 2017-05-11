import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AppComponent} from '../../component/app.component';
import { Tool } from '../view/toolbar.view';

import { LibraryService } from '../service/library.service';

import { Subscription } from '../../model/subscription';
import { Package } from '../../model/package';
import { MaterialItem, MaterialItemVersion } from '../../model/material-item';

import { UserService } from '../../service/user.service';

import { TimeUtil } from '../../util/time.util';

import { AppHttp } from '../../data/app-http';

@Component({
    moduleId: module.id,
    selector: "admin",
    templateUrl: "../template/admin.component.html"
})
export class AdminComponent implements OnInit {

    title: string = '<span class="light">super</span><strong>admin</strong>';

    tabs = [
        {
            name: 'Material Items',
            id: 'materials',
            icon: 'file'
        },
        {
            name: 'Utilities',
            id: 'utilities',
            icon: 'cogs'
        }
    ];
    selectedTab: string = 'materials';

    materialItems: MaterialItem[];
    selectedMaterial: MaterialItem;

    newVersion: MaterialItemVersion;
    newVersionFile: File

    constructor(
        private _app: AppComponent,
        private router: Router,
        private libraryService: LibraryService,
        private userService: UserService,
        private http: AppHttp
    ) { }

    private _tools: Tool[] = [
    ]

    ngOnInit(): void {
        this.showMaterials();
    }

    selectTab(tab): void {
        this.selectedTab = tab.id;
    }

    back(): void {
        this.selectedMaterial = null;
    }

    simpleDate(date: string): string {
        return TimeUtil.simpleDate(date);
    }

    showMaterials(): void {
        this.libraryService.getAllMaterials()
            .then(materials => {
                this._app.hideLoader();
                this.materialItems = materials;
            });
    }

    selectMaterial(material: MaterialItem): void {
        this.newVersion = new MaterialItemVersion();
        this.selectedMaterial = material;
    }

    saveMaterial(): void {
        if (typeof(this.selectedMaterial.tags) == 'string') {
            let tags:string = this.selectedMaterial.tags;
            let tagArray:string[] = [];
            tags.split(',').forEach(t => {
                tagArray.push(t.trim());
            });
            this.selectedMaterial.tags = tagArray;
        }
        this.libraryService.saveMaterial(this.selectedMaterial).then();
    }

    fileChange($event): void {
        this.newVersionFile = $event.target.files[0];
    }

    saveVersion(): void {
        this.libraryService.postNewVersion(this.selectedMaterial._id, this.newVersion, this.newVersionFile).then(m => {
            this.selectedMaterial.versions = m.versions;

            this.userService.refreshToken();
        });
    }

    deleteVersion(version: MaterialItemVersion): void {
        this.libraryService.deleteVersion(this.selectedMaterial._id, version).then(m => {
            this.selectedMaterial.versions = m.versions;
        })
    }

    doBackup(): void {
        this.http.get('/api/backup').toPromise().then(response => {
            let data = response.json();
            this._app.toast(data.timestamp);
        })
    }

}
