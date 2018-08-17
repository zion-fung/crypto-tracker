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
var dialogs_1 = require("ui/dialogs");
var global_settings_1 = require("../global_settings");
var ChartsComponent = /** @class */ (function () {
    function ChartsComponent(page, modalService, viewContainerRef) {
        var _this = this;
        this.page = page;
        this.modalService = modalService;
        this.viewContainerRef = viewContainerRef;
        this.currency = "USD";
        this.exchange = "CoinMarketCap";
        this.desiredKeys = {};
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
                            for (key in global_settings_1.desiredKeys) {
                                global_settings_1.desiredKeys[key] = global_settings_1.desiredKeys[key].replace(re, convert);
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
        for (var key in global_settings_1.desiredKeys) {
            var value = jsonlib_1.jsonlib.nestedJsonFinder(data, global_settings_1.desiredKeys[key]);
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
                    case 0: return [4 /*yield*/, this.getData(this.url, this.data, 1, 100, global_settings_1.GlobalSettings.getCurrency())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getData(this.url, this.data, 101, 100, global_settings_1.GlobalSettings.getCurrency())];
                    case 2:
                        _a.sent();
                        this.dataCopy = this.data.slice(0);
                        ChartsComponent_1.staticData = this.dataCopy;
                        this.headers = jsonlib_1.jsonlib.getKeys(global_settings_1.desiredKeys);
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
    ChartsComponent.prototype.changeCurrency = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            title: "Choose a currency",
                            cancelButtonText: "Cancel",
                            actions: ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "USD", "ZAR", "BTC", "ETH", "XRP", "LTC", "BCH"]
                        };
                        return [4 /*yield*/, dialogs_1.action(options).then(function (result) {
                                if (result == "Cancel") {
                                    return null;
                                }
                                _this.currency = result;
                                global_settings_1.GlobalSettings.setCurrency(result);
                                // Delete the table
                                _this.database.execSQL("DELETE FROM market").then(function (success) {
                                }, function (error) {
                                    console.log("Error deleting market table from currency selection", error);
                                    return;
                                });
                            }, function (error) {
                                return;
                            })];
                    case 1:
                        _a.sent();
                        this.data = [];
                        this.getData(this.url, this.data, 1, 100, global_settings_1.GlobalSettings.getCurrency());
                        this.getData(this.url, this.data, 101, 100, global_settings_1.GlobalSettings.getCurrency());
                        this.dataCopy = this.data.slice(0);
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartsComponent.prototype.changeExchange = function () {
        var _this = this;
        var options = {
            title: "Choose a data source",
            cancelButtonText: "Cancel",
            actions: ["CoinMarketCap", "Bittrex", "Binance"]
        };
        dialogs_1.action(options).then(function (result) {
            _this.exchange = result;
        }, function (error) {
        });
    };
    ChartsComponent.staticData = [];
    ChartsComponent = ChartsComponent_1 = tslib_1.__decorate([
        core_1.Component({
            selector: "charts",
            moduleId: module.id,
            templateUrl: "./charts.component.html",
            styleUrls: ["./charts.component.scss"]
        })
        // TODO: Add dropdowns to change exchange and maybe pick favorites?
        ,
        tslib_1.__metadata("design:paramtypes", [page_1.Page, modal_dialog_1.ModalDialogService, core_1.ViewContainerRef])
    ], ChartsComponent);
    return ChartsComponent;
    var ChartsComponent_1;
}());
exports.ChartsComponent = ChartsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXJ0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHNDQUFvQztBQUNwQyxnQ0FBMEM7QUFFMUMsdUVBQTJEO0FBQzNELGtFQUEyRjtBQUUzRiw4REFBNEQ7QUFDNUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFDOUMsc0NBQW9DO0FBQ3BDLHNEQUFpRTtBQVNqRTtJQU1JLHlCQUFvQixJQUFVLEVBQVUsWUFBZ0MsRUFBVSxnQkFBa0M7UUFBcEgsaUJBZ0JDO1FBaEJtQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUxwSCxhQUFRLEdBQVcsS0FBSyxDQUFDO1FBQ3pCLGFBQVEsR0FBVyxlQUFlLENBQUM7UUFxQnRDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDRixRQUFHLEdBQUcsMERBQTBELENBQUM7UUFDekUsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGFBQVEsR0FBRyxFQUFFLENBQUM7UUF3R2QsNEVBQTRFO1FBQzVFLFlBQU8sR0FBRywwQ0FBMEMsQ0FBQztRQXlCckQsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFlBQU8sR0FBRyxxQ0FBcUMsQ0FBQztRQXZKNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQyxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUM3QixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN0QyxLQUFJLENB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Q0FvTzNCO0lBQUQsc0JBQUM7O0NBQUEsQUFwT0QsSUFvT0M7QUFwT1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBqc29ubGliIH0gZnJvbSBcIi4uL2pzb25saWJcIlxuaW1wb3J0IHsgUGFnZSwgaXNBbmRyb2lkIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBDb2luSW5mbyB9IGZyb20gXCIuL2NvaW4taW5mby9jb2luLWluZm8uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UsIE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IE5hbWVNYXBwZXIgfSBmcm9tIFwiLi4vbmFtZS1tYXBwZXJcIjtcbmltcG9ydCAnYWJvcnRjb250cm9sbGVyLXBvbHlmaWxsL2Rpc3QvcG9seWZpbGwtcGF0Y2gtZmV0Y2gnO1xudmFyIFNxbGl0ZSA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiICk7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgZGVzaXJlZEtleXMsIEdsb2JhbFNldHRpbmdzIH0gZnJvbSBcIi4uL2dsb2JhbF9zZXR0aW5nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJjaGFydHNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2hhcnRzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2NoYXJ0cy5jb21wb25lbnQuc2Nzc1wiXVxufSlcbi8vIFRPRE86IEFkZCBkcm9wZG93bnMgdG8gY2hhbmdlIGV4Y2hhbmdlIGFuZCBtYXliZSBwaWNrIGZhdm9yaXRlcz9cbmV4cG9ydCBjbGFzcyBDaGFydHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGN1cnJlbmN5OiBzdHJpbmcgPSBcIlVTRFwiO1xuICAgIGV4Y2hhbmdlOiBzdHJpbmcgPSBcIkNvaW5NYXJrZXRDYXBcIjtcbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gICAgY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyO1xuICAgIHNpZ25hbDogQWJvcnRTaWduYWw7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgICAgICBTcWxpdGUuZGVsZXRlRGF0YWJhc2UoXCJjcnlwdG8uZGJcIik7XG4gICAgICAgIChuZXcgU3FsaXRlKFwiY3J5cHRvLmRiXCIpKS50aGVuKGRiID0+IHtcbiAgICAgICAgICAgIGRiLnJlc3VsdFR5cGUoU3FsaXRlLlJFU1VMVFNBU09CSkVDVCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICBkYi5leGVjU1FMKFwiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgbWFya2V0KHJhbmsgSU5URUdFUiwgbmFtZSBURVhULCBzeW1ib2wgVEVYVCwgcHJpY2UgUkVBTCwgbWFya2V0Y2FwIFJFQUwsIHZvbHVtZSBSRUFMLCB0d2VudHlGb3VySG91ciBSRUFMLCBzZXZlbkRheSBSRUFMLCBvbmVIb3VyIFJFQUwpXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcmtldCB0YWJsZSBjcmVhdGlvbiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIkRFTEVURSBGUk9NIG1hcmtldFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaW50RGF0YSgpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gZGF0YWJhc2UgZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cdGRlc2lyZWRLZXlzID0ge307XG5cdGhlYWRlcnMgPSBbXTtcbiAgICBwcml2YXRlIHVybCA9IFwiaHR0cHM6Ly9hcGkuY29pbm1hcmtldGNhcC5jb20vdjIvdGlja2VyLz9zdHJ1Y3R1cmU9YXJyYXlcIjtcbiAgICBkYXRhID0gW107XG4gICAgZGF0YUNvcHkgPSBbXTtcbiAgICBzdGF0aWMgc3RhdGljRGF0YSA9IFtdO1xuICAgIHN0YXRpYyBnZXREYXRhQ29weSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGljRGF0YTtcbiAgICB9XG4gICAgLy8gR2l2ZW4gYSB1cmwgYW5kIGFuIGFycmF5LCBnZXRzIHRoZSBkYXRhIGZyb20gdGhlIGFycmF5IGFuZCBwYXJzZXMgaXQgaW50byB0aGUgYXJyYXlcbiAgICAvLyBBZGRpdGlvbmFsbHkgaXQgdGFrZXMgYW4gb3B0aW9uYWwgc3RhcnQgbnVtYmVyLCBsaW1pdCwgYW5kIGRpZmZlcmVudCBjdXJyZW5jeVxuICAgIGFzeW5jIGdldERhdGEodXJsLCBzdG9yYWdlLCBzdGFydD86bnVtYmVyLCBsaW1pdD86bnVtYmVyLCBjb252ZXJ0PzpzdHJpbmcpIHtcbiAgICAgICAgaWYoc3RhcnQpIHtcbiAgICAgICAgICAgIHVybCArPSBcIiZzdGFydD1cIiArIHN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmKGxpbWl0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImbGltaXQ9XCIgKyBsaW1pdDsgICBcbiAgICAgICAgfVxuICAgICAgICBpZihjb252ZXJ0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImY29udmVydD1cIiArIGNvbnZlcnQ7XG4gICAgICAgICAgICAvLyBTd2l0Y2ggZnJvbSBkZWZhdWx0IGN1cnJlbmN5IGluIGRlc2lyZWRLZXlzXG4gICAgICAgICAgICBsZXQgcmUgPSAvVVNEL2dpO1xuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gZGVzaXJlZEtleXMpIHtcbiAgICAgICAgICAgICAgICBkZXNpcmVkS2V5c1trZXldID0gZGVzaXJlZEtleXNba2V5XS5yZXBsYWNlKHJlLCBjb252ZXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgICAgICAvLyBHZXRzIGpzb24gZnJvbSB0aGUgdXJsXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgdGhpcy5zaWduYWwgPSB0aGlzLmNvbnRyb2xsZXIuc2lnbmFsO1xuICAgICAgICBsZXQgYSA9IGF3YWl0IGZldGNoKHVybCwge21ldGhvZDogXCJHRVRcIiwgc2lnbmFsOiB0aGlzLnNpZ25hbH0pO1xuICAgICAgICBsZXQganNvbiA9IGF3YWl0IGEuanNvbigpO1xuICAgICAgICAvLyBDaGVja3MgdG8gc2VlIGlmIHRoZXJlIHdhcyBhbiBlcnJvciBpbiB0aGUgcmVxdWVzdFxuICAgICAgICBpZihqc29uLm1ldGFkYXRhLmVycm9yICE9IG51bGwpIHsgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlcXVlc3RpbmcgZGF0YVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24ubWV0YWRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhcnNlcyB0aGUgZGF0YSBhbmQgc3RvcmVzIGl0XG4gICAgICAgIGxldCBkYXRhID0ganNvbi5kYXRhO1xuICAgICAgICBmb3IgKGxldCBpbmZvIG9mIGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBwYXJzZWREYXRhID0gdGhpcy5wYXJzZURhdGEoaW5mbyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJJTlNFUlQgSU5UTyBtYXJrZXQgKHJhbmssIG5hbWUsIHN5bWJvbCwgcHJpY2UsIG1hcmtldGNhcCwgdm9sdW1lLCB0d2VudHlGb3VySG91ciwgc2V2ZW5EYXksIG9uZUhvdXIpIHZhbHVlcyAoPywgPywgPywgPywgPywgPywgPywgPywgPylcIiwgW3BhcnNlZERhdGFbXCJyYW5rXCJdLCBwYXJzZWREYXRhW1wibmFtZVwiXSwgcGFyc2VkRGF0YVtcInN5bWJvbFwiXSwgcGFyc2VkRGF0YVtcInByaWNlXCJdLCBwYXJzZWREYXRhW1wibWFya2V0Y2FwXCJdLCBwYXJzZWREYXRhW1widm9sdW1lXCJdLCBwYXJzZWREYXRhW1wiMjRoXCJdLCBwYXJzZWREYXRhW1wiN2RcIl0sIHBhcnNlZERhdGFbXCIxaFwiXV0pO1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2gocGFyc2VkRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBwYXJzZURhdGEoZGF0YTogYW55KSB7XG4gICAgICAgIGxldCBuZXdEYXRhID0ge307XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkZXNpcmVkS2V5cykge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0ganNvbmxpYi5uZXN0ZWRKc29uRmluZGVyKGRhdGEsIGRlc2lyZWRLZXlzW2tleV0pO1xuICAgICAgICAgICAgbGV0IHZhbHVlTnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgIC8vIElmIGl0IGlzIGEgbnVtYmVyIGFkZCBhICQgYXQgdGhlIGJlZ2lubmluZyBhbmQgYWRkIGNvbW1hc1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlTnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdmFsdWUgbnVtYmVyIGlzIGEgZmxvYXQsIHJlZHVjZSBpdCB0byAyIGRlY2ltYWwgcGxhY2VzXG4gICAgICAgICAgICAgICAgLy8gQ3VzdG9tIHJ1bGVzIGhlcmVcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IFwidm9sdW1lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3Qgc2hvdyBkZWNpbWFsIHBsYWNlcyBvZiB2b2x1bWUgYW5kIGFkZCBjb21tYXNcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdGhpcy5hZGRDb21tYXModmFsdWVOdW1iZXIudG9GaXhlZCgwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PSBcIm1hcmtldGNhcFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHRoaXMuYWRkQ29tbWFzKHZhbHVlTnVtYmVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlTnVtYmVyICUgMSAhPSAwKSB7IC8vIG51bWJlciBpcyBhIGZsb2F0XG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlTnVtYmVyID4gLjIwIHx8IHZhbHVlTnVtYmVyIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdmFsdWVOdW1iZXIudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHZhbHVlTnVtYmVyLnRvRml4ZWQoMyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSB2YWx1ZU51bWJlci50b0ZpeGVkKDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2Ugc3RvcmUgaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG5cbiAgICBhc3luYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXREYXRhKHRoaXMudXJsLCB0aGlzLmRhdGEsIDEsIDEwMCwgR2xvYmFsU2V0dGluZ3MuZ2V0Q3VycmVuY3koKSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0RGF0YSh0aGlzLnVybCwgdGhpcy5kYXRhLCAxMDEsIDEwMCwgR2xvYmFsU2V0dGluZ3MuZ2V0Q3VycmVuY3koKSk7XG4gICAgICAgIHRoaXMuZGF0YUNvcHkgPSB0aGlzLmRhdGEuc2xpY2UoMCk7XG4gICAgICAgIENoYXJ0c0NvbXBvbmVudC5zdGF0aWNEYXRhID0gdGhpcy5kYXRhQ29weTtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0ganNvbmxpYi5nZXRLZXlzKGRlc2lyZWRLZXlzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCFcIik7XG4gICAgfVxuICAgIC8vIEdpdmVuIHR3byBqc29uIG9iamVjdHMsIHJldHVybnMgYSBjb21wYXJpc29uIG9mIHRoZWlyIHJhbmsgdmFsdWVcbiAgICByYW5rQ29tcGFyZShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLnJhbmsgLSBiLnJhbms7XG4gICAgfVxuICAgIG9uVGFwKGFyZ3MpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJUYXAhXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcmdzKTtcbiAgICAgICAgbGV0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgIGNvbnRleHQ6IGFyZ3NcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKENvaW5JbmZvLCBvcHRpb25zKTtcbiAgICB9XG4gICAgY2xlYXJGb2N1cyhzZWFyY2gpIHtcbiAgICAgICAgaWYoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICBzZWFyY2guYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkQ29tbWFzKHgpIHtcbiAgICAgICAgcmV0dXJuIHgudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XG4gICAgfVxuICAgIC8vIFdpdGggYWxsIG9mIHRoZSByZXN1bHRzIGluIHRoaXMuZGF0YSBmcm9tIHRoZSBzdGFydCwgbm8gbmVlZCBmb3IgcmVxdWVzdHNcbiAgICBiYXNlVVJMID0gXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCI7XG4gICAgZmlsdGVyUmVzdWx0cyhzdWJzdHJpbmc6IHN0cmluZykge1xuICAgICAgICBpZihzdWJzdHJpbmcgPT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5yZXZlcnREYXRhKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3Vic3RyaW5nID0gc3Vic3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIGZvcjogXCIgKyBzdWJzdHJpbmcpO1xuICAgICAgICBsZXQgZmlsdGVyZWREYXRhID0gW107XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBkYXRhIGFuZCBwdXNoIHRvIG5ldyBhcnJheSB0aGF0IGhhdmUgdGhlIHN1YnN0cmluZ1xuICAgICAgICBmb3IodmFyIG9iaiBvZiB0aGlzLmRhdGFDb3B5KSB7XG4gICAgICAgICAgICBpZihvYmoubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc3Vic3RyaW5nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkRGF0YS5wdXNoKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhID0gZmlsdGVyZWREYXRhLnNsaWNlKDApO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGEgaGFzIFwiICsgdGhpcy5kYXRhLmxlbmd0aCArIFwiIGVsZW1lbnRzXCIpO1xuICAgIH1cbiAgICBjbGVhclNlYXJjaChzZWFyY2g6IFNlYXJjaEJhcikge1xuICAgICAgICB0aGlzLnJldmVydERhdGEoKTtcbiAgICB9XG4gICAgcmV2ZXJ0RGF0YSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXZlcnRpbmcgZGF0YVwiKTtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhQ29weS5zbGljZSgwKTtcbiAgICB9XG4gICAgbnVtID0gMTtcbiAgICBsZXR0ZXJzID0gXCIxMjM0NTY3ODkwUVdFUlRZVUlPUEFTREZHSEpLTFpDVkJOTVwiO1xuICAgIGluc2VydERhdGEoKSB7XG4gICAgICAgIGxldCB3b3JkID0gXCJcIjtcbiAgICAgICAgbGV0IG1heCA9IHRoaXMubGV0dGVycy5sZW5ndGg7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IDEwO2krKykge1xuICAgICAgICAgICAgd29yZCArPSB0aGlzLmxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIklOU0VSVCBJTlRPIG1hcmtldCAocmFuaywgbmFtZSkgdmFsdWVzICg/LCA/KVwiLCBbdGhpcy5udW0sIHdvcmRdKS50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvbmUgaW5zZXJ0aW5nIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaW50RGF0YSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubnVtKys7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBJTlNFUlRJTkdcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpbnREYXRhKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIEZST00gbWFya2V0XCIpLnRoZW4oXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyBkYXRhXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIClcbiAgICB9XG4gICAgYXN5bmMgY2hhbmdlQ3VycmVuY3koKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IFwiQ2hvb3NlIGEgY3VycmVuY3lcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJBVURcIiwgXCJCUkxcIiwgXCJDQURcIiwgXCJDSEZcIiwgXCJDTFBcIiwgXCJDTllcIiwgXCJDWktcIiwgXCJES0tcIiwgXCJFVVJcIiwgXCJHQlBcIiwgXCJIS0RcIiwgXCJIVUZcIiwgXCJJRFJcIiwgXCJJTFNcIiwgXCJJTlJcIiwgXCJKUFlcIiwgXCJLUldcIiwgXCJNWE5cIiwgXCJNWVJcIiwgXCJOT0tcIiwgXCJOWkRcIiwgXCJQSFBcIiwgXCJQS1JcIiwgXCJQTE5cIiwgXCJSVUJcIiwgXCJTRUtcIiwgXCJTR0RcIiwgXCJUSEJcIiwgXCJUUllcIiwgXCJUV0RcIiwgXCJVU0RcIiwgXCJaQVJcIiwgXCJCVENcIiwgXCJFVEhcIiwgXCJYUlBcIiwgXCJMVENcIiwgXCJCQ0hcIl1cbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgYWN0aW9uKG9wdGlvbnMpLnRoZW4oXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlc3VsdCA9PSBcIkNhbmNlbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbmN5ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIEdsb2JhbFNldHRpbmdzLnNldEN1cnJlbmN5KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSB0YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIkRFTEVURSBGUk9NIG1hcmtldFwiKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGRlbGV0aW5nIG1hcmtldCB0YWJsZSBmcm9tIGN1cnJlbmN5IHNlbGVjdGlvblwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLmdldERhdGEodGhpcy51cmwsIHRoaXMuZGF0YSwgMSwgMTAwLCBHbG9iYWxTZXR0aW5ncy5nZXRDdXJyZW5jeSgpKTtcbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMudXJsLCB0aGlzLmRhdGEsIDEwMSwgMTAwLCBHbG9iYWxTZXR0aW5ncy5nZXRDdXJyZW5jeSgpKTtcbiAgICAgICAgdGhpcy5kYXRhQ29weSA9IHRoaXMuZGF0YS5zbGljZSgwKTtcbiAgICB9XG4gICAgY2hhbmdlRXhjaGFuZ2UoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IFwiQ2hvb3NlIGEgZGF0YSBzb3VyY2VcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJDb2luTWFya2V0Q2FwXCIsIFwiQml0dHJleFwiLCBcIkJpbmFuY2VcIl1cbiAgICAgICAgfTtcbiAgICAgICAgYWN0aW9uKG9wdGlvbnMpLnRoZW4oXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhjaGFuZ2UgPSByZXN1bHQ7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbn1cbiJdfQ==