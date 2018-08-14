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
                    _this.portfolio.addEntry(name_mapper_1.NameMapper.getId(result.name), result.name, _this.transform(price), result.amountOwned, result.purchasedPrice, result.datePurchased, result.percentChange);
                    _this.insertData(name_mapper_1.NameMapper.getId(result.name), result.name, price, result.amountOwned, result.purchasedPrice, result.datePurchased);
                    _this.numCoins++;
                    // this.totalSpent += Number(result.purchasedPrice) * result.amountOwned;
                    _this.totalSpent = _this.portfolio.getTotalCost();
                    // this.totalValue += price * result.amountOwned;
                    _this.totalValue = _this.portfolio.getTotalWorth();
                    var totalPercentChange = _this.portfolio.getTotalPercentChange();
                    // console.log("totalPercentChange", totalPercentChange);
                    _this.percentChange24h = (totalPercentChange["24h"] * 100);
                    _this.percentChange7d = (totalPercentChange["7d"] * 100);
                }, function (error) {
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
    PortfolioComponent.prototype.portfolioPercentChange = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHlDQUF3QztBQUN4QyxrRUFBMkY7QUFDM0YseUZBQTZFO0FBQzdFLDhDQUE0QztBQUM1QyxzQ0FBcUM7QUFDckMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFROUM7SUFTSSw0QkFBb0IsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBaEcsaUJBWUM7UUFabUIsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUxoRyxlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQ3RCLGVBQVUsR0FBVSxDQUFDLENBQUM7UUFDdEIsYUFBUSxHQUFVLENBQUMsQ0FBQztRQUloQixDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUM3QixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsT0FBTyxDQUFDLG9JQUFvSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDeEosS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUN2RCxDQUFDLEVBQUUsVUFBQSxLQUFLO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNQLENB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WUFDckIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDO2lEQVVvQyxpQ0FBa0IsRUFBNEIsdUJBQWdCO09BVHZGLGtCQUFrQixDQXlIOUI7SUFBRCx5QkFBQztDQUFBLEFBekhELElBeUhDO0FBekhZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3J0Zm9saW8gfSBmcm9tIFwiLi9wb3J0Zm9saW9cIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xuaW1wb3J0IHsgUG9ydGZvbGlvSW5wdXQgfSBmcm9tIFwiLi9wb3J0Zm9saW8taW5wdXQvcG9ydGZvbGlvLWlucHV0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTmFtZU1hcHBlciB9IGZyb20gXCIuLi9uYW1lLW1hcHBlclwiO1xuaW1wb3J0IHsganNvbmxpYiB9IGZyb20gXCIuLi9qc29ubGliXCI7XG52YXIgU3FsaXRlID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIgKTtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3BvcnRmb2xpbycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcnRmb2xpby5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcG9ydGZvbGlvLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUG9ydGZvbGlvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gICAgcG9ydGZvbGlvOiBQb3J0Zm9saW87XG4gICAgZW50cmllcztcbiAgICB0b3RhbFZhbHVlOm51bWJlciA9IDA7XG4gICAgdG90YWxTcGVudDpudW1iZXIgPSAwO1xuICAgIG51bUNvaW5zOm51bWJlciA9IDA7XG4gICAgcGVyY2VudENoYW5nZTI0aDpudW1iZXI7XG4gICAgcGVyY2VudENoYW5nZTdkOm51bWJlcjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJjcnlwdG8uZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgZGIucmVzdWx0VHlwZShTcWxpdGUuUkVTVUxUU0FTT0JKRUNUKTtcbiAgICAgICAgICAgIGRiLmV4ZWNTUUwoXCJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBwb3J0Zm9saW8oaWQgSU5URUdFUiwgbmFtZSBURVhULCBwcmljZSBSRUFMLCBhbW91bnRPd25lZCBSRUFMLCBwdXJjaGFzZWRQcmljZSBSRUFMLCBkYXRlUHVyY2hhc2VkIFRFWFQpXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQb3J0Zm9saW8gdGFibGUgY3JlYXRpb24gc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNSRUFURSBUQUJMRSBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIGRhdGFiYXNlIGVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXHRuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wb3J0Zm9saW8gPSBuZXcgUG9ydGZvbGlvKCk7XG4gICAgICAgIHRoaXMuZW50cmllcyA9IHRoaXMucG9ydGZvbGlvLmdldEVudHJpZXMoKTtcbiAgICB9XG4gICAgbmV3UG9ydGZvbGlvRW50cnkoKSB7XG4gICAgICAgIGxldCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZpZXdDb250YWluZXJSZWZcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuaW5nIGRpYWxvZ1wiKTtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKFBvcnRmb2xpb0lucHV0LCBvcHRpb25zKS50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVc2VyIGFkZGVkIG5ldyBlbnRyeSB0byBwb3J0Zm9saW9cbiAgICAgICAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeShyZXN1bHQpICE9IFwie31cIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFByaWNlKHJlc3VsdC5uYW1lKS50aGVuKHByaWNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9ydGZvbGlvLmFkZEVudHJ5KE5hbWVNYXBwZXIuZ2V0SWQocmVzdWx0Lm5hbWUpLCByZXN1bHQubmFtZSwgdGhpcy50cmFuc2Zvcm0ocHJpY2UpLCByZXN1bHQuYW1vdW50T3duZWQsIHJlc3VsdC5wdXJjaGFzZWRQcmljZSwgcmVzdWx0LmRhdGVQdXJjaGFzZWQsIHJlc3VsdC5wZXJjZW50Q2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0RGF0YShOYW1lTWFwcGVyLmdldElkKHJlc3VsdC5uYW1lKSwgcmVzdWx0Lm5hbWUsIHByaWNlLCByZXN1bHQuYW1vdW50T3duZWQsIHJlc3VsdC5wdXJjaGFzZWRQcmljZSwgcmVzdWx0LmRhdGVQdXJjaGFzZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1Db2lucysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy50b3RhbFNwZW50ICs9IE51bWJlcihyZXN1bHQucHVyY2hhc2VkUHJpY2UpICogcmVzdWx0LmFtb3VudE93bmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbFNwZW50ID0gdGhpcy5wb3J0Zm9saW8uZ2V0VG90YWxDb3N0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRvdGFsVmFsdWUgKz0gcHJpY2UgKiByZXN1bHQuYW1vdW50T3duZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsVmFsdWUgPSB0aGlzLnBvcnRmb2xpby5nZXRUb3RhbFdvcnRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG90YWxQZXJjZW50Q2hhbmdlID0gdGhpcy5wb3J0Zm9saW8uZ2V0VG90YWxQZXJjZW50Q2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRvdGFsUGVyY2VudENoYW5nZVwiLCB0b3RhbFBlcmNlbnRDaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50Q2hhbmdlMjRoID0gKHRvdGFsUGVyY2VudENoYW5nZVtcIjI0aFwiXSAqIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmNlbnRDaGFuZ2U3ZCA9ICh0b3RhbFBlcmNlbnRDaGFuZ2VbXCI3ZFwiXSAqIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3J0Zm9saW8pO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZW50cmllcyA9IHRoaXMucG9ydGZvbGlvLmdldEVudHJpZXMoKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIG9uIHBvcnRmb2xpbyBpbnB1dCByZXNwb25zZVwiKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIC8vIEdpdmVuIHRoZSBuYW1lIG9mIGEgY29pbiByZXR1cm4gaXRzIHByaWNlXG4gICAgYXN5bmMgZ2V0UHJpY2UobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkuY29pbm1hcmtldGNhcC5jb20vdjIvdGlja2VyL1wiICsgTmFtZU1hcHBlci5nZXRJZChuYW1lKSk7XG4gICAgICAgIGxldCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICByZXR1cm4ganNvbmxpYi5uZXN0ZWRKc29uRmluZGVyKGpzb24sIFwiZGF0YS5xdW90ZXMuVVNELnByaWNlXCIpO1xuICAgIH1cbiAgICBpbnNlcnREYXRhKGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcHJpY2U6IG51bWJlciwgYW1vdW50T3duZWQ6IG51bWJlciwgcHVyY2hhc2VkUHJpY2U6IG51bWJlciwgZGF0ZVB1cmNoYXNlZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIklOU0VSVCBJTlRPIHBvcnRmb2xpbyAoaWQsIG5hbWUsIHByaWNlLCBhbW91bnRPd25lZCwgcHVyY2hhc2VkUHJpY2UsIGRhdGVQdXJjaGFzZWQpIHZhbHVlcyAoPywgPywgPywgPywgPywgPylcIiwgW2lkLCBuYW1lLCBwcmljZSwgYW1vdW50T3duZWQsIHB1cmNoYXNlZFByaWNlLCBkYXRlUHVyY2hhc2VkXSkudGhlbihcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb25lIGluc2VydGluZyFcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5hbGwoXCJTRUxFQ1QgKiBGUk9NIHBvcnRmb2xpb1wiKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICB0YWJsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvcnRmb2xpbyB0YWJsZTpcIiwgdGFibGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBwcmludGluZyB0YWJsZTogXCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBJTlNFUlRJTkcgREFUQVwiLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgY2xlYXJEYXRhKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJERUxFVEUgRlJPTSBwb3J0Zm9saW9cIikudGhlbihcbiAgICAgICAgICAgIHN1Y2Nlc3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlZCBwb3J0Zm9saW8gdGFibGVcIik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkZWxldGluZyB0YWJsZVwiLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnkpOnN0cmluZyB7XG4gICAgICAgIGxldCBudW1iZXI6bnVtYmVyO1xuICAgICAgICBsZXQgc3RyOnN0cmluZztcbiAgICAgICAgaWYoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICBzdHIgPSB2YWx1ZTtcbiAgICAgICAgICAgIG51bWJlciA9IE51bWJlcih2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW1iZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIHN0ciA9IHZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgbnVtYmVyIGlzIG5vdCBhIGZsb2F0LCByZXR1cm4gaXRcbiAgICAgICAgaWYoc3RyLmluZGV4T2YoXCIuXCIpID09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIG51bWJlciBpcyBncmVhdGVyIHRoYW4gMSB0cnVuY2F0ZSB0byAyIGRlY2ltYWwgcGxhY2VzXG4gICAgICAgIGlmKG51bWJlciA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudW1iZXIudG9GaXhlZCgyKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gSWYgdGhlIG51bWJlciBpcyBsZXNzIHRoYW4gMSB0cnVuY2F0ZSB0byAzIGRlY2ltYWwgcGxhY2VzXG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyLnRvRml4ZWQoMyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBTcWxpdGUuY29weURhdGFiYXNlKFwiY3J5cHRvLmRiXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvcHlpbmcgRGF0YWJhc2UhXCIpOyBcbiAgICB9XG4gICAgcHJpdmF0ZSBwb3J0Zm9saW9QZXJjZW50Q2hhbmdlKCkge1xuXG4gICAgfVxufVxuIl19