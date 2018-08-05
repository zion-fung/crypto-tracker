"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var jsonlib_1 = require("./jsonlib");
var page_1 = require("ui/page");
var coin_info_component_1 = require("./coin-info/coin-info.component");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var name_mapper_1 = require("./name-mapper");
require("abortcontroller-polyfill/dist/polyfill-patch-fetch");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(page, modalService, viewContainerRef) {
        this.page = page;
        this.modalService = modalService;
        this.viewContainerRef = viewContainerRef;
        this.desiredKeys = {
            "rank": "rank",
            "name": "name",
            "symbol": "symbol",
            "price": "quotes.USD.price",
            "marketcap": "quotes.USD.market_cap",
            "volume": "quotes.USD.volume_24h",
            "24h": "quotes.USD.percent_change_24h",
            "7d": "quotes.USD.percent_change_7d",
            "1h": "quotes.USD.percent_change_1h"
        };
        this.headers = [];
        this.url = "https://api.coinmarketcap.com/v2/ticker/?structure=array";
        this.data = [];
        // TODO: create function to sort through results
        this.baseURL = "https://api.coinmarketcap.com/v2/ticker/";
        page.actionBarHidden = true;
    }
    // Given a url and an array, gets the data from the array and parses it into the array
    // Additionally it takes an optional start number, limit, and different currency
    HomeComponent.prototype.getData = function (url, storage, start, limit, convert) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var re, key, a, json, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (start) {
                            url += "&start=" + start;
                        }
                        if (limit) {
                            url += "&limit=" + limit;
                        }
                        if (convert) {
                            url += "&convert=" + convert;
                            re = /USD/gi;
                            for (key in this.desiredKeys) {
                                this.desiredKeys[key] = this.desiredKeys[key].replace(re, convert);
                            }
                        }
                        console.log(url);
                        // Gets json from the url
                        this.controller = new AbortController();
                        this.signal = this.controller.signal;
                        return [4 /*yield*/, fetch(url, { method: "GET", signal: this.signal })];
                    case 1:
                        a = _a.sent();
                        return [4 /*yield*/, a.json()];
                    case 2:
                        json = _a.sent();
                        // Checks to see if there was an error in the request
                        if (json.metadata.error != null) {
                            console.log("Error requesting data");
                            console.log(json.metadata.error);
                            return [2 /*return*/];
                        }
                        data = json.data;
                        storage.push(this.parseData(data));
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.parseData = function (data) {
        var storage = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var info = data_1[_i];
            var newData = {};
            for (var key in this.desiredKeys) {
                var value = jsonlib_1.jsonlib.nestedJsonFinder(info, this.desiredKeys[key]);
                var valueNumber = Number(value);
                // If it is a number add a $ at the beginning and add commas
                if (isNaN(valueNumber)) {
                    newData[key] = value;
                }
                else {
                    // If value number is a float, reduce it to 2 decimal places
                    // Custom rules here
                    if (key == "volume") {
                        // Don't show decimal places of volume and add commas
                        newData[key] = this.addCommas(valueNumber.toFixed(0));
                    }
                    else if (key == "marketcap") {
                        newData[key] = this.addCommas(valueNumber);
                    }
                    else if (valueNumber % 1 != 0) {
                        newData[key] = valueNumber.toFixed(2);
                    }
                    else {
                        newData[key] = valueNumber.toFixed(0);
                    }
                    // Otherwise store it
                }
            }
            storage.push(newData);
        }
        return storage;
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.getData(this.url, this.data, 1, 30);
        this.headers = jsonlib_1.jsonlib.getKeys(this.desiredKeys);
        console.log("Hello world!");
    };
    // Given two json objects, returns a comparison of their rank value
    HomeComponent.prototype.rankCompare = function (a, b) {
        return a.rank - b.rank;
    };
    HomeComponent.prototype.onTap = function (args) {
        console.log("Tap!");
        console.log(args);
        var options = {
            viewContainerRef: this.viewContainerRef,
            context: args
        };
        this.modalService.showModal(coin_info_component_1.CoinInfo, options);
    };
    HomeComponent.prototype.clearFocus = function (search) {
        if (page_1.isAndroid) {
            search.android.clearFocus();
        }
    };
    HomeComponent.prototype.addCommas = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    HomeComponent.prototype.filterResults = function (substring) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var matchedIds, data, _i, matchedIds_1, id, response, json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Cancel all current requests
                        this.controller.abort();
                        matchedIds = name_mapper_1.NameMapper.findIds(substring);
                        data = [];
                        this.controller = new AbortController();
                        this.signal = this.controller.signal;
                        _i = 0, matchedIds_1 = matchedIds;
                        _a.label = 1;
                    case 1:
                        if (!(_i < matchedIds_1.length)) return [3 /*break*/, 5];
                        id = matchedIds_1[_i];
                        return [4 /*yield*/, fetch(this.baseURL + id, { signal: this.signal })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        json = _a.sent();
                        data.push(this.parseData(json.data));
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        // Sort data
                        data.sort(this.rankCompare);
                        // Update existing data array
                        this.data = [];
                        this.data.push(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html"
        })
        // TODO: Add dropdowns to change exchange and maybe pick favorites?
        ,
        tslib_1.__metadata("design:paramtypes", [page_1.Page, modal_dialog_1.ModalDialogService, core_1.ViewContainerRef])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0U7QUFDcEUscUNBQW1DO0FBQ25DLGdDQUEwQztBQUUxQyx1RUFBMkQ7QUFDM0Qsa0VBQTJGO0FBQzNGLDZDQUEyQztBQUMzQyw4REFBMkQ7QUFRM0Q7SUFHSSx1QkFBb0IsSUFBVSxFQUFVLFlBQWdDLEVBQVUsZ0JBQWtDO1FBQWhHLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBR3ZILGdCQUFXLEdBQUc7WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxNQUFNO1lBQ1IsUUFBUSxFQUFFLFFBQVE7WUFDeEIsT0FBTyxFQUFFLGtCQUFrQjtZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsS0FBSyxFQUFFLCtCQUErQjtZQUN0QyxJQUFJLEVBQUUsOEJBQThCO1lBQ3BDLElBQUksRUFBRSw4QkFBOEI7U0FDMUMsQ0FBQTtRQUNELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDVixRQUFHLEdBQUcsMERBQTBELENBQUM7UUFDakUsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQStGVixnREFBZ0Q7UUFDaEQsWUFBTyxHQUFHLDBDQUEwQyxDQUFDO1FBL0dqRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBZUQsc0ZBQXNGO0lBQ3RGLGdGQUFnRjtJQUMxRSwrQkFBTyxHQUFiLFVBQWMsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFhLEVBQUUsS0FBYSxFQUFFLE9BQWU7Ozs7Ozt3QkFDckUsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDUCxHQUFHLElBQUksU0FBUyxHQUFHLEtBQUssQ0FB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U0FBcUQ7d0JBQ3pELHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQTVCLElBQUksR0FBRyxTQUFxQjt3QkFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7d0JBSDNCLElBQVUsQ0FBQTs7O3dCQUt4QixZQUFZO3dCQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUM1Qiw2QkFBNkI7d0JBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO3dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OztLQUN4QjtJQXZJUSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtTQUN2QyxDQUFDO1FBQ0YsbUVBQW1FOztpREFJckMsV0FBSSxFQUF3QixpQ0FBa0IsRUFBNEIsdUJBQWdCO09BSDNHLGFBQWEsQ0F3SXpCO0lBQUQsb0JBQUM7Q0FBQSxBQXhJRCxJQXdJQztBQXhJWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGpzb25saWIgfSBmcm9tIFwiLi9qc29ubGliXCJcbmltcG9ydCB7IFBhZ2UsIGlzQW5kcm9pZCB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHsgQ29pbkluZm8gfSBmcm9tIFwiLi9jb2luLWluZm8vY29pbi1pbmZvLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBOYW1lTWFwcGVyIH0gZnJvbSBcIi4vbmFtZS1tYXBwZXJcIjtcbmltcG9ydCAnYWJvcnRjb250cm9sbGVyLXBvbHlmaWxsL2Rpc3QvcG9seWZpbGwtcGF0Y2gtZmV0Y2gnXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkhvbWVcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiXG59KVxuLy8gVE9ETzogQWRkIGRyb3Bkb3ducyB0byBjaGFuZ2UgZXhjaGFuZ2UgYW5kIG1heWJlIHBpY2sgZmF2b3JpdGVzP1xuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcjtcbiAgICBzaWduYWw6IEFib3J0U2lnbmFsO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB9XG5cdGRlc2lyZWRLZXlzID0ge1xuXHRcdFwicmFua1wiOiBcInJhbmtcIixcblx0XHRcIm5hbWVcIjogXCJuYW1lXCIsXG4gICAgICAgIFwic3ltYm9sXCI6IFwic3ltYm9sXCIsXG5cdFx0XCJwcmljZVwiOiBcInF1b3Rlcy5VU0QucHJpY2VcIixcbiAgICAgICAgXCJtYXJrZXRjYXBcIjogXCJxdW90ZXMuVVNELm1hcmtldF9jYXBcIixcbiAgICAgICAgXCJ2b2x1bWVcIjogXCJxdW90ZXMuVVNELnZvbHVtZV8yNGhcIixcbiAgICAgICAgXCIyNGhcIjogXCJxdW90ZXMuVVNELnBlcmNlbnRfY2hhbmdlXzI0aFwiLFxuICAgICAgICBcIjdkXCI6IFwicXVvdGVzLlVTRC5wZXJjZW50X2NoYW5nZV83ZFwiLFxuICAgICAgICBcIjFoXCI6IFwicXVvdGVzLlVTRC5wZXJjZW50X2NoYW5nZV8xaFwiXG5cdH1cblx0aGVhZGVycyA9IFtdO1xuICAgIHVybCA9IFwiaHR0cHM6Ly9hcGkuY29pbm1hcmtldGNhcC5jb20vdjIvdGlja2VyLz9zdHJ1Y3R1cmU9YXJyYXlcIjtcbiAgICBkYXRhID0gW107XG4gICAgLy8gR2l2ZW4gYSB1cmwgYW5kIGFuIGFycmF5LCBnZXRzIHRoZSBkYXRhIGZyb20gdGhlIGFycmF5IGFuZCBwYXJzZXMgaXQgaW50byB0aGUgYXJyYXlcbiAgICAvLyBBZGRpdGlvbmFsbHkgaXQgdGFrZXMgYW4gb3B0aW9uYWwgc3RhcnQgbnVtYmVyLCBsaW1pdCwgYW5kIGRpZmZlcmVudCBjdXJyZW5jeVxuICAgIGFzeW5jIGdldERhdGEodXJsLCBzdG9yYWdlLCBzdGFydD86bnVtYmVyLCBsaW1pdD86bnVtYmVyLCBjb252ZXJ0PzpzdHJpbmcpIHtcbiAgICAgICAgaWYoc3RhcnQpIHtcbiAgICAgICAgICAgIHVybCArPSBcIiZzdGFydD1cIiArIHN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmKGxpbWl0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImbGltaXQ9XCIgKyBsaW1pdDsgICBcbiAgICAgICAgfVxuICAgICAgICBpZihjb252ZXJ0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImY29udmVydD1cIiArIGNvbnZlcnQ7XG4gICAgICAgICAgICAvLyBTd2l0Y2ggZnJvbSBkZWZhdWx0IGN1cnJlbmN5IGluIGRlc2lyZWRLZXlzXG4gICAgICAgICAgICBsZXQgcmUgPSAvVVNEL2dpO1xuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5kZXNpcmVkS2V5cykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzaXJlZEtleXNba2V5XSA9IHRoaXMuZGVzaXJlZEtleXNba2V5XS5yZXBsYWNlKHJlLCBjb252ZXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgICAgICAvLyBHZXRzIGpzb24gZnJvbSB0aGUgdXJsXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgdGhpcy5zaWduYWwgPSB0aGlzLmNvbnRyb2xsZXIuc2lnbmFsO1xuICAgICAgICBsZXQgYSA9IGF3YWl0IGZldGNoKHVybCwge21ldGhvZDogXCJHRVRcIiwgc2lnbmFsOiB0aGlzLnNpZ25hbH0pO1xuICAgICAgICBsZXQganNvbiA9IGF3YWl0IGEuanNvbigpO1xuICAgICAgICAvLyBDaGVja3MgdG8gc2VlIGlmIHRoZXJlIHdhcyBhbiBlcnJvciBpbiB0aGUgcmVxdWVzdFxuICAgICAgICBpZihqc29uLm1ldGFkYXRhLmVycm9yICE9IG51bGwpIHsgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlcXVlc3RpbmcgZGF0YVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24ubWV0YWRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhcnNlcyB0aGUgZGF0YSBhbmQgc3RvcmVzIGl0XG4gICAgICAgIGxldCBkYXRhID0ganNvbi5kYXRhO1xuICAgICAgICBzdG9yYWdlLnB1c2godGhpcy5wYXJzZURhdGEoZGF0YSkpO1xuICAgIH1cbiAgICBwcml2YXRlIHBhcnNlRGF0YShkYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IHN0b3JhZ2UgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaW5mbyBvZiBkYXRhKSB7XG4gICAgICAgICAgICBsZXQgbmV3RGF0YSA9IHt9O1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuZGVzaXJlZEtleXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBqc29ubGliLm5lc3RlZEpzb25GaW5kZXIoaW5mbywgdGhpcy5kZXNpcmVkS2V5c1trZXldKTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVOdW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIC8vIElmIGl0IGlzIGEgbnVtYmVyIGFkZCBhICQgYXQgdGhlIGJlZ2lubmluZyBhbmQgYWRkIGNvbW1hc1xuICAgICAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZU51bWJlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB2YWx1ZSBudW1iZXIgaXMgYSBmbG9hdCwgcmVkdWNlIGl0IHRvIDIgZGVjaW1hbCBwbGFjZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3VzdG9tIHJ1bGVzIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PSBcInZvbHVtZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBzaG93IGRlY2ltYWwgcGxhY2VzIG9mIHZvbHVtZSBhbmQgYWRkIGNvbW1hc1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdGhpcy5hZGRDb21tYXModmFsdWVOdW1iZXIudG9GaXhlZCgwKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09IFwibWFya2V0Y2FwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHRoaXMuYWRkQ29tbWFzKHZhbHVlTnVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZU51bWJlciAlIDEgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdmFsdWVOdW1iZXIudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHZhbHVlTnVtYmVyLnRvRml4ZWQoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHN0b3JlIGl0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RvcmFnZS5wdXNoKG5ld0RhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdG9yYWdlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmdldERhdGEodGhpcy51cmwsIHRoaXMuZGF0YSwgMSwgMzApO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBqc29ubGliLmdldEtleXModGhpcy5kZXNpcmVkS2V5cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG8gd29ybGQhXCIpO1xuICAgIH1cbiAgICAvLyBHaXZlbiB0d28ganNvbiBvYmplY3RzLCByZXR1cm5zIGEgY29tcGFyaXNvbiBvZiB0aGVpciByYW5rIHZhbHVlXG4gICAgcmFua0NvbXBhcmUoYSwgYikge1xuICAgICAgICByZXR1cm4gYS5yYW5rIC0gYi5yYW5rO1xuICAgIH1cbiAgICBvblRhcChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGFwIVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coYXJncyk7XG4gICAgICAgIGxldCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICBjb250ZXh0OiBhcmdzXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChDb2luSW5mbywgb3B0aW9ucyk7XG4gICAgfVxuICAgIGNsZWFyRm9jdXMoc2VhcmNoKSB7XG4gICAgICAgIGlmKGlzQW5kcm9pZCkge1xuICAgICAgICAgICAgc2VhcmNoLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZENvbW1hcyh4KSB7XG4gICAgICAgIHJldHVybiB4LnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xuICAgIH1cbiAgICAvLyBUT0RPOiBjcmVhdGUgZnVuY3Rpb24gdG8gc29ydCB0aHJvdWdoIHJlc3VsdHNcbiAgICBiYXNlVVJMID0gXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCI7XG4gICAgYXN5bmMgZmlsdGVyUmVzdWx0cyhzdWJzdHJpbmc6IHN0cmluZykge1xuICAgICAgICAvLyBDYW5jZWwgYWxsIGN1cnJlbnQgcmVxdWVzdHNcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgIC8vIEZpbmQgYWxsIGlkJ3MgaW4gTmFtZU1hcHBlciB0aGF0IG1hdGNoIHN1YnN0cmluZ1xuICAgICAgICBsZXQgbWF0Y2hlZElkczpudW1iZXJbXSA9IE5hbWVNYXBwZXIuZmluZElkcyhzdWJzdHJpbmcpO1xuICAgICAgICAvLyBNYWtlIHJlcXVlc3QgZm9yIHRob3NlIGlkJ3NcbiAgICAgICAgbGV0IGRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgICB0aGlzLnNpZ25hbCA9IHRoaXMuY29udHJvbGxlci5zaWduYWw7XG4gICAgICAgIGZvcih2YXIgaWQgb2YgbWF0Y2hlZElkcykge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godGhpcy5iYXNlVVJMICsgaWQsIHtzaWduYWw6IHRoaXMuc2lnbmFsfSk7XG4gICAgICAgICAgICBsZXQganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGRhdGEucHVzaCh0aGlzLnBhcnNlRGF0YShqc29uLmRhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTb3J0IGRhdGFcbiAgICAgICAgZGF0YS5zb3J0KHRoaXMucmFua0NvbXBhcmUpO1xuICAgICAgICAvLyBVcGRhdGUgZXhpc3RpbmcgZGF0YSBhcnJheVxuICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5kYXRhLnB1c2goZGF0YSk7XG4gICAgfVxufVxuIl19