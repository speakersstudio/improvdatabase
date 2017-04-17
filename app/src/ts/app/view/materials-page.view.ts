import { 
    Component,
    OnInit,
    Input
} from '@angular/core';

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
        private libraryService: LibraryService
    ) { }

    ngOnInit(): void {
        if (this.team && this.materials) {
            this.materials = this.team.materials;
        }
    }

    selectMaterial(material: MaterialItem): void {
        this.libraryService.downloadMaterial(material._id);
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
