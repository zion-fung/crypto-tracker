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
                    // this.portfolio.addEntry(NameMapper.getId(result.name), result.name, price, result.amountOwned, result.purchasedPrice, result.datePurchased);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHlDQUF3QztBQUN4QyxrRUFBMkY7QUFDM0YseUZBQTZFO0FBQzdFLDhDQUE0QztBQUM1QyxzQ0FBcUM7QUFDckMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFROUM7SUFJSSw0QkFBb0IsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBaEcsaUJBV0M7UUFYbUIsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM1RixDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUM3QixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsT0FBTyxDQUFDLG9JQUFvSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDeEosS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLFVBQUEsS0FBSztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0oscUNBQVEsR0FBUjtRQUNPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxD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Q25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDNUMsQ0FBQztpREFLb0MsaUNBQWtCLEVBQTRCLHVCQUFnQjtPQUp2RixrQkFBa0IsQ0FvRTlCO0lBQUQseUJBQUM7Q0FBQSxBQXBFRCxJQW9FQztBQXBFWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9ydGZvbGlvIH0gZnJvbSBcIi4vcG9ydGZvbGlvXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UsIE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IFBvcnRmb2xpb0lucHV0IH0gZnJvbSBcIi4vcG9ydGZvbGlvLWlucHV0L3BvcnRmb2xpby1pbnB1dC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5hbWVNYXBwZXIgfSBmcm9tIFwiLi4vbmFtZS1tYXBwZXJcIjtcbmltcG9ydCB7IGpzb25saWIgfSBmcm9tIFwiLi4vanNvbmxpYlwiO1xudmFyIFNxbGl0ZSA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiICk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwb3J0Zm9saW8nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3J0Zm9saW8uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3BvcnRmb2xpby5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBvcnRmb2xpb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuICAgIHBvcnRmb2xpbzogUG9ydGZvbGlvO1xuICAgIGVudHJpZXM7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIChuZXcgU3FsaXRlKFwiY3J5cHRvLmRiXCIpKS50aGVuKGRiID0+IHtcbiAgICAgICAgICAgIGRiLnJlc3VsdFR5cGUoU3FsaXRlLlJFU1VMVFNBU09CSkVDVCk7XG4gICAgICAgICAgICBkYi5leGVjU1FMKFwiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcG9ydGZvbGlvKGlkIElOVEVHRVIsIG5hbWUgVEVYVCwgcHJpY2UgUkVBTCwgYW1vdW50T3duZWQgUkVBTCwgcHVyY2hhc2VkUHJpY2UgUkVBTCwgZGF0ZVB1cmNoYXNlZCBURVhUKVwiKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gZGF0YWJhc2UgZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cdG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBvcnRmb2xpbyA9IG5ldyBQb3J0Zm9saW8oKTtcbiAgICAgICAgdGhpcy5lbnRyaWVzID0gdGhpcy5wb3J0Zm9saW8uZ2V0RW50cmllcygpO1xuICAgIH1cbiAgICBuZXdQb3J0Zm9saW9FbnRyeSgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZlxuICAgICAgICB9O1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5pbmcgZGlhbG9nXCIpO1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoUG9ydGZvbGlvSW5wdXQsIG9wdGlvbnMpLnRoZW4oXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFVzZXIgYWRkZWQgbmV3IGVudHJ5IHRvIHBvcnRmb2xpb1xuICAgICAgICAgICAgICAgIGlmKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkgIT0gXCJ7fVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJpY2UocmVzdWx0Lm5hbWUpLnRoZW4ocHJpY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5wb3J0Zm9saW8uYWRkRW50cnkoTmFtZU1hcHBlci5nZXRJZChyZXN1bHQubmFtZSksIHJlc3VsdC5uYW1lLCBwcmljZSwgcmVzdWx0LmFtb3VudE93bmVkLCByZXN1bHQucHVyY2hhc2VkUHJpY2UsIHJlc3VsdC5kYXRlUHVyY2hhc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0RGF0YShOYW1lTWFwcGVyLmdldElkKHJlc3VsdC5uYW1lKSwgcmVzdWx0Lm5hbWUsIHByaWNlLCByZXN1bHQuYW1vdW50T3duZWQsIHJlc3VsdC5wdXJjaGFzZWRQcmljZSwgcmVzdWx0LmRhdGVQdXJjaGFzZWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3J0Zm9saW8pO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZW50cmllcyA9IHRoaXMucG9ydGZvbGlvLmdldEVudHJpZXMoKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIG9uIHBvcnRmb2xpbyBpbnB1dCByZXNwb25zZVwiKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIC8vIEdpdmVuIHRoZSBuYW1lIG9mIGEgY29pbiByZXR1cm4gaXRzIHByaWNlXG4gICAgYXN5bmMgZ2V0UHJpY2UobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkuY29pbm1hcmtldGNhcC5jb20vdjIvdGlja2VyL1wiICsgTmFtZU1hcHBlci5nZXRJZChuYW1lKSk7XG4gICAgICAgIGxldCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICByZXR1cm4ganNvbmxpYi5uZXN0ZWRKc29uRmluZGVyKGpzb24sIFwiZGF0YS5xdW90ZXMuVVNELnByaWNlXCIpO1xuICAgIH1cbiAgICBpbnNlcnREYXRhKGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcHJpY2U6IG51bWJlciwgYW1vdW50T3duZWQ6IG51bWJlciwgcHVyY2hhc2VkUHJpY2U6IG51bWJlciwgZGF0ZVB1cmNoYXNlZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIklOU0VSVCBJTlRPIHBvcnRmb2xpbyAoaWQsIG5hbWUsIHByaWNlLCBhbW91bnRPd25lZCwgcHVyY2hhc2VkUHJpY2UsIGRhdGVQdXJjaGFzZWQpIHZhbHVlcyAoPywgPywgPywgPywgPywgPylcIiwgW2lkLCBuYW1lLCBwcmljZSwgYW1vdW50T3duZWQsIHB1cmNoYXNlZFByaWNlLCBkYXRlUHVyY2hhc2VkXSkudGhlbihcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb25lIGluc2VydGluZyFcIik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBJTlNFUlRJTkcgREFUQVwiLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgY2xlYXJEYXRhKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJERUxFVEUgRlJPTSBwb3J0Zm9saW9cIikudGhlbihcbiAgICAgICAgICAgIHN1Y2Nlc3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlZCBwb3J0Zm9saW8gdGFibGVcIik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkZWxldGluZyB0YWJsZVwiLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=