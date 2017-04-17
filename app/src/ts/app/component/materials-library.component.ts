import { Component, OnInit } from '@angular/core';
import { PathLocationStrategy } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AppComponent    } from '../../component/app.component';
import { Tool, SearchResult } from '../view/toolbar.view';

import { LibraryService } from '../../service/library.service';

import { Subscription } from '../../model/subscription';
import { Package } from '../../model/package';
import { MaterialItem } from '../../model/material-item';
import { Team } from '../../model/team';

import { UserService } from '../../service/user.service';

@Component({
    moduleId: module.id,
    selector: "packages",
    templateUrl: "../template/materials-library.component.html"
})
export class MaterialsLibraryComponent implements OnInit {

    title: string = '<span class="light">materials</span><strong>library</strong>';

    filter: boolean; // TODO
    searchResults: SearchResult[] = [];

    ownedMaterials: MaterialItem[] = [];
    teams: Team[] = [];
    adminTeams: Team[] = [];

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
        this.getLibrary();
    }

    onToolClicked(tool: Tool): void {
        
    }

    getLibrary(): void {
        this._app.showLoader();

        this.libraryService.getOwnedMaterials()
            .then(materials => {
                this._app.hideLoader();
                this.ownedMaterials = materials;
            });

        this.libraryService.getTeamMaterials()
            .then(teams => {
                this.teams = teams;
            });

        this.libraryService.getAdminTeamMaterials()
            .then(teams => {
                this.adminTeams = teams;
            });
    }

    clearFilter(): void {

    }

}
