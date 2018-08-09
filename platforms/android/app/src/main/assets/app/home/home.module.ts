import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NativescriptBottomNavigationModule} from "nativescript-bottom-navigation/angular";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PortfolioBlockComponent } from "./portfolio/portfolio-block/portfolio-block.component";
import { ChartsComponent } from "./charts/charts.component";
import { FloatFormatter } from "./float-formatter.pipe";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativescriptBottomNavigationModule
    ],
    declarations: [
        HomeComponent,
        PortfolioComponent,
        PortfolioBlockComponent,
        ChartsComponent,
        FloatFormatter
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
