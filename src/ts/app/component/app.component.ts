import {
    Component,
    OnInit,
    Renderer,
    Injectable
 } from '@angular/core';
 import 'rxjs/Subject';
 import { Subject } from 'rxjs/Subject';
 import { Router, RoutesRecognized } from '@angular/router';

 export class Tool {
     icon: string;
     name: string;
     text: string;
     active: boolean = false;
 }

 export class ToolService {
     private toolSource = new Subject<Tool>();
     tool$ = this.toolSource.asObservable();

     private scrollSource = new Subject<number>();
     scroll$ = this.scrollSource.asObservable();

     toolSelected(tool: Tool) {
         this.toolSource.next(tool);
     }

     onScroll(pos: number) {
         this.scrollSource.next(pos);
     }
 }

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../template/app.component.html',
    providers: [ ToolService ]
})
export class AppComponent implements OnInit {

    loader = document.getElementById("siteLoader");
    showMenu: boolean = false;
    showFullscreen: boolean = false;

    toolbarTitle: string = "";
    tools: Tool[] = [];

    constructor(
        private _renderer: Renderer,
        private router: Router,
        private toolService: ToolService
    ) {
        // when changing route, reset the toolbar
        router.events.subscribe(val => {
            if (val instanceof RoutesRecognized) {
                this.setTitle("");
                this.setTools([]);
            }
        })
    }

    ngOnInit(): void {
        this.hideLoader();

        this.toolService.scroll$.subscribe(pos => {
            console.log('pos', pos);
        })
    }

    setTitle(title: string): void {
        this.toolbarTitle = title;
    }

    setTools(tools: Tool[]): void {
        this.tools = tools;
    }

    toolClick(tool: Tool): void {
        this.toolService.toolSelected(tool);
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
