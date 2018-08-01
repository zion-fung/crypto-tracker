"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var DialogContent = /** @class */ (function () {
    function DialogContent(params) {
        this.params = params;
        this.headers = [
            { "id": "name", "hint": "Name", "keyboardType": "" },
            { "id": "amountOwned", "hint": "Amount Owned", "keyboardType": "number" },
            { "id": "purchasePrice", "hint": "Purchase Price", "keyboardType": "number" }
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
        tslib_1.__metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams])
    ], DialogContent);
    return DialogContent;
}());
exports.DialogContent = DialogContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUEwQztBQUMxQyxrRUFBc0U7QUFPdEU7SUFTSSx1QkFBb0IsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFQN0MsWUFBTyxHQUFHO1lBQ04sRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBQztZQUNsRCxFQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFDO1lBQ3ZFLEVBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBQztTQUM5RSxDQUFDO1FBQ0YsOERBQThEO1FBQzlELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFVCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFHRDs7UUFFSTtJQUNKLDhCQUFNLEdBQU4sVUFBTyxHQUFjO1FBQ2pCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDcEIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsb0NBQW9DO0lBQzdCLDJCQUFHLEdBQVY7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELHdEQUF3RDtJQUNqRCw2QkFBSyxHQUFaO1FBQ0ksSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUEvQlEsYUFBYTtRQUp6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLGdEQUFnRDtTQUNoRSxDQUFDO2lEQVU4QixnQ0FBaUI7T0FUcEMsYUFBYSxDQWdDekI7SUFBRCxvQkFBQztDQUFBLEFBaENELElBZ0NDO0FBaENZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1vZGFsLWNvbnRlbnRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS9wb3J0Zm9saW8vZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29udGVudCB7XHJcbiAgICBwdWJsaWMgcHJvbXB0OiBzdHJpbmc7XHJcbiAgICBoZWFkZXJzID0gW1xyXG4gICAgICAgIHtcImlkXCI6IFwibmFtZVwiLCBcImhpbnRcIjogXCJOYW1lXCIsIFwia2V5Ym9hcmRUeXBlXCI6IFwiXCJ9LFxyXG4gICAgICAgIHtcImlkXCI6IFwiYW1vdW50T3duZWRcIiwgXCJoaW50XCI6IFwiQW1vdW50IE93bmVkXCIsIFwia2V5Ym9hcmRUeXBlXCI6IFwibnVtYmVyXCJ9LFxyXG4gICAgICAgIHtcImlkXCI6IFwicHVyY2hhc2VQcmljZVwiLCBcImhpbnRcIjogXCJQdXJjaGFzZSBQcmljZVwiLCBcImtleWJvYXJkVHlwZVwiOiBcIm51bWJlclwifVxyXG4gICAgXTtcclxuICAgIC8vIENvbnRhaW5zIHRoZSByZXN1bHRzIG9mIHRoZSBkaWFsb2cgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzXHJcbiAgICByZXN1bHRzID0ge307XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMpIHtcclxuICAgICAgICB0aGlzLnByb21wdCA9IHBhcmFtcy5jb250ZXh0LnByb21wdE1zZztcclxuICAgIH1cclxuICAgIGFtb3VudE93bmVkOiBudW1iZXI7XHJcblxyXG4gICAgLyogQHBhcmFtIG9iaiA6IFRoZSB0ZXh0ZmllbGQgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRleHQgYW5kIGlkXHJcbiAgICAqXHJcbiAgICAqICovXHJcbiAgICB1cGRhdGUob2JqOiBUZXh0RmllbGQpIHtcclxuICAgICAgICBsZXQgdGV4dCA9IG9iai50ZXh0O1xyXG4gICAgICAgIGlmKHRleHQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0c1tvYmouaWRdID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBSZXR1cm5zIHRoZSByZXVzbHRzIG9mIHRoZSBkaWFsb2dcclxuICAgIHB1YmxpYyBhZGQoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh0aGlzLnJlc3VsdHMpO1xyXG4gICAgfVxyXG4gICAgLy8gUmV0dXJucyBhbiBlbXB0eSBvYmplY3Qgc2luY2UgdGhlIGRpYWxvZyB3YXMgY2FuY2VsZWRcclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge307XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhyZXN1bHQpO1xyXG4gICAgfSBcclxufSJdfQ==