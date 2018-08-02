"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var dialog_content_component_1 = require("./dialog-content.component");
var PortfolioComponent = /** @class */ (function () {
    function PortfolioComponent(modalService, viewContainerRef) {
        this.modalService = modalService;
        this.viewContainerRef = viewContainerRef;
    }
    PortfolioComponent.prototype.ngOnInit = function () { };
    PortfolioComponent.prototype.newPortfolioEntry = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            viewContainerRef: this.viewContainerRef
                        };
                        return [4 /*yield*/, this.modalService.showModal(dialog_content_component_1.DialogContent, options)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    PortfolioComponent = tslib_1.__decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'portfolio',
            templateUrl: './portfolio.component.html',
            styleUrls: ['./portfolio.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [modal_dialog_1.ModalDialogService, core_1.ViewContainerRef])
    ], PortfolioComponent);
    return PortfolioComponent;
}());
exports.PortfolioComponent = PortfolioComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBRXBFLGtFQUEyRjtBQUMzRix1RUFBMkQ7QUFRM0Q7SUFFSSw0QkFBb0IsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBNUUsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFDdkcscUNBQVEsR0FBUixjQUFZLENBQUM7SUFDSiw4Q0FBaUIsR0FBdkI7Ozs7Ozt3QkFDUSxPQUFPLEdBQXVCOzRCQUM5QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO3lCQUMxQyxDQUFDO3dCQUNXLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHdDQUFhLEVBQUUsT0FBTyxDQUFDLEVBQUE7O3dCQUFsRSxNQUFNLEdBQUcsU0FBeUQ7d0JBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7O0tBQ3ZCO0lBVlEsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDO2lEQUdvQyxpQ0FBa0IsRUFBNEIsdUJBQWdCO09BRnZGLGtCQUFrQixDQVc5QjtJQUFELHlCQUFDO0NBQUEsQUFYRCxJQVdDO0FBWFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcnRmb2xpbyB9IGZyb20gXCIuL3BvcnRmb2xpb1wiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBEaWFsb2dDb250ZW50IH0gZnJvbSBcIi4vZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwb3J0Zm9saW8nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3J0Zm9saW8uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3BvcnRmb2xpby5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBvcnRmb2xpb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcG9ydGZvbGlvOiBQb3J0Zm9saW87XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXHRuZ09uSW5pdCgpIHt9XG4gICAgYXN5bmMgbmV3UG9ydGZvbGlvRW50cnkoKSB7XG4gICAgICAgIGxldCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZpZXdDb250YWluZXJSZWZcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChEaWFsb2dDb250ZW50LCBvcHRpb25zKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICB9XG59XG4iXX0=