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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, result, price;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            viewContainerRef: this.viewContainerRef
                        };
                        console.log("Opening dialog");
                        return [4 /*yield*/, this.modalService.showModal(portfolio_input_component_1.PortfolioInput, options)];
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
                        this.entries = this.portfolio.getEntries();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHlDQUF3QztBQUN4QyxrRUFBMkY7QUFDM0YseUZBQTZFO0FBQzdFLDhDQUE0QztBQUM1QyxzQ0FBcUM7QUFRckM7SUFHSSw0QkFBb0IsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBNUUsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFDdkcscUNBQVEsR0FBUjtRQUNPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFDSyw4Q0FBaUIsR0FBdkI7Ozs7Ozt3QkFDUSxPQUFPLEdBQXVCOzRCQUM5QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO3lCQUMxQyxDQUFDO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDakIscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsMENBQWMsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQW5FLE1BQU0sR0FBRyxTQUEwRDt3QkFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFFakIsQ0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQSxFQUE5Qix3QkFBOEI7d0JBQ2pCLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBeEMsS0FBSyxHQUFHLFNBQWdDO3dCQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3QkFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7O3dCQUVoSixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDOzs7OztLQUM5QztJQUNELDRDQUE0QztJQUN0QyxxQ0FBUSxHQUFkLFVBQWUsSUFBWTs7Ozs7NEJBQ1IscUJBQU0sS0FBSyxDQUFDLDBDQUEwQyxHQUFHLHdCQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUE7O3dCQUEzRixRQUFRLEdBQUcsU0FBZ0Y7d0JBQ3BGLHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQTVCLElBQUksR0FBRyxTQUFxQjt3QkFDaEMsc0JBQU8saUJBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLENBQUMsRUFBQzs7OztLQUNsRTtJQTVCUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQzVDLENBQUM7aURBSW9DLGlDQUFrQixFQUE0Qix1QkFBZ0I7T0FIdkYsa0JBQWtCLENBNkI5QjtJQUFELHlCQUFDO0NBQUEsQUE3QkQsSUE2QkM7QUE3QlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcnRmb2xpbyB9IGZyb20gXCIuL3BvcnRmb2xpb1wiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBQb3J0Zm9saW9JbnB1dCB9IGZyb20gXCIuL3BvcnRmb2xpby1pbnB1dC9wb3J0Zm9saW8taW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOYW1lTWFwcGVyIH0gZnJvbSBcIi4uL25hbWUtbWFwcGVyXCI7XG5pbXBvcnQgeyBqc29ubGliIH0gZnJvbSBcIi4uL2pzb25saWJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3BvcnRmb2xpbycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcnRmb2xpby5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcG9ydGZvbGlvLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUG9ydGZvbGlvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwb3J0Zm9saW86IFBvcnRmb2xpbztcbiAgICBlbnRyaWVzO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge31cblx0bmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucG9ydGZvbGlvID0gbmV3IFBvcnRmb2xpbygpO1xuICAgICAgICB0aGlzLmVudHJpZXMgPSB0aGlzLnBvcnRmb2xpby5nZXRFbnRyaWVzKCk7XG4gICAgfVxuICAgIGFzeW5jIG5ld1BvcnRmb2xpb0VudHJ5KCkge1xuICAgICAgICBsZXQgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52aWV3Q29udGFpbmVyUmVmXG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbmluZyBkaWFsb2dcIik7XG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoUG9ydGZvbGlvSW5wdXQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAvLyBVc2VyIGFkZGVkIG5ldyBlbnRyeSB0byBwb3J0Zm9saW9cbiAgICAgICAgaWYoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSAhPSBcInt9XCIpIHtcbiAgICAgICAgICAgIGxldCBwcmljZSA9IGF3YWl0IHRoaXMuZ2V0UHJpY2UocmVzdWx0Lm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5wb3J0Zm9saW8uYWRkRW50cnkoTmFtZU1hcHBlci5nZXRJZChyZXN1bHQubmFtZSksIHJlc3VsdC5uYW1lLCBwcmljZSwgcmVzdWx0LmFtb3VudE93bmVkLCByZXN1bHQucHVyY2hhc2VkUHJpY2UsIHJlc3VsdC5kYXRlUHVyY2hhc2VkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBvcnRmb2xpbyk7XG4gICAgICAgIHRoaXMuZW50cmllcyA9IHRoaXMucG9ydGZvbGlvLmdldEVudHJpZXMoKTtcbiAgICB9XG4gICAgLy8gR2l2ZW4gdGhlIG5hbWUgb2YgYSBjb2luIHJldHVybiBpdHMgcHJpY2VcbiAgICBhc3luYyBnZXRQcmljZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCIgKyBOYW1lTWFwcGVyLmdldElkKG5hbWUpKTtcbiAgICAgICAgbGV0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiBqc29ubGliLm5lc3RlZEpzb25GaW5kZXIoanNvbiwgXCJkYXRhLnF1b3Rlcy5VU0QucHJpY2VcIik7XG4gICAgfVxufVxuIl19