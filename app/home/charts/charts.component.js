"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var jsonlib_1 = require("../jsonlib");
var page_1 = require("ui/page");
var coin_info_component_1 = require("./coin-info/coin-info.component");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
require("abortcontroller-polyfill/dist/polyfill-patch-fetch");
var Sqlite = require("nativescript-sqlite");
var ChartsComponent = /** @class */ (function () {
    function ChartsComponent(page, modalService, viewContainerRef) {
        var _this = this;
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
        this.num = 1;
        this.letters = "1234567890QWERTYUIOPASDFGHJKLZCVBNM";
        page.actionBarHidden = true;
        Sqlite.deleteDatabase("crypto.db");
        (new Sqlite("crypto.db")).then(function (db) {
            db.resultType(Sqlite.RESULTSASOBJECT);
            _this.database = db;
            db.execSQL("CREATE TABLE IF NOT EXISTS market(rank INTEGER, name TEXT, symbol TEXT, price REAL, marketcap REAL, volume REAL, twentyFourHour REAL, sevenDay REAL, oneHour REAL)").then(function (result) {
                console.log("Market table creation successful");
                _this.database.execSQL("DELETE FROM market");
                _this.printData();
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("Open database error", error);
        });
    }
    ChartsComponent_1 = ChartsComponent;
    ChartsComponent.getDataCopy = function () {
        return this.staticData;
    };
    // Given a url and an array, gets the data from the array and parses it into the array
    // Additionally it takes an optional start number, limit, and different currency
    ChartsComponent.prototype.getData = function (url, storage, start, limit, convert) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var re, key, a, json, data, _i, data_1, info, parsedData;
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
                        _i = 0, data_1 = data;
                        _a.label = 3;
                    case 3:
                        if (!(_i < data_1.length)) return [3 /*break*/, 6];
                        info = data_1[_i];
                        parsedData = this.parseData(info);
                        return [4 /*yield*/, this.database.execSQL("INSERT INTO market (rank, name, symbol, price, marketcap, volume, twentyFourHour, sevenDay, oneHour) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [parsedData["rank"], parsedData["name"], parsedData["symbol"], parsedData["price"], parsedData["marketcap"], parsedData["volume"], parsedData["24h"], parsedData["7d"], parsedData["1h"]])];
                    case 4:
                        _a.sent();
                        this.data.push(parsedData);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ChartsComponent.prototype.parseData = function (data) {
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
    ChartsComponent.prototype.ngOnInit = function () {
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
                        ChartsComponent_1.staticData = this.dataCopy;
                        this.headers = jsonlib_1.jsonlib.getKeys(this.desiredKeys);
                        console.log("Hello world!");
                        return [2 /*return*/];
                }
            });
        });
    };
    // Given two json objects, returns a comparison of their rank value
    ChartsComponent.prototype.rankCompare = function (a, b) {
        return a.rank - b.rank;
    };
    ChartsComponent.prototype.onTap = function (args) {
        // console.log("Tap!");
        // console.log(args);
        var options = {
            viewContainerRef: this.viewContainerRef,
            context: args
        };
        this.modalService.showModal(coin_info_component_1.CoinInfo, options);
    };
    ChartsComponent.prototype.clearFocus = function (search) {
        if (page_1.isAndroid) {
            search.android.clearFocus();
        }
    };
    ChartsComponent.prototype.addCommas = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    ChartsComponent.prototype.filterResults = function (substring) {
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
    ChartsComponent.prototype.clearSearch = function (search) {
        this.revertData();
    };
    ChartsComponent.prototype.revertData = function () {
        console.log("Reverting data");
        this.data = this.dataCopy.slice(0);
    };
    ChartsComponent.prototype.insertData = function () {
        var _this = this;
        var word = "";
        var max = this.letters.length;
        for (var i = 0; i < 10; i++) {
            word += this.letters.charAt(Math.floor(Math.random() * max));
        }
        this.database.execSQL("INSERT INTO market (rank, name) values (?, ?)", [this.num, word]).then(function (result) {
            console.log("Done inserting!");
            _this.printData();
            _this.num++;
        }, function (error) {
            console.log("ERROR INSERTING", error);
        });
    };
    ChartsComponent.prototype.printData = function () {
        this.database.all("SELECT * FROM market").then(function (result) {
            console.log(result);
        }, function (error) {
            console.log("Error fetching data", error);
        });
    };
    ChartsComponent.staticData = [];
    ChartsComponent = ChartsComponent_1 = tslib_1.__decorate([
        core_1.Component({
            selector: "charts",
            moduleId: module.id,
            templateUrl: "./charts.component.html"
        })
        // TODO: Add dropdowns to change exchange and maybe pick favorites?
        ,
        tslib_1.__metadata("design:paramtypes", [page_1.Page, modal_dialog_1.ModalDialogService, core_1.ViewContainerRef])
    ], ChartsComponent);
    return ChartsComponent;
    var ChartsComponent_1;
}());
exports.ChartsComponent = ChartsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXJ0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHNDQUFvQztBQUNwQyxnQ0FBMEM7QUFFMUMsdUVBQTJEO0FBQzNELGtFQUEyRjtBQUUzRiw4REFBNEQ7QUFDNUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFROUM7SUFJSSx5QkFBb0IsSUFBVSxFQUFVLFlBQWdDLEVBQVUsZ0JBQWtDO1FBQXBILGlCQWdCQztRQWhCbUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFpQnZILGdCQUFXLEdBQUc7WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxNQUFNO1lBQ1IsUUFBUSxFQUFFLFFBQVE7WUFDeEIsT0FBTyxFQUFFLGtCQUFrQjtZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsS0FBSyxFQUFFLCtCQUErQjtZQUN0QyxJQUFJLEVBQUUsOEJBQThCO1lBQ3BDLElBQUksRUFBRSw4QkFBOEI7U0FDMUMsQ0FBQTtRQUNELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDRixRQUFHLEdBQUcsMERBQTBELENBQUM7UUFDekUsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFzR2QsNEVBQTRFO1FBQzVFLFlBQU8sR0FBRywwQ0FBMEMsQ0FBQztRQXlCckQsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFlBQU8sR0FBRyxxQ0FBcUMsQ0FBQztRQS9KNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQyxDQUFD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OztpREFLckMsV0FBSSxFQUF3QixpQ0FBa0IsRUFBNEIsdUJBQWdCO09BSjNHLGVBQWUsQ0E2TDNCO0lBQUQsc0JBQUM7O0NBQUEsQUE3TEQsSUE2TEM7QUE3TFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBqc29ubGliIH0gZnJvbSBcIi4uL2pzb25saWJcIlxuaW1wb3J0IHsgUGFnZSwgaXNBbmRyb2lkIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBDb2luSW5mbyB9IGZyb20gXCIuL2NvaW4taW5mby9jb2luLWluZm8uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UsIE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IE5hbWVNYXBwZXIgfSBmcm9tIFwiLi4vbmFtZS1tYXBwZXJcIjtcbmltcG9ydCAnYWJvcnRjb250cm9sbGVyLXBvbHlmaWxsL2Rpc3QvcG9seWZpbGwtcGF0Y2gtZmV0Y2gnO1xudmFyIFNxbGl0ZSA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiICk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImNoYXJ0c1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jaGFydHMuY29tcG9uZW50Lmh0bWxcIlxufSlcbi8vIFRPRE86IEFkZCBkcm9wZG93bnMgdG8gY2hhbmdlIGV4Y2hhbmdlIGFuZCBtYXliZSBwaWNrIGZhdm9yaXRlcz9cbmV4cG9ydCBjbGFzcyBDaGFydHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcbiAgICBjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXI7XG4gICAgc2lnbmFsOiBBYm9ydFNpZ25hbDtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIFNxbGl0ZS5kZWxldGVEYXRhYmFzZShcImNyeXB0by5kYlwiKTtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJjcnlwdG8uZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgZGIucmVzdWx0VHlwZShTcWxpdGUuUkVTVUxUU0FTT0JKRUNUKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcbiAgICAgICAgICAgIGRiLmV4ZWNTUUwoXCJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBtYXJrZXQocmFuayBJTlRFR0VSLCBuYW1lIFRFWFQsIHN5bWJvbCBURVhULCBwcmljZSBSRUFMLCBtYXJrZXRjYXAgUkVBTCwgdm9sdW1lIFJFQUwsIHR3ZW50eUZvdXJIb3VyIFJFQUwsIHNldmVuRGF5IFJFQUwsIG9uZUhvdXIgUkVBTClcIikudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFya2V0IHRhYmxlIGNyZWF0aW9uIHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiREVMRVRFIEZST00gbWFya2V0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJpbnREYXRhKCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgVEFCTEUgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbiBkYXRhYmFzZSBlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblx0ZGVzaXJlZEtleXMgPSB7XG5cdFx0XCJyYW5rXCI6IFwicmFua1wiLFxuXHRcdFwibmFtZVwiOiBcIm5hbWVcIixcbiAgICAgICAgXCJzeW1ib2xcIjogXCJzeW1ib2xcIixcblx0XHRcInByaWNlXCI6IFwicXVvdGVzLlVTRC5wcmljZVwiLFxuICAgICAgICBcIm1hcmtldGNhcFwiOiBcInF1b3Rlcy5VU0QubWFya2V0X2NhcFwiLFxuICAgICAgICBcInZvbHVtZVwiOiBcInF1b3Rlcy5VU0Qudm9sdW1lXzI0aFwiLFxuICAgICAgICBcIjI0aFwiOiBcInF1b3Rlcy5VU0QucGVyY2VudF9jaGFuZ2VfMjRoXCIsXG4gICAgICAgIFwiN2RcIjogXCJxdW90ZXMuVVNELnBlcmNlbnRfY2hhbmdlXzdkXCIsXG4gICAgICAgIFwiMWhcIjogXCJxdW90ZXMuVVNELnBlcmNlbnRfY2hhbmdlXzFoXCJcblx0fVxuXHRoZWFkZXJzID0gW107XG4gICAgcHJpdmF0ZSB1cmwgPSBcImh0dHBzOi8vYXBpLmNvaW5tYXJrZXRjYXAuY29tL3YyL3RpY2tlci8/c3RydWN0dXJlPWFycmF5XCI7XG4gICAgZGF0YSA9IFtdO1xuICAgIGRhdGFDb3B5ID0gW107XG4gICAgc3RhdGljIHN0YXRpY0RhdGEgPSBbXTtcbiAgICBzdGF0aWMgZ2V0RGF0YUNvcHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRpY0RhdGE7XG4gICAgfVxuICAgIC8vIEdpdmVuIGEgdXJsIGFuZCBhbiBhcnJheSwgZ2V0cyB0aGUgZGF0YSBmcm9tIHRoZSBhcnJheSBhbmQgcGFyc2VzIGl0IGludG8gdGhlIGFycmF5XG4gICAgLy8gQWRkaXRpb25hbGx5IGl0IHRha2VzIGFuIG9wdGlvbmFsIHN0YXJ0IG51bWJlciwgbGltaXQsIGFuZCBkaWZmZXJlbnQgY3VycmVuY3lcbiAgICBhc3luYyBnZXREYXRhKHVybCwgc3RvcmFnZSwgc3RhcnQ/Om51bWJlciwgbGltaXQ/Om51bWJlciwgY29udmVydD86c3RyaW5nKSB7XG4gICAgICAgIGlmKHN0YXJ0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImc3RhcnQ9XCIgKyBzdGFydDtcbiAgICAgICAgfVxuICAgICAgICBpZihsaW1pdCkge1xuICAgICAgICAgICAgdXJsICs9IFwiJmxpbWl0PVwiICsgbGltaXQ7ICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYoY29udmVydCkge1xuICAgICAgICAgICAgdXJsICs9IFwiJmNvbnZlcnQ9XCIgKyBjb252ZXJ0O1xuICAgICAgICAgICAgLy8gU3dpdGNoIGZyb20gZGVmYXVsdCBjdXJyZW5jeSBpbiBkZXNpcmVkS2V5c1xuICAgICAgICAgICAgbGV0IHJlID0gL1VTRC9naTtcbiAgICAgICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMuZGVzaXJlZEtleXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2lyZWRLZXlzW2tleV0gPSB0aGlzLmRlc2lyZWRLZXlzW2tleV0ucmVwbGFjZShyZSwgY29udmVydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codXJsKTtcbiAgICAgICAgLy8gR2V0cyBqc29uIGZyb20gdGhlIHVybFxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgIHRoaXMuc2lnbmFsID0gdGhpcy5jb250cm9sbGVyLnNpZ25hbDtcbiAgICAgICAgbGV0IGEgPSBhd2FpdCBmZXRjaCh1cmwsIHttZXRob2Q6IFwiR0VUXCIsIHNpZ25hbDogdGhpcy5zaWduYWx9KTtcbiAgICAgICAgbGV0IGpzb24gPSBhd2FpdCBhLmpzb24oKTtcbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGVyZSB3YXMgYW4gZXJyb3IgaW4gdGhlIHJlcXVlc3RcbiAgICAgICAgaWYoanNvbi5tZXRhZGF0YS5lcnJvciAhPSBudWxsKSB7IFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXF1ZXN0aW5nIGRhdGFcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uLm1ldGFkYXRhLmVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYXJzZXMgdGhlIGRhdGEgYW5kIHN0b3JlcyBpdFxuICAgICAgICBsZXQgZGF0YSA9IGpzb24uZGF0YTtcbiAgICAgICAgZm9yIChsZXQgaW5mbyBvZiBkYXRhKSB7XG4gICAgICAgICAgICBsZXQgcGFyc2VkRGF0YSA9IHRoaXMucGFyc2VEYXRhKGluZm8pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiSU5TRVJUIElOVE8gbWFya2V0IChyYW5rLCBuYW1lLCBzeW1ib2wsIHByaWNlLCBtYXJrZXRjYXAsIHZvbHVtZSwgdHdlbnR5Rm91ckhvdXIsIHNldmVuRGF5LCBvbmVIb3VyKSB2YWx1ZXMgKD8sID8sID8sID8sID8sID8sID8sID8sID8pXCIsIFtwYXJzZWREYXRhW1wicmFua1wiXSwgcGFyc2VkRGF0YVtcIm5hbWVcIl0sIHBhcnNlZERhdGFbXCJzeW1ib2xcIl0sIHBhcnNlZERhdGFbXCJwcmljZVwiXSwgcGFyc2VkRGF0YVtcIm1hcmtldGNhcFwiXSwgcGFyc2VkRGF0YVtcInZvbHVtZVwiXSwgcGFyc2VkRGF0YVtcIjI0aFwiXSwgcGFyc2VkRGF0YVtcIjdkXCJdLCBwYXJzZWREYXRhW1wiMWhcIl1dKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHBhcnNlZERhdGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgcGFyc2VEYXRhKGRhdGE6IGFueSkge1xuICAgICAgICBsZXQgbmV3RGF0YSA9IHt9O1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5kZXNpcmVkS2V5cykge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0ganNvbmxpYi5uZXN0ZWRKc29uRmluZGVyKGRhdGEsIHRoaXMuZGVzaXJlZEtleXNba2V5XSk7XG4gICAgICAgICAgICBsZXQgdmFsdWVOdW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgLy8gSWYgaXQgaXMgYSBudW1iZXIgYWRkIGEgJCBhdCB0aGUgYmVnaW5uaW5nIGFuZCBhZGQgY29tbWFzXG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWVOdW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB2YWx1ZSBudW1iZXIgaXMgYSBmbG9hdCwgcmVkdWNlIGl0IHRvIDIgZGVjaW1hbCBwbGFjZXNcbiAgICAgICAgICAgICAgICAvLyBDdXN0b20gcnVsZXMgaGVyZVxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gXCJ2b2x1bWVcIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBzaG93IGRlY2ltYWwgcGxhY2VzIG9mIHZvbHVtZSBhbmQgYWRkIGNvbW1hc1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSB0aGlzLmFkZENvbW1hcyh2YWx1ZU51bWJlci50b0ZpeGVkKDApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09IFwibWFya2V0Y2FwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdGhpcy5hZGRDb21tYXModmFsdWVOdW1iZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZU51bWJlciAlIDEgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSB2YWx1ZU51bWJlci50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdmFsdWVOdW1iZXIudG9GaXhlZCgwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHN0b3JlIGl0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgfVxuXG4gICAgYXN5bmMgbmdPbkluaXQoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0RGF0YSh0aGlzLnVybCwgdGhpcy5kYXRhLCAxLCAxMDApO1xuICAgICAgICBhd2FpdCB0aGlzLmdldERhdGEodGhpcy51cmwsIHRoaXMuZGF0YSwgMTAxLCAxMDApO1xuICAgICAgICB0aGlzLmRhdGFDb3B5ID0gdGhpcy5kYXRhLnNsaWNlKDApO1xuICAgICAgICBDaGFydHNDb21wb25lbnQuc3RhdGljRGF0YSA9IHRoaXMuZGF0YUNvcHk7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGpzb25saWIuZ2V0S2V5cyh0aGlzLmRlc2lyZWRLZXlzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCFcIik7XG4gICAgfVxuICAgIC8vIEdpdmVuIHR3byBqc29uIG9iamVjdHMsIHJldHVybnMgYSBjb21wYXJpc29uIG9mIHRoZWlyIHJhbmsgdmFsdWVcbiAgICByYW5rQ29tcGFyZShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLnJhbmsgLSBiLnJhbms7XG4gICAgfVxuICAgIG9uVGFwKGFyZ3MpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJUYXAhXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcmdzKTtcbiAgICAgICAgbGV0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgIGNvbnRleHQ6IGFyZ3NcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKENvaW5JbmZvLCBvcHRpb25zKTtcbiAgICB9XG4gICAgY2xlYXJGb2N1cyhzZWFyY2gpIHtcbiAgICAgICAgaWYoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICBzZWFyY2guYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkQ29tbWFzKHgpIHtcbiAgICAgICAgcmV0dXJuIHgudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XG4gICAgfVxuICAgIC8vIFdpdGggYWxsIG9mIHRoZSByZXN1bHRzIGluIHRoaXMuZGF0YSBmcm9tIHRoZSBzdGFydCwgbm8gbmVlZCBmb3IgcmVxdWVzdHNcbiAgICBiYXNlVVJMID0gXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCI7XG4gICAgZmlsdGVyUmVzdWx0cyhzdWJzdHJpbmc6IHN0cmluZykge1xuICAgICAgICBpZihzdWJzdHJpbmcgPT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5yZXZlcnREYXRhKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3Vic3RyaW5nID0gc3Vic3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIGZvcjogXCIgKyBzdWJzdHJpbmcpO1xuICAgICAgICBsZXQgZmlsdGVyZWREYXRhID0gW107XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBkYXRhIGFuZCBwdXNoIHRvIG5ldyBhcnJheSB0aGF0IGhhdmUgdGhlIHN1YnN0cmluZ1xuICAgICAgICBmb3IodmFyIG9iaiBvZiB0aGlzLmRhdGFDb3B5KSB7XG4gICAgICAgICAgICBpZihvYmoubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc3Vic3RyaW5nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkRGF0YS5wdXNoKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhID0gZmlsdGVyZWREYXRhLnNsaWNlKDApO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGEgaGFzIFwiICsgdGhpcy5kYXRhLmxlbmd0aCArIFwiIGVsZW1lbnRzXCIpO1xuICAgIH1cbiAgICBjbGVhclNlYXJjaChzZWFyY2g6IFNlYXJjaEJhcikge1xuICAgICAgICB0aGlzLnJldmVydERhdGEoKTtcbiAgICB9XG4gICAgcmV2ZXJ0RGF0YSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXZlcnRpbmcgZGF0YVwiKTtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhQ29weS5zbGljZSgwKTtcbiAgICB9XG4gICAgbnVtID0gMTtcbiAgICBsZXR0ZXJzID0gXCIxMjM0NTY3ODkwUVdFUlRZVUlPUEFTREZHSEpLTFpDVkJOTVwiO1xuICAgIGluc2VydERhdGEoKSB7XG4gICAgICAgIGxldCB3b3JkID0gXCJcIjtcbiAgICAgICAgbGV0IG1heCA9IHRoaXMubGV0dGVycy5sZW5ndGg7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IDEwO2krKykge1xuICAgICAgICAgICAgd29yZCArPSB0aGlzLmxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIklOU0VSVCBJTlRPIG1hcmtldCAocmFuaywgbmFtZSkgdmFsdWVzICg/LCA/KVwiLCBbdGhpcy5udW0sIHdvcmRdKS50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvbmUgaW5zZXJ0aW5nIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaW50RGF0YSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubnVtKys7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBJTlNFUlRJTkdcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpbnREYXRhKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIEZST00gbWFya2V0XCIpLnRoZW4oXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyBkYXRhXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=