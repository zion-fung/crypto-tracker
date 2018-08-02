"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var portfolio_1 = require("./portfolio");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var dialog_content_component_1 = require("./dialog-content.component");
var name_mapper_1 = require("../name-mapper");
var jsonlib_1 = require("../jsonlib");
var PortfolioComponent = /** @class */ (function () {
    function PortfolioComponent(modalService, viewContainerRef) {
        this.modalService = modalService;
        this.viewContainerRef = viewContainerRef;
    }
    PortfolioComponent.prototype.ngOnInit = function () {
        this.portfolio = new portfolio_1.Portfolio();
    };
    PortfolioComponent.prototype.newPortfolioEntry = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, result, price;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            viewContainerRef: this.viewContainerRef
                        };
                        return [4 /*yield*/, this.modalService.showModal(dialog_content_component_1.DialogContent, options)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (!(JSON.stringify(result) != "{}")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getPrice(result.name)];
                    case 2:
                        price = _a.sent();
                        this.portfolio.addEntry(name_mapper_1.NameMapper.getId(result.name), result.name, price, result.amountOwned, result.purchasedPrice, result.datePurchased);
                        _a.label = 3;
                    case 3:
                        console.log(this.portfolio);
                        return [2 /*return*/];
                }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHlDQUF3QztBQUN4QyxrRUFBMkY7QUFDM0YsdUVBQTJEO0FBQzNELDhDQUE0QztBQUM1QyxzQ0FBcUM7QUFRckM7SUFFSSw0QkFBb0IsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBNUUsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFDdkcscUNBQVEsR0FBUjtRQUNPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUNLLDhDQUFpQixHQUF2Qjs7Ozs7O3dCQUNRLE9BQU8sR0FBdUI7NEJBQzlCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7eUJBQzFDLENBQUM7d0JBQ1cscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsd0NBQWEsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQWxFLE1BQU0sR0FBRyxTQUF5RDt3QkFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFFakIsQ0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQSxFQUE5Qix3QkFBOEI7d0JBQ2pCLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBeEMsS0FBSyxHQUFHLFNBQWdDO3dCQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3QkFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7O3dCQUVoSixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7S0FDL0I7SUFDRCw0Q0FBNEM7SUFDdEMscUNBQVEsR0FBZCxVQUFlLElBQVk7Ozs7OzRCQUNSLHFCQUFNLEtBQUssQ0FBQywwQ0FBMEMsR0FBRyx3QkFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFBOzt3QkFBM0YsUUFBUSxHQUFHLFNBQWdGO3dCQUNwRixxQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUE1QixJQUFJLEdBQUcsU0FBcUI7d0JBQ2hDLHNCQUFPLGlCQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLHVCQUF1QixDQUFDLEVBQUM7Ozs7S0FDbEU7SUF4QlEsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDO2lEQUdvQyxpQ0FBa0IsRUFBNEIsdUJBQWdCO09BRnZGLGtCQUFrQixDQXlCOUI7SUFBRCx5QkFBQztDQUFBLEFBekJELElBeUJDO0FBekJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3J0Zm9saW8gfSBmcm9tIFwiLi9wb3J0Zm9saW9cIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xuaW1wb3J0IHsgRGlhbG9nQ29udGVudCB9IGZyb20gXCIuL2RpYWxvZy1jb250ZW50LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTmFtZU1hcHBlciB9IGZyb20gXCIuLi9uYW1lLW1hcHBlclwiO1xuaW1wb3J0IHsganNvbmxpYiB9IGZyb20gXCIuLi9qc29ubGliXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwb3J0Zm9saW8nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3J0Zm9saW8uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3BvcnRmb2xpby5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBvcnRmb2xpb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcG9ydGZvbGlvOiBQb3J0Zm9saW87XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXHRuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wb3J0Zm9saW8gPSBuZXcgUG9ydGZvbGlvKCk7XG4gICAgfVxuICAgIGFzeW5jIG5ld1BvcnRmb2xpb0VudHJ5KCkge1xuICAgICAgICBsZXQgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52aWV3Q29udGFpbmVyUmVmXG4gICAgICAgIH07XG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoRGlhbG9nQ29udGVudCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIC8vIFVzZXIgYWRkZWQgbmV3IGVudHJ5IHRvIHBvcnRmb2xpb1xuICAgICAgICBpZihKU09OLnN0cmluZ2lmeShyZXN1bHQpICE9IFwie31cIikge1xuICAgICAgICAgICAgbGV0IHByaWNlID0gYXdhaXQgdGhpcy5nZXRQcmljZShyZXN1bHQubmFtZSk7XG4gICAgICAgICAgICB0aGlzLnBvcnRmb2xpby5hZGRFbnRyeShOYW1lTWFwcGVyLmdldElkKHJlc3VsdC5uYW1lKSwgcmVzdWx0Lm5hbWUsIHByaWNlLCByZXN1bHQuYW1vdW50T3duZWQsIHJlc3VsdC5wdXJjaGFzZWRQcmljZSwgcmVzdWx0LmRhdGVQdXJjaGFzZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucG9ydGZvbGlvKTtcbiAgICB9XG4gICAgLy8gR2l2ZW4gdGhlIG5hbWUgb2YgYSBjb2luIHJldHVybiBpdHMgcHJpY2VcbiAgICBhc3luYyBnZXRQcmljZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCIgKyBOYW1lTWFwcGVyLmdldElkKG5hbWUpKTtcbiAgICAgICAgbGV0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiBqc29ubGliLm5lc3RlZEpzb25GaW5kZXIoanNvbiwgXCJkYXRhLnF1b3Rlcy5VU0QucHJpY2VcIik7XG4gICAgfVxufVxuIl19