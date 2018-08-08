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
        var _this = this;
        this.modalService = modalService;
        this.viewContainerRef = viewContainerRef;
        (new Sqlite("crypto.db")).then(function (db) {
            db.resultType(Sqlite.RESULTSASOBJECT);
            db.execSQL("CREATE TABLE IF NOT EXISTS portfolio(id INTEGER, name TEXT, price REAL, amountOwned REAL, purchasedPrice REAL, datePurchased TEXT)").then(function (result) {
                _this.database = db;
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("Open database error", error);
        });
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
                    _this.insertData(name_mapper_1.NameMapper.getId(result.name), result.name, price, result.amountOwned, result.purchasedPrice, result.datePurchased);
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
    PortfolioComponent.prototype.insertData = function (id, name, price, amountOwned, purchasedPrice, datePurchased) {
        this.database.execSQL("INSERT INTO portfolio (id, name, price, amountOwned, purchasedPrice, datePurchased) values (?, ?, ?, ?, ?, ?)", [id, name, price, amountOwned, purchasedPrice, datePurchased]).then(function (result) {
            console.log("Done inserting!");
        }, function (error) {
            console.log("ERROR INSERTING DATA", error);
        });
    };
    PortfolioComponent.prototype.clearData = function () {
        this.database.execSQL("DELETE FROM portfolio").then(function (success) {
            console.log("Deleted portfolio table");
        }, function (error) {
            console.log("Error deleting table", error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHlDQUF3QztBQUN4QyxrRUFBMkY7QUFDM0YseUZBQTZFO0FBQzdFLDhDQUE0QztBQUM1QyxzQ0FBcUM7QUFDckMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFROUM7SUFJSSw0QkFBb0IsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBaEcsaUJBV0M7UUFYbUIsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM1RixDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUM3QixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsT0FBTyxDQUFDLG9JQUFvSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDeEosS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLFVBQUEsS0FBSztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0oscUNBQVEsR0FBUjtRQUNPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFDRCw4Q0FBaUIsR0FBakI7UUFBQSxpQkF1QkM7UUF0QkcsSUFBSSxPQUFPLEdBQXVCO1lBQzlCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7U0FDMUMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQywwQ0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDckQsVUFBQSxNQUFNO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUNELG9DQUFvQztZQUNwQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUs7b0JBQ2pDLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHdCQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM1SSxLQUFJLENBQUMsVUFBVSxDQUFDLHdCQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN4SSxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCwrQkFBK0I7WUFDL0IsOENBQThDO1FBQ2xELENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBQ0QsNENBQTRDO0lBQ3RDLHFDQUFRLEdBQWQsVUFBZSxJQUFZOzs7Ozs0QkFDUixxQkFBTSxLQUFLLENBQUMsMENBQTBDLEdBQUcsd0JBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQTs7d0JBQTNGLFFBQVEsR0FBRyxTQUFnRjt3QkFDcEYscUJBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBNUIsSUFBSSxHQUFHLFNBQXFCO3dCQUNoQyxzQkFBTyxpQkFBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSx1QkFBdUIsQ0FBQyxFQUFDOzs7O0tBQ2xFO0lBQ0QsdUNBQVUsR0FBVixVQUFXLEVBQVUsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLFdBQW1CLEVBQUUsY0FBc0IsRUFBRSxhQUFxQjtRQUNsSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQywrR0FBK0csRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3RNLFVBQUEsTUFBTTtZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFDRCxzQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQy9DLFVBQUEsT0FBTztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUMzQyxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFuRVEsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDO2lEQUtvQyxpQ0FBa0IsRUFBNEIsdUJBQWdCO09BSnZGLGtCQUFrQixDQW9FOUI7SUFBRCx5QkFBQztDQUFBLEFBcEVELElBb0VDO0FBcEVZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3J0Zm9saW8gfSBmcm9tIFwiLi9wb3J0Zm9saW9cIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xuaW1wb3J0IHsgUG9ydGZvbGlvSW5wdXQgfSBmcm9tIFwiLi9wb3J0Zm9saW8taW5wdXQvcG9ydGZvbGlvLWlucHV0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTmFtZU1hcHBlciB9IGZyb20gXCIuLi9uYW1lLW1hcHBlclwiO1xuaW1wb3J0IHsganNvbmxpYiB9IGZyb20gXCIuLi9qc29ubGliXCI7XG52YXIgU3FsaXRlID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIgKTtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3BvcnRmb2xpbycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcnRmb2xpby5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcG9ydGZvbGlvLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUG9ydGZvbGlvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gICAgcG9ydGZvbGlvOiBQb3J0Zm9saW87XG4gICAgZW50cmllcztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJjcnlwdG8uZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgZGIucmVzdWx0VHlwZShTcWxpdGUuUkVTVUxUU0FTT0JKRUNUKTtcbiAgICAgICAgICAgIGRiLmV4ZWNTUUwoXCJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBwb3J0Zm9saW8oaWQgSU5URUdFUiwgbmFtZSBURVhULCBwcmljZSBSRUFMLCBhbW91bnRPd25lZCBSRUFMLCBwdXJjaGFzZWRQcmljZSBSRUFMLCBkYXRlUHVyY2hhc2VkIFRFWFQpXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgVEFCTEUgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbiBkYXRhYmFzZSBlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblx0bmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucG9ydGZvbGlvID0gbmV3IFBvcnRmb2xpbygpO1xuICAgICAgICB0aGlzLmVudHJpZXMgPSB0aGlzLnBvcnRmb2xpby5nZXRFbnRyaWVzKCk7XG4gICAgfVxuICAgIG5ld1BvcnRmb2xpb0VudHJ5KCkge1xuICAgICAgICBsZXQgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52aWV3Q29udGFpbmVyUmVmXG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbmluZyBkaWFsb2dcIik7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChQb3J0Zm9saW9JbnB1dCwgb3B0aW9ucykudGhlbihcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZighcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVXNlciBhZGRlZCBuZXcgZW50cnkgdG8gcG9ydGZvbGlvXG4gICAgICAgICAgICAgICAgaWYoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSAhPSBcInt9XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQcmljZShyZXN1bHQubmFtZSkudGhlbihwcmljZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcnRmb2xpby5hZGRFbnRyeShOYW1lTWFwcGVyLmdldElkKHJlc3VsdC5uYW1lKSwgcmVzdWx0Lm5hbWUsIHByaWNlLCByZXN1bHQuYW1vdW50T3duZWQsIHJlc3VsdC5wdXJjaGFzZWRQcmljZSwgcmVzdWx0LmRhdGVQdXJjaGFzZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnREYXRhKE5hbWVNYXBwZXIuZ2V0SWQocmVzdWx0Lm5hbWUpLCByZXN1bHQubmFtZSwgcHJpY2UsIHJlc3VsdC5hbW91bnRPd25lZCwgcmVzdWx0LnB1cmNoYXNlZFByaWNlLCByZXN1bHQuZGF0ZVB1cmNoYXNlZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBvcnRmb2xpbyk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5lbnRyaWVzID0gdGhpcy5wb3J0Zm9saW8uZ2V0RW50cmllcygpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb24gcG9ydGZvbGlvIGlucHV0IHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gR2l2ZW4gdGhlIG5hbWUgb2YgYSBjb2luIHJldHVybiBpdHMgcHJpY2VcbiAgICBhc3luYyBnZXRQcmljZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCIgKyBOYW1lTWFwcGVyLmdldElkKG5hbWUpKTtcbiAgICAgICAgbGV0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiBqc29ubGliLm5lc3RlZEpzb25GaW5kZXIoanNvbiwgXCJkYXRhLnF1b3Rlcy5VU0QucHJpY2VcIik7XG4gICAgfVxuICAgIGluc2VydERhdGEoaWQ6IG51bWJlciwgbmFtZTogc3RyaW5nLCBwcmljZTogbnVtYmVyLCBhbW91bnRPd25lZDogbnVtYmVyLCBwdXJjaGFzZWRQcmljZTogbnVtYmVyLCBkYXRlUHVyY2hhc2VkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiSU5TRVJUIElOVE8gcG9ydGZvbGlvIChpZCwgbmFtZSwgcHJpY2UsIGFtb3VudE93bmVkLCBwdXJjaGFzZWRQcmljZSwgZGF0ZVB1cmNoYXNlZCkgdmFsdWVzICg/LCA/LCA/LCA/LCA/LCA/KVwiLCBbaWQsIG5hbWUsIHByaWNlLCBhbW91bnRPd25lZCwgcHVyY2hhc2VkUHJpY2UsIGRhdGVQdXJjaGFzZWRdKS50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvbmUgaW5zZXJ0aW5nIVwiKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIElOU0VSVElORyBEQVRBXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBjbGVhckRhdGEoKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIkRFTEVURSBGUk9NIHBvcnRmb2xpb1wiKS50aGVuKFxuICAgICAgICAgICAgc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWxldGVkIHBvcnRmb2xpbyB0YWJsZVwiKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGRlbGV0aW5nIHRhYmxlXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbn1cbiJdfQ==