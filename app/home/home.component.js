"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var global_settings_1 = require("./global_settings");
var Sqlite = require("nativescript-sqlite");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(page) {
        var _this = this;
        this.page = page;
        page.actionBarHidden = true;
        (new Sqlite("crypto.db")).then(function (db) {
            db.resultType(Sqlite.RESULTSASOBJECTS);
            console.log("Successfully opened database in home");
            _this.database = db;
        }, function (error) {
            console.log("Error opening database in home", error);
        });
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent.prototype.printMarket = function () {
        this.database.all("SELECT * FROM market").then(function (result) {
            console.log(result);
        });
    };
    HomeComponent.prototype.printPortfolio = function () {
        this.database.all("SELECT * FROM portfolio").then(function (table) {
            console.log("Portfolio table:", table);
        }, function (err) {
            console.log("Error printing table: ", err);
        });
    };
    HomeComponent.prototype.clearMarket = function () {
        this.database.execSQL("DELETE FROM market").then(function (success) {
            console.log("Successfully cleared market");
        }, function (error) {
            console.log("Error clearing market", error);
        });
    };
    HomeComponent.prototype.clearPorfolio = function () {
        this.database.execSQL("DELETE FROM porfolio").then(function (success) {
            console.log("Successfully cleared portfolio");
        }, function (error) {
            console.log("Error clearing portfolio", error);
        });
    };
    HomeComponent.prototype.printCurrency = function () {
        console.log(global_settings_1.GlobalSettings.getCurrency());
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0U7QUFDcEUsZ0NBQStCO0FBQy9CLHFEQUFtRDtBQUNuRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUUscUJBQXFCLENBQUUsQ0FBQztBQVE5QztJQUdJLHVCQUFvQixJQUFVO1FBQTlCLGlCQVdDO1FBWG1CLFNBQUksR0FBSixJQUFJLENBQU07UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDMUIsVUFBQSxFQUFFO1lBQ0UsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7WUFDcEQsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBYkQsZ0NBQVEsR0FBUixjQUFZLENBQUM7SUFjYixtQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQzFDLFVBQUEsTUFBTTtZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBQ0Qsc0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUM3QyxVQUFBLEtBQUs7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUMsRUFBRSxVQUFBLEdBQUc7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUNELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FDNUMsVUFBQSxPQUFPO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQy9DLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUNELHFDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FDOUMsVUFBQSxPQUFPO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2xELENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUNELHFDQUFhLEdBQWI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBbkRRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1NBQ3ZDLENBQUM7UUFDRixtRUFBbUU7O2lEQUlyQyxXQUFJO09BSHJCLGFBQWEsQ0FvRHpCO0lBQUQsb0JBQUM7Q0FBQSxBQXBERCxJQW9EQztBQXBEWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3MgfSBmcm9tIFwiLi9nbG9iYWxfc2V0dGluZ3NcIjtcbnZhciBTcWxpdGUgPSByZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIiApO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJIb21lXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUuY29tcG9uZW50Lmh0bWxcIlxufSlcbi8vIFRPRE86IEFkZCBkcm9wZG93bnMgdG8gY2hhbmdlIGV4Y2hhbmdlIGFuZCBtYXliZSBwaWNrIGZhdm9yaXRlcz9cbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBuZ09uSW5pdCgpIHt9XG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIChuZXcgU3FsaXRlKFwiY3J5cHRvLmRiXCIpKS50aGVuKFxuICAgICAgICAgICAgZGIgPT4ge1xuICAgICAgICAgICAgICAgIGRiLnJlc3VsdFR5cGUoU3FsaXRlLlJFU1VMVFNBU09CSkVDVFMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc2Z1bGx5IG9wZW5lZCBkYXRhYmFzZSBpbiBob21lXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIG9wZW5pbmcgZGF0YWJhc2UgaW4gaG9tZVwiLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgcHJpbnRNYXJrZXQoKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBtYXJrZXRcIikudGhlbihcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBwcmludFBvcnRmb2xpbygpIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5hbGwoXCJTRUxFQ1QgKiBGUk9NIHBvcnRmb2xpb1wiKS50aGVuKFxuICAgICAgICAgICAgdGFibGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9ydGZvbGlvIHRhYmxlOlwiLCB0YWJsZSk7XG4gICAgICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcHJpbnRpbmcgdGFibGU6IFwiLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIGNsZWFyTWFya2V0KCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJERUxFVEUgRlJPTSBtYXJrZXRcIikudGhlbihcbiAgICAgICAgICAgIHN1Y2Nlc3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc2Z1bGx5IGNsZWFyZWQgbWFya2V0XCIpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgY2xlYXJpbmcgbWFya2V0XCIsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBjbGVhclBvcmZvbGlvKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJERUxFVEUgRlJPTSBwb3Jmb2xpb1wiKS50aGVuKFxuICAgICAgICAgICAgc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzZnVsbHkgY2xlYXJlZCBwb3J0Zm9saW9cIik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBjbGVhcmluZyBwb3J0Zm9saW9cIiwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIHByaW50Q3VycmVuY3koKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEdsb2JhbFNldHRpbmdzLmdldEN1cnJlbmN5KCkpO1xuICAgIH1cbn1cbiJdfQ==