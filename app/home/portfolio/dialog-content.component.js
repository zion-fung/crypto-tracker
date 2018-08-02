"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
var dialogs_1 = require("ui/dialogs");
var DialogContent = /** @class */ (function () {
    function DialogContent(params, picker) {
        this.params = params;
        this.picker = picker;
        this.incorrectDateString = "Date must be in format: DD/MM/YYYY and not in the future";
        // Contains the ids of every field that must be filled out
        this.ids = ["name", "amountOwned", "purchasedPrice", "datePurchased"];
        // Contains the results of the dialog and their default values
        this.results = {};
        this.prompt = params.context.promptMsg;
    }
    /* @param obj : The textfield object containing the text and id
    *
    * */
    DialogContent.prototype.update = function (obj) {
        var text = obj.text;
        if (text != undefined) {
            this.results[obj.id] = text;
        }
    };
    // Returns the reuslts of the dialog
    DialogContent.prototype.add = function () {
        if (this.results["datePurchased"] && !this.verifyDate(this.results["datePurchased"])) {
            dialogs_1.alert(this.incorrectDateString);
            return;
        }
        if (!this.verifyFields()) {
            dialogs_1.alert("All fields must be filled out");
            return;
        }
        this.params.closeCallback(this.results);
    };
    // Returns an empty object since the dialog was canceled
    DialogContent.prototype.close = function () {
        var result = {};
        this.params.closeCallback(result);
    };
    DialogContent.prototype.showDateTimePicker = function () {
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
    DialogContent.prototype.verifyDate = function (dateString) {
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
    DialogContent.prototype.verifyFields = function () {
        for (var _i = 0, _a = this.ids; _i < _a.length; _i++) {
            var field = _a[_i];
            if (!this.results[field]) {
                return false;
            }
        }
        return true;
    };
    DialogContent = tslib_1.__decorate([
        core_1.Component({
            selector: "modal-content",
            templateUrl: "./home/portfolio/dialog-content.component.html"
        }),
        tslib_1.__metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams, nativescript_modal_datetimepicker_1.ModalDatetimepicker])
    ], DialogContent);
    return DialogContent;
}());
exports.DialogContent = DialogContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUEwQztBQUMxQyxrRUFBc0U7QUFFdEUsdUZBQXVHO0FBQ3ZHLHNDQUFtQztBQU9uQztJQU9JLHVCQUFvQixNQUF5QixFQUFVLE1BQTJCO1FBQTlELFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7UUFMMUUsd0JBQW1CLEdBQUcsMERBQTBELENBQUM7UUFDekYsMERBQTBEO1FBQ2xELFFBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDekUsOERBQThEO1FBQzlELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFVCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFHRDs7UUFFSTtJQUNKLDhCQUFNLEdBQU4sVUFBTyxHQUFjO1FBQ2pCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDcEIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsb0NBQW9DO0lBQzdCLDJCQUFHLEdBQVY7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLGVBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FB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Z0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBeEZRLGFBQWE7UUFKekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxnREFBZ0Q7U0FDaEUsQ0FBQztpREFROEIsZ0NBQWlCLEVBQWtCLHVEQUFtQjtPQVB6RSxhQUFhLENBeUZ6QjtJQUFELG9CQUFDO0NBQUEsQUF6RkQsSUF5RkM7QUF6Rlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRldGltZXBpY2tlciwgUGlja2VyT3B0aW9ucywgUGlja2VyUmVzcG9uc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCI7XHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgc3RhcnQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibW9kYWwtY29udGVudFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lL3BvcnRmb2xpby9kaWFsb2ctY29udGVudC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb250ZW50IHtcclxuICAgIHB1YmxpYyBwcm9tcHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgaW5jb3JyZWN0RGF0ZVN0cmluZyA9IFwiRGF0ZSBtdXN0IGJlIGluIGZvcm1hdDogREQvTU0vWVlZWSBhbmQgbm90IGluIHRoZSBmdXR1cmVcIjtcclxuICAgIC8vIENvbnRhaW5zIHRoZSBpZHMgb2YgZXZlcnkgZmllbGQgdGhhdCBtdXN0IGJlIGZpbGxlZCBvdXRcclxuICAgIHByaXZhdGUgaWRzID0gW1wibmFtZVwiLCBcImFtb3VudE93bmVkXCIsIFwicHVyY2hhc2VkUHJpY2VcIiwgXCJkYXRlUHVyY2hhc2VkXCJdO1xyXG4gICAgLy8gQ29udGFpbnMgdGhlIHJlc3VsdHMgb2YgdGhlIGRpYWxvZyBhbmQgdGhlaXIgZGVmYXVsdCB2YWx1ZXNcclxuICAgIHJlc3VsdHMgPSB7fTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHJpdmF0ZSBwaWNrZXI6IE1vZGFsRGF0ZXRpbWVwaWNrZXIpIHtcclxuICAgICAgICB0aGlzLnByb21wdCA9IHBhcmFtcy5jb250ZXh0LnByb21wdE1zZztcclxuICAgIH1cclxuICAgIGFtb3VudE93bmVkOiBudW1iZXI7XHJcblxyXG4gICAgLyogQHBhcmFtIG9iaiA6IFRoZSB0ZXh0ZmllbGQgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRleHQgYW5kIGlkXHJcbiAgICAqXHJcbiAgICAqICovXHJcbiAgICB1cGRhdGUob2JqOiBUZXh0RmllbGQpIHtcclxuICAgICAgICBsZXQgdGV4dCA9IG9iai50ZXh0O1xyXG4gICAgICAgIGlmKHRleHQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0c1tvYmouaWRdID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBSZXR1cm5zIHRoZSByZXVzbHRzIG9mIHRoZSBkaWFsb2dcclxuICAgIHB1YmxpYyBhZGQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSAmJiAhdGhpcy52ZXJpZnlEYXRlKHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0pKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuaW5jb3JyZWN0RGF0ZVN0cmluZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMudmVyaWZ5RmllbGRzKCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJBbGwgZmllbGRzIG11c3QgYmUgZmlsbGVkIG91dFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHRoaXMucmVzdWx0cyk7XHJcbiAgICB9XHJcbiAgICAvLyBSZXR1cm5zIGFuIGVtcHR5IG9iamVjdCBzaW5jZSB0aGUgZGlhbG9nIHdhcyBjYW5jZWxlZFxyXG4gICAgcHVibGljIGNsb3NlKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICBzaG93RGF0ZVRpbWVQaWNrZXIoKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0pO1xyXG4gICAgICAgIC8vIFZlcmlmeSB0aGF0IGRhdGUgaXMgaW4gY29ycmVjdCBmb3JtYXRcclxuICAgICAgICBpZighdGhpcy52ZXJpZnlEYXRlKHN0YXJ0RGF0ZS50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICAvLyBhbGVydCh0aGlzLmluY29ycmVjdERhdGVTdHJpbmcpO1xyXG4gICAgICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIGl0IGlzIG5vdCBhIG51bWJlciwgdGhlbiBubyBkYXRlIHdhcyBjaG9zZW5cclxuICAgICAgICBpZihpc05hTihOdW1iZXIoc3RhcnREYXRlKSkpIHtcclxuICAgICAgICAgICAgc3RhcnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IFBpY2tlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlzMjRIb3VyVmlldzogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhbmNlbExhYmVsOiBcIkNhbmNlbFwiLFxyXG4gICAgICAgICAgICBkb25lTGFiZWw6IFwiRG9uZVwiLFxyXG4gICAgICAgICAgICBzdGFydGluZ0RhdGU6IHN0YXJ0RGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5waWNrZXIucGlja0RhdGUob3B0aW9ucykudGhlbihcclxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IDxQaWNrZXJSZXNwb25zZT5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdID0gcmVzcG9uc2UubW9udGggKyBcIi9cIiArIHJlc3BvbnNlLmRheSArIFwiL1wiICsgcmVzcG9uc2UueWVhcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIC8vIEdpdmVuIGEgZGF0ZSBzdHJpbmcgdmVyaWZ5IGlmIGl0J3MgdmFsaWQgYW5kIGhhcyBhIHllYXIgb2YgNCBkaWdpdHNcclxuICAgIHByaXZhdGUgdmVyaWZ5RGF0ZShkYXRlU3RyaW5nOiBzdHJpbmcpOmJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XHJcbiAgICAgICAgLy8gTm90IGEgbnVtYmVyID0gbm90IGEgdmFsaWQgZGF0ZVxyXG4gICAgICAgIGlmKGlzTmFOKE51bWJlcihkYXRlKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDaGVjayBpZiBkYXRlIGlzIGluIHRoZSBmdXR1cmVcclxuICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCBhID0gTnVtYmVyKGRhdGUpO1xyXG4gICAgICAgIGxldCBiID0gTnVtYmVyKGN1cnJlbnREYXRlKTtcclxuICAgICAgICAvLyBEYXRlIGlzIGluIHRoZSBmdXR1cmVcclxuICAgICAgICBpZihhID4gYikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8gVmVyaWZpZXMgdGhhdCBldmVyeSBmaWVsZCBpcyBmaWxsZWQgb3V0XHJcbiAgICBwcml2YXRlIHZlcmlmeUZpZWxkcygpOmJvb2xlYW4ge1xyXG4gICAgICAgIGZvcih2YXIgZmllbGQgb2YgdGhpcy5pZHMpIHtcclxuICAgICAgICAgICAgaWYoIXRoaXMucmVzdWx0c1tmaWVsZF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSJdfQ==