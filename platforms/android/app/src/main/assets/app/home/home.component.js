"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(page) {
        this.page = page;
        page.actionBarHidden = true;
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html"
        })
        // TODO: Add dropdowns to change exchange and maybe pick favorites?
        ,
        tslib_1.__metadata("design:paramtypes", [page_1.Page])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0U7QUFDcEUsZ0NBQStCO0FBUS9CO0lBRUksdUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFIRCxnQ0FBUSxHQUFSLGNBQVksQ0FBQztJQURKLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1NBQ3ZDLENBQUM7UUFDRixtRUFBbUU7O2lEQUdyQyxXQUFJO09BRnJCLGFBQWEsQ0FLekI7SUFBRCxvQkFBQztDQUFBLEFBTEQsSUFLQztBQUxZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkhvbWVcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiXG59KVxuLy8gVE9ETzogQWRkIGRyb3Bkb3ducyB0byBjaGFuZ2UgZXhjaGFuZ2UgYW5kIG1heWJlIHBpY2sgZmF2b3JpdGVzP1xuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIG5nT25Jbml0KCkge31cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIH1cbn1cbiJdfQ==