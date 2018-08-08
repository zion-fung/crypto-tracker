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
        var date = new Date(dateString);
        // Not a number = not a valid date
        if (isNaN(Number(date))) {
            return false;
        }
        // Check if date is in the future
        var currentDate = new Date();
        var a = Number(date);
        var b = Number(currentDate);
        // Date is in the future
        if (a > b) {
            return false;
        }
        return true;
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var id, response, json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = name_mapper_1.NameMapper.getId(this.results["name"]);
                        console.log("Id is " + id);
                        if (!id) return [3 /*break*/, 3];
                        console.log("Searching...");
                        return [4 /*yield*/, fetch("https://api.conmarketcap.com/v2/ticker/" + id)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        console.log(json);
                        this.results["purchasedPrice"] = json.data.quotes.USD.price.toFixed(2);
                        return [3 /*break*/, 4];
                    case 3:
                        dialogs_1.alert("Coin does not exist");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PortfolioInput.prototype.chooseName = function (name) {
        this.results["name"] = name;
        this.searchBar.text = name;
        this.searchResults = [];
        this.showResults = false;
        this.inputOpacity = "1";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQTBDO0FBQzFDLGtFQUFzRTtBQUV0RSx1RkFBdUc7QUFDdkcsc0NBQW1DO0FBQ25DLGlEQUErQztBQUMvQyxnQ0FBb0M7QUFFcEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFROUM7SUFXSSx3QkFBb0IsTUFBeUIsRUFBVSxNQUEyQjtRQUFsRixpQkFjQztRQWRtQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBVjFFLHdCQUFtQixHQUFHLDBEQUEwRCxDQUFDO1FBQ3pGLDBEQUEwRDtRQUNsRCxRQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3pFLDhEQUE4RDtRQUM5RCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2Isa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUVaLGdCQUFXLEdBQVcsS0FBSyxDQUFDO1FBa0I1QixpQkFBWSxHQUFHLEdBQUcsQ0FBQztRQWZmLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzFCLFVBQUEsRUFBRTtZQUNFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQzFDLFVBQUEsTUFBTTtnQkFDRixLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUN6QixDQUFDLENBQ0osQ0FB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LENBQUMsQ0FBQzt3QkFDYixxQkFBTSxLQUFLLENBQUMseUNBQXlDLEdBQUcsRUFBRSxDQUFDLEVBQUE7O3dCQUF0RSxRQUFRLEdBQUcsU0FBMkQ7d0JBQy9ELHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQTVCLElBQUksR0FBRyxTQUFxQjt3QkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7d0JBRXZFLGVBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOzs7Ozs7S0FFcEM7SUFDRCxtQ0FBVSxHQUFWLFVBQVcsSUFBVztRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQW5MUSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsaUVBQWlFO1lBQzlFLFNBQVMsRUFBRSxDQUFDLGlFQUFpRSxDQUFDO1NBQ2pGLENBQUM7UUFDRiwyRkFBMkY7O2lEQVkzRCxnQ0FBaUIsRUFBa0IsdURBQW1CO09BWHpFLGNBQWMsQ0FvTDFCO0lBQUQscUJBQUM7Q0FBQSxBQXBMRCxJQW9MQztBQXBMWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGV0aW1lcGlja2VyLCBQaWNrZXJPcHRpb25zLCBQaWNrZXJSZXNwb25zZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIjtcclxuaW1wb3J0IHsgYWxlcnQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBOYW1lTWFwcGVyIH0gZnJvbSBcIi4uLy4uL25hbWUtbWFwcGVyXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXIvc2VhcmNoLWJhcic7XHJcbnZhciBTcWxpdGUgPSByZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIiApO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtb2RhbC1jb250ZW50XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUvcG9ydGZvbGlvL3BvcnRmb2xpby1pbnB1dC9wb3J0Zm9saW8taW5wdXQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2hvbWUvcG9ydGZvbGlvL3BvcnRmb2xpby1pbnB1dC9wb3J0Zm9saW8taW5wdXQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG4vLyBUT0RPOiBSZW1vdmUgaHVtYW4gYWJpbGl0eSB0byBlbnRlciBkYXRlIGFuZCBhZGQgZnVuY3Rpb25hbGl0eSBvZiBidXR0b25zIGFuZCBzZWFyY2ggYmFyXHJcbmV4cG9ydCBjbGFzcyBQb3J0Zm9saW9JbnB1dCB7XHJcbiAgICBwcml2YXRlIGluY29ycmVjdERhdGVTdHJpbmcgPSBcIkRhdGUgbXVzdCBiZSBpbiBmb3JtYXQ6IEREL01NL1lZWVkgYW5kIG5vdCBpbiB0aGUgZnV0dXJlXCI7XHJcbiAgICAvLyBDb250YWlucyB0aGUgaWRzIG9mIGV2ZXJ5IGZpZWxkIHRoYXQgbXVzdCBiZSBmaWxsZWQgb3V0XHJcbiAgICBwcml2YXRlIGlkcyA9IFtcIm5hbWVcIiwgXCJhbW91bnRPd25lZFwiLCBcInB1cmNoYXNlZFByaWNlXCIsIFwiZGF0ZVB1cmNoYXNlZFwiXTtcclxuICAgIC8vIENvbnRhaW5zIHRoZSByZXN1bHRzIG9mIHRoZSBkaWFsb2cgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzXHJcbiAgICByZXN1bHRzID0ge307XHJcbiAgICBzZWFyY2hSZXN1bHRzID0gW107XHJcbiAgICBtYXJrZXQgPSBbXTtcclxuICAgIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcclxuICAgIHNob3dSZXN1bHRzOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNlYXJjaEJhcjogU2VhcmNoQmFyO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIHBpY2tlcjogTW9kYWxEYXRldGltZXBpY2tlcikge1xyXG4gICAgICAgIChuZXcgU3FsaXRlKFwiY3J5cHRvLmRiXCIpKS50aGVuKFxyXG4gICAgICAgICAgICBkYiA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYi5yZXN1bHRUeXBlKFNxbGl0ZS5SRVNVTFRTQVNPQkpFQ1RTKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBtYXJrZXRcIikudGhlbihcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtldCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb3BlbmluZyBkYXRhYmFzZSBpbiBwb3J0Zm9saW8gaW5wdXRcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgY3VycmVudFByaWNlOm51bWJlcjtcclxuICAgIGlucHV0T3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdID0gKHRvZGF5LmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICsgdG9kYXkuZ2V0RGF0ZSgpICsgXCIvXCIgKyB0b2RheS5nZXRGdWxsWWVhcigpOyAgICBcclxuICAgICAgICB0aGlzLnJlc3VsdHNbXCJhbW91bnRPd25lZFwiXSA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRzW1wibmFtZVwiXSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICAvKiBAcGFyYW0gb2JqIDogVGhlIHRleHRmaWVsZCBvYmplY3QgY29udGFpbmluZyB0aGUgdGV4dCBhbmQgaWRcclxuICAgICpcclxuICAgICogKi9cclxuICAgIHVwZGF0ZShvYmo6IFRleHRGaWVsZCkge1xyXG4gICAgICAgIGxldCB0ZXh0ID0gb2JqLnRleHQ7XHJcbiAgICAgICAgaWYodGV4dCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzW29iai5pZF0gPSB0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluY3JlYXNlQW1vdW50T3duZWQoKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRzW1wiYW1vdW50T3duZWRcIl0rKztcclxuICAgIH1cclxuICAgIGRlY3JlYXNlQW1vdW50T3duZWQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yZXN1bHRzW1wiYW1vdW50T3duZWRcIl0gPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0c1tcImFtb3VudE93bmVkXCJdLS07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gUmV0dXJucyB0aGUgcmVzdWx0cyBvZiB0aGUgZGlhbG9nXHJcbiAgICBwdWJsaWMgYWRkKCkge1xyXG4gICAgICAgIGlmKHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0gJiYgIXRoaXMudmVyaWZ5RGF0ZSh0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdKSkge1xyXG4gICAgICAgICAgICBhbGVydCh0aGlzLmluY29ycmVjdERhdGVTdHJpbmcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnZlcmlmeUZpZWxkcygpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiQWxsIGZpZWxkcyBtdXN0IGJlIGZpbGxlZCBvdXRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMudmVyaWZ5Q29pbih0aGlzLnJlc3VsdHNbXCJuYW1lXCJdKSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkNvaW4gZG9lcyBub3QgZXhpc3RcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh0aGlzLnJlc3VsdHMpO1xyXG4gICAgfVxyXG4gICAgLy8gUmV0dXJucyBhbiBlbXB0eSBvYmplY3Qgc2luY2UgdGhlIGRpYWxvZyB3YXMgY2FuY2VsZWRcclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge307XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhyZXN1bHQpO1xyXG4gICAgfVxyXG4gICAgc2hvd0RhdGVUaW1lUGlja2VyKCkge1xyXG4gICAgICAgIGxldCBzdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdKTtcclxuICAgICAgICAvLyBWZXJpZnkgdGhhdCBkYXRlIGlzIGluIGNvcnJlY3QgZm9ybWF0XHJcbiAgICAgICAgaWYoIXRoaXMudmVyaWZ5RGF0ZShzdGFydERhdGUudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgLy8gYWxlcnQodGhpcy5pbmNvcnJlY3REYXRlU3RyaW5nKTtcclxuICAgICAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBJZiBpdCBpcyBub3QgYSBudW1iZXIsIHRoZW4gbm8gZGF0ZSB3YXMgY2hvc2VuXHJcbiAgICAgICAgaWYoaXNOYU4oTnVtYmVyKHN0YXJ0RGF0ZSkpKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvcHRpb25zOiBQaWNrZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpczI0SG91clZpZXc6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYW5jZWxMYWJlbDogXCJDYW5jZWxcIixcclxuICAgICAgICAgICAgZG9uZUxhYmVsOiBcIkRvbmVcIixcclxuICAgICAgICAgICAgc3RhcnRpbmdEYXRlOiBzdGFydERhdGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucGlja2VyLnBpY2tEYXRlKG9wdGlvbnMpLnRoZW4oXHJcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSA8UGlja2VyUmVzcG9uc2U+cmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSA9IHJlc3BvbnNlLm1vbnRoICsgXCIvXCIgKyByZXNwb25zZS5kYXkgKyBcIi9cIiArIHJlc3BvbnNlLnllYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICAvLyBHaXZlbiBhIGRhdGUgc3RyaW5nIHZlcmlmeSBpZiBpdCdzIHZhbGlkIGFuZCBoYXMgYSB5ZWFyIG9mIDQgZGlnaXRzXHJcbiAgICBwcml2YXRlIHZlcmlmeURhdGUoZGF0ZVN0cmluZzogc3RyaW5nKTpib29sZWFuIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG4gICAgICAgIC8vIE5vdCBhIG51bWJlciA9IG5vdCBhIHZhbGlkIGRhdGVcclxuICAgICAgICBpZihpc05hTihOdW1iZXIoZGF0ZSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgZGF0ZSBpcyBpbiB0aGUgZnV0dXJlXHJcbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgYSA9IE51bWJlcihkYXRlKTtcclxuICAgICAgICBsZXQgYiA9IE51bWJlcihjdXJyZW50RGF0ZSk7XHJcbiAgICAgICAgLy8gRGF0ZSBpcyBpbiB0aGUgZnV0dXJlXHJcbiAgICAgICAgaWYoYSA+IGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIFZlcmlmaWVzIHRoYXQgZXZlcnkgZmllbGQgaXMgZmlsbGVkIG91dFxyXG4gICAgcHJpdmF0ZSB2ZXJpZnlGaWVsZHMoKTpib29sZWFuIHtcclxuICAgICAgICBmb3IodmFyIGZpZWxkIG9mIHRoaXMuaWRzKSB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnJlc3VsdHNbZmllbGRdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyBWZXJpZmllcyB0aGF0IHRoZSBjb2luIGlucHV0ZWQgYnkgdGhlIHVzZXIgYWN0dWFsbHkgZXhpc3RzXHJcbiAgICBwcml2YXRlIHZlcmlmeUNvaW4obmFtZTogc3RyaW5nKTpib29sZWFuIHtcclxuICAgICAgICBpZihOYW1lTWFwcGVyLmdldElkKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjbGVhckZvY3VzKHNlYXJjaCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQmFyID0gc2VhcmNoO1xyXG4gICAgICAgIGlmKGlzQW5kcm9pZCkge1xyXG4gICAgICAgICAgICBzZWFyY2guYW5kcm9pZC5jbGVhckZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmlsdGVyUmVzdWx0cyhzdWJzdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHN1YnN0cmluZyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRPcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dSZXN1bHRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlucHV0T3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgICAgIHN1YnN0cmluZyA9IHN1YnN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIC8vIExvb2sgdGhyb3VnaCBjaGFydHMgZGF0YSBhbmQgZmluZCBjb2lucyB0aGF0IG1hdGNoXHJcbiAgICAgICAgZm9yKHZhciBkYXRhIG9mIHRoaXMubWFya2V0KSB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lOnN0cmluZyA9IGRhdGEubmFtZTtcclxuICAgICAgICAgICAgaWYobmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc3Vic3RyaW5nKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzLnB1c2goZGF0YS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlYXJjaEJhci5mb2N1cygpO1xyXG4gICAgfVxyXG4gICAgY2xlYXJSZXN1bHRzKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVzdWx0c1tcIm5hbWVcIl0gPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgcmVzZXRQcmljZSgpIHtcclxuICAgICAgICBsZXQgaWQgPSBOYW1lTWFwcGVyLmdldElkKHRoaXMucmVzdWx0c1tcIm5hbWVcIl0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSWQgaXMgXCIgKyBpZCk7XHJcbiAgICAgICAgaWYoaWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcuLi5cIik7XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkuY29ubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCIgKyBpZCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzW1wicHVyY2hhc2VkUHJpY2VcIl0gPSBqc29uLmRhdGEucXVvdGVzLlVTRC5wcmljZS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiQ29pbiBkb2VzIG5vdCBleGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaG9vc2VOYW1lKG5hbWU6c3RyaW5nKTp2b2lkIHtcclxuICAgICAgICB0aGlzLnJlc3VsdHNbXCJuYW1lXCJdID0gbmFtZTtcclxuICAgICAgICB0aGlzLnNlYXJjaEJhci50ZXh0ID0gbmFtZTtcclxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnNob3dSZXN1bHRzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbnB1dE9wYWNpdHkgPSBcIjFcIjtcclxuICAgIH1cclxufSJdfQ==