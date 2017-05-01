import { 
    Component,
    OnInit,
    OnDestroy,
    Input,
    ViewChild,
    ViewChildren,
    QueryList
} from '@angular/core';

import 'rxjs/Subscription';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { UserService } from '../../service/user.service';

import { PreferenceUtil } from '../../util/preference.util';

import { BracketCardDirective } from '../../view/bracket-card.directive';

import { ShrinkAnim } from '../../util/anim.util';

class DashboardMessage {
    key: string;
    title?: string;
    body?: string;
    button?: string;
    action?: Function;
    trigger?: Function;
}

@Component({
    moduleId: module.id,
    selector: 'dashboard-message-list',
    templateUrl: '../template/view/dashboard-message-list.view.html',
    animations: [ ShrinkAnim.height ]
})
export class DashboardMessageListView implements OnInit, OnDestroy {

    @ViewChild('dashboardMessage', {read: BracketCardDirective}) messageElement: BracketCardDirective;

    private PREFERENCE_KEY_PREFIX = 'hide_dash_message_';

    userSubscription: Subscription;

    messages: DashboardMessage[] = [
        {
            key: 'welcome'
        },
        {
            key: 'username',
            trigger: () => {
                return !this.userService.getLoggedInUser().firstName || !this.userService.getLoggedInUser().lastName
            }
        }
    ];
    visibleMessage: DashboardMessage = new DashboardMessage();

    isPosting: boolean;

    firstName: string;
    lastName: string;

    constructor(
        private userService: UserService,
        private router: Router,
    ) { }

    ngOnInit(): void {

        // if the user is refreshing, wait until it finishes to show any messages
        if (!this.userService.isLoggingIn) {
            this.showNextMessage();
        }

        // when the user updates, re-scan to see if the message to show has changed
        this.userSubscription = this.userService.loginState$.subscribe(user => {
            if (user) {
                this.showNextMessage();
            }
        });
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    showNextMessage(): void {
        let delay = this.visibleMessage ? 300 : 1;

        this.visibleMessage = null;

        // show the first message that has not been hidden by the user
        setTimeout(() => {
            this.messages.some(message => {
                let key = message.key;
                let visible = this.userService.getPreference(this.PREFERENCE_KEY_PREFIX + key) != 'true';

                if (visible && message.trigger) {
                    visible = visible && message.trigger();
                }
                if (visible) {
                    this.visibleMessage = message;
                    return true;
                }
            });
        }, delay);
    }

    dismissVisibleMessage(): void {
        this.userService.setPreference(this.PREFERENCE_KEY_PREFIX + this.visibleMessage.key, 'true')
            .then(() => {
                setTimeout(() => {
                    this.showNextMessage();
                }, 300);
            })

        this.messageElement.close();
    }

    saveUserName(): void {
        let user = this.userService.getLoggedInUser();
        user.firstName = this.firstName;
        user.lastName = this.lastName;
        
        this.isPosting = true;
        this.userService.updateUser(user)
            .then(user => {
                this.isPosting = false;
                setTimeout(() => {
                    this.showNextMessage();
                }, 100);
            });

    }
}
