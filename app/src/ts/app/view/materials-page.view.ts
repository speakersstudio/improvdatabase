import { 
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import {AppComponent    } from '../../component/app.component';

import { LibraryService } from '../../service/library.service';

import { MaterialItem } from '../../model/material-item';
import { Package } from '../../model/package';
import { Library } from '../../model/library';
import { Team } from '../../model/team';

@Component({
    moduleId: module.id,
    selector: '.materials-page',
    templateUrl: '../template/view/materials-page.view.html'
})
export class MaterialsPageView implements OnInit {
    @Input() library: Library;
    @Input() team: Team;

    tabs = [
        {
            name: 'Packages',
            id: 'packages',
            icon: 'book'
        },
        {
            name: 'Materials',
            id: 'materials',
            icon: 'file-text'
        }
    ];
    selectedTab: string = 'packages';

    constructor(
        private _app: AppComponent,
        private libraryService: LibraryService
    ) { }

    ngOnInit(): void {
        if (this.team && !this.library) {
            this.library = this.team.library || new Library();
        }

        if (!this.library.packages.length) {
            this.selectedTab = 'materials';
        }
    }

    selectTab(tab): void {
        this.selectedTab = tab.id;
    }

    selectMaterial(material: MaterialItem): void {
        if (material.versions.length > 0) {
            this.libraryService.downloadMaterial(material._id);
        } else {
            this._app.dialog('Whoops', 'We seem to have not published any versions of that Material Item. Hopefully we\'re actively working to fix it. Try again in a few minutes, and if you still get this message, please let us know. You can email us at contact@improvpl.us or use the "Report a Bug" feature in the App menu.', 'Okay Then', null, true);
        }
    }

    selectPackage(pkg: Package): void {
        // TODO
        this._app.toast('Some day you will be able to download whole packages. Today is not that day.');
    }

    versionTag(m: MaterialItem): string {
        let v = this.libraryService.getLatestVersionForMaterialItem(m);
        // TODO: show the date this was released
        if (v) {
            return "version " + v.ver;
        } else {
            return "no version published";
        }
    }
}
