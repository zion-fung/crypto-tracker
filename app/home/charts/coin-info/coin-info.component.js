"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
var platform_1 = require("tns-core-modules/platform/platform");
var CoinInfo = /** @class */ (function () {
    function CoinInfo(params, picker) {
        this.params = params;
        this.picker = picker;
        this.data = {};
        // Percent of screen width
        this.modalWidthPercent = .90;
        this.data = this.params.context;
    }
    CoinInfo.prototype.close = function () {
        this.params.closeCallback();
    };
    CoinInfo.prototype.ngOnInit = function () {
        this.modalWidth = platform_1.screen.mainScreen.widthPixels * this.modalWidthPercent + "px";
    };
    CoinInfo = tslib_1.__decorate([
        core_1.Component({
            selector: "coin-info",
            templateUrl: "./home/coin-info/coin-info.component.html"
        }),
        tslib_1.__metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams, nativescript_modal_datetimepicker_1.ModalDatetimepicker])
    ], CoinInfo);
    return CoinInfo;
}());
exports.CoinInfo = CoinInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29pbi1pbmZvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvaW4taW5mby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQTBDO0FBQzFDLGtFQUFzRTtBQUV0RSx1RkFBdUc7QUFFdkcsK0RBQTJEO0FBTTNEO0lBS0ksa0JBQW9CLE1BQXlCLEVBQVUsTUFBMkI7UUFBOUQsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQUoxRSxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBRXpCLDBCQUEwQjtRQUNsQixzQkFBaUIsR0FBRyxHQUFHLENBQUM7UUFFNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNwQyxDQUFDO0lBQ00sd0JBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNELDJCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ3BGLENBQUM7SUFiUSxRQUFRO1FBSnBCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUM7aURBTThCLGdDQUFpQixFQUFrQix1REFBbUI7T0FMekUsUUFBUSxDQWNwQjtJQUFELGVBQUM7Q0FBQSxBQWRELElBY0M7QUFkWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBNb2RhbERhdGV0aW1lcGlja2VyLCBQaWNrZXJPcHRpb25zLCBQaWNrZXJSZXNwb25zZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIjtcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtL3BsYXRmb3JtXCJcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiY29pbi1pbmZvXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lL2NvaW4taW5mby9jb2luLWluZm8uY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBDb2luSW5mbyB7XG4gICAgcHJpdmF0ZSBkYXRhOm9iamVjdCA9IHt9O1xuICAgIHByaXZhdGUgbW9kYWxXaWR0aDtcbiAgICAvLyBQZXJjZW50IG9mIHNjcmVlbiB3aWR0aFxuICAgIHByaXZhdGUgbW9kYWxXaWR0aFBlcmNlbnQgPSAuOTA7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLCBwcml2YXRlIHBpY2tlcjogTW9kYWxEYXRldGltZXBpY2tlcikge1xuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLnBhcmFtcy5jb250ZXh0O1xuICAgIH1cbiAgICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubW9kYWxXaWR0aCA9IHNjcmVlbi5tYWluU2NyZWVuLndpZHRoUGl4ZWxzICogdGhpcy5tb2RhbFdpZHRoUGVyY2VudCArIFwicHhcIjtcbiAgICB9XG59Il19