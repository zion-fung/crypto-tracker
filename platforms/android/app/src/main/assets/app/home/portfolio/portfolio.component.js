"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var portfolio_1 = require("./portfolio");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var portfolio_input_component_1 = require("./portfolio-input/portfolio-input.component");
var name_mapper_1 = require("../name-mapper");
var jsonlib_1 = require("../jsonlib");
var Sqlite = require("nativescript-sqlite");
var PortfolioComponent = /** @class */ (function () {
    function PortfolioComponent(modalService, viewContainerRef) {
        this.modalService = modalService;
        this.viewContainerRef = viewContainerRef;
    }
    PortfolioComponent.prototype.ngOnInit = function () {
        this.portfolio = new portfolio_1.Portfolio();
        this.entries = this.portfolio.getEntries();
    };
    PortfolioComponent.prototype.newPortfolioEntry = function () {
        var _this = this;
        var options = {
            viewContainerRef: this.viewContainerRef
        };
        console.log("Opening dialog");
        this.modalService.showModal(portfolio_input_component_1.PortfolioInput, options).then(function (result) {
            console.log(result);
            if (!result) {
                return;
            }
            // User added new entry to portfolio
            if (JSON.stringify(result) != "{}") {
                _this.getPrice(result.name).then(function (price) {
                    _this.portfolio.addEntry(name_mapper_1.NameMapper.getId(result.name), result.name, price, result.amountOwned, result.purchasedPrice, result.datePurchased);
                });
            }
            // console.log(this.portfolio);
            // this.entries = this.portfolio.getEntries();
        }, function (error) {
            console.log("Error on portfolio input response");
        });
    };
    // Given the name of a coin return its price
    PortfolioComponent.prototype.getPrice = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://api.coinmarketcap.com/v2/ticker/" + name_mapper_1.NameMapper.getId(name))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, jsonlib_1.jsonlib.nestedJsonFinder(json, "data.quotes.USD.price")];
                }
            });
        });
    };
    PortfolioComponent = tslib_1.__decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'portfolio',
            templateUrl: './portfolio.component.html',
            styleUrls: ['./portfolio.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [modal_dialog_1.ModalDialogService, core_1.ViewContainerRef])
    ], PortfolioComponent);
    return PortfolioComponent;
}());
exports.PortfolioComponent = PortfolioComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHlDQUF3QztBQUN4QyxrRUFBMkY7QUFDM0YseUZBQTZFO0FBQzdFLDhDQUE0QztBQUM1QyxzQ0FBcUM7QUFDckMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFROUM7SUFHSSw0QkFBb0IsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBNUUsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFDdkcscUNBQVEsR0FBUjtRQUNPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFDRCw4Q0FBaUIsR0FBakI7UUFBQSxpQkFzQkM7UUFyQkcsSUFBSSxPQUFPLEdBQXVCO1lBQzlCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7U0FDMUMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQywwQ0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDckQsVUFBQSxNQUFNO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUNELG9DQUFvQztZQUNwQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUs7b0JBQ2pDLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHdCQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNoSixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCwrQkFBK0I7WUFDL0IsOENBQThDO1FBQ2xELENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBQ0QsNENBQTRDO0lBQ3RDLHFDQUFRLEdBQWQsVUFBZSxJQUFZOzs7Ozs0QkFDUixxQkFBTSxLQUFLLENBQUMsMENBQTBDLEdBQUcsd0JBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQTs7d0JBQTNGLFFBQVEsR0FBRyxTQUFnRjt3QkFDcEYscUJBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBNUIsSUFBSSxHQUFHLFNBQXFCO3dCQUNoQyxzQkFBTyxpQkFBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSx1QkFBdUIsQ0FBQyxFQUFDOzs7O0tBQ2xFO0lBcENRLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDNUMsQ0FBQztpREFJb0MsaUNBQWtCLEVBQTRCLHVCQUFnQjtPQUh2RixrQkFBa0IsQ0FxQzlCO0lBQUQseUJBQUM7Q0FBQSxBQXJDRCxJQXFDQztBQXJDWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9ydGZvbGlvIH0gZnJvbSBcIi4vcG9ydGZvbGlvXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UsIE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IFBvcnRmb2xpb0lucHV0IH0gZnJvbSBcIi4vcG9ydGZvbGlvLWlucHV0L3BvcnRmb2xpby1pbnB1dC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5hbWVNYXBwZXIgfSBmcm9tIFwiLi4vbmFtZS1tYXBwZXJcIjtcbmltcG9ydCB7IGpzb25saWIgfSBmcm9tIFwiLi4vanNvbmxpYlwiO1xudmFyIFNxbGl0ZSA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiICk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwb3J0Zm9saW8nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3J0Zm9saW8uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3BvcnRmb2xpby5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBvcnRmb2xpb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcG9ydGZvbGlvOiBQb3J0Zm9saW87XG4gICAgZW50cmllcztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHt9XG5cdG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBvcnRmb2xpbyA9IG5ldyBQb3J0Zm9saW8oKTtcbiAgICAgICAgdGhpcy5lbnRyaWVzID0gdGhpcy5wb3J0Zm9saW8uZ2V0RW50cmllcygpO1xuICAgIH1cbiAgICBuZXdQb3J0Zm9saW9FbnRyeSgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZlxuICAgICAgICB9O1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5pbmcgZGlhbG9nXCIpO1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoUG9ydGZvbGlvSW5wdXQsIG9wdGlvbnMpLnRoZW4oXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFVzZXIgYWRkZWQgbmV3IGVudHJ5IHRvIHBvcnRmb2xpb1xuICAgICAgICAgICAgICAgIGlmKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkgIT0gXCJ7fVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJpY2UocmVzdWx0Lm5hbWUpLnRoZW4ocHJpY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3J0Zm9saW8uYWRkRW50cnkoTmFtZU1hcHBlci5nZXRJZChyZXN1bHQubmFtZSksIHJlc3VsdC5uYW1lLCBwcmljZSwgcmVzdWx0LmFtb3VudE93bmVkLCByZXN1bHQucHVyY2hhc2VkUHJpY2UsIHJlc3VsdC5kYXRlUHVyY2hhc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9ydGZvbGlvKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmVudHJpZXMgPSB0aGlzLnBvcnRmb2xpby5nZXRFbnRyaWVzKCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBvbiBwb3J0Zm9saW8gaW5wdXQgcmVzcG9uc2VcIik7XG4gICAgICAgICAgICB9KVxuICAgIH1cbiAgICAvLyBHaXZlbiB0aGUgbmFtZSBvZiBhIGNvaW4gcmV0dXJuIGl0cyBwcmljZVxuICAgIGFzeW5jIGdldFByaWNlKG5hbWU6IHN0cmluZykge1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLmNvaW5tYXJrZXRjYXAuY29tL3YyL3RpY2tlci9cIiArIE5hbWVNYXBwZXIuZ2V0SWQobmFtZSkpO1xuICAgICAgICBsZXQganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgcmV0dXJuIGpzb25saWIubmVzdGVkSnNvbkZpbmRlcihqc29uLCBcImRhdGEucXVvdGVzLlVTRC5wcmljZVwiKTtcbiAgICB9XG59XG4iXX0=