import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DialogContent } from "./home/portfolio/dialog-content.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DialogContent
    ],
    entryComponents: [
        DialogContent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [ModalDialogService]
})
export class AppModule { }
