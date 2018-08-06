"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var portfolio_input_component_1 = require("./home/portfolio/portfolio-input/portfolio-input.component");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
var coin_info_component_1 = require("./home/coin-info/coin-info.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                portfolio_input_component_1.PortfolioInput,
                coin_info_component_1.CoinInfo
            ],
            entryComponents: [
                portfolio_input_component_1.PortfolioInput,
                coin_info_component_1.CoinInfo
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ],
            providers: [
                modal_dialog_1.ModalDialogService,
                nativescript_modal_datetimepicker_1.ModalDatetimepicker
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSxrRUFBdUU7QUFFdkUsMkRBQXdEO0FBQ3hELGlEQUErQztBQUMvQyx3R0FBNEY7QUFDNUYsdUZBQXdFO0FBQ3hFLDRFQUFnRTtBQTJCaEU7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXpCckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQixxQ0FBZ0I7YUFDbkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osMENBQWM7Z0JBQ2QsOEJBQVE7YUFDWDtZQUNELGVBQWUsRUFBRTtnQkFDYiwwQ0FBYztnQkFDZCw4QkFBUTthQUNYO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxpQ0FBa0I7Z0JBQ2xCLHVEQUFtQjthQUN0QjtTQUNKLENBQUM7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5cbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFBvcnRmb2xpb0lucHV0IH0gZnJvbSBcIi4vaG9tZS9wb3J0Zm9saW8vcG9ydGZvbGlvLWlucHV0L3BvcnRmb2xpby1pbnB1dC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsRGF0ZXRpbWVwaWNrZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCI7XG5pbXBvcnQgeyBDb2luSW5mbyB9IGZyb20gXCIuL2hvbWUvY29pbi1pbmZvL2NvaW4taW5mby5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgUG9ydGZvbGlvSW5wdXQsXG4gICAgICAgIENvaW5JbmZvXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgUG9ydGZvbGlvSW5wdXQsXG4gICAgICAgIENvaW5JbmZvXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNb2RhbERpYWxvZ1NlcnZpY2UsIFxuICAgICAgICBNb2RhbERhdGV0aW1lcGlja2VyXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=