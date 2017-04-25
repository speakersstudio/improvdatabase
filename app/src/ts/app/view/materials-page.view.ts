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
import { Team } from '../../model/team';

@Component({
    moduleId: module.id,
    selector: '.materials-page',
    templateUrl: '../template/view/materials-page.view.html'
})
export class MaterialsPageView implements OnInit {
    @Input() materials: MaterialItem[] = [];
    @Input() team: Team;

    constructor(
        private _app: AppComponent,
        private libraryService: LibraryService
    ) { }

    ngOnInit(): void {
        if (this.team && this.materials) {
            this.materials = this.team.materials;
        }
    }

    selectMaterial(material: MaterialItem): void {
        if (material.versions.length > 0) {
            this.libraryService.downloadMaterial(material._id);
        } else {
            this._app.dialog('Whoops', 'We seem to have not published any versions of that Material Item. Hopefully we\'re actively working to fix it. Try again in a few minutes, and if you still get this message, please let us know. You can email us at contact@improvpl.us or use the "Report a Bug" feature in the App menu.', 'Okay Then', null, true);
        }
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
