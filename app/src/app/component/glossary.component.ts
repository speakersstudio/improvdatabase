import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AppComponent    } from '../../component/app.component';
import { Tool } from '../view/toolbar.view';

import { Tag } from '../../model/tag';

import { GameDatabaseService } from '../service/game-database.service';
import { UserService } from '../../service/user.service';

@Component({
    moduleId: module.id,
    selector: "glossary",
    templateUrl: "../template/glossary.component.html"
})
export class GlossaryComponent implements OnInit {

    title: string = '<span class="light">glossary</span>';

    tags: Tag[];

    toggleAllTags: boolean = false;

    private _tagDisplayCount: number = 0;
    allTagsAreDisplayed: boolean;

    isLoadingTags: boolean;

    selectedTag: Tag;
    tagDescription: string;

    superAdmin: boolean;

    constructor(
        public _app: AppComponent,
        private router: Router,
        private gameService: GameDatabaseService,
        private userService: UserService
    ) { }

    _tools: Tool[] = [
    ]

    ngOnInit(): void {
        this.superAdmin = this.userService.isSuperAdmin();
    }

    allTagsToggle(): void {
        setTimeout(() => {
            this.getTags();
        }, 100);
    }

    getTags(): void {
        this.isLoadingTags = true;

        this.gameService.getTags().then(tags => {
            let filteredtags = tags.filter(tag => {
                    return this.toggleAllTags || !!tag.description;
                }).sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            if (filteredtags.length > this._tagDisplayCount) {
                this.tags = filteredtags.slice(0, this._tagDisplayCount);
                this.allTagsAreDisplayed = false;
            } else {
                this.tags = filteredtags;
                this.allTagsAreDisplayed = true;
            }
            this.isLoadingTags = false;
        });
    }

    loadMoreTags(page: number): void {
        if (!this.allTagsAreDisplayed) {
            this._tagDisplayCount = 30 * page;
            this.getTags();
        }
    }

    onSelect(tag: Tag): void {
        if (this.selectedTag && this.selectedTag._id == tag._id) {
            return;
        }
        this.selectedTag = tag;
        this.tagDescription = tag.description;
    }

    saveTag(): void {
        this.selectedTag.description = this.tagDescription;
        this.gameService.saveTag(this.selectedTag).then(tag => {
            this.selectedTag = null;
        });
    }

}
