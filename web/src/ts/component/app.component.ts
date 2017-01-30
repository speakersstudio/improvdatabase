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

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../template/app.component.html',
    animations: [
    ]
})
export class AppComponent implements OnInit, OnDestroy {

    scrollpos: number;

    constructor(
        private _renderer: Renderer,
        private router: Router
    ) { }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
    
    onScroll($event): void {
        this.scrollpos = $event.target.scrollingElement.scrollTop;
    }
    
}
