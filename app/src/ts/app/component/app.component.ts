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
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationStart } from '@angular/router';

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

    scrollpos: number;
    showToolbarScrollPosition: number = 20;
    toolbarVisible: boolean;

    backgroundVisible: boolean;

    redirectUrl: string;

    user: User;

    showDialog: boolean = false;
    dialogTitle: string = "";
    dialogMessage: string = "";
    dialogConfirm: string = "";
    dialogOnConfirm: Function;

    showLogin: boolean;
    showBackdrop: boolean;

    userSubscription: Subscription;

    version: string = "1.1.0";

    constructor(
        private _renderer: Renderer,
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit() {

        this.router.events.filter(event => event instanceof NavigationStart).subscribe(event => {
            if (event instanceof NavigationStart) {
                this.showBackground(false);
                this.closeOverlays();
            }
        });

        this.setUser(this.userService.getLoggedInUser());

        this.hideLoader();

        this.userSubscription = this.userService.loginState$.subscribe(user => {
            this.setUser(user);

            if (user) {
                let redirect = this.redirectUrl;
                if (!redirect) {
                    redirect = "/dashboard";
                }
                this.router.navigate([redirect]);
            } else {
                this.router.navigate(['/login']);
            }
        });

    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
    
    onScroll($event): void {
        this.scrollpos = $event.target.scrollingElement.scrollTop;
        this.toolbarVisible = this.scrollpos > this.showToolbarScrollPosition;
    }

    showBackground(show: boolean): void {
        this.backgroundVisible = show;
    }

    setUser(user: User): void {
        this.user = user;
    }

    showLoader(): void {
        console.log('show loader');
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

    logout(): void {
        this.userService.logout();
    }
}
