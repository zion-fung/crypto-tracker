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
var float_formatter_pipe_1 = require("./float-formatter.pipe");
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
                charts_component_1.ChartsComponent,
                float_formatter_pipe_1.FloatFormatter
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBRXZFLDZEQUEwRDtBQUMxRCxtREFBaUQ7QUFDakQsa0VBQTJGO0FBQzNGLHVFQUFxRTtBQUNyRSxtR0FBZ0c7QUFDaEcsOERBQTREO0FBQzVELCtEQUF3RDtBQW1CeEQ7SUFBQTtJQUEwQixDQUFDO0lBQWQsVUFBVTtRQWpCdEIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsdUNBQWlCO2dCQUNqQiw0Q0FBa0M7YUFDckM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsOEJBQWE7Z0JBQ2Isd0NBQWtCO2dCQUNsQixtREFBdUI7Z0JBQ3ZCLGtDQUFlO2dCQUNmLHFDQUFjO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxVQUFVLENBQUk7SUFBRCxpQkFBQztDQUFBLEFBQTNCLElBQTJCO0FBQWQsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7IEhvbWVSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vaG9tZS1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOYXRpdmVzY3JpcHRCb3R0b21OYXZpZ2F0aW9uTW9kdWxlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWJvdHRvbS1uYXZpZ2F0aW9uL2FuZ3VsYXJcIjtcbmltcG9ydCB7IFBvcnRmb2xpb0NvbXBvbmVudCB9IGZyb20gXCIuL3BvcnRmb2xpby9wb3J0Zm9saW8uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQb3J0Zm9saW9CbG9ja0NvbXBvbmVudCB9IGZyb20gXCIuL3BvcnRmb2xpby9wb3J0Zm9saW8tYmxvY2svcG9ydGZvbGlvLWJsb2NrLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2hhcnRzQ29tcG9uZW50IH0gZnJvbSBcIi4vY2hhcnRzL2NoYXJ0cy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZsb2F0Rm9ybWF0dGVyIH0gZnJvbSBcIi4vZmxvYXQtZm9ybWF0dGVyLnBpcGVcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICAgICAgSG9tZVJvdXRpbmdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZXNjcmlwdEJvdHRvbU5hdmlnYXRpb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBIb21lQ29tcG9uZW50LFxuICAgICAgICBQb3J0Zm9saW9Db21wb25lbnQsXG4gICAgICAgIFBvcnRmb2xpb0Jsb2NrQ29tcG9uZW50LFxuICAgICAgICBDaGFydHNDb21wb25lbnQsXG4gICAgICAgIEZsb2F0Rm9ybWF0dGVyXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVNb2R1bGUgeyB9XG4iXX0=