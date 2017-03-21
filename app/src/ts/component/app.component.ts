import {
    Component,
    Renderer,
    OnInit
} from '@angular/core';
import 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import { PathLocationStrategy } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Router, RoutesRecognized, NavigationStart } from '@angular/router';

import { User } from "../model/user";
import { UserService } from '../service/user.service';
import { AuthGuard } from '../service/auth-guard.service';

import { DialogAnim, FadeAnim } from '../util/anim.util';

@Component({
    moduleId: module.id,
    selector: 'improvplus',
    templateUrl: '../template/app.component.html',
    animations: [
        DialogAnim.dialog,
        FadeAnim.fade
    ]
})
export class AppComponent implements OnInit {

    version: string = "1.1.0";

    scrollpos: number = 0;
    showToolbarScrollPosition: number = 20;
    toolbarVisible: boolean;

    private scrollSource = new Subject<number>();
    onScroll$ = this.scrollSource.asObservable();

    inApp: boolean;
    backgroundVisible: boolean;

    // loader = document.getElementById("siteLoader");
    loaderVisible: boolean = true;

    showMenu: boolean = false;
    showFullscreen: boolean = false;

    whiteBrackets: boolean = false;

    // Login stuff
    redirectUrl: string;
    user: User;
    showLogin: boolean;
    userSubscription: Subscription;

    // the dialog / menu backdrop
    showBackdrop: boolean;

    // generic dialogs
    showDialog: boolean = false;
    dialogTitle: string = "";
    dialogMessage: string = "";
    dialogConfirm: string = "";
    dialogOnConfirm: Function;

    constructor(
        private _renderer: Renderer,
        private router: Router,
        private userService: UserService,
        private authGuard: AuthGuard,
        private pathLocationStrategy: PathLocationStrategy
    ) { }

    ngOnInit() {
        this.hideLoader();

        this.router.events.filter(event => event instanceof NavigationStart).subscribe(event => {
            if (event instanceof NavigationStart) {
                this.showBackground(false);
                this.showWhiteBrackets(false);
                this.closeOverlays();

                if (event.url.indexOf('/app') > -1) {
                    this.inApp = true;
                } else {
                    this.inApp = false;
                }
            }
        });

        this.setUser(this.userService.getLoggedInUser());

        this.userSubscription = this.userService.loginState$.subscribe(user => {
            if (!this.user) {
                // we just logged in
                let path:string[] = [];
                if (this.authGuard.redirect) {
                    this.authGuard.redirect.forEach(segment => {
                        path.push('/' + segment.path);
                    });
                } else {
                    path.push('/app/dashboard');
                }
                this.router.navigate(path);
            }
            if (!user) {
                // we just logged out
                this.router.navigate(['/']);
                this.hideLoader();
            }
            this.setUser(user);
        });

        if (this.userService.getLoggedInUser()) {
            console.log('Refreshing user');
            // TODO: where is the best place for this?
            this.userService.refreshToken();
        }

        let siteLoader = document.getElementById("siteLoader");
        siteLoader.style.opacity = "0";
        setTimeout(() => {
            siteLoader.remove();
        }, 500);
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
    
    onScroll($event): void {
        this.scrollpos = $event.target.scrollingElement.scrollTop;
        
        this.toolbarVisible = this.scrollpos > this.showToolbarScrollPosition;

        this.scrollSource.next(this.scrollpos);
    }

    showLoader(): void {
        // this.loader.style.display = "block";
        this.loaderVisible = true;
        this.showBackdrop = true;
    }

    hideLoader(): void {
        // this.loader.style.display = "none";
        this.loaderVisible = false;
        this.showBackdrop = false;
    }

    showBackground(show: boolean): void {
        this.backgroundVisible = show;
    }

    showWhiteBrackets(show: boolean): void {
        this.whiteBrackets = show;
    }

    setUser(user: User): void {
        this.user = user;
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

        console.log(this.redirectUrl);
    }

    logout(): void {
        this.showLoader();
        this.userService.logout();
    }

    setPath(path: string): void {
        let pathWithoutApp = path.replace('/app', ''),
            pathRoot = pathWithoutApp.split('/')[1];

        if (this.pathLocationStrategy.path().indexOf('/' + pathRoot + '/') > -1) {
            this.pathLocationStrategy.replaceState({}, '', path, '');
        } else {
            this.pathLocationStrategy.pushState({}, '', path, '');
        }
    }

    scrollTo(to, duration) {
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll < to) {
            duration = duration * (maxScroll / to);
            to = maxScroll;
        }
        
        let from = window.scrollY,
            difference = to - from,
            perTick = duration > 0 ? difference / duration * 10 : difference;

        let easeInOutQuad = function (time, start, end, duration) {
            time /= duration/2;
            if (time < 1) return end/2*time*time + start;
            time--;
            return -end/2 * (time*(time-2) - 1) + start;
        }

        let startTime = 0;

        let scrollFunc = function(time) {
            if (startTime === 0) {
                startTime = time;
            }
            if (window.scrollY === to || (time - startTime) >= duration) {
                return;
            }
            window.scroll(0, easeInOutQuad((time - startTime), from, to, duration));
            // if (window.scrollY === to) return;
            // if (duration - 10 > 0) {
            //     this._scrollTo(to, duration - 10);
            // }
            requestAnimationFrame(scrollFunc);
        };

        requestAnimationFrame(scrollFunc);
    }
    
}
