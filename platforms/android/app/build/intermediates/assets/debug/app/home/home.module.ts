import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NativescriptBottomNavigationModule} from "nativescript-bottom-navigation/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativescriptBottomNavigationModule
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
