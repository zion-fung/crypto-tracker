"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var portfolio_1 = require("./portfolio");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var portfolio_input_component_1 = require("./portfolio-input/portfolio-input.component");
var name_mapper_1 = require("../name-mapper");
var jsonlib_1 = require("../jsonlib");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHlDQUF3QztBQUN4QyxrRUFBMkY7QUFDM0YseUZBQTZFO0FBQzdFLDhDQUE0QztBQUM1QyxzQ0FBcUM7QUFRckM7SUFHSSw0QkFBb0IsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBNUUsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFDdkcscUNBQVEsR0FBUjtRQUNPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFDRCw4Q0FBaUIsR0FBakI7UUFBQSxpQkFzQkM7UUFyQkcsSUFBSSxPQUFPLEdBQXVCO1lBQzlCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7U0FDMUMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQywwQ0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDckQsVUFBQSxNQUFNO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUNELG9DQUFvQztZQUNwQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUs7b0JBQ2pDLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHdCQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNoSixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCwrQkFBK0I7WUFDL0IsOENBQThDO1FBQ2xELENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBQ0QsNENBQTRDO0lBQ3RDLHFDQUFRLEdBQWQsVUFBZSxJQUFZOzs7Ozs0QkFDUixxQkFBTSxLQUFLLENBQUMsMENBQTBDLEdBQUcsd0JBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQTs7d0JBQTNGLFFBQVEsR0FBRyxTQUFnRjt3QkFDcEYscUJBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBNUIsSUFBSSxHQUFHLFNBQXFCO3dCQUNoQyxzQkFBTyxpQkFBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSx1QkFBdUIsQ0FBQyxFQUFDOzs7O0tBQ2xFO0lBcENRLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDNUMsQ0FBQztpREFJb0MsaUNBQWtCLEVBQTRCLHVCQUFnQjtPQUh2RixrQkFBa0IsQ0FxQzlCO0lBQUQseUJBQUM7Q0FBQSxBQXJDRCxJQXFDQztBQXJDWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9ydGZvbGlvIH0gZnJvbSBcIi4vcG9ydGZvbGlvXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UsIE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IFBvcnRmb2xpb0lucHV0IH0gZnJvbSBcIi4vcG9ydGZvbGlvLWlucHV0L3BvcnRmb2xpby1pbnB1dC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5hbWVNYXBwZXIgfSBmcm9tIFwiLi4vbmFtZS1tYXBwZXJcIjtcbmltcG9ydCB7IGpzb25saWIgfSBmcm9tIFwiLi4vanNvbmxpYlwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAncG9ydGZvbGlvJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcG9ydGZvbGlvLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wb3J0Zm9saW8uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQb3J0Zm9saW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHBvcnRmb2xpbzogUG9ydGZvbGlvO1xuICAgIGVudHJpZXM7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXHRuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wb3J0Zm9saW8gPSBuZXcgUG9ydGZvbGlvKCk7XG4gICAgICAgIHRoaXMuZW50cmllcyA9IHRoaXMucG9ydGZvbGlvLmdldEVudHJpZXMoKTtcbiAgICB9XG4gICAgbmV3UG9ydGZvbGlvRW50cnkoKSB7XG4gICAgICAgIGxldCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZpZXdDb250YWluZXJSZWZcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuaW5nIGRpYWxvZ1wiKTtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKFBvcnRmb2xpb0lucHV0LCBvcHRpb25zKS50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVc2VyIGFkZGVkIG5ldyBlbnRyeSB0byBwb3J0Zm9saW9cbiAgICAgICAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeShyZXN1bHQpICE9IFwie31cIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFByaWNlKHJlc3VsdC5uYW1lKS50aGVuKHByaWNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9ydGZvbGlvLmFkZEVudHJ5KE5hbWVNYXBwZXIuZ2V0SWQocmVzdWx0Lm5hbWUpLCByZXN1bHQubmFtZSwgcHJpY2UsIHJlc3VsdC5hbW91bnRPd25lZCwgcmVzdWx0LnB1cmNoYXNlZFByaWNlLCByZXN1bHQuZGF0ZVB1cmNoYXNlZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBvcnRmb2xpbyk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5lbnRyaWVzID0gdGhpcy5wb3J0Zm9saW8uZ2V0RW50cmllcygpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb24gcG9ydGZvbGlvIGlucHV0IHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gR2l2ZW4gdGhlIG5hbWUgb2YgYSBjb2luIHJldHVybiBpdHMgcHJpY2VcbiAgICBhc3luYyBnZXRQcmljZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCIgKyBOYW1lTWFwcGVyLmdldElkKG5hbWUpKTtcbiAgICAgICAgbGV0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiBqc29ubGliLm5lc3RlZEpzb25GaW5kZXIoanNvbiwgXCJkYXRhLnF1b3Rlcy5VU0QucHJpY2VcIik7XG4gICAgfVxufVxuIl19