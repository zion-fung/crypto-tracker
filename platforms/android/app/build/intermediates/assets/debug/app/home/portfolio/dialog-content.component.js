"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
var DialogContent = /** @class */ (function () {
    function DialogContent(params, picker) {
        this.params = params;
        this.picker = picker;
        this.headers = [
            { "id": "name", "hint": "Name", "keyboardType": "email" },
            { "id": "amountOwned", "hint": "Amount Owned", "keyboardType": "number" },
            { "id": "purchasePrice", "hint": "Purchase Price", "keyboardType": "number" },
            { "id": "datePurchased", "hint": "Date Purchased", "keyboardType": "datetime" }
        ];
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
        this.params.closeCallback(this.results);
    };
    // Returns an empty object since the dialog was canceled
    DialogContent.prototype.close = function () {
        var result = {};
        this.params.closeCallback(result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUEwQztBQUMxQyxrRUFBc0U7QUFFdEUsdUZBQXdFO0FBTXhFO0lBVUksdUJBQW9CLE1BQXlCLEVBQVUsTUFBMkI7UUFBOUQsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQVJsRixZQUFPLEdBQUc7WUFDTixFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFDO1lBQ3ZELEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUM7WUFDdkUsRUFBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFDO1lBQzNFLEVBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBQztTQUNoRixDQUFDO1FBQ0YsOERBQThEO1FBQzlELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFVCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFHRDs7UUFFSTtJQUNKLDhCQUFNLEdBQU4sVUFBTyxHQUFjO1FBQ2pCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDcEIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsb0NBQW9DO0lBQzdCLDJCQUFHLEdBQVY7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELHdEQUF3RDtJQUNqRCw2QkFBSyxHQUFaO1FBQ0ksSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFoQ1EsYUFBYTtRQUp6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLGdEQUFnRDtTQUNoRSxDQUFDO2lEQVc4QixnQ0FBaUIsRUFBa0IsdURBQW1CO09BVnpFLGFBQWEsQ0FpQ3pCO0lBQUQsb0JBQUM7Q0FBQSxBQWpDRCxJQWlDQztBQWpDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGV0aW1lcGlja2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tb2RhbC1kYXRldGltZXBpY2tlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtb2RhbC1jb250ZW50XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUvcG9ydGZvbGlvL2RpYWxvZy1jb250ZW50LmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbnRlbnQge1xyXG4gICAgcHVibGljIHByb21wdDogc3RyaW5nO1xyXG4gICAgaGVhZGVycyA9IFtcclxuICAgICAgICB7XCJpZFwiOiBcIm5hbWVcIiwgXCJoaW50XCI6IFwiTmFtZVwiLCBcImtleWJvYXJkVHlwZVwiOiBcImVtYWlsXCJ9LFxyXG4gICAgICAgIHtcImlkXCI6IFwiYW1vdW50T3duZWRcIiwgXCJoaW50XCI6IFwiQW1vdW50IE93bmVkXCIsIFwia2V5Ym9hcmRUeXBlXCI6IFwibnVtYmVyXCJ9LFxyXG4gICAgICAgIHtcImlkXCI6IFwicHVyY2hhc2VQcmljZVwiLCBcImhpbnRcIjogXCJQdXJjaGFzZSBQcmljZVwiLCBcImtleWJvYXJkVHlwZVwiOiBcIm51bWJlclwifSxcclxuICAgICAgICB7XCJpZFwiOiBcImRhdGVQdXJjaGFzZWRcIiwgXCJoaW50XCI6IFwiRGF0ZSBQdXJjaGFzZWRcIiwgXCJrZXlib2FyZFR5cGVcIjogXCJkYXRldGltZVwifVxyXG4gICAgXTtcclxuICAgIC8vIENvbnRhaW5zIHRoZSByZXN1bHRzIG9mIHRoZSBkaWFsb2cgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzXHJcbiAgICByZXN1bHRzID0ge307XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsIHByaXZhdGUgcGlja2VyOiBNb2RhbERhdGV0aW1lcGlja2VyKSB7XHJcbiAgICAgICAgdGhpcy5wcm9tcHQgPSBwYXJhbXMuY29udGV4dC5wcm9tcHRNc2c7XHJcbiAgICB9XHJcbiAgICBhbW91bnRPd25lZDogbnVtYmVyO1xyXG5cclxuICAgIC8qIEBwYXJhbSBvYmogOiBUaGUgdGV4dGZpZWxkIG9iamVjdCBjb250YWluaW5nIHRoZSB0ZXh0IGFuZCBpZFxyXG4gICAgKlxyXG4gICAgKiAqL1xyXG4gICAgdXBkYXRlKG9iajogVGV4dEZpZWxkKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBvYmoudGV4dDtcclxuICAgICAgICBpZih0ZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdHNbb2JqLmlkXSA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gUmV0dXJucyB0aGUgcmV1c2x0cyBvZiB0aGUgZGlhbG9nXHJcbiAgICBwdWJsaWMgYWRkKCkge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodGhpcy5yZXN1bHRzKTtcclxuICAgIH1cclxuICAgIC8vIFJldHVybnMgYW4gZW1wdHkgb2JqZWN0IHNpbmNlIHRoZSBkaWFsb2cgd2FzIGNhbmNlbGVkXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzdWx0KTtcclxuICAgIH0gXHJcbn0iXX0=