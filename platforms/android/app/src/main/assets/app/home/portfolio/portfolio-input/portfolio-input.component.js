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
        this.name = "Bitcoin";
    }
    /* @param obj : The textfield object containing the text and id
    *
    * */
    PortfolioInput.prototype.update = function (obj) {
        var text = obj.text;
        if (text != undefined) {
            this.results[obj.id] = text;
        }
    };
    // Returns the reuslts of the dialog
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQTBDO0FBQzFDLGtFQUFzRTtBQUV0RSx1RkFBdUc7QUFDdkcsc0NBQW1DO0FBQ25DLGlEQUErQztBQUMvQyxnQ0FBb0M7QUFRcEM7SUFNSSx3QkFBb0IsTUFBeUIsRUFBVSxNQUEyQjtRQUE5RCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBTDFFLHdCQUFtQixHQUFHLDBEQUEwRCxDQUFDO1FBQ3pGLDBEQUEwRDtRQUNsRCxRQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3pFLDhEQUE4RDtRQUM5RCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBS2IsU0FBSSxHQUFVLFNBQVMsQ0FBQztJQUZ4QixDQUFDO0lBR0Q7O1FBRUk7SUFDSiwrQkFBTSxHQUFOLFVBQU8sR0FBYztRQUNqQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNoQyxDQUFDO0lBQ0wsQ0FBQztJQUNELG9DQUFvQztJQUM3Qiw0QkFBRyxHQUFWO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRixlQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7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LENBQUEsQ0FBYyxVQUFRLEVBQVIsS0FBQSxJQUFJLENBQUMsR0FBRyxFQUFSLGNBQVEsRUFBUixJQUFRO1lBQXJCLElBQUksS0FBSyxTQUFBO1lBQ1QsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1NBQ0o7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCw2REFBNkQ7SUFDckQsbUNBQVUsR0FBbEIsVUFBbUIsSUFBWTtRQUMzQixFQUFFLENBQUEsQ0FBQyx3QkFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0QsbUNBQVUsR0FBVixVQUFXLE1BQU07UUFDYixFQUFFLENBQUEsQ0FBQyxnQkFBUyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUF2R1EsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLGlFQUFpRTtZQUM5RSxTQUFTLEVBQUUsQ0FBQyxpRUFBaUUsQ0FBQztTQUNqRixDQUFDO1FBQ0YsMkZBQTJGOztpREFPM0QsZ0NBQWlCLEVBQWtCLHVEQUFtQjtPQU56RSxjQUFjLENBd0cxQjtJQUFELHFCQUFDO0NBQUEsQUF4R0QsSUF3R0M7QUF4R1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRldGltZXBpY2tlciwgUGlja2VyT3B0aW9ucywgUGlja2VyUmVzcG9uc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCI7XHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgTmFtZU1hcHBlciB9IGZyb20gXCIuLi8uLi9uYW1lLW1hcHBlclwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtb2RhbC1jb250ZW50XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUvcG9ydGZvbGlvL3BvcnRmb2xpby1pbnB1dC9wb3J0Zm9saW8taW5wdXQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2hvbWUvcG9ydGZvbGlvL3BvcnRmb2xpby1pbnB1dC9wb3J0Zm9saW8taW5wdXQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG4vLyBUT0RPOiBSZW1vdmUgaHVtYW4gYWJpbGl0eSB0byBlbnRlciBkYXRlIGFuZCBhZGQgZnVuY3Rpb25hbGl0eSBvZiBidXR0b25zIGFuZCBzZWFyY2ggYmFyXHJcbmV4cG9ydCBjbGFzcyBQb3J0Zm9saW9JbnB1dCB7XHJcbiAgICBwcml2YXRlIGluY29ycmVjdERhdGVTdHJpbmcgPSBcIkRhdGUgbXVzdCBiZSBpbiBmb3JtYXQ6IEREL01NL1lZWVkgYW5kIG5vdCBpbiB0aGUgZnV0dXJlXCI7XHJcbiAgICAvLyBDb250YWlucyB0aGUgaWRzIG9mIGV2ZXJ5IGZpZWxkIHRoYXQgbXVzdCBiZSBmaWxsZWQgb3V0XHJcbiAgICBwcml2YXRlIGlkcyA9IFtcIm5hbWVcIiwgXCJhbW91bnRPd25lZFwiLCBcInB1cmNoYXNlZFByaWNlXCIsIFwiZGF0ZVB1cmNoYXNlZFwiXTtcclxuICAgIC8vIENvbnRhaW5zIHRoZSByZXN1bHRzIG9mIHRoZSBkaWFsb2cgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzXHJcbiAgICByZXN1bHRzID0ge307XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsIHByaXZhdGUgcGlja2VyOiBNb2RhbERhdGV0aW1lcGlja2VyKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBhbW91bnRPd25lZDogbnVtYmVyO1xyXG4gICAgbmFtZTpzdHJpbmcgPSBcIkJpdGNvaW5cIjtcclxuICAgIC8qIEBwYXJhbSBvYmogOiBUaGUgdGV4dGZpZWxkIG9iamVjdCBjb250YWluaW5nIHRoZSB0ZXh0IGFuZCBpZFxyXG4gICAgKlxyXG4gICAgKiAqL1xyXG4gICAgdXBkYXRlKG9iajogVGV4dEZpZWxkKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBvYmoudGV4dDtcclxuICAgICAgICBpZih0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdHNbb2JqLmlkXSA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gUmV0dXJucyB0aGUgcmV1c2x0cyBvZiB0aGUgZGlhbG9nXHJcbiAgICBwdWJsaWMgYWRkKCkge1xyXG4gICAgICAgIGlmKHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0gJiYgIXRoaXMudmVyaWZ5RGF0ZSh0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdKSkge1xyXG4gICAgICAgICAgICBhbGVydCh0aGlzLmluY29ycmVjdERhdGVTdHJpbmcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnZlcmlmeUZpZWxkcygpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiQWxsIGZpZWxkcyBtdXN0IGJlIGZpbGxlZCBvdXRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMudmVyaWZ5Q29pbih0aGlzLnJlc3VsdHNbXCJuYW1lXCJdKSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkNvaW4gZG9lcyBub3QgZXhpc3RcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh0aGlzLnJlc3VsdHMpO1xyXG4gICAgfVxyXG4gICAgLy8gUmV0dXJucyBhbiBlbXB0eSBvYmplY3Qgc2luY2UgdGhlIGRpYWxvZyB3YXMgY2FuY2VsZWRcclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge307XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhyZXN1bHQpO1xyXG4gICAgfVxyXG4gICAgc2hvd0RhdGVUaW1lUGlja2VyKCkge1xyXG4gICAgICAgIGxldCBzdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdKTtcclxuICAgICAgICAvLyBWZXJpZnkgdGhhdCBkYXRlIGlzIGluIGNvcnJlY3QgZm9ybWF0XHJcbiAgICAgICAgaWYoIXRoaXMudmVyaWZ5RGF0ZShzdGFydERhdGUudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgLy8gYWxlcnQodGhpcy5pbmNvcnJlY3REYXRlU3RyaW5nKTtcclxuICAgICAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBJZiBpdCBpcyBub3QgYSBudW1iZXIsIHRoZW4gbm8gZGF0ZSB3YXMgY2hvc2VuXHJcbiAgICAgICAgaWYoaXNOYU4oTnVtYmVyKHN0YXJ0RGF0ZSkpKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvcHRpb25zOiBQaWNrZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpczI0SG91clZpZXc6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYW5jZWxMYWJlbDogXCJDYW5jZWxcIixcclxuICAgICAgICAgICAgZG9uZUxhYmVsOiBcIkRvbmVcIixcclxuICAgICAgICAgICAgc3RhcnRpbmdEYXRlOiBzdGFydERhdGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucGlja2VyLnBpY2tEYXRlKG9wdGlvbnMpLnRoZW4oXHJcbiAgICAgICAgICAgIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSA8UGlja2VyUmVzcG9uc2U+cmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSA9IHJlc3BvbnNlLm1vbnRoICsgXCIvXCIgKyByZXNwb25zZS5kYXkgKyBcIi9cIiArIHJlc3BvbnNlLnllYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICAvLyBHaXZlbiBhIGRhdGUgc3RyaW5nIHZlcmlmeSBpZiBpdCdzIHZhbGlkIGFuZCBoYXMgYSB5ZWFyIG9mIDQgZGlnaXRzXHJcbiAgICBwcml2YXRlIHZlcmlmeURhdGUoZGF0ZVN0cmluZzogc3RyaW5nKTpib29sZWFuIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG4gICAgICAgIC8vIE5vdCBhIG51bWJlciA9IG5vdCBhIHZhbGlkIGRhdGVcclxuICAgICAgICBpZihpc05hTihOdW1iZXIoZGF0ZSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgZGF0ZSBpcyBpbiB0aGUgZnV0dXJlXHJcbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgYSA9IE51bWJlcihkYXRlKTtcclxuICAgICAgICBsZXQgYiA9IE51bWJlcihjdXJyZW50RGF0ZSk7XHJcbiAgICAgICAgLy8gRGF0ZSBpcyBpbiB0aGUgZnV0dXJlXHJcbiAgICAgICAgaWYoYSA+IGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIFZlcmlmaWVzIHRoYXQgZXZlcnkgZmllbGQgaXMgZmlsbGVkIG91dFxyXG4gICAgcHJpdmF0ZSB2ZXJpZnlGaWVsZHMoKTpib29sZWFuIHtcclxuICAgICAgICBmb3IodmFyIGZpZWxkIG9mIHRoaXMuaWRzKSB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnJlc3VsdHNbZmllbGRdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyBWZXJpZmllcyB0aGF0IHRoZSBjb2luIGlucHV0ZWQgYnkgdGhlIHVzZXIgYWN0dWFsbHkgZXhpc3RzXHJcbiAgICBwcml2YXRlIHZlcmlmeUNvaW4obmFtZTogc3RyaW5nKTpib29sZWFuIHtcclxuICAgICAgICBpZihOYW1lTWFwcGVyLmdldElkKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjbGVhckZvY3VzKHNlYXJjaCkge1xyXG4gICAgICAgIGlmKGlzQW5kcm9pZCkge1xyXG4gICAgICAgICAgICBzZWFyY2guYW5kcm9pZC5jbGVhckZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19