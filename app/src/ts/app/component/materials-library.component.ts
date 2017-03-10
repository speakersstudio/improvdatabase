import { Component, OnInit } from '@angular/core';
import { PathLocationStrategy } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AppComponent    } from './app.component';
import { Tool, SearchResult } from '../view/toolbar.view';

import { LibraryService } from '../service/library.service';

import { Subscription } from '../model/subscription';
import { Package, PackageMaterial } from '../model/package';
import { MaterialItem } from '../model/material-item';

import { UserService } from '../service/user.service';

@Component({
    moduleId: module.id,
    selector: "packages",
    templateUrl: "../template/materials-library.component.html"
})
export class MaterialsLibraryComponent implements OnInit {

    title: string = '<span class="light">materials</span><strong>library</strong>';

    filter: boolean; // TODO
    searchResults: SearchResult[] = [];

    subscriptions: Subscription[];
    // packages: Package[];
    // materials: MaterialItem[];

    selectedSubscription: Subscription;

    constructor(
        private _app: AppComponent,
        private router: Router,
        private route: ActivatedRoute,
        private libraryService: LibraryService,
        private pathLocationStrategy: PathLocationStrategy
    ) { }

    private _tools: Tool[] = [
    ]

    ngOnInit(): void {

        let slug;

        this.route.params.forEach((params: Params) => {
            slug = params['packageSlug'];
        });

        this.getLibrary(slug);

        this.pathLocationStrategy.onPopState(() => {
            this.selectedSubscription = null;
            this.getLibrary('');
        });
    }

    onToolClicked(tool: Tool): void {
        
    }

    getLibrary(slug: string): void {
        // Promise.all([
        //         this.libraryService.getLibrary()
        //     ]).then((items) => {
        //         setTimeout(() => {
        //             this._app.hideLoader();
        //             this.materials = items[0];
        //             this.packages = items[1];
        //         }, 150);
        //     });
        this._app.showLoader();

        if (slug) {

            this.libraryService.getSubscription(slug)
                .then(sub => {
                    this.selectSubscription(sub);
                })

        } else {
            this._app.showBackground(true);

            this.libraryService.getSubscriptions()
                .then(subs => {
                    this.subscriptions = subs;
                    this._app.hideLoader();
                });

        }
    }

    selectSubscription(sub: Subscription): void {
        this.selectedSubscription = sub;
        this._app.showBackground(false);
        this._app.hideLoader();

        let newPath = '/materials/' + sub.package.slug;
        this._app.setPath(newPath);

        window.scrollTo(0,0);
    }

    clearFilter(): void {
        if (this.selectedSubscription) {
            this.pathLocationStrategy.back();
        }
    }

    selectMaterial(material: MaterialItem): void {
        this.libraryService.downloadMaterial(material._id);
    }

    versionTag(m: MaterialItem): string {
        let v = this.libraryService.getLatestVersionForMaterialItem(m);
        // TODO: show the date this was released
        return "version " + v.ver;
    }

}
