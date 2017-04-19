import { 
    Component,
    OnInit,
    OnDestroy,
    Input
} from '@angular/core';

import 'rxjs/Subscription';
import { Subscription } from 'rxjs/Subscription';

import { TextUtil } from '../../util/text.util';
import { TimeUtil } from '../../util/time.util';

import { UserService } from '../../service/user.service';

import { User } from '../../model/user';
import { Team } from '../../model/team';

@Component({
    moduleId: module.id,
    selector: '.improvplus-user-card',
    templateUrl: '../template/view/user-card.view.html'
})
export class UserCardView implements OnInit, OnDestroy {
    private _timeUtil = TimeUtil;

    @Input() user: User;
    @Input() team: Team;
    
    admin: boolean;
    userIsMe: boolean;
    amIAdmin: boolean;

    private descriptionText: string;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {

        this.descriptionText = TextUtil.stripTags(this.user.description);

        this.userIsMe = this.user._id == this.userService.getLoggedInUser()._id;

        if (this.team) {
            let teamId = this.team._id;

            this.admin = this.userService.isUserAdminOfTeam(this.user, this.team);
            this.amIAdmin = this.userService.isAdminOfTeam(this.team);
        }
    }

    ngOnDestroy(): void {
        
    }
}
