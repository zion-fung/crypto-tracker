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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQTBDO0FBQzFDLGtFQUFzRTtBQUV0RSx1RkFBdUc7QUFDdkcsc0NBQW1DO0FBQ25DLGlEQUErQztBQUMvQyxnQ0FBb0M7QUFFcEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFDOUMsdURBQXFEO0FBUXJEO0lBWUksd0JBQW9CLE1BQXlCLEVBQVUsTUFBMkI7UUFBbEYsaUJBY0M7UUFkbUIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQVgxRSx3QkFBbUIsR0FBRywwREFBMEQsQ0FBQztRQUN6RiwwREFBMEQ7UUFDbEQsUUFBRyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN6RSw4REFBOEQ7UUFDOUQsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWixnQkFBVyxHQUFXLEtBQUssQ0FBQztRQW1CNUIsaUJBQVksR0FBRyxHQUFHLENBQUM7UUFmZixDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMxQixVQUFBLEVBQUU7WUFDRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUMxQyxVQUFBLE1BQU07Z0JBQ0YsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDekIs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RUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ25ELEtBQUssQ0FBQztZQUNWLENBQUM7U0FDSjtJQUNMLENBQUM7SUEzS1EsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLGlFQUFpRTtZQUM5RSxTQUFTLEVBQUUsQ0FBQyxpRUFBaUUsQ0FBQztTQUNqRixDQUFDO1FBQ0YsMkZBQTJGOztpREFhM0QsZ0NBQWlCLEVBQWtCLHVEQUFtQjtPQVp6RSxjQUFjLENBNEsxQjtJQUFELHFCQUFDO0NBQUEsQUE1S0QsSUE0S0M7QUE1S1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRldGltZXBpY2tlciwgUGlja2VyT3B0aW9ucywgUGlja2VyUmVzcG9uc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCI7XHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgTmFtZU1hcHBlciB9IGZyb20gXCIuLi8uLi9uYW1lLW1hcHBlclwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyL3NlYXJjaC1iYXInO1xyXG52YXIgU3FsaXRlID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIgKTtcclxuaW1wb3J0IHsgUG9ydGZvbGlvVmVyaWZ5IH0gZnJvbSBcIi4vcG9ydGZvbGlvLXZlcmlmeVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtb2RhbC1jb250ZW50XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUvcG9ydGZvbGlvL3BvcnRmb2xpby1pbnB1dC9wb3J0Zm9saW8taW5wdXQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2hvbWUvcG9ydGZvbGlvL3BvcnRmb2xpby1pbnB1dC9wb3J0Zm9saW8taW5wdXQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG4vLyBUT0RPOiBSZW1vdmUgaHVtYW4gYWJpbGl0eSB0byBlbnRlciBkYXRlIGFuZCBhZGQgZnVuY3Rpb25hbGl0eSBvZiBidXR0b25zIGFuZCBzZWFyY2ggYmFyXHJcbmV4cG9ydCBjbGFzcyBQb3J0Zm9saW9JbnB1dCB7XHJcbiAgICBwcml2YXRlIGluY29ycmVjdERhdGVTdHJpbmcgPSBcIkRhdGUgbXVzdCBiZSBpbiBmb3JtYXQ6IEREL01NL1lZWVkgYW5kIG5vdCBpbiB0aGUgZnV0dXJlXCI7XHJcbiAgICAvLyBDb250YWlucyB0aGUgaWRzIG9mIGV2ZXJ5IGZpZWxkIHRoYXQgbXVzdCBiZSBmaWxsZWQgb3V0XHJcbiAgICBwcml2YXRlIGlkcyA9IFtcIm5hbWVcIiwgXCJhbW91bnRPd25lZFwiLCBcInB1cmNoYXNlZFByaWNlXCIsIFwiZGF0ZVB1cmNoYXNlZFwiXTtcclxuICAgIC8vIENvbnRhaW5zIHRoZSByZXN1bHRzIG9mIHRoZSBkaWFsb2cgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzXHJcbiAgICByZXN1bHRzID0ge307XHJcbiAgICBzZWFyY2hSZXN1bHRzID0gW107XHJcbiAgICBtYXJrZXQgPSBbXTtcclxuICAgIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcclxuICAgIHNob3dSZXN1bHRzOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNlYXJjaEJhcjogU2VhcmNoQmFyO1xyXG4gICAgZGVmYXVsdFByaWNlOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsIHByaXZhdGUgcGlja2VyOiBNb2RhbERhdGV0aW1lcGlja2VyKSB7XHJcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJjcnlwdG8uZGJcIikpLnRoZW4oXHJcbiAgICAgICAgICAgIGRiID0+IHtcclxuICAgICAgICAgICAgICAgIGRiLnJlc3VsdFR5cGUoU3FsaXRlLlJFU1VMVFNBU09CSkVDVFMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5hbGwoXCJTRUxFQ1QgKiBGUk9NIG1hcmtldFwiKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2V0ID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBvcGVuaW5nIGRhdGFiYXNlIGluIHBvcnRmb2xpbyBpbnB1dFwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICBjdXJyZW50UHJpY2U6bnVtYmVyO1xyXG4gICAgaW5wdXRPcGFjaXR5ID0gXCIxXCI7XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0gPSAodG9kYXkuZ2V0TW9udGgoKSArIDEpICsgXCIvXCIgKyB0b2RheS5nZXREYXRlKCkgKyBcIi9cIiArIHRvZGF5LmdldEZ1bGxZZWFyKCk7ICAgIFxyXG4gICAgICAgIHRoaXMucmVzdWx0c1tcImFtb3VudE93bmVkXCJdID0gMDtcclxuICAgICAgICB0aGlzLnJlc3VsdHNbXCJuYW1lXCJdID0gXCJcIjtcclxuICAgIH1cclxuICAgIC8qIEBwYXJhbSBvYmogOiBUaGUgdGV4dGZpZWxkIG9iamVjdCBjb250YWluaW5nIHRoZSB0ZXh0IGFuZCBpZFxyXG4gICAgKlxyXG4gICAgKiAqL1xyXG4gICAgdXBkYXRlKG9iajogVGV4dEZpZWxkKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBvYmoudGV4dDtcclxuICAgICAgICBpZih0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdHNbb2JqLmlkXSA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5jcmVhc2VBbW91bnRPd25lZCgpIHtcclxuICAgICAgICB0aGlzLnJlc3VsdHNbXCJhbW91bnRPd25lZFwiXSsrO1xyXG4gICAgfVxyXG4gICAgZGVjcmVhc2VBbW91bnRPd25lZCgpIHtcclxuICAgICAgICBpZih0aGlzLnJlc3VsdHNbXCJhbW91bnRPd25lZFwiXSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzW1wiYW1vdW50T3duZWRcIl0tLTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBSZXR1cm5zIHRoZSByZXN1bHRzIG9mIHRoZSBkaWFsb2dcclxuICAgIHB1YmxpYyBhZGQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSAmJiAhdGhpcy52ZXJpZnlEYXRlKHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0pKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuaW5jb3JyZWN0RGF0ZVN0cmluZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMudmVyaWZ5RmllbGRzKCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJBbGwgZmllbGRzIG11c3QgYmUgZmlsbGVkIG91dFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy52ZXJpZnlDb2luKHRoaXMucmVzdWx0c1tcIm5hbWVcIl0pKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiQ29pbiBkb2VzIG5vdCBleGlzdFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHRoaXMucmVzdWx0cyk7XHJcbiAgICB9XHJcbiAgICAvLyBSZXR1cm5zIGFuIGVtcHR5IG9iamVjdCBzaW5jZSB0aGUgZGlhbG9nIHdhcyBjYW5jZWxlZFxyXG4gICAgcHVibGljIGNsb3NlKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICBzaG93RGF0ZVRpbWVQaWNrZXIoKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0pO1xyXG4gICAgICAgIC8vIFZlcmlmeSB0aGF0IGRhdGUgaXMgaW4gY29ycmVjdCBmb3JtYXRcclxuICAgICAgICBpZighdGhpcy52ZXJpZnlEYXRlKHN0YXJ0RGF0ZS50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICAvLyBhbGVydCh0aGlzLmluY29ycmVjdERhdGVTdHJpbmcpO1xyXG4gICAgICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIGl0IGlzIG5vdCBhIG51bWJlciwgdGhlbiBubyBkYXRlIHdhcyBjaG9zZW5cclxuICAgICAgICBpZihpc05hTihOdW1iZXIoc3RhcnREYXRlKSkpIHtcclxuICAgICAgICAgICAgc3RhcnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IFBpY2tlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlzMjRIb3VyVmlldzogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhbmNlbExhYmVsOiBcIkNhbmNlbFwiLFxyXG4gICAgICAgICAgICBkb25lTGFiZWw6IFwiRG9uZVwiLFxyXG4gICAgICAgICAgICBzdGFydGluZ0RhdGU6IHN0YXJ0RGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5waWNrZXIucGlja0RhdGUob3B0aW9ucykudGhlbihcclxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IDxQaWNrZXJSZXNwb25zZT5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdID0gcmVzcG9uc2UubW9udGggKyBcIi9cIiArIHJlc3BvbnNlLmRheSArIFwiL1wiICsgcmVzcG9uc2UueWVhcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIC8vIEdpdmVuIGEgZGF0ZSBzdHJpbmcgdmVyaWZ5IGlmIGl0J3MgdmFsaWQgYW5kIGhhcyBhIHllYXIgb2YgNCBkaWdpdHNcclxuICAgIHByaXZhdGUgdmVyaWZ5RGF0ZShkYXRlU3RyaW5nOiBzdHJpbmcpOmJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBQb3J0Zm9saW9WZXJpZnkudmVyaWZ5RGF0ZShkYXRlU3RyaW5nKTtcclxuICAgIH1cclxuICAgIC8vIFZlcmlmaWVzIHRoYXQgZXZlcnkgZmllbGQgaXMgZmlsbGVkIG91dFxyXG4gICAgcHJpdmF0ZSB2ZXJpZnlGaWVsZHMoKTpib29sZWFuIHtcclxuICAgICAgICBmb3IodmFyIGZpZWxkIG9mIHRoaXMuaWRzKSB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnJlc3VsdHNbZmllbGRdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyBWZXJpZmllcyB0aGF0IHRoZSBjb2luIGlucHV0ZWQgYnkgdGhlIHVzZXIgYWN0dWFsbHkgZXhpc3RzXHJcbiAgICBwcml2YXRlIHZlcmlmeUNvaW4obmFtZTogc3RyaW5nKTpib29sZWFuIHtcclxuICAgICAgICBpZihOYW1lTWFwcGVyLmdldElkKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjbGVhckZvY3VzKHNlYXJjaCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQmFyID0gc2VhcmNoO1xyXG4gICAgICAgIGlmKGlzQW5kcm9pZCkge1xyXG4gICAgICAgICAgICBzZWFyY2guYW5kcm9pZC5jbGVhckZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmlsdGVyUmVzdWx0cyhzdWJzdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHN1YnN0cmluZyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRPcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dSZXN1bHRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlucHV0T3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgICAgIHN1YnN0cmluZyA9IHN1YnN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIC8vIExvb2sgdGhyb3VnaCBjaGFydHMgZGF0YSBhbmQgZmluZCBjb2lucyB0aGF0IG1hdGNoXHJcbiAgICAgICAgZm9yKHZhciBkYXRhIG9mIHRoaXMubWFya2V0KSB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lOnN0cmluZyA9IGRhdGEubmFtZTtcclxuICAgICAgICAgICAgaWYobmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc3Vic3RyaW5nKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzLnB1c2goZGF0YS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlYXJjaEJhci5mb2N1cygpO1xyXG4gICAgfVxyXG4gICAgY2xlYXJSZXN1bHRzKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVzdWx0c1tcIm5hbWVcIl0gPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmVzZXRQcmljZSgpIHtcclxuICAgICAgICB0aGlzLnJlc3VsdHNbXCJwdXJjaGFzZWRQcmljZVwiXSA9IHRoaXMuZGVmYXVsdFByaWNlO1xyXG4gICAgfVxyXG4gICAgY2hvb3NlTmFtZShuYW1lOnN0cmluZyk6dm9pZCB7XHJcbiAgICAgICAgLy8gU2V0IG5hbWUgbGFiZWxcclxuICAgICAgICB0aGlzLnJlc3VsdHNbXCJuYW1lXCJdID0gbmFtZTtcclxuICAgICAgICAvLyBTZXQgc2VhcmNoIGJhciB0ZXh0IHRvIG5hbWVcclxuICAgICAgICB0aGlzLnNlYXJjaEJhci50ZXh0ID0gbmFtZTtcclxuICAgICAgICAvLyBDbGVhciByZXN1bHRzXHJcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gW107XHJcbiAgICAgICAgLy8gSGlkZSByZXN1bHRzIGVsZW1lbnQgYW5kIHNob3cgaW5wdXQgZmllbGRzXHJcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0cyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRPcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgLy8gR2V0IHByaWNlIGFuZCBzZXQgaXQgdG8gdGhlIHRleHQgZmllbGQgYW5kIGRlZmF1bHQgcHJpY2VcclxuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGZvcih2YXIgY29pbiBvZiB0aGlzLm1hcmtldCkge1xyXG4gICAgICAgICAgICAvLyBGb3VuZCBtYXRjaGluZyBvYmplY3RcclxuICAgICAgICAgICAgaWYoY29pbltcIm5hbWVcIl0udG9Mb3dlckNhc2UoKSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRQcmljZSA9IGNvaW5bXCJwcmljZVwiXS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzW1wicHVyY2hhc2VkUHJpY2VcIl0gPSB0aGlzLmRlZmF1bHRQcmljZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19