"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var home_routing_module_1 = require("./home-routing.module");
var home_component_1 = require("./home.component");
var angular_1 = require("nativescript-bottom-navigation/angular");
var portfolio_component_1 = require("./portfolio/portfolio.component");
var portfolio_block_component_1 = require("./portfolio/portfolio-block/portfolio-block.component");
var charts_component_1 = require("./charts/charts.component");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                home_routing_module_1.HomeRoutingModule,
                angular_1.NativescriptBottomNavigationModule
            ],
            declarations: [
                home_component_1.HomeComponent,
                portfolio_component_1.PortfolioComponent,
                portfolio_block_component_1.PortfolioBlockComponent,
                charts_component_1.ChartsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBRXZFLDZEQUEwRDtBQUMxRCxtREFBaUQ7QUFDakQsa0VBQTJGO0FBQzNGLHVFQUFxRTtBQUNyRSxtR0FBZ0c7QUFDaEcsOERBQTREO0FBa0I1RDtJQUFBO0lBQTBCLENBQUM7SUFBZCxVQUFVO1FBaEJ0QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qix1Q0FBaUI7Z0JBQ2pCLDRDQUFrQzthQUNyQztZQUNELFlBQVksRUFBRTtnQkFDViw4QkFBYTtnQkFDYix3Q0FBa0I7Z0JBQ2xCLG1EQUF1QjtnQkFDdkIsa0NBQWU7YUFDbEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFVBQVUsQ0FBSTtJQUFELGlCQUFDO0NBQUEsQUFBM0IsSUFBMkI7QUFBZCxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgSG9tZVJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9ob21lLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5hdGl2ZXNjcmlwdEJvdHRvbU5hdmlnYXRpb25Nb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtYm90dG9tLW5hdmlnYXRpb24vYW5ndWxhclwiO1xuaW1wb3J0IHsgUG9ydGZvbGlvQ29tcG9uZW50IH0gZnJvbSBcIi4vcG9ydGZvbGlvL3BvcnRmb2xpby5jb21wb25lbnRcIjtcbmltcG9ydCB7IFBvcnRmb2xpb0Jsb2NrQ29tcG9uZW50IH0gZnJvbSBcIi4vcG9ydGZvbGlvL3BvcnRmb2xpby1ibG9jay9wb3J0Zm9saW8tYmxvY2suY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGFydHNDb21wb25lbnQgfSBmcm9tIFwiLi9jaGFydHMvY2hhcnRzLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgICAgICBIb21lUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlc2NyaXB0Qm90dG9tTmF2aWdhdGlvbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEhvbWVDb21wb25lbnQsXG4gICAgICAgIFBvcnRmb2xpb0NvbXBvbmVudCxcbiAgICAgICAgUG9ydGZvbGlvQmxvY2tDb21wb25lbnQsXG4gICAgICAgIENoYXJ0c0NvbXBvbmVudFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lTW9kdWxlIHsgfVxuIl19