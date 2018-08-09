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
        this.totalValue = 0;
        this.totalSpent = 0;
        this.numCoins = 0;
        (new Sqlite("crypto.db")).then(function (db) {
            db.resultType(Sqlite.RESULTSASOBJECT);
            db.execSQL("CREATE TABLE IF NOT EXISTS portfolio(id INTEGER, name TEXT, price REAL, amountOwned REAL, purchasedPrice REAL, datePurchased TEXT)").then(function (result) {
                _this.database = db;
                console.log("Portfolio table creation successful");
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
                    _this.portfolio.addEntry(name_mapper_1.NameMapper.getId(result.name), result.name, _this.transform(price), result.amountOwned, result.purchasedPrice, result.datePurchased);
                    _this.insertData(name_mapper_1.NameMapper.getId(result.name), result.name, price, result.amountOwned, result.purchasedPrice, result.datePurchased);
                    _this.numCoins++;
                    _this.totalSpent += Number(result.purchasedPrice);
                    _this.totalValue += price;
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
        var _this = this;
        this.database.execSQL("INSERT INTO portfolio (id, name, price, amountOwned, purchasedPrice, datePurchased) values (?, ?, ?, ?, ?, ?)", [id, name, price, amountOwned, purchasedPrice, datePurchased]).then(function (result) {
            console.log("Done inserting!");
            _this.database.all("SELECT * FROM portfolio").then(function (table) {
                console.log("Portfolio table:", table);
            }, function (err) {
                console.log("Error printing table: ", err);
            });
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
    PortfolioComponent.prototype.transform = function (value) {
        var number;
        var str;
        if (isNaN(value)) {
            str = value;
            number = Number(value);
        }
        else {
            number = value;
            str = value.toLocaleString();
        }
        // If number is not a float, return it
        if (str.indexOf(".") == -1) {
            return value;
        }
        // If the number is greater than 1 truncate to 2 decimal places
        if (number > 1) {
            return number.toFixed(2);
        }
        else {
            return number.toFixed(3);
        }
    };
    PortfolioComponent.prototype.ngOnDestroy = function () {
        Sqlite.copyDatabase("crypto.db");
        console.log("Copying Database!");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHlDQUF3QztBQUN4QyxrRUFBMkY7QUFDM0YseUZBQTZFO0FBQzdFLDhDQUE0QztBQUM1QyxzQ0FBcUM7QUFDckMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFROUM7SUFPSSw0QkFBb0IsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBaEcsaUJBWUM7UUFabUIsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUhoRyxlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQ3RCLGVBQVUsR0FBVSxDQUFDLENBQUM7UUFDdEIsYUFBUSxHQUFVLENBQUMsQ0FBQztRQUVoQixDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUM3QixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsT0FBTyxDQUFDLG9JQUFvSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDeEosS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUN2RCxDQUFDLEVBQUUsVUFBQSxLQUFLO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDSixxQ0FBUSxHQUFSO1FBQ08sSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUNELDhDQUFpQixHQUFqQjtRQUFBLGlCQTBCQztRQXpCRyxJQUFJLE9BQU8sR0FBdUI7WUFDOUIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtTQUMxQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLDBDQUFjLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNyRCxVQUFBLE1BQU07WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVCxNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0Qsb0NBQW9DO1lBQ3BDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSztvQkFDakMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsd0JBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM1SixLQUFJLENBQUMsVUFBVSxDQUFDLHdCQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNwSSxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2hCLEtBQUksQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDakQsS0FBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUNELCtCQUErQjtZQUMvQiw4Q0FBOEM7UUFDbEQsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFDRCw0Q0FBNEM7SUFDdEMscUNBQVEsR0FBZCxVQUFlLElBQVk7Ozs7OzRCQUNSLHFCQUFNLEtBQUssQ0FBQywwQ0FBMEMsR0FBRyx3QkFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFBOzt3QkFBM0YsUUFBUSxHQUFHLFNBQWdGO3dCQUNwRixxQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUE1QixJQUFJLEdBQUcsU0FBcUI7d0JBQ2hDLHNCQUFPLGlCQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLHVCQUF1QixDQUFDLEVBQUM7Ozs7S0FDbEU7SUFDRCx1Q0FBVSxHQUFWLFVBQVcsRUFBVSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsV0FBbUIsRUFBRSxjQUFzQixFQUFFLGFBQXFCO1FBQXRILGlCQWVDO1FBZEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsK0dBQStHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN0TSxVQUFBLE1BQU07WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDL0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQzdDLFVBQUEsS0FBSztnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNDLENBQUMsRUFBRSxVQUFBLEdBQUc7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQ0osQ0FBQTtRQUNMLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUNELHNDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FDL0MsVUFBQSxPQUFPO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNDLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUNELHNDQUFTLEdBQVQsVUFBVSxLQUFVO1FBQ2hCLElBQUksTUFBYSxDQUFDO1FBQ2xCLElBQUksR0FBVSxDQUFDO1FBQ2YsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDWixNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDZixHQUFHLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFDRCxzQ0FBc0M7UUFDdEMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsK0RBQStEO1FBQy9ELEVBQUUsQ0FBQSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUVMLENBQUM7SUFDRCx3Q0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQTNHUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQzVDLENBQUM7aURBUW9DLGlDQUFrQixFQUE0Qix1QkFBZ0I7T0FQdkYsa0JBQWtCLENBNEc5QjtJQUFELHlCQUFDO0NBQUEsQUE1R0QsSUE0R0M7QUE1R1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcnRmb2xpbyB9IGZyb20gXCIuL3BvcnRmb2xpb1wiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBQb3J0Zm9saW9JbnB1dCB9IGZyb20gXCIuL3BvcnRmb2xpby1pbnB1dC9wb3J0Zm9saW8taW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOYW1lTWFwcGVyIH0gZnJvbSBcIi4uL25hbWUtbWFwcGVyXCI7XG5pbXBvcnQgeyBqc29ubGliIH0gZnJvbSBcIi4uL2pzb25saWJcIjtcbnZhciBTcWxpdGUgPSByZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIiApO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAncG9ydGZvbGlvJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcG9ydGZvbGlvLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wb3J0Zm9saW8uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQb3J0Zm9saW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcbiAgICBwb3J0Zm9saW86IFBvcnRmb2xpbztcbiAgICBlbnRyaWVzO1xuICAgIHRvdGFsVmFsdWU6bnVtYmVyID0gMDtcbiAgICB0b3RhbFNwZW50Om51bWJlciA9IDA7XG4gICAgbnVtQ29pbnM6bnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJjcnlwdG8uZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgZGIucmVzdWx0VHlwZShTcWxpdGUuUkVTVUxUU0FTT0JKRUNUKTtcbiAgICAgICAgICAgIGRiLmV4ZWNTUUwoXCJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBwb3J0Zm9saW8oaWQgSU5URUdFUiwgbmFtZSBURVhULCBwcmljZSBSRUFMLCBhbW91bnRPd25lZCBSRUFMLCBwdXJjaGFzZWRQcmljZSBSRUFMLCBkYXRlUHVyY2hhc2VkIFRFWFQpXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQb3J0Zm9saW8gdGFibGUgY3JlYXRpb24gc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNSRUFURSBUQUJMRSBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIGRhdGFiYXNlIGVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXHRuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wb3J0Zm9saW8gPSBuZXcgUG9ydGZvbGlvKCk7XG4gICAgICAgIHRoaXMuZW50cmllcyA9IHRoaXMucG9ydGZvbGlvLmdldEVudHJpZXMoKTtcbiAgICB9XG4gICAgbmV3UG9ydGZvbGlvRW50cnkoKSB7XG4gICAgICAgIGxldCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZpZXdDb250YWluZXJSZWZcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuaW5nIGRpYWxvZ1wiKTtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKFBvcnRmb2xpb0lucHV0LCBvcHRpb25zKS50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVc2VyIGFkZGVkIG5ldyBlbnRyeSB0byBwb3J0Zm9saW9cbiAgICAgICAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeShyZXN1bHQpICE9IFwie31cIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFByaWNlKHJlc3VsdC5uYW1lKS50aGVuKHByaWNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9ydGZvbGlvLmFkZEVudHJ5KE5hbWVNYXBwZXIuZ2V0SWQocmVzdWx0Lm5hbWUpLCByZXN1bHQubmFtZSwgdGhpcy50cmFuc2Zvcm0ocHJpY2UpLCByZXN1bHQuYW1vdW50T3duZWQsIHJlc3VsdC5wdXJjaGFzZWRQcmljZSwgcmVzdWx0LmRhdGVQdXJjaGFzZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnREYXRhKE5hbWVNYXBwZXIuZ2V0SWQocmVzdWx0Lm5hbWUpLCByZXN1bHQubmFtZSwgcHJpY2UsIHJlc3VsdC5hbW91bnRPd25lZCwgcmVzdWx0LnB1cmNoYXNlZFByaWNlLCByZXN1bHQuZGF0ZVB1cmNoYXNlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm51bUNvaW5zKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsU3BlbnQgKz0gTnVtYmVyKHJlc3VsdC5wdXJjaGFzZWRQcmljZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsVmFsdWUgKz0gcHJpY2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBvcnRmb2xpbyk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5lbnRyaWVzID0gdGhpcy5wb3J0Zm9saW8uZ2V0RW50cmllcygpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb24gcG9ydGZvbGlvIGlucHV0IHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gR2l2ZW4gdGhlIG5hbWUgb2YgYSBjb2luIHJldHVybiBpdHMgcHJpY2VcbiAgICBhc3luYyBnZXRQcmljZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCIgKyBOYW1lTWFwcGVyLmdldElkKG5hbWUpKTtcbiAgICAgICAgbGV0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiBqc29ubGliLm5lc3RlZEpzb25GaW5kZXIoanNvbiwgXCJkYXRhLnF1b3Rlcy5VU0QucHJpY2VcIik7XG4gICAgfVxuICAgIGluc2VydERhdGEoaWQ6IG51bWJlciwgbmFtZTogc3RyaW5nLCBwcmljZTogbnVtYmVyLCBhbW91bnRPd25lZDogbnVtYmVyLCBwdXJjaGFzZWRQcmljZTogbnVtYmVyLCBkYXRlUHVyY2hhc2VkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiSU5TRVJUIElOVE8gcG9ydGZvbGlvIChpZCwgbmFtZSwgcHJpY2UsIGFtb3VudE93bmVkLCBwdXJjaGFzZWRQcmljZSwgZGF0ZVB1cmNoYXNlZCkgdmFsdWVzICg/LCA/LCA/LCA/LCA/LCA/KVwiLCBbaWQsIG5hbWUsIHByaWNlLCBhbW91bnRPd25lZCwgcHVyY2hhc2VkUHJpY2UsIGRhdGVQdXJjaGFzZWRdKS50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvbmUgaW5zZXJ0aW5nIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIEZST00gcG9ydGZvbGlvXCIpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9ydGZvbGlvIHRhYmxlOlwiLCB0YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHByaW50aW5nIHRhYmxlOiBcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIElOU0VSVElORyBEQVRBXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBjbGVhckRhdGEoKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIkRFTEVURSBGUk9NIHBvcnRmb2xpb1wiKS50aGVuKFxuICAgICAgICAgICAgc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWxldGVkIHBvcnRmb2xpbyB0YWJsZVwiKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGRlbGV0aW5nIHRhYmxlXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSk6c3RyaW5nIHtcbiAgICAgICAgbGV0IG51bWJlcjpudW1iZXI7XG4gICAgICAgIGxldCBzdHI6c3RyaW5nO1xuICAgICAgICBpZihpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHN0ciA9IHZhbHVlO1xuICAgICAgICAgICAgbnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG51bWJlciA9IHZhbHVlO1xuICAgICAgICAgICAgc3RyID0gdmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBudW1iZXIgaXMgbm90IGEgZmxvYXQsIHJldHVybiBpdFxuICAgICAgICBpZihzdHIuaW5kZXhPZihcIi5cIikgPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIGdyZWF0ZXIgdGhhbiAxIHRydW5jYXRlIHRvIDIgZGVjaW1hbCBwbGFjZXNcbiAgICAgICAgaWYobnVtYmVyID4gMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlci50b0ZpeGVkKDIpO1xuICAgICAgICB9IGVsc2UgeyAvLyBJZiB0aGUgbnVtYmVyIGlzIGxlc3MgdGhhbiAxIHRydW5jYXRlIHRvIDMgZGVjaW1hbCBwbGFjZXNcbiAgICAgICAgICAgIHJldHVybiBudW1iZXIudG9GaXhlZCgzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIFNxbGl0ZS5jb3B5RGF0YWJhc2UoXCJjcnlwdG8uZGJcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29weWluZyBEYXRhYmFzZSFcIik7IFxuICAgIH1cbn1cbiJdfQ==