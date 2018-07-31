"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var lang_facade_1 = require("nativescript-angular/lang-facade");
var BottomNavigationDirective = (function () {
    function BottomNavigationDirective(element) {
        this.bottomNavigation = element.nativeElement;
    }
    Object.defineProperty(BottomNavigationDirective.prototype, "activeColor", {
        get: function () {
            return this._activeColor;
        },
        set: function (value) {
            this._activeColor = value;
            if (this._viewInitialized) {
                this.bottomNavigation.activeColor = this._activeColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationDirective.prototype, "inactiveColor", {
        get: function () {
            return this._inactiveColor;
        },
        set: function (value) {
            this._inactiveColor = value;
            if (this._viewInitialized) {
                this.bottomNavigation.inactiveColor = this._inactiveColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationDirective.prototype, "backgroundColor", {
        get: function () {
            return this._backgroundColor;
        },
        set: function (value) {
            this._backgroundColor = value;
            if (this._viewInitialized) {
                this.bottomNavigation.backgroundColor = this._backgroundColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationDirective.prototype, "keyLineColor", {
        get: function () {
            return this._keyLineColor;
        },
        set: function (value) {
            this._keyLineColor = value;
            if (this._viewInitialized) {
                this.bottomNavigation.keyLineColor = this._keyLineColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationDirective.prototype, "tabs", {
        get: function () {
            return this._tabs;
        },
        set: function (value) {
            this._tabs = value;
            if (this._viewInitialized) {
                this.bottomNavigation.tabs = this._tabs;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationDirective.prototype, "selectedTabIndex", {
        get: function () {
            return this._selectedTabIndex;
        },
        set: function (value) {
            this._selectedTabIndex = value;
            if (this._viewInitialized) {
                this.bottomNavigation.selectedTabIndex = this._selectedTabIndex;
            }
        },
        enumerable: true,
        configurable: true
    });
    BottomNavigationDirective.prototype.ngAfterViewInit = function () {
        this._viewInitialized = true;
        if (!lang_facade_1.isBlank(this._activeColor)) {
            this.bottomNavigation.activeColor = this._activeColor;
        }
        if (!lang_facade_1.isBlank(this._inactiveColor)) {
            this.bottomNavigation.inactiveColor = this._inactiveColor;
        }
        if (!lang_facade_1.isBlank(this._backgroundColor)) {
            this.bottomNavigation.backgroundColor = this._backgroundColor;
        }
        if (!lang_facade_1.isBlank(this._keyLineColor)) {
            this.bottomNavigation.keyLineColor = this._keyLineColor;
        }
        if (!lang_facade_1.isBlank(this._tabs)) {
            this.bottomNavigation.tabs = this._tabs;
        }
        if (!lang_facade_1.isBlank(this._selectedTabIndex)) {
            this.bottomNavigation.selectedTabIndex = this._selectedTabIndex;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BottomNavigationDirective.prototype, "activeColor", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BottomNavigationDirective.prototype, "inactiveColor", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BottomNavigationDirective.prototype, "backgroundColor", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BottomNavigationDirective.prototype, "keyLineColor", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], BottomNavigationDirective.prototype, "tabs", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], BottomNavigationDirective.prototype, "selectedTabIndex", null);
    BottomNavigationDirective = __decorate([
        core_1.Directive({
            selector: "BottomNavigation"
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], BottomNavigationDirective);
    return BottomNavigationDirective;
}());
exports.BottomNavigationDirective = BottomNavigationDirective;
var BottomNavigationTabDirective = (function () {
    function BottomNavigationTabDirective() {
    }
    Object.defineProperty(BottomNavigationTabDirective.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationTabDirective.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (value) {
            this._icon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationTabDirective.prototype, "selectable", {
        get: function () {
            return this._selectable;
        },
        set: function (value) {
            this._selectable = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BottomNavigationTabDirective.prototype, "title", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BottomNavigationTabDirective.prototype, "icon", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BottomNavigationTabDirective.prototype, "_selectable", void 0);
    BottomNavigationTabDirective = __decorate([
        core_1.Directive({
            selector: "BottomNavigationTab"
        })
    ], BottomNavigationTabDirective);
    return BottomNavigationTabDirective;
}());
exports.BottomNavigationTabDirective = BottomNavigationTabDirective;
exports.DIRECTIVES = [BottomNavigationDirective, BottomNavigationTabDirective];
//# sourceMappingURL=nativescript-bottom-navigation.directives.js.map