"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var PortfolioBlockComponent = /** @class */ (function () {
    function PortfolioBlockComponent() {
    }
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], PortfolioBlockComponent.prototype, "name", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], PortfolioBlockComponent.prototype, "amountOwned", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], PortfolioBlockComponent.prototype, "price", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], PortfolioBlockComponent.prototype, "datePurchased", void 0);
    PortfolioBlockComponent = tslib_1.__decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'portfolio-block',
            templateUrl: './portfolio-block.component.html',
            styleUrls: ['./portfolio-block.component.css']
        })
    ], PortfolioBlockComponent);
    return PortfolioBlockComponent;
}());
exports.PortfolioBlockComponent = PortfolioBlockComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLWJsb2NrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby1ibG9jay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQWlEO0FBU2pEO0lBQUE7SUFLQSxDQUFDO0lBSlk7UUFBUixZQUFLLEVBQUU7O3lEQUFNO0lBQ0w7UUFBUixZQUFLLEVBQUU7O2dFQUFhO0lBQ1o7UUFBUixZQUFLLEVBQUU7OzBEQUFPO0lBQ047UUFBUixZQUFLLEVBQUU7O2tFQUFlO0lBSmQsdUJBQXVCO1FBUG5DLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1NBQ2pELENBQUM7T0FFVyx1QkFBdUIsQ0FLbkM7SUFBRCw4QkFBQztDQUFBLEFBTEQsSUFLQztBQUxZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiAncG9ydGZvbGlvLWJsb2NrJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3J0Zm9saW8tYmxvY2suY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vcG9ydGZvbGlvLWJsb2NrLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvcnRmb2xpb0Jsb2NrQ29tcG9uZW50e1xyXG4gICAgQElucHV0KCkgbmFtZTtcclxuICAgIEBJbnB1dCgpIGFtb3VudE93bmVkO1xyXG4gICAgQElucHV0KCkgcHJpY2U7XHJcbiAgICBASW5wdXQoKSBkYXRlUHVyY2hhc2VkO1xyXG59Il19