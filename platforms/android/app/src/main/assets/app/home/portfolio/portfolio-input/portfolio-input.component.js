"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
var dialogs_1 = require("ui/dialogs");
var name_mapper_1 = require("../../name-mapper");
var page_1 = require("ui/page");
var Sqlite = require("nativescript-sqlite");
var portfolio_verify_1 = require("./portfolio-verify");
var PortfolioInput = /** @class */ (function () {
    function PortfolioInput(params, picker) {
        var _this = this;
        this.params = params;
        this.picker = picker;
        this.incorrectDateString = "Date must be in format: DD/MM/YYYY and not in the future";
        // Contains the ids of every field that must be filled out
        this.ids = ["name", "amountOwned", "purchasedPrice", "datePurchased"];
        // Contains the results of the dialog and their default values
        this.results = {};
        this.searchResults = [];
        this.market = [];
        this.showResults = false;
        this.inputOpacity = "1";
        (new Sqlite("crypto.db")).then(function (db) {
            db.resultType(Sqlite.RESULTSASOBJECTS);
            _this.database = db;
            _this.database.all("SELECT * FROM market").then(function (result) {
                _this.market = result;
            });
        }, function (error) {
            console.log("Error opening database in portfolio input", error);
        });
    }
    PortfolioInput.prototype.ngOnInit = function () {
        var today = new Date();
        this.results["datePurchased"] = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
        this.results["amountOwned"] = 0;
        this.results["name"] = "";
    };
    /* @param obj : The textfield object containing the text and id
    *
    * */
    PortfolioInput.prototype.update = function (obj) {
        var text = obj.text;
        if (text != undefined) {
            this.results[obj.id] = text;
        }
    };
    PortfolioInput.prototype.increaseAmountOwned = function () {
        this.results["amountOwned"]++;
    };
    PortfolioInput.prototype.decreaseAmountOwned = function () {
        if (this.results["amountOwned"] > 0) {
            this.results["amountOwned"]--;
        }
    };
    // Returns the results of the dialog
    PortfolioInput.prototype.add = function () {
        if (this.results["datePurchased"] && !this.verifyDate(this.results["datePurchased"])) {
            dialogs_1.alert(this.incorrectDateString);
            return;
        }
        if (!this.verifyFields()) {
            dialogs_1.alert("All fields must be filled out");
            return;
        }
        if (!this.verifyCoin(this.results["name"])) {
            dialogs_1.alert("Coin does not exist");
            return;
        }
        // Add percent change for 24h and 7d. ASSUMING THAT THE COIN EXISTS BECAUSE IT PASSES THE OTHER CHECK
        this.results["percentChange"] = this.getCoinPercentChange(this.results["name"]);
        this.params.closeCallback(this.results);
    };
    // Returns an empty object since the dialog was canceled
    PortfolioInput.prototype.close = function () {
        var result = {};
        this.params.closeCallback(result);
    };
    PortfolioInput.prototype.showDateTimePicker = function () {
        var _this = this;
        var startDate = new Date(this.results["datePurchased"]);
        // Verify that date is in correct format
        if (!this.verifyDate(startDate.toString())) {
            // alert(this.incorrectDateString);
            // return;
            startDate = new Date();
        }
        // If it is not a number, then no date was chosen
        if (isNaN(Number(startDate))) {
            startDate = new Date();
        }
        var options = {
            is24HourView: false,
            cancelLabel: "Cancel",
            doneLabel: "Done",
            startingDate: startDate
        };
        this.picker.pickDate(options).then(function (result) {
            var response = result;
            _this.results["datePurchased"] = response.month + "/" + response.day + "/" + response.year;
        });
    };
    // Given a date string verify if it's valid and has a year of 4 digits
    PortfolioInput.prototype.verifyDate = function (dateString) {
        return portfolio_verify_1.PortfolioVerify.verifyDate(dateString);
    };
    // Verifies that every field is filled out
    PortfolioInput.prototype.verifyFields = function () {
        for (var _i = 0, _a = this.ids; _i < _a.length; _i++) {
            var field = _a[_i];
            if (!this.results[field]) {
                return false;
            }
        }
        return true;
    };
    // Verifies that the coin inputed by the user actually exists
    PortfolioInput.prototype.verifyCoin = function (name) {
        if (name_mapper_1.NameMapper.getId(name)) {
            return true;
        }
        return false;
    };
    PortfolioInput.prototype.clearFocus = function (search) {
        this.searchBar = search;
        if (page_1.isAndroid) {
            search.android.clearFocus();
        }
    };
    PortfolioInput.prototype.filterResults = function (substring) {
        if (substring == "") {
            this.clearResults();
            this.inputOpacity = "1";
            this.showResults = false;
            return;
        }
        this.showResults = true;
        this.inputOpacity = "0";
        substring = substring.toLowerCase();
        this.searchResults = [];
        // Look through charts data and find coins that match
        for (var _i = 0, _a = this.market; _i < _a.length; _i++) {
            var data = _a[_i];
            var name_1 = data.name;
            if (name_1.toLowerCase().indexOf(substring) != -1) {
                this.searchResults.push(data.name);
            }
        }
        this.searchBar.focus();
    };
    PortfolioInput.prototype.clearResults = function () {
        this.searchResults = [];
        this.results["name"] = "";
    };
    PortfolioInput.prototype.resetPrice = function () {
        this.results["purchasedPrice"] = this.defaultPrice;
    };
    PortfolioInput.prototype.chooseName = function (name) {
        // Set name label
        this.results["name"] = name;
        // Set search bar text to name
        this.searchBar.text = name;
        // Clear results
        this.searchResults = [];
        // Hide results element and show input fields
        this.showResults = false;
        this.inputOpacity = "1";
        // Get price and set it to the text field and default price
        name = name.toLowerCase();
        for (var _i = 0, _a = this.market; _i < _a.length; _i++) {
            var coin = _a[_i];
            // Found matching object
            if (coin["name"].toLowerCase() == name) {
                this.defaultPrice = coin["price"].toFixed(2);
                this.results["purchasedPrice"] = this.defaultPrice;
                break;
            }
        }
    };
    PortfolioInput.prototype.getCoinPercentChange = function (name) {
        var percentChange = {
            "24h": undefined,
            "7d": undefined,
            "1h": undefined
        };
        name = name.toLowerCase();
        // Look through market for coin
        for (var _i = 0, _a = this.market; _i < _a.length; _i++) {
            var coin = _a[_i];
            // If coin name matches return object with its percent changes
            if (coin["name"].toLowerCase() == name) {
                percentChange["24h"] = coin["twentyFourHour"];
                percentChange["7d"] = coin["sevenDay"];
                percentChange["1h"] = coin["oneHour"];
                return percentChange;
            }
        }
        return percentChange;
    };
    PortfolioInput = tslib_1.__decorate([
        core_1.Component({
            selector: "modal-content",
            templateUrl: "./home/portfolio/portfolio-input/portfolio-input.component.html",
            styleUrls: ['./home/portfolio/portfolio-input/portfolio-input.component.scss']
        })
        // TODO: Remove human ability to enter date and add functionality of buttons and search bar
        ,
        tslib_1.__metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams, nativescript_modal_datetimepicker_1.ModalDatetimepicker])
    ], PortfolioInput);
    return PortfolioInput;
}());
exports.PortfolioInput = PortfolioInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQTBDO0FBQzFDLGtFQUFzRTtBQUV0RSx1RkFBdUc7QUFDdkcsc0NBQW1DO0FBQ25DLGlEQUErQztBQUMvQyxnQ0FBb0M7QUFFcEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFDOUMsdURBQXFEO0FBUXJEO0lBWUksd0JBQW9CLE1BQXlCLEVBQVUsTUFBMkI7UUFBbEYsaUJBY0M7UUFkbUIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQVgxRSx3QkFBbUIsR0FBRywwREFBMEQsQ0FBQztRQUN6RiwwREFBMEQ7UUFDbEQsUUFBRyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN6RSw4REFBOEQ7UUFDOUQsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWixnQkFBVyxHQUFXLEtBQUssQ0FBQztRQW1CNUIsaUJBQVksR0FBRyxHQUFHLENBQUM7UUFmZixDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMxQixVQUFBLEVBQUU7WUFDRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUMxQyxVQUFBLE1BQU07Z0JBQ0YsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDekIs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O1NBQ0o7UUFDRCxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFoTVEsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLGlFQUFpRTtZQUM5RSxTQUFTLEVBQUUsQ0FBQyxpRUFBaUUsQ0FBQztTQUNqRixDQUFDO1FBQ0YsMkZBQTJGOztpREFhM0QsZ0NBQWlCLEVBQWtCLHVEQUFtQjtPQVp6RSxjQUFjLENBaU0xQjtJQUFELHFCQUFDO0NBQUEsQUFqTUQsSUFpTUM7QUFqTVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgTW9kYWxEYXRldGltZXBpY2tlciwgUGlja2VyT3B0aW9ucywgUGlja2VyUmVzcG9uc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCI7XG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBOYW1lTWFwcGVyIH0gZnJvbSBcIi4uLy4uL25hbWUtbWFwcGVyXCI7XG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhci9zZWFyY2gtYmFyJztcbnZhciBTcWxpdGUgPSByZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIiApO1xuaW1wb3J0IHsgUG9ydGZvbGlvVmVyaWZ5IH0gZnJvbSBcIi4vcG9ydGZvbGlvLXZlcmlmeVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJtb2RhbC1jb250ZW50XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lL3BvcnRmb2xpby9wb3J0Zm9saW8taW5wdXQvcG9ydGZvbGlvLWlucHV0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vaG9tZS9wb3J0Zm9saW8vcG9ydGZvbGlvLWlucHV0L3BvcnRmb2xpby1pbnB1dC5jb21wb25lbnQuc2NzcyddXG59KVxuLy8gVE9ETzogUmVtb3ZlIGh1bWFuIGFiaWxpdHkgdG8gZW50ZXIgZGF0ZSBhbmQgYWRkIGZ1bmN0aW9uYWxpdHkgb2YgYnV0dG9ucyBhbmQgc2VhcmNoIGJhclxuZXhwb3J0IGNsYXNzIFBvcnRmb2xpb0lucHV0IHtcbiAgICBwcml2YXRlIGluY29ycmVjdERhdGVTdHJpbmcgPSBcIkRhdGUgbXVzdCBiZSBpbiBmb3JtYXQ6IEREL01NL1lZWVkgYW5kIG5vdCBpbiB0aGUgZnV0dXJlXCI7XG4gICAgLy8gQ29udGFpbnMgdGhlIGlkcyBvZiBldmVyeSBmaWVsZCB0aGF0IG11c3QgYmUgZmlsbGVkIG91dFxuICAgIHByaXZhdGUgaWRzID0gW1wibmFtZVwiLCBcImFtb3VudE93bmVkXCIsIFwicHVyY2hhc2VkUHJpY2VcIiwgXCJkYXRlUHVyY2hhc2VkXCJdO1xuICAgIC8vIENvbnRhaW5zIHRoZSByZXN1bHRzIG9mIHRoZSBkaWFsb2cgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzXG4gICAgcmVzdWx0cyA9IHt9O1xuICAgIHNlYXJjaFJlc3VsdHMgPSBbXTtcbiAgICBtYXJrZXQgPSBbXTtcbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gICAgc2hvd1Jlc3VsdHM6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIHNlYXJjaEJhcjogU2VhcmNoQmFyO1xuICAgIGRlZmF1bHRQcmljZTogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHJpdmF0ZSBwaWNrZXI6IE1vZGFsRGF0ZXRpbWVwaWNrZXIpIHtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJjcnlwdG8uZGJcIikpLnRoZW4oXG4gICAgICAgICAgICBkYiA9PiB7XG4gICAgICAgICAgICAgICAgZGIucmVzdWx0VHlwZShTcWxpdGUuUkVTVUxUU0FTT0JKRUNUUyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBtYXJrZXRcIikudGhlbihcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2V0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb3BlbmluZyBkYXRhYmFzZSBpbiBwb3J0Zm9saW8gaW5wdXRcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuICAgIGN1cnJlbnRQcmljZTpudW1iZXI7XG4gICAgaW5wdXRPcGFjaXR5ID0gXCIxXCI7XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0gPSAodG9kYXkuZ2V0TW9udGgoKSArIDEpICsgXCIvXCIgKyB0b2RheS5nZXREYXRlKCkgKyBcIi9cIiArIHRvZGF5LmdldEZ1bGxZZWFyKCk7ICAgIFxuICAgICAgICB0aGlzLnJlc3VsdHNbXCJhbW91bnRPd25lZFwiXSA9IDA7XG4gICAgICAgIHRoaXMucmVzdWx0c1tcIm5hbWVcIl0gPSBcIlwiO1xuICAgIH1cbiAgICAvKiBAcGFyYW0gb2JqIDogVGhlIHRleHRmaWVsZCBvYmplY3QgY29udGFpbmluZyB0aGUgdGV4dCBhbmQgaWRcbiAgICAqXG4gICAgKiAqL1xuICAgIHVwZGF0ZShvYmo6IFRleHRGaWVsZCkge1xuICAgICAgICBsZXQgdGV4dCA9IG9iai50ZXh0O1xuICAgICAgICBpZih0ZXh0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRzW29iai5pZF0gPSB0ZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGluY3JlYXNlQW1vdW50T3duZWQoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0c1tcImFtb3VudE93bmVkXCJdKys7XG4gICAgfVxuICAgIGRlY3JlYXNlQW1vdW50T3duZWQoKSB7XG4gICAgICAgIGlmKHRoaXMucmVzdWx0c1tcImFtb3VudE93bmVkXCJdID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRzW1wiYW1vdW50T3duZWRcIl0tLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm5zIHRoZSByZXN1bHRzIG9mIHRoZSBkaWFsb2dcbiAgICBwdWJsaWMgYWRkKCkge1xuICAgICAgICBpZih0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdICYmICF0aGlzLnZlcmlmeURhdGUodGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSkpIHtcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuaW5jb3JyZWN0RGF0ZVN0cmluZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMudmVyaWZ5RmllbGRzKCkpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiQWxsIGZpZWxkcyBtdXN0IGJlIGZpbGxlZCBvdXRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMudmVyaWZ5Q29pbih0aGlzLnJlc3VsdHNbXCJuYW1lXCJdKSkge1xuICAgICAgICAgICAgYWxlcnQoXCJDb2luIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBwZXJjZW50IGNoYW5nZSBmb3IgMjRoIGFuZCA3ZC4gQVNTVU1JTkcgVEhBVCBUSEUgQ09JTiBFWElTVFMgQkVDQVVTRSBJVCBQQVNTRVMgVEhFIE9USEVSIENIRUNLXG4gICAgICAgIHRoaXMucmVzdWx0c1tcInBlcmNlbnRDaGFuZ2VcIl0gPSB0aGlzLmdldENvaW5QZXJjZW50Q2hhbmdlKHRoaXMucmVzdWx0c1tcIm5hbWVcIl0pO1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHRoaXMucmVzdWx0cyk7XG4gICAgfVxuICAgIC8vIFJldHVybnMgYW4gZW1wdHkgb2JqZWN0IHNpbmNlIHRoZSBkaWFsb2cgd2FzIGNhbmNlbGVkXG4gICAgcHVibGljIGNsb3NlKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzdWx0KTtcbiAgICB9XG4gICAgc2hvd0RhdGVUaW1lUGlja2VyKCkge1xuICAgICAgICBsZXQgc3RhcnREYXRlID0gbmV3IERhdGUodGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSk7XG4gICAgICAgIC8vIFZlcmlmeSB0aGF0IGRhdGUgaXMgaW4gY29ycmVjdCBmb3JtYXRcbiAgICAgICAgaWYoIXRoaXMudmVyaWZ5RGF0ZShzdGFydERhdGUudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIC8vIGFsZXJ0KHRoaXMuaW5jb3JyZWN0RGF0ZVN0cmluZyk7XG4gICAgICAgICAgICAvLyByZXR1cm47XG4gICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGl0IGlzIG5vdCBhIG51bWJlciwgdGhlbiBubyBkYXRlIHdhcyBjaG9zZW5cbiAgICAgICAgaWYoaXNOYU4oTnVtYmVyKHN0YXJ0RGF0ZSkpKSB7XG4gICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRpb25zOiBQaWNrZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgaXMyNEhvdXJWaWV3OiBmYWxzZSxcbiAgICAgICAgICAgIGNhbmNlbExhYmVsOiBcIkNhbmNlbFwiLFxuICAgICAgICAgICAgZG9uZUxhYmVsOiBcIkRvbmVcIixcbiAgICAgICAgICAgIHN0YXJ0aW5nRGF0ZTogc3RhcnREYXRlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGlja2VyLnBpY2tEYXRlKG9wdGlvbnMpLnRoZW4oXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IDxQaWNrZXJSZXNwb25zZT5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSA9IHJlc3BvbnNlLm1vbnRoICsgXCIvXCIgKyByZXNwb25zZS5kYXkgKyBcIi9cIiArIHJlc3BvbnNlLnllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG4gICAgLy8gR2l2ZW4gYSBkYXRlIHN0cmluZyB2ZXJpZnkgaWYgaXQncyB2YWxpZCBhbmQgaGFzIGEgeWVhciBvZiA0IGRpZ2l0c1xuICAgIHByaXZhdGUgdmVyaWZ5RGF0ZShkYXRlU3RyaW5nOiBzdHJpbmcpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gUG9ydGZvbGlvVmVyaWZ5LnZlcmlmeURhdGUoZGF0ZVN0cmluZyk7XG4gICAgfVxuICAgIC8vIFZlcmlmaWVzIHRoYXQgZXZlcnkgZmllbGQgaXMgZmlsbGVkIG91dFxuICAgIHByaXZhdGUgdmVyaWZ5RmllbGRzKCk6Ym9vbGVhbiB7XG4gICAgICAgIGZvcih2YXIgZmllbGQgb2YgdGhpcy5pZHMpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLnJlc3VsdHNbZmllbGRdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBWZXJpZmllcyB0aGF0IHRoZSBjb2luIGlucHV0ZWQgYnkgdGhlIHVzZXIgYWN0dWFsbHkgZXhpc3RzXG4gICAgcHJpdmF0ZSB2ZXJpZnlDb2luKG5hbWU6IHN0cmluZyk6Ym9vbGVhbiB7XG4gICAgICAgIGlmKE5hbWVNYXBwZXIuZ2V0SWQobmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2xlYXJGb2N1cyhzZWFyY2gpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hCYXIgPSBzZWFyY2g7XG4gICAgICAgIGlmKGlzQW5kcm9pZCkge1xuICAgICAgICAgICAgc2VhcmNoLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpbHRlclJlc3VsdHMoc3Vic3RyaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgaWYoc3Vic3RyaW5nID09IFwiXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJSZXN1bHRzKCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0T3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdHMgPSB0cnVlO1xuICAgICAgICB0aGlzLmlucHV0T3BhY2l0eSA9IFwiMFwiO1xuICAgICAgICBzdWJzdHJpbmcgPSBzdWJzdHJpbmcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG4gICAgICAgIC8vIExvb2sgdGhyb3VnaCBjaGFydHMgZGF0YSBhbmQgZmluZCBjb2lucyB0aGF0IG1hdGNoXG4gICAgICAgIGZvcih2YXIgZGF0YSBvZiB0aGlzLm1hcmtldCkge1xuICAgICAgICAgICAgbGV0IG5hbWU6c3RyaW5nID0gZGF0YS5uYW1lO1xuICAgICAgICAgICAgaWYobmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc3Vic3RyaW5nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cy5wdXNoKGRhdGEubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWFyY2hCYXIuZm9jdXMoKTtcbiAgICB9XG4gICAgY2xlYXJSZXN1bHRzKCkge1xuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSBbXTtcbiAgICAgICAgdGhpcy5yZXN1bHRzW1wibmFtZVwiXSA9IFwiXCI7XG4gICAgfVxuICAgIHJlc2V0UHJpY2UoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0c1tcInB1cmNoYXNlZFByaWNlXCJdID0gdGhpcy5kZWZhdWx0UHJpY2U7XG4gICAgfVxuICAgIGNob29zZU5hbWUobmFtZTpzdHJpbmcpOnZvaWQge1xuICAgICAgICAvLyBTZXQgbmFtZSBsYWJlbFxuICAgICAgICB0aGlzLnJlc3VsdHNbXCJuYW1lXCJdID0gbmFtZTtcbiAgICAgICAgLy8gU2V0IHNlYXJjaCBiYXIgdGV4dCB0byBuYW1lXG4gICAgICAgIHRoaXMuc2VhcmNoQmFyLnRleHQgPSBuYW1lO1xuICAgICAgICAvLyBDbGVhciByZXN1bHRzXG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IFtdO1xuICAgICAgICAvLyBIaWRlIHJlc3VsdHMgZWxlbWVudCBhbmQgc2hvdyBpbnB1dCBmaWVsZHNcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlucHV0T3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAvLyBHZXQgcHJpY2UgYW5kIHNldCBpdCB0byB0aGUgdGV4dCBmaWVsZCBhbmQgZGVmYXVsdCBwcmljZVxuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBmb3IodmFyIGNvaW4gb2YgdGhpcy5tYXJrZXQpIHtcbiAgICAgICAgICAgIC8vIEZvdW5kIG1hdGNoaW5nIG9iamVjdFxuICAgICAgICAgICAgaWYoY29pbltcIm5hbWVcIl0udG9Mb3dlckNhc2UoKSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0UHJpY2UgPSBjb2luW1wicHJpY2VcIl0udG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHNbXCJwdXJjaGFzZWRQcmljZVwiXSA9IHRoaXMuZGVmYXVsdFByaWNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0Q29pblBlcmNlbnRDaGFuZ2UobmFtZTogc3RyaW5nKTpPYmplY3Qge1xuICAgICAgICBsZXQgcGVyY2VudENoYW5nZSA9IHtcbiAgICAgICAgICAgIFwiMjRoXCI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIFwiN2RcIjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgXCIxaFwiOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAvLyBMb29rIHRocm91Z2ggbWFya2V0IGZvciBjb2luXG4gICAgICAgIGZvcih2YXIgY29pbiBvZiB0aGlzLm1hcmtldCkge1xuICAgICAgICAgICAgLy8gSWYgY29pbiBuYW1lIG1hdGNoZXMgcmV0dXJuIG9iamVjdCB3aXRoIGl0cyBwZXJjZW50IGNoYW5nZXNcbiAgICAgICAgICAgIGlmKGNvaW5bXCJuYW1lXCJdLnRvTG93ZXJDYXNlKCkgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHBlcmNlbnRDaGFuZ2VbXCIyNGhcIl0gPSBjb2luW1widHdlbnR5Rm91ckhvdXJcIl07XG4gICAgICAgICAgICAgICAgcGVyY2VudENoYW5nZVtcIjdkXCJdID0gY29pbltcInNldmVuRGF5XCJdO1xuICAgICAgICAgICAgICAgIHBlcmNlbnRDaGFuZ2VbXCIxaFwiXSA9IGNvaW5bXCJvbmVIb3VyXCJdO1xuICAgICAgICAgICAgICAgIHJldHVybiBwZXJjZW50Q2hhbmdlOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGVyY2VudENoYW5nZTtcbiAgICB9XG59Il19