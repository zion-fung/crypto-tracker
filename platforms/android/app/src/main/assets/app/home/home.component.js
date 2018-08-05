"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var jsonlib_1 = require("./jsonlib");
var page_1 = require("ui/page");
var coin_info_component_1 = require("./coin-info/coin-info.component");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
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
        this.dataCopy = [];
        // With all of the results in this.data from the start, no need for requests
        this.baseURL = "https://api.coinmarketcap.com/v2/ticker/";
        page.actionBarHidden = true;
    }
    // Given a url and an array, gets the data from the array and parses it into the array
    // Additionally it takes an optional start number, limit, and different currency
    HomeComponent.prototype.getData = function (url, storage, start, limit, convert) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var re, key, a, json, data, _i, data_1, info;
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
                        for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                            info = data_1[_i];
                            this.data.push(this.parseData(info));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.parseData = function (data) {
        var newData = {};
        for (var key in this.desiredKeys) {
            var value = jsonlib_1.jsonlib.nestedJsonFinder(data, this.desiredKeys[key]);
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
        return newData;
    };
    HomeComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData(this.url, this.data, 1, 100)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getData(this.url, this.data, 101, 100)];
                    case 2:
                        _a.sent();
                        this.dataCopy = this.data.slice(0);
                        this.headers = jsonlib_1.jsonlib.getKeys(this.desiredKeys);
                        console.log("Hello world!");
                        return [2 /*return*/];
                }
            });
        });
    };
    // Given two json objects, returns a comparison of their rank value
    HomeComponent.prototype.rankCompare = function (a, b) {
        return a.rank - b.rank;
    };
    HomeComponent.prototype.onTap = function (args) {
        // console.log("Tap!");
        // console.log(args);
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
        if (substring == "") {
            this.revertData();
            return;
        }
        substring = substring.toLowerCase();
        // console.log("Searching for: " + substring);
        var filteredData = [];
        // Loop through data and push to new array that have the substring
        for (var _i = 0, _a = this.dataCopy; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.name.toLowerCase().indexOf(substring) != -1) {
                filteredData.push(obj);
            }
        }
        this.data = filteredData.slice(0);
        console.log("Data has " + this.data.length + " elements");
    };
    HomeComponent.prototype.clearSearch = function (search) {
        this.revertData();
    };
    HomeComponent.prototype.revertData = function () {
        console.log("Reverting data");
        this.data = this.dataCopy.slice(0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0U7QUFDcEUscUNBQW1DO0FBQ25DLGdDQUEwQztBQUUxQyx1RUFBMkQ7QUFDM0Qsa0VBQTJGO0FBRTNGLDhEQUEyRDtBQVEzRDtJQUdJLHVCQUFvQixJQUFVLEVBQVUsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBaEcsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFHdkgsZ0JBQVcsR0FBRztZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLE1BQU07WUFDUixRQUFRLEVBQUUsUUFBUTtZQUN4QixPQUFPLEVBQUUsa0JBQWtCO1lBQ3JCLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxLQUFLLEVBQUUsK0JBQStCO1lBQ3RDLElBQUksRUFBRSw4QkFBOEI7WUFDcEMsSUFBSSxFQUFFLDhCQUE4QjtTQUMxQyxDQUFBO1FBQ0QsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNGLFFBQUcsR0FBRywwREFBMEQsQ0FBQztRQUN6RSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ0YsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQStGdEIsNEVBQTRFO1FBQzVFLFlBQU8sR0FBRywwQ0FBMEMsQ0FBQztRQWhIakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQWdCRCxzRkFBc0Y7SUFDdEYsZ0ZBQWdGO0lBQzFFLCtCQUFPLEdBQWIsVUFBYyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQWEsRUFBRSxLQUFhLEVBQUUsT0FBZTs7Ozs7O3dCQUNyRSxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNQLEdBQUcsSUFBSSxTQUFT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QUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFDRCxtQ0FBVyxHQUFYLFVBQVksTUFBaUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxrQ0FBVSxHQUFWO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQTVJUSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtTQUN2QyxDQUFDO1FBQ0YsbUVBQW1FOztpREFJckMsV0FBSSxFQUF3QixpQ0FBa0IsRUFBNEIsdUJBQWdCO09BSDNHLGFBQWEsQ0E2SXpCO0lBQUQsb0JBQUM7Q0FBQSxBQTdJRCxJQTZJQztBQTdJWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGpzb25saWIgfSBmcm9tIFwiLi9qc29ubGliXCJcbmltcG9ydCB7IFBhZ2UsIGlzQW5kcm9pZCB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHsgQ29pbkluZm8gfSBmcm9tIFwiLi9jb2luLWluZm8vY29pbi1pbmZvLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBOYW1lTWFwcGVyIH0gZnJvbSBcIi4vbmFtZS1tYXBwZXJcIjtcbmltcG9ydCAnYWJvcnRjb250cm9sbGVyLXBvbHlmaWxsL2Rpc3QvcG9seWZpbGwtcGF0Y2gtZmV0Y2gnXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkhvbWVcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiXG59KVxuLy8gVE9ETzogQWRkIGRyb3Bkb3ducyB0byBjaGFuZ2UgZXhjaGFuZ2UgYW5kIG1heWJlIHBpY2sgZmF2b3JpdGVzP1xuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcjtcbiAgICBzaWduYWw6IEFib3J0U2lnbmFsO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB9XG5cdGRlc2lyZWRLZXlzID0ge1xuXHRcdFwicmFua1wiOiBcInJhbmtcIixcblx0XHRcIm5hbWVcIjogXCJuYW1lXCIsXG4gICAgICAgIFwic3ltYm9sXCI6IFwic3ltYm9sXCIsXG5cdFx0XCJwcmljZVwiOiBcInF1b3Rlcy5VU0QucHJpY2VcIixcbiAgICAgICAgXCJtYXJrZXRjYXBcIjogXCJxdW90ZXMuVVNELm1hcmtldF9jYXBcIixcbiAgICAgICAgXCJ2b2x1bWVcIjogXCJxdW90ZXMuVVNELnZvbHVtZV8yNGhcIixcbiAgICAgICAgXCIyNGhcIjogXCJxdW90ZXMuVVNELnBlcmNlbnRfY2hhbmdlXzI0aFwiLFxuICAgICAgICBcIjdkXCI6IFwicXVvdGVzLlVTRC5wZXJjZW50X2NoYW5nZV83ZFwiLFxuICAgICAgICBcIjFoXCI6IFwicXVvdGVzLlVTRC5wZXJjZW50X2NoYW5nZV8xaFwiXG5cdH1cblx0aGVhZGVycyA9IFtdO1xuICAgIHByaXZhdGUgdXJsID0gXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvP3N0cnVjdHVyZT1hcnJheVwiO1xuICAgIGRhdGEgPSBbXTtcbiAgICBwcml2YXRlIGRhdGFDb3B5ID0gW107XG4gICAgLy8gR2l2ZW4gYSB1cmwgYW5kIGFuIGFycmF5LCBnZXRzIHRoZSBkYXRhIGZyb20gdGhlIGFycmF5IGFuZCBwYXJzZXMgaXQgaW50byB0aGUgYXJyYXlcbiAgICAvLyBBZGRpdGlvbmFsbHkgaXQgdGFrZXMgYW4gb3B0aW9uYWwgc3RhcnQgbnVtYmVyLCBsaW1pdCwgYW5kIGRpZmZlcmVudCBjdXJyZW5jeVxuICAgIGFzeW5jIGdldERhdGEodXJsLCBzdG9yYWdlLCBzdGFydD86bnVtYmVyLCBsaW1pdD86bnVtYmVyLCBjb252ZXJ0PzpzdHJpbmcpIHtcbiAgICAgICAgaWYoc3RhcnQpIHtcbiAgICAgICAgICAgIHVybCArPSBcIiZzdGFydD1cIiArIHN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmKGxpbWl0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImbGltaXQ9XCIgKyBsaW1pdDsgICBcbiAgICAgICAgfVxuICAgICAgICBpZihjb252ZXJ0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImY29udmVydD1cIiArIGNvbnZlcnQ7XG4gICAgICAgICAgICAvLyBTd2l0Y2ggZnJvbSBkZWZhdWx0IGN1cnJlbmN5IGluIGRlc2lyZWRLZXlzXG4gICAgICAgICAgICBsZXQgcmUgPSAvVVNEL2dpO1xuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5kZXNpcmVkS2V5cykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzaXJlZEtleXNba2V5XSA9IHRoaXMuZGVzaXJlZEtleXNba2V5XS5yZXBsYWNlKHJlLCBjb252ZXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgICAgICAvLyBHZXRzIGpzb24gZnJvbSB0aGUgdXJsXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgdGhpcy5zaWduYWwgPSB0aGlzLmNvbnRyb2xsZXIuc2lnbmFsO1xuICAgICAgICBsZXQgYSA9IGF3YWl0IGZldGNoKHVybCwge21ldGhvZDogXCJHRVRcIiwgc2lnbmFsOiB0aGlzLnNpZ25hbH0pO1xuICAgICAgICBsZXQganNvbiA9IGF3YWl0IGEuanNvbigpO1xuICAgICAgICAvLyBDaGVja3MgdG8gc2VlIGlmIHRoZXJlIHdhcyBhbiBlcnJvciBpbiB0aGUgcmVxdWVzdFxuICAgICAgICBpZihqc29uLm1ldGFkYXRhLmVycm9yICE9IG51bGwpIHsgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlcXVlc3RpbmcgZGF0YVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24ubWV0YWRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhcnNlcyB0aGUgZGF0YSBhbmQgc3RvcmVzIGl0XG4gICAgICAgIGxldCBkYXRhID0ganNvbi5kYXRhO1xuICAgICAgICBmb3IgKGxldCBpbmZvIG9mIGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHRoaXMucGFyc2VEYXRhKGluZm8pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHBhcnNlRGF0YShkYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IG5ld0RhdGEgPSB7fTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuZGVzaXJlZEtleXMpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGpzb25saWIubmVzdGVkSnNvbkZpbmRlcihkYXRhLCB0aGlzLmRlc2lyZWRLZXlzW2tleV0pO1xuICAgICAgICAgICAgbGV0IHZhbHVlTnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgIC8vIElmIGl0IGlzIGEgbnVtYmVyIGFkZCBhICQgYXQgdGhlIGJlZ2lubmluZyBhbmQgYWRkIGNvbW1hc1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlTnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdmFsdWUgbnVtYmVyIGlzIGEgZmxvYXQsIHJlZHVjZSBpdCB0byAyIGRlY2ltYWwgcGxhY2VzXG4gICAgICAgICAgICAgICAgLy8gQ3VzdG9tIHJ1bGVzIGhlcmVcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IFwidm9sdW1lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3Qgc2hvdyBkZWNpbWFsIHBsYWNlcyBvZiB2b2x1bWUgYW5kIGFkZCBjb21tYXNcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdGhpcy5hZGRDb21tYXModmFsdWVOdW1iZXIudG9GaXhlZCgwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PSBcIm1hcmtldGNhcFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHRoaXMuYWRkQ29tbWFzKHZhbHVlTnVtYmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWVOdW1iZXIgJSAxICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdmFsdWVOdW1iZXIudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHZhbHVlTnVtYmVyLnRvRml4ZWQoMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBzdG9yZSBpdFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgIH1cblxuICAgIGFzeW5jIG5nT25Jbml0KCkge1xuICAgICAgICBhd2FpdCB0aGlzLmdldERhdGEodGhpcy51cmwsIHRoaXMuZGF0YSwgMSwgMTAwKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXREYXRhKHRoaXMudXJsLCB0aGlzLmRhdGEsIDEwMSwgMTAwKTtcbiAgICAgICAgdGhpcy5kYXRhQ29weSA9IHRoaXMuZGF0YS5zbGljZSgwKTtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0ganNvbmxpYi5nZXRLZXlzKHRoaXMuZGVzaXJlZEtleXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvIHdvcmxkIVwiKTtcbiAgICB9XG4gICAgLy8gR2l2ZW4gdHdvIGpzb24gb2JqZWN0cywgcmV0dXJucyBhIGNvbXBhcmlzb24gb2YgdGhlaXIgcmFuayB2YWx1ZVxuICAgIHJhbmtDb21wYXJlKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEucmFuayAtIGIucmFuaztcbiAgICB9XG4gICAgb25UYXAoYXJncykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRhcCFcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFyZ3MpO1xuICAgICAgICBsZXQgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52aWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgY29udGV4dDogYXJnc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoQ29pbkluZm8sIG9wdGlvbnMpO1xuICAgIH1cbiAgICBjbGVhckZvY3VzKHNlYXJjaCkge1xuICAgICAgICBpZihpc0FuZHJvaWQpIHtcbiAgICAgICAgICAgIHNlYXJjaC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRDb21tYXMoeCkge1xuICAgICAgICByZXR1cm4geC50b1N0cmluZygpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLFwiKTtcbiAgICB9XG4gICAgLy8gV2l0aCBhbGwgb2YgdGhlIHJlc3VsdHMgaW4gdGhpcy5kYXRhIGZyb20gdGhlIHN0YXJ0LCBubyBuZWVkIGZvciByZXF1ZXN0c1xuICAgIGJhc2VVUkwgPSBcImh0dHBzOi8vYXBpLmNvaW5tYXJrZXRjYXAuY29tL3YyL3RpY2tlci9cIjtcbiAgICBmaWx0ZXJSZXN1bHRzKHN1YnN0cmluZzogc3RyaW5nKSB7XG4gICAgICAgIGlmKHN1YnN0cmluZyA9PSBcIlwiKSB7XG4gICAgICAgICAgICB0aGlzLnJldmVydERhdGEoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdWJzdHJpbmcgPSBzdWJzdHJpbmcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJTZWFyY2hpbmcgZm9yOiBcIiArIHN1YnN0cmluZyk7XG4gICAgICAgIGxldCBmaWx0ZXJlZERhdGEgPSBbXTtcbiAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGRhdGEgYW5kIHB1c2ggdG8gbmV3IGFycmF5IHRoYXQgaGF2ZSB0aGUgc3Vic3RyaW5nXG4gICAgICAgIGZvcih2YXIgb2JqIG9mIHRoaXMuZGF0YUNvcHkpIHtcbiAgICAgICAgICAgIGlmKG9iai5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzdWJzdHJpbmcpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWREYXRhLnB1c2gob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEgPSBmaWx0ZXJlZERhdGEuc2xpY2UoMCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSBoYXMgXCIgKyB0aGlzLmRhdGEubGVuZ3RoICsgXCIgZWxlbWVudHNcIik7XG4gICAgfVxuICAgIGNsZWFyU2VhcmNoKHNlYXJjaDogU2VhcmNoQmFyKSB7XG4gICAgICAgIHRoaXMucmV2ZXJ0RGF0YSgpO1xuICAgIH1cbiAgICByZXZlcnREYXRhKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJldmVydGluZyBkYXRhXCIpO1xuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGFDb3B5LnNsaWNlKDApO1xuICAgIH1cbn1cbiJdfQ==