import {
    Component,
    OnInit,
    Renderer,
    Injectable,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import 'rxjs/Subject';
import { Subject } from 'rxjs/Subject';
import { Router, RoutesRecognized } from '@angular/router';

import { User } from "../model/user";
import { UserService } from '../service/user.service';

const DIALOG_STYLE_IN = {
        transform: 'translate(-50%, -50%)',
        opacity: 1
    };
const DIALOG_STYLE_OUT = {
        transform: 'translate(-50%, -150%)',
        opacity: 0
    };
const DIALOG_ANIM_DURATION = 200;

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../template/app.component.html',
    animations: [
        trigger('dialog', [
            state('in', style(DIALOG_STYLE_IN)),
            transition('void => *', [
                style(DIALOG_STYLE_OUT),
                animate(DIALOG_ANIM_DURATION + 'ms ease-out')
            ]),
            transition('* => void', [
                animate(DIALOG_ANIM_DURATION + 'ms ease-in', style(DIALOG_STYLE_OUT))
            ])
        ])
    ]
})
export class AppComponent implements OnInit {

    loader = document.getElementById("siteLoader");
    showMenu: boolean = false;
    showFullscreen: boolean = false;

    isLoggedIn: boolean;

    user: User;

    showDialog: boolean = false;
    dialogTitle: string = "";
    dialogMessage: string = "";
    dialogConfirm: string = "";
    dialogOnConfirm: Function;

    constructor(
        private _renderer: Renderer,
        private router: Router,
        private userService: UserService
    ) {
        /* I won't use this, but here is how to subscribe to router events!
        // when changing route, reset the toolbar
        router.events.subscribe(val => {
            if (val instanceof RoutesRecognized) {
                this.setTitle("");
                this.setTools([]);
            }
        })
        */
    }

    ngOnInit(): void {
        this.hideLoader();

        this.user = this.userService.getLoggedInUser();
    }

    showLoader(): void {
        this.loader.style.display = "block";
    }

    hideLoader(): void {
        this.loader.style.display = "none";
    }

    toggleNav(): void {
        this.showMenu = !this.showMenu;
    }

    closeOverlays(): void {
        this.showDialog = false;
        this.showMenu = false;
    }

    fullscreen(): void {
        // are we full-screen?
        if (document.fullscreenElement ||
            document.webkitFullscreenElement) {
            
            // exit full-screen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }

            this.showFullscreen = false;
        } else {
            var i = document.body;
            // go full-screen
            if (i.requestFullscreen) {
                i.requestFullscreen();
            } else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            }

            this.showFullscreen = true;
        }
    }

    dialog(title: string, body: string, button: string, onConfirm?: Function): void {
        this.dialogTitle = title;
        this.dialogMessage = body;
        this.dialogConfirm = button;
        this.dialogOnConfirm = onConfirm;

        this.showDialog = true;
    }

    onDialogDismiss(): void {
        this.closeOverlays();
    }

    onDialogConfirm(): void {
        if (this.dialogOnConfirm) {
            if (this.dialogOnConfirm() !== false) {
                this.closeOverlays();
            }
        } else {
            this.closeOverlays();
        }
    }
}
