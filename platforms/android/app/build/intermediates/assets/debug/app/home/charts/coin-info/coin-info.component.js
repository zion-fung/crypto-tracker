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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29pbi1pbmZvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvaW4taW5mby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQTBDO0FBQzFDLGtFQUFzRTtBQUV0RSx1RkFBdUc7QUFFdkcsK0RBQTJEO0FBTTNEO0lBS0ksa0JBQW9CLE1BQXlCLEVBQVUsTUFBMkI7UUFBOUQsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQUoxRSxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBRXpCLDBCQUEwQjtRQUNsQixzQkFBaUIsR0FBRyxHQUFHLENBQUM7UUFFNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNwQyxDQUFDO0lBQ00sd0JBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNELDJCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ3BGLENBQUM7SUFiUSxRQUFRO1FBSnBCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUM7aURBTThCLGdDQUFpQixFQUFrQix1REFBbUI7T0FMekUsUUFBUSxDQWNwQjtJQUFELGVBQUM7Q0FBQSxBQWRELElBY0M7QUFkWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGV0aW1lcGlja2VyLCBQaWNrZXJPcHRpb25zLCBQaWNrZXJSZXNwb25zZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIjtcclxuaW1wb3J0IHsgYWxlcnQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBzY3JlZW4gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybS9wbGF0Zm9ybVwiXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImNvaW4taW5mb1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lL2NvaW4taW5mby9jb2luLWluZm8uY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29pbkluZm8ge1xyXG4gICAgcHJpdmF0ZSBkYXRhOm9iamVjdCA9IHt9O1xyXG4gICAgcHJpdmF0ZSBtb2RhbFdpZHRoO1xyXG4gICAgLy8gUGVyY2VudCBvZiBzY3JlZW4gd2lkdGhcclxuICAgIHByaXZhdGUgbW9kYWxXaWR0aFBlcmNlbnQgPSAuOTA7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsIHByaXZhdGUgcGlja2VyOiBNb2RhbERhdGV0aW1lcGlja2VyKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5wYXJhbXMuY29udGV4dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm1vZGFsV2lkdGggPSBzY3JlZW4ubWFpblNjcmVlbi53aWR0aFBpeGVscyAqIHRoaXMubW9kYWxXaWR0aFBlcmNlbnQgKyBcInB4XCI7XHJcbiAgICB9XHJcbn0iXX0=