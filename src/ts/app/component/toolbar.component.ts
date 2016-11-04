import { 
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import 'rxjs/Subject';
import { Subject } from 'rxjs/Subject';
import { Router, RoutesRecognized } from '@angular/router';

import { AppComponent } from '../component/app.component';

export class Tool {
    icon: string;
    name: string;
    text: string;
    active?: boolean = false;
}

export class SearchResult {
    text: string;
    type: string;
    id: number;
}

@Component({
    moduleId: module.id,
    selector: '.toolbar',
    templateUrl: '../template/toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

    @Input() title: string = "";
    @Input() tools: Tool[] = [];
    @Input() showBack: boolean = false;

    @Input() showFilterClear: boolean = false;

    @Input() showSearch: boolean = false;
    @Input() searchResults: SearchResult[] = [];

    @Output() toolClicked: EventEmitter<Tool> = new EventEmitter();
    @Output() goBack = new EventEmitter();
    @Output() search: EventEmitter<string> = new EventEmitter();
    @Output() searchResultClick: EventEmitter<SearchResult> = new EventEmitter();

    searchOpen: boolean = false;
    searchTerm: string;

    constructor(
        protected _app: AppComponent,
        protected router: Router
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

        // TODO: pre-populate results with history and favorites
    }

    ngOnInit(): void {
    }
    
    setTitle(title: string): void {
        this.title = title;
    }

    setTools(tools: Tool[]): void {
        this.tools = tools;
    }

    toolClick(tool: Tool): void {
        tool.active = !tool.active;
        //this.toolClicked.emit(tool);
    }

    toggleNav(): void {
        this._app.toggleNav();
    }

    back(): void {
        this.goBack.emit();
    }

    openSearch(): void {
        this.searchOpen = true;
    }

    closeSearch(): void {
        this.searchOpen = false;
    }

    clearSearch(): void {
        this.searchTerm = "";
        this.closeSearch();
    }

    private _typeDebounce;
    typeSearch(event): void {
        if (event.keyCode == 13) {
            this.searchResultClick.emit({
                "type": "search",
                "text": this.searchTerm,
                "id": 0
            });
            this.clearSearch();
        } else {
            clearTimeout(this._typeDebounce);
            this._typeDebounce = setTimeout(() => {
                this.search.emit(this.searchTerm);
            }, 300);
        }
    }

    clickResult(result: SearchResult): void {
        this.searchResultClick.emit(result);
        this.clearSearch();
    }

}