import { 
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';

import { GameDatabaseService } from "../../service/game-database.service";
import { UserService } from "../../service/user.service";

import { User } from "../../model/user";

import { DialogAnim, FadeAnim } from '../../util/anim.util';

const MAX_ATTEMPTS = 5;

@Component({
    moduleId: module.id,
    selector: "create-metadata",
    templateUrl: "../template/view/create-metadata.view.html",
    animations: [
        DialogAnim.dialog,
        FadeAnim.fade
    ]
})
export class CreateMetadataView implements OnInit {

    @Output() done: EventEmitter<any> = new EventEmitter();

    isPosting: boolean;

    @Input() type: string;

    name: string;
    min: number;
    max: number;
    description: string;

    constructor(
        private userService: UserService,
        private gameDatabaseService: GameDatabaseService
    ) { }

    ngOnInit(): void {
        
    }

    createMetadata(): void {
        this.isPosting = true;
        if (this.userService.can('meta_create')) {
            if (this.type == "Player Count") {
                // create a new player count
                this.gameDatabaseService.createPlayerCount(this.name, this.min, this.max, this.description)
                    .then(playercount => {
                        this.done.emit(playercount);
                    });
            } else {
                // create a new Duration
                this.gameDatabaseService.createDuration(this.name, this.min, this.max, this.description)
                    .then(duration => {
                        this.done.emit(duration);
                    });
            }
        } else {
            this.cancel();
        }
    }

    cancel(): boolean {
        this.done.emit(null);
        return false;
    }

}
