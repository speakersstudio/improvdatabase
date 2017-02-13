import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AppComponent    } from './app.component';
import { Tool, SearchResult } from '../view/toolbar.view';

import { LibraryService } from '../service/library.service';

import { Package } from '../model/package';
import { MaterialItem } from '../model/material-item';

import { UserService } from '../service/user.service';

@Component({
    moduleId: module.id,
    selector: "library",
    templateUrl: "../template/library.component.html"
})
export class LibraryComponent implements OnInit {

    title: string = '<span class="light">materials</span><strong>library</strong>';

    filter: boolean; // TODO
    searchResults: SearchResult[] = [];

    packages: Package[];
    materials: MaterialItem[];

    constructor(
        private _app: AppComponent,
        private router: Router,
        private libraryService: LibraryService
    ) { }

    private _tools: Tool[] = [
    ]

    ngOnInit(): void {
        this._app.showLoader();
        this.getLibrary();
    }

    onToolClicked(tool: Tool): void {
        
    }

    getLibrary(): void {
        Promise.all([
                this.libraryService.getMaterials(),
                this.libraryService.getOwnedPackages()
            ]).then((items) => {
                setTimeout(() => {
                    this._app.hideLoader();
                    this.materials = items[0];
                    this.packages = items[1];
                }, 150);
            });
    }

    getMaterials(packageId: string): MaterialItem[] {
        return this.materials.filter(material => material.PackageID === packageId && !material.Addon);
    }

    getAddons(): MaterialItem[] {
        return this.materials.filter(material => material.Addon);
    }
}
