"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
var dialogs_1 = require("ui/dialogs");
var name_mapper_1 = require("../../name-mapper");
var page_1 = require("ui/page");
var PortfolioInput = /** @class */ (function () {
    function PortfolioInput(params, picker) {
        this.params = params;
        this.picker = picker;
        this.incorrectDateString = "Date must be in format: DD/MM/YYYY and not in the future";
        // Contains the ids of every field that must be filled out
        this.ids = ["name", "amountOwned", "purchasedPrice", "datePurchased"];
        // Contains the results of the dialog and their default values
        this.results = {};
    }
    PortfolioInput.prototype.ngOnInit = function () {
        var today = new Date();
        this.results["datePurchased"] = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
        this.results["amountOwned"] = 0;
        this.results["name"] = "Bitcoin";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQTBDO0FBQzFDLGtFQUFzRTtBQUV0RSx1RkFBdUc7QUFDdkcsc0NBQW1DO0FBQ25DLGlEQUErQztBQUMvQyxnQ0FBb0M7QUFRcEM7SUFNSSx3QkFBb0IsTUFBeUIsRUFBVSxNQUEyQjtRQUE5RCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBTDFFLHdCQUFtQixHQUFHLDBEQUEwRCxDQUFDO1FBQ3pGLDBEQUEwRDtRQUNsRCxRQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3pFLDhEQUE4RDtRQUM5RCxZQUFPLEdBQUcsRUFBRSxDQUFDO0lBR2IsQ0FBQztJQUNELGlDQUFRLEdBQVI7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFDRDs7UUFFSTtJQUNKLCtCQUFNLEdBQU4sVUFBTyxHQUFjO1FBQ2pCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDcEIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFJLFNBQVMs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Q2hCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxtQ0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNiLEVBQUUsQ0FBQSxDQUFDLGdCQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxDQUFDO0lBQ0wsQ0FBQztJQW5IUSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsaUVBQWlFO1lBQzlFLFNBQVMsRUFBRSxDQUFDLGlFQUFpRSxDQUFDO1NBQ2pGLENBQUM7UUFDRiwyRkFBMkY7O2lEQU8zRCxnQ0FBaUIsRUFBa0IsdURBQW1CO09BTnpFLGNBQWMsQ0FvSDFCO0lBQUQscUJBQUM7Q0FBQSxBQXBIRCxJQW9IQztBQXBIWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGV0aW1lcGlja2VyLCBQaWNrZXJPcHRpb25zLCBQaWNrZXJSZXNwb25zZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIjtcclxuaW1wb3J0IHsgYWxlcnQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBOYW1lTWFwcGVyIH0gZnJvbSBcIi4uLy4uL25hbWUtbWFwcGVyXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1vZGFsLWNvbnRlbnRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS9wb3J0Zm9saW8vcG9ydGZvbGlvLWlucHV0L3BvcnRmb2xpby1pbnB1dC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vaG9tZS9wb3J0Zm9saW8vcG9ydGZvbGlvLWlucHV0L3BvcnRmb2xpby1pbnB1dC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbi8vIFRPRE86IFJlbW92ZSBodW1hbiBhYmlsaXR5IHRvIGVudGVyIGRhdGUgYW5kIGFkZCBmdW5jdGlvbmFsaXR5IG9mIGJ1dHRvbnMgYW5kIHNlYXJjaCBiYXJcclxuZXhwb3J0IGNsYXNzIFBvcnRmb2xpb0lucHV0IHtcclxuICAgIHByaXZhdGUgaW5jb3JyZWN0RGF0ZVN0cmluZyA9IFwiRGF0ZSBtdXN0IGJlIGluIGZvcm1hdDogREQvTU0vWVlZWSBhbmQgbm90IGluIHRoZSBmdXR1cmVcIjtcclxuICAgIC8vIENvbnRhaW5zIHRoZSBpZHMgb2YgZXZlcnkgZmllbGQgdGhhdCBtdXN0IGJlIGZpbGxlZCBvdXRcclxuICAgIHByaXZhdGUgaWRzID0gW1wibmFtZVwiLCBcImFtb3VudE93bmVkXCIsIFwicHVyY2hhc2VkUHJpY2VcIiwgXCJkYXRlUHVyY2hhc2VkXCJdO1xyXG4gICAgLy8gQ29udGFpbnMgdGhlIHJlc3VsdHMgb2YgdGhlIGRpYWxvZyBhbmQgdGhlaXIgZGVmYXVsdCB2YWx1ZXNcclxuICAgIHJlc3VsdHMgPSB7fTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHJpdmF0ZSBwaWNrZXI6IE1vZGFsRGF0ZXRpbWVwaWNrZXIpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSA9ICh0b2RheS5nZXRNb250aCgpICsgMSkgKyBcIi9cIiArIHRvZGF5LmdldERhdGUoKSArIFwiL1wiICsgdG9kYXkuZ2V0RnVsbFllYXIoKTsgICAgXHJcbiAgICAgICAgdGhpcy5yZXN1bHRzW1wiYW1vdW50T3duZWRcIl0gPSAwO1xyXG4gICAgICAgIHRoaXMucmVzdWx0c1tcIm5hbWVcIl0gPSBcIkJpdGNvaW5cIjtcclxuICAgIH1cclxuICAgIC8qIEBwYXJhbSBvYmogOiBUaGUgdGV4dGZpZWxkIG9iamVjdCBjb250YWluaW5nIHRoZSB0ZXh0IGFuZCBpZFxyXG4gICAgKlxyXG4gICAgKiAqL1xyXG4gICAgdXBkYXRlKG9iajogVGV4dEZpZWxkKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBvYmoudGV4dDtcclxuICAgICAgICBpZih0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdHNbb2JqLmlkXSA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5jcmVhc2VBbW91bnRPd25lZCgpIHtcclxuICAgICAgICB0aGlzLnJlc3VsdHNbXCJhbW91bnRPd25lZFwiXSsrO1xyXG4gICAgfVxyXG4gICAgZGVjcmVhc2VBbW91bnRPd25lZCgpIHtcclxuICAgICAgICBpZih0aGlzLnJlc3VsdHNbXCJhbW91bnRPd25lZFwiXSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzW1wiYW1vdW50T3duZWRcIl0tLTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBSZXR1cm5zIHRoZSByZXN1bHRzIG9mIHRoZSBkaWFsb2dcclxuICAgIHB1YmxpYyBhZGQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSAmJiAhdGhpcy52ZXJpZnlEYXRlKHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0pKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuaW5jb3JyZWN0RGF0ZVN0cmluZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMudmVyaWZ5RmllbGRzKCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJBbGwgZmllbGRzIG11c3QgYmUgZmlsbGVkIG91dFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy52ZXJpZnlDb2luKHRoaXMucmVzdWx0c1tcIm5hbWVcIl0pKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiQ29pbiBkb2VzIG5vdCBleGlzdFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHRoaXMucmVzdWx0cyk7XHJcbiAgICB9XHJcbiAgICAvLyBSZXR1cm5zIGFuIGVtcHR5IG9iamVjdCBzaW5jZSB0aGUgZGlhbG9nIHdhcyBjYW5jZWxlZFxyXG4gICAgcHVibGljIGNsb3NlKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICBzaG93RGF0ZVRpbWVQaWNrZXIoKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0pO1xyXG4gICAgICAgIC8vIFZlcmlmeSB0aGF0IGRhdGUgaXMgaW4gY29ycmVjdCBmb3JtYXRcclxuICAgICAgICBpZighdGhpcy52ZXJpZnlEYXRlKHN0YXJ0RGF0ZS50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICAvLyBhbGVydCh0aGlzLmluY29ycmVjdERhdGVTdHJpbmcpO1xyXG4gICAgICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIGl0IGlzIG5vdCBhIG51bWJlciwgdGhlbiBubyBkYXRlIHdhcyBjaG9zZW5cclxuICAgICAgICBpZihpc05hTihOdW1iZXIoc3RhcnREYXRlKSkpIHtcclxuICAgICAgICAgICAgc3RhcnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IFBpY2tlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlzMjRIb3VyVmlldzogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhbmNlbExhYmVsOiBcIkNhbmNlbFwiLFxyXG4gICAgICAgICAgICBkb25lTGFiZWw6IFwiRG9uZVwiLFxyXG4gICAgICAgICAgICBzdGFydGluZ0RhdGU6IHN0YXJ0RGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5waWNrZXIucGlja0RhdGUob3B0aW9ucykudGhlbihcclxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IDxQaWNrZXJSZXNwb25zZT5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdID0gcmVzcG9uc2UubW9udGggKyBcIi9cIiArIHJlc3BvbnNlLmRheSArIFwiL1wiICsgcmVzcG9uc2UueWVhcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIC8vIEdpdmVuIGEgZGF0ZSBzdHJpbmcgdmVyaWZ5IGlmIGl0J3MgdmFsaWQgYW5kIGhhcyBhIHllYXIgb2YgNCBkaWdpdHNcclxuICAgIHByaXZhdGUgdmVyaWZ5RGF0ZShkYXRlU3RyaW5nOiBzdHJpbmcpOmJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XHJcbiAgICAgICAgLy8gTm90IGEgbnVtYmVyID0gbm90IGEgdmFsaWQgZGF0ZVxyXG4gICAgICAgIGlmKGlzTmFOKE51bWJlcihkYXRlKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDaGVjayBpZiBkYXRlIGlzIGluIHRoZSBmdXR1cmVcclxuICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCBhID0gTnVtYmVyKGRhdGUpO1xyXG4gICAgICAgIGxldCBiID0gTnVtYmVyKGN1cnJlbnREYXRlKTtcclxuICAgICAgICAvLyBEYXRlIGlzIGluIHRoZSBmdXR1cmVcclxuICAgICAgICBpZihhID4gYikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8gVmVyaWZpZXMgdGhhdCBldmVyeSBmaWVsZCBpcyBmaWxsZWQgb3V0XHJcbiAgICBwcml2YXRlIHZlcmlmeUZpZWxkcygpOmJvb2xlYW4ge1xyXG4gICAgICAgIGZvcih2YXIgZmllbGQgb2YgdGhpcy5pZHMpIHtcclxuICAgICAgICAgICAgaWYoIXRoaXMucmVzdWx0c1tmaWVsZF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIFZlcmlmaWVzIHRoYXQgdGhlIGNvaW4gaW5wdXRlZCBieSB0aGUgdXNlciBhY3R1YWxseSBleGlzdHNcclxuICAgIHByaXZhdGUgdmVyaWZ5Q29pbihuYW1lOiBzdHJpbmcpOmJvb2xlYW4ge1xyXG4gICAgICAgIGlmKE5hbWVNYXBwZXIuZ2V0SWQobmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNsZWFyRm9jdXMoc2VhcmNoKSB7XHJcbiAgICAgICAgaWYoaXNBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=