"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var ModalComponent = /** @class */ (function () {
    function ModalComponent(params) {
        this.params = params;
        this.frameworks = [
            "NativeScript",
            "Xamarin",
            "Onsen UI",
            "Ionic Framework",
            "React Native"
        ];
    }
    ModalComponent.prototype.close = function (res) {
        this.params.closeCallback(res);
    };
    ModalComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "my-modal",
            templateUrl: "modal.modal.html",
        }),
        tslib_1.__metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RhbC5tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBMEM7QUFDMUMsbUVBQTRFO0FBTTVFO0lBSUksd0JBQTJCLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDZCxjQUFjO1lBQ2QsU0FBUztZQUNULFVBQVU7WUFDVixpQkFBaUI7WUFDakIsY0FBYztTQUNqQixDQUFDO0lBQ04sQ0FBQztJQUVNLDhCQUFLLEdBQVosVUFBYSxHQUFXO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFoQlEsY0FBYztRQUoxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLGtCQUFrQjtTQUNsQyxDQUFDO2lEQUtxQywyQkFBaUI7T0FKM0MsY0FBYyxDQWtCMUI7SUFBRCxxQkFBQztDQUFBLEFBbEJELElBa0JDO0FBbEJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm15LW1vZGFsXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJtb2RhbC5tb2RhbC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCB7XHJcblxyXG4gICAgcHVibGljIGZyYW1ld29ya3M6IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcykge1xyXG4gICAgICAgIHRoaXMuZnJhbWV3b3JrcyA9IFtcclxuICAgICAgICAgICAgXCJOYXRpdmVTY3JpcHRcIixcclxuICAgICAgICAgICAgXCJYYW1hcmluXCIsXHJcbiAgICAgICAgICAgIFwiT25zZW4gVUlcIixcclxuICAgICAgICAgICAgXCJJb25pYyBGcmFtZXdvcmtcIixcclxuICAgICAgICAgICAgXCJSZWFjdCBOYXRpdmVcIlxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBjbG9zZShyZXM6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzKTtcclxuICAgIH1cclxuXHJcbn0iXX0=