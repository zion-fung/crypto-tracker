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
        if (page_1.isAndroid) {
            search.android.clearFocus();
        }
    };
    PortfolioInput.prototype.filterResults = function (substring) {
        if (substring == "") {
            this.clearResults();
        }
        substring = substring.toLowerCase();
        // Look through charts data and find coins that match
        for (var _i = 0, _a = this.market; _i < _a.length; _i++) {
            var data = _a[_i];
            var name_1 = data.name;
            if (name_1.toLowerCase().indexOf(substring) != -1) {
                this.searchResults.push(data.name);
            }
        }
    };
    PortfolioInput.prototype.clearResults = function () {
        this.searchResults = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQTBDO0FBQzFDLGtFQUFzRTtBQUV0RSx1RkFBdUc7QUFDdkcsc0NBQW1DO0FBQ25DLGlEQUErQztBQUMvQyxnQ0FBb0M7QUFDcEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFROUM7SUFTSSx3QkFBb0IsTUFBeUIsRUFBVSxNQUEyQjtRQUFsRixpQkFjQztRQWRtQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBUjFFLHdCQUFtQixHQUFHLDBEQUEwRCxDQUFDO1FBQ3pGLDBEQUEwRDtRQUNsRCxRQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3pFLDhEQUE4RDtRQUM5RCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2Isa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUdSLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzFCLFVBQUEsRUFBRTtZQUNFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQzFDLFVBQUEsTUFBTTtnQkFDRixLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUN6QixDQUFDLENBQ0osQ0FBQTtRQUNMLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLDJD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Q0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxpRUFBaUU7WUFDOUUsU0FBUyxFQUFFLENBQUMsaUVBQWlFLENBQUM7U0FDakYsQ0FBQztRQUNGLDJGQUEyRjs7aURBVTNELGdDQUFpQixFQUFrQix1REFBbUI7T0FUekUsY0FBYyxDQWlLMUI7SUFBRCxxQkFBQztDQUFBLEFBaktELElBaUtDO0FBaktZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZXRpbWVwaWNrZXIsIFBpY2tlck9wdGlvbnMsIFBpY2tlclJlc3BvbnNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tb2RhbC1kYXRldGltZXBpY2tlclwiO1xyXG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IE5hbWVNYXBwZXIgfSBmcm9tIFwiLi4vLi4vbmFtZS1tYXBwZXJcIjtcclxuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxudmFyIFNxbGl0ZSA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiICk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1vZGFsLWNvbnRlbnRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS9wb3J0Zm9saW8vcG9ydGZvbGlvLWlucHV0L3BvcnRmb2xpby1pbnB1dC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vaG9tZS9wb3J0Zm9saW8vcG9ydGZvbGlvLWlucHV0L3BvcnRmb2xpby1pbnB1dC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbi8vIFRPRE86IFJlbW92ZSBodW1hbiBhYmlsaXR5IHRvIGVudGVyIGRhdGUgYW5kIGFkZCBmdW5jdGlvbmFsaXR5IG9mIGJ1dHRvbnMgYW5kIHNlYXJjaCBiYXJcclxuZXhwb3J0IGNsYXNzIFBvcnRmb2xpb0lucHV0IHtcclxuICAgIHByaXZhdGUgaW5jb3JyZWN0RGF0ZVN0cmluZyA9IFwiRGF0ZSBtdXN0IGJlIGluIGZvcm1hdDogREQvTU0vWVlZWSBhbmQgbm90IGluIHRoZSBmdXR1cmVcIjtcclxuICAgIC8vIENvbnRhaW5zIHRoZSBpZHMgb2YgZXZlcnkgZmllbGQgdGhhdCBtdXN0IGJlIGZpbGxlZCBvdXRcclxuICAgIHByaXZhdGUgaWRzID0gW1wibmFtZVwiLCBcImFtb3VudE93bmVkXCIsIFwicHVyY2hhc2VkUHJpY2VcIiwgXCJkYXRlUHVyY2hhc2VkXCJdO1xyXG4gICAgLy8gQ29udGFpbnMgdGhlIHJlc3VsdHMgb2YgdGhlIGRpYWxvZyBhbmQgdGhlaXIgZGVmYXVsdCB2YWx1ZXNcclxuICAgIHJlc3VsdHMgPSB7fTtcclxuICAgIHNlYXJjaFJlc3VsdHMgPSBbXTtcclxuICAgIG1hcmtldCA9IFtdO1xyXG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIHBpY2tlcjogTW9kYWxEYXRldGltZXBpY2tlcikge1xyXG4gICAgICAgIChuZXcgU3FsaXRlKFwiY3J5cHRvLmRiXCIpKS50aGVuKFxyXG4gICAgICAgICAgICBkYiA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYi5yZXN1bHRUeXBlKFNxbGl0ZS5SRVNVTFRTQVNPQkpFQ1RTKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBtYXJrZXRcIikudGhlbihcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtldCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb3BlbmluZyBkYXRhYmFzZSBpbiBwb3J0Zm9saW8gaW5wdXRcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgY3VycmVudFByaWNlOm51bWJlcjtcclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSA9ICh0b2RheS5nZXRNb250aCgpICsgMSkgKyBcIi9cIiArIHRvZGF5LmdldERhdGUoKSArIFwiL1wiICsgdG9kYXkuZ2V0RnVsbFllYXIoKTsgICAgXHJcbiAgICAgICAgdGhpcy5yZXN1bHRzW1wiYW1vdW50T3duZWRcIl0gPSAwO1xyXG4gICAgICAgIHRoaXMucmVzdWx0c1tcIm5hbWVcIl0gPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgLyogQHBhcmFtIG9iaiA6IFRoZSB0ZXh0ZmllbGQgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRleHQgYW5kIGlkXHJcbiAgICAqXHJcbiAgICAqICovXHJcbiAgICB1cGRhdGUob2JqOiBUZXh0RmllbGQpIHtcclxuICAgICAgICBsZXQgdGV4dCA9IG9iai50ZXh0O1xyXG4gICAgICAgIGlmKHRleHQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0c1tvYmouaWRdID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbmNyZWFzZUFtb3VudE93bmVkKCkge1xyXG4gICAgICAgIHRoaXMucmVzdWx0c1tcImFtb3VudE93bmVkXCJdKys7XHJcbiAgICB9XHJcbiAgICBkZWNyZWFzZUFtb3VudE93bmVkKCkge1xyXG4gICAgICAgIGlmKHRoaXMucmVzdWx0c1tcImFtb3VudE93bmVkXCJdID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdHNbXCJhbW91bnRPd25lZFwiXS0tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFJldHVybnMgdGhlIHJlc3VsdHMgb2YgdGhlIGRpYWxvZ1xyXG4gICAgcHVibGljIGFkZCgpIHtcclxuICAgICAgICBpZih0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdICYmICF0aGlzLnZlcmlmeURhdGUodGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSkpIHtcclxuICAgICAgICAgICAgYWxlcnQodGhpcy5pbmNvcnJlY3REYXRlU3RyaW5nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy52ZXJpZnlGaWVsZHMoKSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkFsbCBmaWVsZHMgbXVzdCBiZSBmaWxsZWQgb3V0XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnZlcmlmeUNvaW4odGhpcy5yZXN1bHRzW1wibmFtZVwiXSkpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJDb2luIGRvZXMgbm90IGV4aXN0XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodGhpcy5yZXN1bHRzKTtcclxuICAgIH1cclxuICAgIC8vIFJldHVybnMgYW4gZW1wdHkgb2JqZWN0IHNpbmNlIHRoZSBkaWFsb2cgd2FzIGNhbmNlbGVkXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzdWx0KTtcclxuICAgIH1cclxuICAgIHNob3dEYXRlVGltZVBpY2tlcigpIHtcclxuICAgICAgICBsZXQgc3RhcnREYXRlID0gbmV3IERhdGUodGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSk7XHJcbiAgICAgICAgLy8gVmVyaWZ5IHRoYXQgZGF0ZSBpcyBpbiBjb3JyZWN0IGZvcm1hdFxyXG4gICAgICAgIGlmKCF0aGlzLnZlcmlmeURhdGUoc3RhcnREYXRlLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KHRoaXMuaW5jb3JyZWN0RGF0ZVN0cmluZyk7XHJcbiAgICAgICAgICAgIC8vIHJldHVybjtcclxuICAgICAgICAgICAgc3RhcnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gSWYgaXQgaXMgbm90IGEgbnVtYmVyLCB0aGVuIG5vIGRhdGUgd2FzIGNob3NlblxyXG4gICAgICAgIGlmKGlzTmFOKE51bWJlcihzdGFydERhdGUpKSkge1xyXG4gICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3B0aW9uczogUGlja2VyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaXMyNEhvdXJWaWV3OiBmYWxzZSxcclxuICAgICAgICAgICAgY2FuY2VsTGFiZWw6IFwiQ2FuY2VsXCIsXHJcbiAgICAgICAgICAgIGRvbmVMYWJlbDogXCJEb25lXCIsXHJcbiAgICAgICAgICAgIHN0YXJ0aW5nRGF0ZTogc3RhcnREYXRlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBpY2tlci5waWNrRGF0ZShvcHRpb25zKS50aGVuKFxyXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gPFBpY2tlclJlc3BvbnNlPnJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0gPSByZXNwb25zZS5tb250aCArIFwiL1wiICsgcmVzcG9uc2UuZGF5ICsgXCIvXCIgKyByZXNwb25zZS55ZWFyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgLy8gR2l2ZW4gYSBkYXRlIHN0cmluZyB2ZXJpZnkgaWYgaXQncyB2YWxpZCBhbmQgaGFzIGEgeWVhciBvZiA0IGRpZ2l0c1xyXG4gICAgcHJpdmF0ZSB2ZXJpZnlEYXRlKGRhdGVTdHJpbmc6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcclxuICAgICAgICAvLyBOb3QgYSBudW1iZXIgPSBub3QgYSB2YWxpZCBkYXRlXHJcbiAgICAgICAgaWYoaXNOYU4oTnVtYmVyKGRhdGUpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENoZWNrIGlmIGRhdGUgaXMgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGEgPSBOdW1iZXIoZGF0ZSk7XHJcbiAgICAgICAgbGV0IGIgPSBOdW1iZXIoY3VycmVudERhdGUpO1xyXG4gICAgICAgIC8vIERhdGUgaXMgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgIGlmKGEgPiBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyBWZXJpZmllcyB0aGF0IGV2ZXJ5IGZpZWxkIGlzIGZpbGxlZCBvdXRcclxuICAgIHByaXZhdGUgdmVyaWZ5RmllbGRzKCk6Ym9vbGVhbiB7XHJcbiAgICAgICAgZm9yKHZhciBmaWVsZCBvZiB0aGlzLmlkcykge1xyXG4gICAgICAgICAgICBpZighdGhpcy5yZXN1bHRzW2ZpZWxkXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8gVmVyaWZpZXMgdGhhdCB0aGUgY29pbiBpbnB1dGVkIGJ5IHRoZSB1c2VyIGFjdHVhbGx5IGV4aXN0c1xyXG4gICAgcHJpdmF0ZSB2ZXJpZnlDb2luKG5hbWU6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICAgICAgaWYoTmFtZU1hcHBlci5nZXRJZChuYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY2xlYXJGb2N1cyhzZWFyY2gpIHtcclxuICAgICAgICBpZihpc0FuZHJvaWQpIHtcclxuICAgICAgICAgICAgc2VhcmNoLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZpbHRlclJlc3VsdHMoc3Vic3RyaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBpZihzdWJzdHJpbmcgPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyUmVzdWx0cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdWJzdHJpbmcgPSBzdWJzdHJpbmcudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAvLyBMb29rIHRocm91Z2ggY2hhcnRzIGRhdGEgYW5kIGZpbmQgY29pbnMgdGhhdCBtYXRjaFxyXG4gICAgICAgIGZvcih2YXIgZGF0YSBvZiB0aGlzLm1hcmtldCkge1xyXG4gICAgICAgICAgICBsZXQgbmFtZTpzdHJpbmcgPSBkYXRhLm5hbWU7XHJcbiAgICAgICAgICAgIGlmKG5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHN1YnN0cmluZykgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cy5wdXNoKGRhdGEubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGVhclJlc3VsdHMoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gW107XHJcbiAgICB9XHJcbiAgICBhc3luYyByZXNldFByaWNlKCkge1xyXG4gICAgICAgIGxldCBpZCA9IE5hbWVNYXBwZXIuZ2V0SWQodGhpcy5yZXN1bHRzW1wibmFtZVwiXSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJZCBpcyBcIiArIGlkKTtcclxuICAgICAgICBpZihpZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZy4uLlwiKTtcclxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5jb25tYXJrZXRjYXAuY29tL3YyL3RpY2tlci9cIiArIGlkKTtcclxuICAgICAgICAgICAgbGV0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24pO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdHNbXCJwdXJjaGFzZWRQcmljZVwiXSA9IGpzb24uZGF0YS5xdW90ZXMuVVNELnByaWNlLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJDb2luIGRvZXMgbm90IGV4aXN0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==