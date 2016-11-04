import {
    Component,
    OnInit,
    Renderer,
    Injectable
 } from '@angular/core';
 import 'rxjs/Subject';
 import { Subject } from 'rxjs/Subject';
 import { Router, RoutesRecognized } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../template/app.component.html'
})
export class AppComponent implements OnInit {

    loader = document.getElementById("siteLoader");
    showMenu: boolean = false;
    showFullscreen: boolean = false;

    constructor(
        private _renderer: Renderer,
        private router: Router
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

    onScroll(distance: any): void {
        console.log(distance);
    }
}
