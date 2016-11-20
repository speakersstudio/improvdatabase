import {
    Component,
    OnInit,
    OnDestroy,
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
import { Subscription } from 'rxjs/Subscription';
import { Router, RoutesRecognized } from '@angular/router';

import { User } from "../model/user";
import { UserService } from '../service/user.service';

import { DialogAnim } from '../util/anim.util';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../template/app.component.html',
    animations: [
        DialogAnim.dialog
    ]
})
export class AppComponent implements OnInit, OnDestroy {

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

    showLogin: boolean;
    showBackdrop: boolean;

    userSubscription: Subscription;

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

    ngOnInit() {
        this.hideLoader();

        this.setUser(this.userService.getLoggedInUser());
        this.userSubscription = this.userService.loginState$.subscribe(user => this.setUser(user));
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    setUser(user: User): void {
        this.user = user;
    }

    showLoader(): void {
        this.loader.style.display = "block";
    }

    hideLoader(): void {
        this.loader.style.display = "none";
    }

    toggleNav(): void {
        this.showMenu = !this.showMenu;
        this.showBackdrop = this.showMenu;
    }

    closeOverlays(): void {
        this.showDialog = false;
        this.showMenu = false;
        this.showLogin = false;
        this.showBackdrop = false;
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
        this.showBackdrop = true;
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

    login(): void {
        this.closeOverlays();
        this.showLogin = true;
        this.showBackdrop = true;
    }

    handleLogin(user: User): void {
        this.closeOverlays();
    }
}
