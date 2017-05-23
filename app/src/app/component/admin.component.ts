import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import {AppComponent} from '../../component/app.component';
import { Tool } from '../view/toolbar.view';

import { TabData } from '../../model/tab-data';

import { LibraryService } from '../service/library.service';
import { HistoryService } from '../service/history.service';

import { Subscription } from '../../model/subscription';
import { Package } from '../../model/package';
import { MaterialItem, MaterialItemVersion } from '../../model/material-item';
import { HistoryModel } from '../../model/history';

import { UserService } from '../../service/user.service';

import { TimeUtil } from '../../util/time.util';

import { AppHttp } from '../../data/app-http';

import { Util } from '../../util/util';
import { DialogAnim } from '../../util/anim.util';

@Component({
    moduleId: module.id,
    selector: "admin",
    templateUrl: "../template/admin.component.html",
    animations: [DialogAnim.dialog]
})
export class AdminComponent implements OnInit {

    @ViewChild('versionFileInput') versionFileInput: ElementRef;

    title: string = '<span class="light">super</span><strong>admin</strong>';

    tabs: TabData[] = [
        {
            name: 'Material Items',
            id: 'materials',
            icon: 'file'
        },
        {
            name: 'Packages',
            id: 'packages',
            icon: 'book'
        },
        {
            name: 'History',
            id: 'history',
            icon: 'history'
        }
    ];
    selectedTab: string = 'materials';

    materialItems: MaterialItem[];
    selectedMaterial: MaterialItem;

    newVersion: MaterialItemVersion;
    newVersionFile: File;

    packages: Package[];
    selectedPackage: Package;
    selectedPackageDescription: string;

    selectPackageDialogVisible: boolean;
    selectMaterialDialogVisible: boolean;

    histories: HistoryModel[];
    rawHistories: HistoryModel[];
    historyShowRefresh: boolean;
    historyShowLogin: boolean;

    constructor(
        public _app: AppComponent,
        private router: Router,
        private libraryService: LibraryService,
        private userService: UserService,
        private historyService: HistoryService,
        private http: AppHttp
    ) { }

    _tools: Tool[] = [
        {
            icon: "fa-database",
            name: "backup",
            text: "Back Up Database"
        }
    ]

    onToolClicked(tool: Tool): void {
        switch (tool.name) {
            case "backup":
                this.doBackup();
                break;
        }
    }

    ngOnInit(): void {
        this.showMaterials();
        this.showPackages();
        this.getHistory();
    }

    selectTab(tab: TabData): void {
        this.selectedTab = tab.id;
    }

    back(): void {
        this.selectedMaterial = null;
        this.selectedPackage = null;
    }

    simpleDate(date: string): string {
        return TimeUtil.simpleDate(date);
    }

    simpleDateTime(date: string): string {
        return TimeUtil.simpleDate(date) + ' ' + TimeUtil.simpleTime(date);
    }

    showMaterials(): void {
        this.libraryService.getAllMaterials()
            .then(materials => {
                this._app.hideLoader();
                this.materialItems = materials;
            });
    }

    showPackages(): void {
        this.libraryService.getAllPackages()
            .then(packages => {
                this.packages = packages;
            })
    }

    getHistory(): void {
        this.historyService.getAllHistory().then(histories => {
            this.rawHistories = histories;
            this.filterHistory();
        })
    }

    getHistoryIcon(history: HistoryModel): string {
        switch(history.action) {
            case 'game_edit':
                return 'fa-rocket';
            case 'material_view':
                return 'fa-file-pdf-o';
            case 'change_password':
                return 'fa-key';
            default:
                return 'fa-history';
        }
    }

    filterHistory(): void {
        this.histories = this.rawHistories.filter(h => {
            if (!this.historyShowRefresh && h.action == 'refresh') {
                return false;
            } else if (!this.historyShowLogin && (h.action == 'login' || h.action == 'logout' )) {
                return false;
            }
            return true;
        });
    }

    selectMaterial(material: MaterialItem): void {
        this.newVersion = new MaterialItemVersion();
        this.selectedMaterial = material;
    }

    selectPackage(p: Package): void {
        this.selectedPackage = p;

        this.selectedPackageDescription = p.description.join('\n');
    }

    createMaterial(): void {
        this.libraryService.createMaterial().then(m => {
            this.materialItems.push(m);
            this.selectMaterial(m);
        });
    }

    createPackage(): void {
        this.libraryService.createPackage().then(p => {
            this.packages.push(p);
            this.selectPackage(p);
        })
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
        this.libraryService.saveMaterial(this.selectedMaterial).then(() => {
            this._app.toast('It is done.');
        });
    }

    savePackage(): void {
        let descArray = this.selectedPackageDescription.split('\n');

        this.selectedPackage.description = descArray;
        this.libraryService.savePackage(this.selectedPackage).then(() => {
            this._app.toast('It is done.');
        });
    }

    fileChange(): void {
        let fileInput = this.versionFileInput.nativeElement;
        this.newVersionFile = fileInput.files[0];
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

    deleteMaterial(): void {
        this._app.showLoader();
        this.libraryService.deleteMaterial(this.selectedMaterial).then(() => {
            let index = Util.indexOfId(this.materialItems, this.selectedMaterial);
            if (index > -1) {
                this.materialItems.splice(index, 1);
            }
            this.selectedMaterial = null;
            this._app.hideLoader();
        });
    }

    deletePackage(): void {
        this._app.showLoader();
        this.libraryService.deletePackage(this.selectedPackage).then(() => {
            let index = Util.indexOfId(this.packages, this.selectedPackage);
            if (index > -1) {
                this.packages.splice(index, 1);
            }
            this.selectedPackage = null;
            this._app.hideLoader();
        });
    }

    removePackageFromPackage(pkg: Package): void {
        let index = Util.indexOfId(this.selectedPackage.packages, pkg);
        this.selectedPackage.packages.splice(index, 1);
        this.libraryService.savePackagePackages(this.selectedPackage)
            .then(() => {
                this._app.toast('Package Packages saved');
            });
    }

    removeMaterialFromPackage(material: MaterialItem): void {
        let index = Util.indexOfId(this.selectedPackage.materials, material);
        this.selectedPackage.materials.splice(index, 1);
        this.libraryService.savePackageMaterials(this.selectedPackage)
            .then(() => {
                this._app.toast('Package Materials saved');
            });
    }

    packagePackagesDropped(droppedId: string, ontoId: string): void {
        let indexFrom, indexTo;
        indexFrom = Util.indexOfId(this.selectedPackage.packages, droppedId);
        indexTo = Util.indexOfId(this.selectedPackage.packages, ontoId);

        let packageToMove = this.selectedPackage.packages[indexFrom];
        this.selectedPackage.packages.splice(indexFrom, 1);
        this.selectedPackage.packages.splice(indexTo, 0, packageToMove);

        this.libraryService.savePackagePackages(this.selectedPackage)
            .then(() => {
                this._app.toast('Package Packages saved');
            });
    }

    packageMaterialsDropped(droppedId: string, ontoId: string): void {
        let indexFrom, indexTo;
        indexFrom = Util.indexOfId(this.selectedPackage.materials, droppedId);
        indexTo = Util.indexOfId(this.selectedPackage.materials, ontoId);

        let materialToMove = this.selectedPackage.materials[indexFrom];
        this.selectedPackage.materials.splice(indexFrom, 1);
        this.selectedPackage.materials.splice(indexTo, 0, materialToMove);

        this.libraryService.savePackageMaterials(this.selectedPackage)
            .then(() => {
                this._app.toast('Package Materials saved');
            });
    }

    cancelSelectMaterialDialog(): void {
        this.selectMaterialDialogVisible = false;
        this.selectPackageDialogVisible = false;
        this._app.backdrop(false);
    }

    showSelectMaterialDialog(): void {
        this.selectMaterialDialogVisible = true;
        this.selectPackageDialogVisible = false;
        this._app.backdrop(true);
    }

    showSelectPackageDialog(): void {
        this.selectPackageDialogVisible = true;
        this.selectMaterialDialogVisible = false;
        this._app.backdrop(true);
    }

    selectPackageForPackage(pkg: Package): void {
        this.selectedPackage.packages.push(pkg);

        this.libraryService.savePackagePackages(this.selectedPackage)
            .then(() => {
                this._app.toast('Package Packages saved');
            });
    }

    selectMaterialForPackage(material: MaterialItem): void {
        this.selectedPackage.materials.push(material);

        this.libraryService.savePackageMaterials(this.selectedPackage)
            .then(() => {
                this._app.toast('Package Materials saved');
            });
    }

}
