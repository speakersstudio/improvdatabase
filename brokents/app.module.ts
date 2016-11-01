import { NgModule }         from "@angular/core";
import { BrowserModule }    from "@angular/platform-browser";
import { FormsModule }      from "@angular/forms";
import { HttpModule }       from "@angular/http";

import { AppComponent }     from "./component/app.component";
//import { GameDatabaseComponent } from "./component/game-database.component";

import { GameDatabaseService } from "./service/game-database.service";

//import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
        //AppRoutingModule
    ],
    declarations: [
        AppComponent
        //GameDatabaseComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ GameDatabaseService ]
})

export class AppModule {
    constructor() {
        document.getElementById("siteLoader").style.display = "none";
    }
}
