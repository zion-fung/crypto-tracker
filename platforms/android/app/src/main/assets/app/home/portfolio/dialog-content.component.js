"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
var dialogs_1 = require("ui/dialogs");
var name_mapper_1 = require("../name-mapper");
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
        if (!this.verifyCoin(this.results["name"])) {
            dialogs_1.alert("Coin does not exist");
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
    // Verifies that the coin inputed by the user actually exists
    DialogContent.prototype.verifyCoin = function (name) {
        if (name_mapper_1.NameMapper.getId(name)) {
            return true;
        }
        return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUEwQztBQUMxQyxrRUFBc0U7QUFFdEUsdUZBQXVHO0FBQ3ZHLHNDQUFtQztBQUNuQyw4Q0FBNEM7QUFNNUM7SUFPSSx1QkFBb0IsTUFBeUIsRUFBVSxNQUEyQjtRQUE5RCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBTDFFLHdCQUFtQixHQUFHLDBEQUEwRCxDQUFDO1FBQ3pGLDBEQUEwRDtRQUNsRCxRQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3pFLDhEQUE4RDtRQUM5RCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRVQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0lBR0Q7O1FBRUk7SUFDSiw4QkFBTSxHQUFOLFVBQU8sR0FBYztRQUNqQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNoQyxDQUFDO0lBQ0wsQ0FBQztJQUNELG9DQUFvQztJQUM3QiwyQkFBRyxHQUFWO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRixlQUFLLENBQUMsSUFBSSxDQUFDLG1C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R0FBcEI7UUFDSSxHQUFHLENBQUEsQ0FBYyxVQUFRLEVBQVIsS0FBQSxJQUFJLENBQUMsR0FBRyxFQUFSLGNBQVEsRUFBUixJQUFRO1lBQXJCLElBQUksS0FBSyxTQUFBO1lBQ1QsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1NBQ0o7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCw2REFBNkQ7SUFDckQsa0NBQVUsR0FBbEIsVUFBbUIsSUFBWTtRQUMzQixFQUFFLENBQUEsQ0FBQyx3QkFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBbkdRLGFBQWE7UUFKekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxnREFBZ0Q7U0FDaEUsQ0FBQztpREFROEIsZ0NBQWlCLEVBQWtCLHVEQUFtQjtPQVB6RSxhQUFhLENBb0d6QjtJQUFELG9CQUFDO0NBQUEsQUFwR0QsSUFvR0M7QUFwR1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRldGltZXBpY2tlciwgUGlja2VyT3B0aW9ucywgUGlja2VyUmVzcG9uc2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCI7XHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgTmFtZU1hcHBlciB9IGZyb20gXCIuLi9uYW1lLW1hcHBlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtb2RhbC1jb250ZW50XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUvcG9ydGZvbGlvL2RpYWxvZy1jb250ZW50LmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbnRlbnQge1xyXG4gICAgcHVibGljIHByb21wdDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBpbmNvcnJlY3REYXRlU3RyaW5nID0gXCJEYXRlIG11c3QgYmUgaW4gZm9ybWF0OiBERC9NTS9ZWVlZIGFuZCBub3QgaW4gdGhlIGZ1dHVyZVwiO1xyXG4gICAgLy8gQ29udGFpbnMgdGhlIGlkcyBvZiBldmVyeSBmaWVsZCB0aGF0IG11c3QgYmUgZmlsbGVkIG91dFxyXG4gICAgcHJpdmF0ZSBpZHMgPSBbXCJuYW1lXCIsIFwiYW1vdW50T3duZWRcIiwgXCJwdXJjaGFzZWRQcmljZVwiLCBcImRhdGVQdXJjaGFzZWRcIl07XHJcbiAgICAvLyBDb250YWlucyB0aGUgcmVzdWx0cyBvZiB0aGUgZGlhbG9nIGFuZCB0aGVpciBkZWZhdWx0IHZhbHVlc1xyXG4gICAgcmVzdWx0cyA9IHt9O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIHBpY2tlcjogTW9kYWxEYXRldGltZXBpY2tlcikge1xyXG4gICAgICAgIHRoaXMucHJvbXB0ID0gcGFyYW1zLmNvbnRleHQucHJvbXB0TXNnO1xyXG4gICAgfVxyXG4gICAgYW1vdW50T3duZWQ6IG51bWJlcjtcclxuXHJcbiAgICAvKiBAcGFyYW0gb2JqIDogVGhlIHRleHRmaWVsZCBvYmplY3QgY29udGFpbmluZyB0aGUgdGV4dCBhbmQgaWRcclxuICAgICpcclxuICAgICogKi9cclxuICAgIHVwZGF0ZShvYmo6IFRleHRGaWVsZCkge1xyXG4gICAgICAgIGxldCB0ZXh0ID0gb2JqLnRleHQ7XHJcbiAgICAgICAgaWYodGV4dCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzW29iai5pZF0gPSB0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFJldHVybnMgdGhlIHJldXNsdHMgb2YgdGhlIGRpYWxvZ1xyXG4gICAgcHVibGljIGFkZCgpIHtcclxuICAgICAgICBpZih0aGlzLnJlc3VsdHNbXCJkYXRlUHVyY2hhc2VkXCJdICYmICF0aGlzLnZlcmlmeURhdGUodGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSkpIHtcclxuICAgICAgICAgICAgYWxlcnQodGhpcy5pbmNvcnJlY3REYXRlU3RyaW5nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy52ZXJpZnlGaWVsZHMoKSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkFsbCBmaWVsZHMgbXVzdCBiZSBmaWxsZWQgb3V0XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnZlcmlmeUNvaW4odGhpcy5yZXN1bHRzW1wibmFtZVwiXSkpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJDb2luIGRvZXMgbm90IGV4aXN0XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodGhpcy5yZXN1bHRzKTtcclxuICAgIH1cclxuICAgIC8vIFJldHVybnMgYW4gZW1wdHkgb2JqZWN0IHNpbmNlIHRoZSBkaWFsb2cgd2FzIGNhbmNlbGVkXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzdWx0KTtcclxuICAgIH1cclxuICAgIHNob3dEYXRlVGltZVBpY2tlcigpIHtcclxuICAgICAgICBsZXQgc3RhcnREYXRlID0gbmV3IERhdGUodGhpcy5yZXN1bHRzW1wiZGF0ZVB1cmNoYXNlZFwiXSk7XHJcbiAgICAgICAgLy8gVmVyaWZ5IHRoYXQgZGF0ZSBpcyBpbiBjb3JyZWN0IGZvcm1hdFxyXG4gICAgICAgIGlmKCF0aGlzLnZlcmlmeURhdGUoc3RhcnREYXRlLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KHRoaXMuaW5jb3JyZWN0RGF0ZVN0cmluZyk7XHJcbiAgICAgICAgICAgIC8vIHJldHVybjtcclxuICAgICAgICAgICAgc3RhcnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gSWYgaXQgaXMgbm90IGEgbnVtYmVyLCB0aGVuIG5vIGRhdGUgd2FzIGNob3NlblxyXG4gICAgICAgIGlmKGlzTmFOKE51bWJlcihzdGFydERhdGUpKSkge1xyXG4gICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3B0aW9uczogUGlja2VyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaXMyNEhvdXJWaWV3OiBmYWxzZSxcclxuICAgICAgICAgICAgY2FuY2VsTGFiZWw6IFwiQ2FuY2VsXCIsXHJcbiAgICAgICAgICAgIGRvbmVMYWJlbDogXCJEb25lXCIsXHJcbiAgICAgICAgICAgIHN0YXJ0aW5nRGF0ZTogc3RhcnREYXRlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBpY2tlci5waWNrRGF0ZShvcHRpb25zKS50aGVuKFxyXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gPFBpY2tlclJlc3BvbnNlPnJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0c1tcImRhdGVQdXJjaGFzZWRcIl0gPSByZXNwb25zZS5tb250aCArIFwiL1wiICsgcmVzcG9uc2UuZGF5ICsgXCIvXCIgKyByZXNwb25zZS55ZWFyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgLy8gR2l2ZW4gYSBkYXRlIHN0cmluZyB2ZXJpZnkgaWYgaXQncyB2YWxpZCBhbmQgaGFzIGEgeWVhciBvZiA0IGRpZ2l0c1xyXG4gICAgcHJpdmF0ZSB2ZXJpZnlEYXRlKGRhdGVTdHJpbmc6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcclxuICAgICAgICAvLyBOb3QgYSBudW1iZXIgPSBub3QgYSB2YWxpZCBkYXRlXHJcbiAgICAgICAgaWYoaXNOYU4oTnVtYmVyKGRhdGUpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENoZWNrIGlmIGRhdGUgaXMgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGEgPSBOdW1iZXIoZGF0ZSk7XHJcbiAgICAgICAgbGV0IGIgPSBOdW1iZXIoY3VycmVudERhdGUpO1xyXG4gICAgICAgIC8vIERhdGUgaXMgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgIGlmKGEgPiBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyBWZXJpZmllcyB0aGF0IGV2ZXJ5IGZpZWxkIGlzIGZpbGxlZCBvdXRcclxuICAgIHByaXZhdGUgdmVyaWZ5RmllbGRzKCk6Ym9vbGVhbiB7XHJcbiAgICAgICAgZm9yKHZhciBmaWVsZCBvZiB0aGlzLmlkcykge1xyXG4gICAgICAgICAgICBpZighdGhpcy5yZXN1bHRzW2ZpZWxkXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8gVmVyaWZpZXMgdGhhdCB0aGUgY29pbiBpbnB1dGVkIGJ5IHRoZSB1c2VyIGFjdHVhbGx5IGV4aXN0c1xyXG4gICAgcHJpdmF0ZSB2ZXJpZnlDb2luKG5hbWU6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICAgICAgaWYoTmFtZU1hcHBlci5nZXRJZChuYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59Il19