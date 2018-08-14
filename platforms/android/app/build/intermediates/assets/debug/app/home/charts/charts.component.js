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
                    if (valueNumber > .20 || valueNumber < 0) {
                        newData[key] = valueNumber.toFixed(2);
                    }
                    else {
                        newData[key] = valueNumber.toFixed(3);
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXJ0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHNDQUFvQztBQUNwQyxnQ0FBMEM7QUFFMUMsdUVBQTJEO0FBQzNELGtFQUEyRjtBQUUzRiw4REFBNEQ7QUFDNUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFROUM7SUFJSSx5QkFBb0IsSUFBVSxFQUFVLFlBQWdDLEVBQVUsZ0JBQWtDO1FBQXBILGlCQWdCQztRQWhCbUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFpQnZILGdCQUFXLEdBQUc7WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxNQUFNO1lBQ1IsUUFBUSxFQUFFLFFBQVE7WUFDeEIsT0FBTyxFQUFFLGtCQUFrQjtZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsS0FBSyxFQUFFLCtCQUErQjtZQUN0QyxJQUFJLEVBQUUsOEJBQThCO1lBQ3BDLElBQUksRUFBRSw4QkFBOEI7U0FDMUMsQ0FBQTtRQUNELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDRixRQUFHLEdBQUcsMERBQTBELENBQUM7UUFDekUsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGFBQVEsR0FBRyxFQUFFLENBQUM7UUF3R2QsNEVBQTRFO1FBQzVFLFlBQU8sR0FBRywwQ0FBMEMsQ0FBQztRQXlCckQsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFlBQU8sR0FBRyxxQ0FBcUMsQ0FBQztRQWpLNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQyxDQUFD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UUFDOUMsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBMUpNLDBCQUFVLEdBQUcsRUFBRSxDQUFDO0lBcENkLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1NBQ3pDLENBQUM7UUFDRixtRUFBbUU7O2lEQUtyQyxXQUFJLEVBQXdCLGlDQUFrQixFQUE0Qix1QkFBZ0I7T0FKM0csZUFBZSxDQStMM0I7SUFBRCxzQkFBQzs7Q0FBQSxBQS9MRCxJQStMQztBQS9MWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGpzb25saWIgfSBmcm9tIFwiLi4vanNvbmxpYlwiXG5pbXBvcnQgeyBQYWdlLCBpc0FuZHJvaWQgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7IENvaW5JbmZvIH0gZnJvbSBcIi4vY29pbi1pbmZvL2NvaW4taW5mby5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xuaW1wb3J0IHsgTmFtZU1hcHBlciB9IGZyb20gXCIuLi9uYW1lLW1hcHBlclwiO1xuaW1wb3J0ICdhYm9ydGNvbnRyb2xsZXItcG9seWZpbGwvZGlzdC9wb2x5ZmlsbC1wYXRjaC1mZXRjaCc7XG52YXIgU3FsaXRlID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIgKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiY2hhcnRzXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NoYXJ0cy5jb21wb25lbnQuaHRtbFwiXG59KVxuLy8gVE9ETzogQWRkIGRyb3Bkb3ducyB0byBjaGFuZ2UgZXhjaGFuZ2UgYW5kIG1heWJlIHBpY2sgZmF2b3JpdGVzP1xuZXhwb3J0IGNsYXNzIENoYXJ0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuICAgIGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcjtcbiAgICBzaWduYWw6IEFib3J0U2lnbmFsO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgU3FsaXRlLmRlbGV0ZURhdGFiYXNlKFwiY3J5cHRvLmRiXCIpO1xuICAgICAgICAobmV3IFNxbGl0ZShcImNyeXB0by5kYlwiKSkudGhlbihkYiA9PiB7XG4gICAgICAgICAgICBkYi5yZXN1bHRUeXBlKFNxbGl0ZS5SRVNVTFRTQVNPQkpFQ1QpO1xuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgICAgICAgZGIuZXhlY1NRTChcIkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIG1hcmtldChyYW5rIElOVEVHRVIsIG5hbWUgVEVYVCwgc3ltYm9sIFRFWFQsIHByaWNlIFJFQUwsIG1hcmtldGNhcCBSRUFMLCB2b2x1bWUgUkVBTCwgdHdlbnR5Rm91ckhvdXIgUkVBTCwgc2V2ZW5EYXkgUkVBTCwgb25lSG91ciBSRUFMKVwiKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYXJrZXQgdGFibGUgY3JlYXRpb24gc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJERUxFVEUgRlJPTSBtYXJrZXRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmludERhdGEoKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNSRUFURSBUQUJMRSBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIGRhdGFiYXNlIGVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXHRkZXNpcmVkS2V5cyA9IHtcblx0XHRcInJhbmtcIjogXCJyYW5rXCIsXG5cdFx0XCJuYW1lXCI6IFwibmFtZVwiLFxuICAgICAgICBcInN5bWJvbFwiOiBcInN5bWJvbFwiLFxuXHRcdFwicHJpY2VcIjogXCJxdW90ZXMuVVNELnByaWNlXCIsXG4gICAgICAgIFwibWFya2V0Y2FwXCI6IFwicXVvdGVzLlVTRC5tYXJrZXRfY2FwXCIsXG4gICAgICAgIFwidm9sdW1lXCI6IFwicXVvdGVzLlVTRC52b2x1bWVfMjRoXCIsXG4gICAgICAgIFwiMjRoXCI6IFwicXVvdGVzLlVTRC5wZXJjZW50X2NoYW5nZV8yNGhcIixcbiAgICAgICAgXCI3ZFwiOiBcInF1b3Rlcy5VU0QucGVyY2VudF9jaGFuZ2VfN2RcIixcbiAgICAgICAgXCIxaFwiOiBcInF1b3Rlcy5VU0QucGVyY2VudF9jaGFuZ2VfMWhcIlxuXHR9XG5cdGhlYWRlcnMgPSBbXTtcbiAgICBwcml2YXRlIHVybCA9IFwiaHR0cHM6Ly9hcGkuY29pbm1hcmtldGNhcC5jb20vdjIvdGlja2VyLz9zdHJ1Y3R1cmU9YXJyYXlcIjtcbiAgICBkYXRhID0gW107XG4gICAgZGF0YUNvcHkgPSBbXTtcbiAgICBzdGF0aWMgc3RhdGljRGF0YSA9IFtdO1xuICAgIHN0YXRpYyBnZXREYXRhQ29weSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGljRGF0YTtcbiAgICB9XG4gICAgLy8gR2l2ZW4gYSB1cmwgYW5kIGFuIGFycmF5LCBnZXRzIHRoZSBkYXRhIGZyb20gdGhlIGFycmF5IGFuZCBwYXJzZXMgaXQgaW50byB0aGUgYXJyYXlcbiAgICAvLyBBZGRpdGlvbmFsbHkgaXQgdGFrZXMgYW4gb3B0aW9uYWwgc3RhcnQgbnVtYmVyLCBsaW1pdCwgYW5kIGRpZmZlcmVudCBjdXJyZW5jeVxuICAgIGFzeW5jIGdldERhdGEodXJsLCBzdG9yYWdlLCBzdGFydD86bnVtYmVyLCBsaW1pdD86bnVtYmVyLCBjb252ZXJ0PzpzdHJpbmcpIHtcbiAgICAgICAgaWYoc3RhcnQpIHtcbiAgICAgICAgICAgIHVybCArPSBcIiZzdGFydD1cIiArIHN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmKGxpbWl0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImbGltaXQ9XCIgKyBsaW1pdDsgICBcbiAgICAgICAgfVxuICAgICAgICBpZihjb252ZXJ0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImY29udmVydD1cIiArIGNvbnZlcnQ7XG4gICAgICAgICAgICAvLyBTd2l0Y2ggZnJvbSBkZWZhdWx0IGN1cnJlbmN5IGluIGRlc2lyZWRLZXlzXG4gICAgICAgICAgICBsZXQgcmUgPSAvVVNEL2dpO1xuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5kZXNpcmVkS2V5cykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzaXJlZEtleXNba2V5XSA9IHRoaXMuZGVzaXJlZEtleXNba2V5XS5yZXBsYWNlKHJlLCBjb252ZXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgICAgICAvLyBHZXRzIGpzb24gZnJvbSB0aGUgdXJsXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgdGhpcy5zaWduYWwgPSB0aGlzLmNvbnRyb2xsZXIuc2lnbmFsO1xuICAgICAgICBsZXQgYSA9IGF3YWl0IGZldGNoKHVybCwge21ldGhvZDogXCJHRVRcIiwgc2lnbmFsOiB0aGlzLnNpZ25hbH0pO1xuICAgICAgICBsZXQganNvbiA9IGF3YWl0IGEuanNvbigpO1xuICAgICAgICAvLyBDaGVja3MgdG8gc2VlIGlmIHRoZXJlIHdhcyBhbiBlcnJvciBpbiB0aGUgcmVxdWVzdFxuICAgICAgICBpZihqc29uLm1ldGFkYXRhLmVycm9yICE9IG51bGwpIHsgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlcXVlc3RpbmcgZGF0YVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24ubWV0YWRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhcnNlcyB0aGUgZGF0YSBhbmQgc3RvcmVzIGl0XG4gICAgICAgIGxldCBkYXRhID0ganNvbi5kYXRhO1xuICAgICAgICBmb3IgKGxldCBpbmZvIG9mIGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBwYXJzZWREYXRhID0gdGhpcy5wYXJzZURhdGEoaW5mbyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJJTlNFUlQgSU5UTyBtYXJrZXQgKHJhbmssIG5hbWUsIHN5bWJvbCwgcHJpY2UsIG1hcmtldGNhcCwgdm9sdW1lLCB0d2VudHlGb3VySG91ciwgc2V2ZW5EYXksIG9uZUhvdXIpIHZhbHVlcyAoPywgPywgPywgPywgPywgPywgPywgPywgPylcIiwgW3BhcnNlZERhdGFbXCJyYW5rXCJdLCBwYXJzZWREYXRhW1wibmFtZVwiXSwgcGFyc2VkRGF0YVtcInN5bWJvbFwiXSwgcGFyc2VkRGF0YVtcInByaWNlXCJdLCBwYXJzZWREYXRhW1wibWFya2V0Y2FwXCJdLCBwYXJzZWREYXRhW1widm9sdW1lXCJdLCBwYXJzZWREYXRhW1wiMjRoXCJdLCBwYXJzZWREYXRhW1wiN2RcIl0sIHBhcnNlZERhdGFbXCIxaFwiXV0pO1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2gocGFyc2VkRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBwYXJzZURhdGEoZGF0YTogYW55KSB7XG4gICAgICAgIGxldCBuZXdEYXRhID0ge307XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmRlc2lyZWRLZXlzKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBqc29ubGliLm5lc3RlZEpzb25GaW5kZXIoZGF0YSwgdGhpcy5kZXNpcmVkS2V5c1trZXldKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZU51bWJlciA9IE51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAvLyBJZiBpdCBpcyBhIG51bWJlciBhZGQgYSAkIGF0IHRoZSBiZWdpbm5pbmcgYW5kIGFkZCBjb21tYXNcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZU51bWJlcikpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIHZhbHVlIG51bWJlciBpcyBhIGZsb2F0LCByZWR1Y2UgaXQgdG8gMiBkZWNpbWFsIHBsYWNlc1xuICAgICAgICAgICAgICAgIC8vIEN1c3RvbSBydWxlcyBoZXJlXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBcInZvbHVtZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IHNob3cgZGVjaW1hbCBwbGFjZXMgb2Ygdm9sdW1lIGFuZCBhZGQgY29tbWFzXG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHRoaXMuYWRkQ29tbWFzKHZhbHVlTnVtYmVyLnRvRml4ZWQoMCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkgPT0gXCJtYXJrZXRjYXBcIikge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSB0aGlzLmFkZENvbW1hcyh2YWx1ZU51bWJlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZU51bWJlciAlIDEgIT0gMCkgeyAvLyBudW1iZXIgaXMgYSBmbG9hdFxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZU51bWJlciA+IC4yMCB8fCB2YWx1ZU51bWJlciA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHZhbHVlTnVtYmVyLnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSB2YWx1ZU51bWJlci50b0ZpeGVkKDMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdmFsdWVOdW1iZXIudG9GaXhlZCgwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHN0b3JlIGl0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgfVxuXG4gICAgYXN5bmMgbmdPbkluaXQoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0RGF0YSh0aGlzLnVybCwgdGhpcy5kYXRhLCAxLCAxMDApO1xuICAgICAgICBhd2FpdCB0aGlzLmdldERhdGEodGhpcy51cmwsIHRoaXMuZGF0YSwgMTAxLCAxMDApO1xuICAgICAgICB0aGlzLmRhdGFDb3B5ID0gdGhpcy5kYXRhLnNsaWNlKDApO1xuICAgICAgICBDaGFydHNDb21wb25lbnQuc3RhdGljRGF0YSA9IHRoaXMuZGF0YUNvcHk7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGpzb25saWIuZ2V0S2V5cyh0aGlzLmRlc2lyZWRLZXlzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCFcIik7XG4gICAgfVxuICAgIC8vIEdpdmVuIHR3byBqc29uIG9iamVjdHMsIHJldHVybnMgYSBjb21wYXJpc29uIG9mIHRoZWlyIHJhbmsgdmFsdWVcbiAgICByYW5rQ29tcGFyZShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLnJhbmsgLSBiLnJhbms7XG4gICAgfVxuICAgIG9uVGFwKGFyZ3MpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJUYXAhXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcmdzKTtcbiAgICAgICAgbGV0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgIGNvbnRleHQ6IGFyZ3NcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKENvaW5JbmZvLCBvcHRpb25zKTtcbiAgICB9XG4gICAgY2xlYXJGb2N1cyhzZWFyY2gpIHtcbiAgICAgICAgaWYoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICBzZWFyY2guYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkQ29tbWFzKHgpIHtcbiAgICAgICAgcmV0dXJuIHgudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XG4gICAgfVxuICAgIC8vIFdpdGggYWxsIG9mIHRoZSByZXN1bHRzIGluIHRoaXMuZGF0YSBmcm9tIHRoZSBzdGFydCwgbm8gbmVlZCBmb3IgcmVxdWVzdHNcbiAgICBiYXNlVVJMID0gXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCI7XG4gICAgZmlsdGVyUmVzdWx0cyhzdWJzdHJpbmc6IHN0cmluZykge1xuICAgICAgICBpZihzdWJzdHJpbmcgPT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5yZXZlcnREYXRhKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3Vic3RyaW5nID0gc3Vic3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIGZvcjogXCIgKyBzdWJzdHJpbmcpO1xuICAgICAgICBsZXQgZmlsdGVyZWREYXRhID0gW107XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBkYXRhIGFuZCBwdXNoIHRvIG5ldyBhcnJheSB0aGF0IGhhdmUgdGhlIHN1YnN0cmluZ1xuICAgICAgICBmb3IodmFyIG9iaiBvZiB0aGlzLmRhdGFDb3B5KSB7XG4gICAgICAgICAgICBpZihvYmoubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc3Vic3RyaW5nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkRGF0YS5wdXNoKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhID0gZmlsdGVyZWREYXRhLnNsaWNlKDApO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGEgaGFzIFwiICsgdGhpcy5kYXRhLmxlbmd0aCArIFwiIGVsZW1lbnRzXCIpO1xuICAgIH1cbiAgICBjbGVhclNlYXJjaChzZWFyY2g6IFNlYXJjaEJhcikge1xuICAgICAgICB0aGlzLnJldmVydERhdGEoKTtcbiAgICB9XG4gICAgcmV2ZXJ0RGF0YSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXZlcnRpbmcgZGF0YVwiKTtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhQ29weS5zbGljZSgwKTtcbiAgICB9XG4gICAgbnVtID0gMTtcbiAgICBsZXR0ZXJzID0gXCIxMjM0NTY3ODkwUVdFUlRZVUlPUEFTREZHSEpLTFpDVkJOTVwiO1xuICAgIGluc2VydERhdGEoKSB7XG4gICAgICAgIGxldCB3b3JkID0gXCJcIjtcbiAgICAgICAgbGV0IG1heCA9IHRoaXMubGV0dGVycy5sZW5ndGg7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IDEwO2krKykge1xuICAgICAgICAgICAgd29yZCArPSB0aGlzLmxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIklOU0VSVCBJTlRPIG1hcmtldCAocmFuaywgbmFtZSkgdmFsdWVzICg/LCA/KVwiLCBbdGhpcy5udW0sIHdvcmRdKS50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvbmUgaW5zZXJ0aW5nIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaW50RGF0YSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubnVtKys7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBJTlNFUlRJTkdcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpbnREYXRhKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIEZST00gbWFya2V0XCIpLnRoZW4oXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyBkYXRhXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=