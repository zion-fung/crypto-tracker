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
            templateUrl: "./portfolio.modal.html",
        }),
        tslib_1.__metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLm1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9ydGZvbGlvLm1vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUEwQztBQUMxQyxtRUFBNEU7QUFNNUU7SUFJSSx3QkFBMkIsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNkLGNBQWM7WUFDZCxTQUFTO1lBQ1QsVUFBVTtZQUNWLGlCQUFpQjtZQUNqQixjQUFjO1NBQ2pCLENBQUM7SUFDTixDQUFDO0lBRU0sOEJBQUssR0FBWixVQUFhLEdBQVc7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQWhCUSxjQUFjO1FBSjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7aURBS3FDLDJCQUFpQjtPQUozQyxjQUFjLENBa0IxQjtJQUFELHFCQUFDO0NBQUEsQUFsQkQsSUFrQkM7QUFsQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibXktbW9kYWxcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcG9ydGZvbGlvLm1vZGFsLmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIE1vZGFsQ29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgZnJhbWV3b3JrczogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5mcmFtZXdvcmtzID0gW1xyXG4gICAgICAgICAgICBcIk5hdGl2ZVNjcmlwdFwiLFxyXG4gICAgICAgICAgICBcIlhhbWFyaW5cIixcclxuICAgICAgICAgICAgXCJPbnNlbiBVSVwiLFxyXG4gICAgICAgICAgICBcIklvbmljIEZyYW1ld29ya1wiLFxyXG4gICAgICAgICAgICBcIlJlYWN0IE5hdGl2ZVwiXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UocmVzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlcyk7XHJcbiAgICB9XHJcblxyXG59Il19