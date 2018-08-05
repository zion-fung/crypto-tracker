import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DialogContent } from "./home/portfolio/dialog-content.component";
import { ModalDatetimepicker } from "nativescript-modal-datetimepicker";
import { CoinInfo } from "./home/coin-info/coin-info.component";

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
        DialogContent,
        CoinInfo
    ],
    entryComponents: [
        DialogContent,
        CoinInfo
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        ModalDialogService, 
        ModalDatetimepicker
    ]
})
export class AppModule { }
