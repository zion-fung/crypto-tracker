"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0U7QUFDcEUsZ0NBQStCO0FBQy9CLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBRSxxQkFBcUIsQ0FBRSxDQUFDO0FBUTlDO0lBR0ksdUJBQW9CLElBQVU7UUFBOUIsaUJBV0M7UUFYbUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMxQixVQUFBLEVBQUU7WUFDRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztZQUNwRCxLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN2QixDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFiRCxnQ0FBUSxHQUFSLGNBQVksQ0FBQztJQWNiLG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FDMUMsVUFBQSxNQUFNO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFDRCxzQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQzdDLFVBQUEsS0FBSztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFFLFVBQUEsR0FBRztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBQ0QsbUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUM1QyxVQUFBLE9BQU87WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDL0MsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBQ0QscUNBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUM5QyxVQUFBLE9BQU87WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBaERRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1NBQ3ZDLENBQUM7UUFDRixtRUFBbUU7O2lEQUlyQyxXQUFJO09BSHJCLGFBQWEsQ0FpRHpCO0lBQUQsb0JBQUM7Q0FBQSxBQWpERCxJQWlEQztBQWpEWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xudmFyIFNxbGl0ZSA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiICk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkhvbWVcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiXG59KVxuLy8gVE9ETzogQWRkIGRyb3Bkb3ducyB0byBjaGFuZ2UgZXhjaGFuZ2UgYW5kIG1heWJlIHBpY2sgZmF2b3JpdGVzP1xuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIG5nT25Jbml0KCkge31cbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJjcnlwdG8uZGJcIikpLnRoZW4oXG4gICAgICAgICAgICBkYiA9PiB7XG4gICAgICAgICAgICAgICAgZGIucmVzdWx0VHlwZShTcWxpdGUuUkVTVUxUU0FTT0JKRUNUUyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzZnVsbHkgb3BlbmVkIGRhdGFiYXNlIGluIGhvbWVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb3BlbmluZyBkYXRhYmFzZSBpbiBob21lXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBwcmludE1hcmtldCgpIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5hbGwoXCJTRUxFQ1QgKiBGUk9NIG1hcmtldFwiKS50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIHByaW50UG9ydGZvbGlvKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIEZST00gcG9ydGZvbGlvXCIpLnRoZW4oXG4gICAgICAgICAgICB0YWJsZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQb3J0Zm9saW8gdGFibGU6XCIsIHRhYmxlKTtcbiAgICAgICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBwcmludGluZyB0YWJsZTogXCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgY2xlYXJNYXJrZXQoKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIkRFTEVURSBGUk9NIG1hcmtldFwiKS50aGVuKFxuICAgICAgICAgICAgc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzZnVsbHkgY2xlYXJlZCBtYXJrZXRcIik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBjbGVhcmluZyBtYXJrZXRcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIGNsZWFyUG9yZm9saW8oKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIkRFTEVURSBGUk9NIHBvcmZvbGlvXCIpLnRoZW4oXG4gICAgICAgICAgICBzdWNjZXNzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NmdWxseSBjbGVhcmVkIHBvcnRmb2xpb1wiKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGNsZWFyaW5nIHBvcnRmb2xpb1wiLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=