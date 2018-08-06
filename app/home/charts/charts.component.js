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
        (new Sqlite("test.db")).then(function (db) {
            db.resultType(Sqlite.RESULTSASOBJECT);
            db.execSQL("CREATE TABLE IF NOT EXISTS market(rank INTEGER, name TEXT)").then(function (result) {
                _this.database = db;
                _this.database.execSQL("DELETE FROM market").then(function (result) {
                    _this.printData();
                });
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("Open database error", error);
        });
    }
    // Given a url and an array, gets the data from the array and parses it into the array
    // Additionally it takes an optional start number, limit, and different currency
    ChartsComponent.prototype.getData = function (url, storage, start, limit, convert) {
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
    ChartsComponent = tslib_1.__decorate([
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
}());
exports.ChartsComponent = ChartsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXJ0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW9FO0FBQ3BFLHNDQUFvQztBQUNwQyxnQ0FBMEM7QUFFMUMsdUVBQTJEO0FBQzNELGtFQUEyRjtBQUUzRiw4REFBNEQ7QUFDNUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFROUM7SUFJSSx5QkFBb0IsSUFBVSxFQUFVLFlBQWdDLEVBQVUsZ0JBQWtDO1FBQXBILGlCQWVDO1FBZm1CLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBZ0J2SCxnQkFBVyxHQUFHO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsTUFBTTtZQUNSLFFBQVEsRUFBRSxRQUFRO1lBQ3hCLE9BQU8sRUFBRSxrQkFBa0I7WUFDckIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLEtBQUssRUFBRSwrQkFBK0I7WUFDdEMsSUFBSSxFQUFFLDhCQUE4QjtZQUNwQyxJQUFJLEVBQUUsOEJBQThCO1NBQzFDLENBQUE7UUFDRCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ0YsUUFBRyxHQUFHLDBEQUEwRCxDQUFDO1FBQ3pFLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDRixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBK0Z0Qiw0RUFBNEU7UUFDNUUsWUFBTyxHQUFHLDBDQUEwQyxDQUFDO1FBeUJyRCxRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsWUFBTyxHQUFHLHFDQUFxQyxDQUFDO1FBdko1QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUMzQixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsT0FBTyxDQUFDLDREQUE0RCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDaEYsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtvQkFDbkQsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNyQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsRUFBRSxVQUFBLEtBQUs7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWdCRCxzRkFBc0Y7SUFDdEYsZ0ZBQWdGO0lBQzFFLGlDQUFPLEdBQWIsVUFBYyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQWEsRUFBRSxLQUFhLEVBQUUsT0FBZTs7Ozs7O3dCQUNyRSxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNQLEdBQUcsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO3dCQUM3QixDQUFDO3dCQUNELEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ1AsR0FBRyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQzdCLENBQUM7d0JBQ0QsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs0QkFDVCxHQUFHLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQzs0QkFFekIsRUFBRSxHQUFHLE9BQU8sQ0FBQzs0QkFDakIsR0FBRyxDQUFBLENBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQzs0QkFDdkUsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pCLHlCQUF5Qjt3QkFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO3dCQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO3dCQUM3QixxQkFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUE7O3dCQUExRCxDQUFDLEdBQUcsU0FBc0Q7d0JBQ25ELHFCQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQXJCLElBQUksR0FBRyxTQUFjO3dCQUN6QixxREFBcUQ7d0JBQ3JELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs0QkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqQyxNQUFNLGdCQUFDO3dCQUNYLENBQUM7d0JBRUcsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLEdBQUcsQ0FBQyxPQUFpQixFQUFKLGFBQUksRUFBSixrQkFBSSxFQUFKLElBQUk7NEJBQVosSUFBSTs0QkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQ3hDOzs7OztLQUNKO0lBQ08sbUNBQVMsR0FBakIsVUFBa0IsSUFBUztRQUN2QixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDakIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyw0REFBNEQ7WUFDNUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsNERBQTREO2dCQUM1RCxvQkFBb0I7Z0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNsQixxREFBcUQ7b0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDO2dCQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUNELHFCQUFxQjtZQUN6QixDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVLLGtDQUFRLEdBQWQ7Ozs7NEJBQ0kscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFBOzt3QkFBL0MsU0FBK0MsQ0FBQzt3QkFDaEQscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFBOzt3QkFBakQsU0FBaUQsQ0FBQzt3QkFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7O0tBQy9CO0lBQ0QsbUVBQW1FO0lBQ25FLHFDQUFXLEdBQVgsVUFBWSxDQUFDLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNELCtCQUFLLEdBQUwsVUFBTSxJQUFJO1FBQ04sdUJBQXVCO1FBQ3ZCLHFCQUFxQjtRQUNyQixJQUFJLE9BQU8sR0FBdUI7WUFDOUIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN2QyxPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsOEJBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0Qsb0NBQVUsR0FBVixVQUFXLE1BQU07UUFDYixFQUFFLENBQUEsQ0FBQyxnQkFBUyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUFDRCxtQ0FBUyxHQUFULFVBQVUsQ0FBQztRQUNQLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFHRCx1Q0FBYSxHQUFiLFVBQWMsU0FBaUI7UUFDM0IsRUFBRSxDQUFBLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLDhDQUE4QztRQUM5QyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsa0VBQWtFO1FBQ2xFLEdBQUcsQ0FBQSxDQUFZLFVBQWEsRUFBYixLQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWE7WUFBeEIsSUFBSSxHQUFHLFNBQUE7WUFDUCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFDRCxxQ0FBVyxHQUFYLFVBQVksTUFBaUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxvQ0FBVSxHQUFWO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUdELG9DQUFVLEdBQVY7UUFBQSxpQkFjQztRQWJHLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzlCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdkIsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLCtDQUErQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekYsVUFBQSxNQUFNO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQy9CLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixLQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxtQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQzFDLFVBQUEsTUFBTTtZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBcExRLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1NBQ3pDLENBQUM7UUFDRixtRUFBbUU7O2lEQUtyQyxXQUFJLEVBQXdCLGlDQUFrQixFQUE0Qix1QkFBZ0I7T0FKM0csZUFBZSxDQXFMM0I7SUFBRCxzQkFBQztDQUFBLEFBckxELElBcUxDO0FBckxZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsganNvbmxpYiB9IGZyb20gXCIuLi9qc29ubGliXCJcbmltcG9ydCB7IFBhZ2UsIGlzQW5kcm9pZCB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHsgQ29pbkluZm8gfSBmcm9tIFwiLi9jb2luLWluZm8vY29pbi1pbmZvLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBOYW1lTWFwcGVyIH0gZnJvbSBcIi4uL25hbWUtbWFwcGVyXCI7XG5pbXBvcnQgJ2Fib3J0Y29udHJvbGxlci1wb2x5ZmlsbC9kaXN0L3BvbHlmaWxsLXBhdGNoLWZldGNoJztcbnZhciBTcWxpdGUgPSByZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIiApO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJjaGFydHNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2hhcnRzLmNvbXBvbmVudC5odG1sXCJcbn0pXG4vLyBUT0RPOiBBZGQgZHJvcGRvd25zIHRvIGNoYW5nZSBleGNoYW5nZSBhbmQgbWF5YmUgcGljayBmYXZvcml0ZXM/XG5leHBvcnQgY2xhc3MgQ2hhcnRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gICAgY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyO1xuICAgIHNpZ25hbDogQWJvcnRTaWduYWw7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgICAgICAobmV3IFNxbGl0ZShcInRlc3QuZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgZGIucmVzdWx0VHlwZShTcWxpdGUuUkVTVUxUU0FTT0JKRUNUKTtcbiAgICAgICAgICAgIGRiLmV4ZWNTUUwoXCJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBtYXJrZXQocmFuayBJTlRFR0VSLCBuYW1lIFRFWFQpXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiREVMRVRFIEZST00gbWFya2V0XCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmludERhdGEoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNSRUFURSBUQUJMRSBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIGRhdGFiYXNlIGVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXHRkZXNpcmVkS2V5cyA9IHtcblx0XHRcInJhbmtcIjogXCJyYW5rXCIsXG5cdFx0XCJuYW1lXCI6IFwibmFtZVwiLFxuICAgICAgICBcInN5bWJvbFwiOiBcInN5bWJvbFwiLFxuXHRcdFwicHJpY2VcIjogXCJxdW90ZXMuVVNELnByaWNlXCIsXG4gICAgICAgIFwibWFya2V0Y2FwXCI6IFwicXVvdGVzLlVTRC5tYXJrZXRfY2FwXCIsXG4gICAgICAgIFwidm9sdW1lXCI6IFwicXVvdGVzLlVTRC52b2x1bWVfMjRoXCIsXG4gICAgICAgIFwiMjRoXCI6IFwicXVvdGVzLlVTRC5wZXJjZW50X2NoYW5nZV8yNGhcIixcbiAgICAgICAgXCI3ZFwiOiBcInF1b3Rlcy5VU0QucGVyY2VudF9jaGFuZ2VfN2RcIixcbiAgICAgICAgXCIxaFwiOiBcInF1b3Rlcy5VU0QucGVyY2VudF9jaGFuZ2VfMWhcIlxuXHR9XG5cdGhlYWRlcnMgPSBbXTtcbiAgICBwcml2YXRlIHVybCA9IFwiaHR0cHM6Ly9hcGkuY29pbm1hcmtldGNhcC5jb20vdjIvdGlja2VyLz9zdHJ1Y3R1cmU9YXJyYXlcIjtcbiAgICBkYXRhID0gW107XG4gICAgcHJpdmF0ZSBkYXRhQ29weSA9IFtdO1xuICAgIC8vIEdpdmVuIGEgdXJsIGFuZCBhbiBhcnJheSwgZ2V0cyB0aGUgZGF0YSBmcm9tIHRoZSBhcnJheSBhbmQgcGFyc2VzIGl0IGludG8gdGhlIGFycmF5XG4gICAgLy8gQWRkaXRpb25hbGx5IGl0IHRha2VzIGFuIG9wdGlvbmFsIHN0YXJ0IG51bWJlciwgbGltaXQsIGFuZCBkaWZmZXJlbnQgY3VycmVuY3lcbiAgICBhc3luYyBnZXREYXRhKHVybCwgc3RvcmFnZSwgc3RhcnQ/Om51bWJlciwgbGltaXQ/Om51bWJlciwgY29udmVydD86c3RyaW5nKSB7XG4gICAgICAgIGlmKHN0YXJ0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImc3RhcnQ9XCIgKyBzdGFydDtcbiAgICAgICAgfVxuICAgICAgICBpZihsaW1pdCkge1xuICAgICAgICAgICAgdXJsICs9IFwiJmxpbWl0PVwiICsgbGltaXQ7ICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYoY29udmVydCkge1xuICAgICAgICAgICAgdXJsICs9IFwiJmNvbnZlcnQ9XCIgKyBjb252ZXJ0O1xuICAgICAgICAgICAgLy8gU3dpdGNoIGZyb20gZGVmYXVsdCBjdXJyZW5jeSBpbiBkZXNpcmVkS2V5c1xuICAgICAgICAgICAgbGV0IHJlID0gL1VTRC9naTtcbiAgICAgICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMuZGVzaXJlZEtleXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2lyZWRLZXlzW2tleV0gPSB0aGlzLmRlc2lyZWRLZXlzW2tleV0ucmVwbGFjZShyZSwgY29udmVydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codXJsKTtcbiAgICAgICAgLy8gR2V0cyBqc29uIGZyb20gdGhlIHVybFxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgIHRoaXMuc2lnbmFsID0gdGhpcy5jb250cm9sbGVyLnNpZ25hbDtcbiAgICAgICAgbGV0IGEgPSBhd2FpdCBmZXRjaCh1cmwsIHttZXRob2Q6IFwiR0VUXCIsIHNpZ25hbDogdGhpcy5zaWduYWx9KTtcbiAgICAgICAgbGV0IGpzb24gPSBhd2FpdCBhLmpzb24oKTtcbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGVyZSB3YXMgYW4gZXJyb3IgaW4gdGhlIHJlcXVlc3RcbiAgICAgICAgaWYoanNvbi5tZXRhZGF0YS5lcnJvciAhPSBudWxsKSB7IFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXF1ZXN0aW5nIGRhdGFcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uLm1ldGFkYXRhLmVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYXJzZXMgdGhlIGRhdGEgYW5kIHN0b3JlcyBpdFxuICAgICAgICBsZXQgZGF0YSA9IGpzb24uZGF0YTtcbiAgICAgICAgZm9yIChsZXQgaW5mbyBvZiBkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh0aGlzLnBhcnNlRGF0YShpbmZvKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBwYXJzZURhdGEoZGF0YTogYW55KSB7XG4gICAgICAgIGxldCBuZXdEYXRhID0ge307XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmRlc2lyZWRLZXlzKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBqc29ubGliLm5lc3RlZEpzb25GaW5kZXIoZGF0YSwgdGhpcy5kZXNpcmVkS2V5c1trZXldKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZU51bWJlciA9IE51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAvLyBJZiBpdCBpcyBhIG51bWJlciBhZGQgYSAkIGF0IHRoZSBiZWdpbm5pbmcgYW5kIGFkZCBjb21tYXNcbiAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZU51bWJlcikpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIHZhbHVlIG51bWJlciBpcyBhIGZsb2F0LCByZWR1Y2UgaXQgdG8gMiBkZWNpbWFsIHBsYWNlc1xuICAgICAgICAgICAgICAgIC8vIEN1c3RvbSBydWxlcyBoZXJlXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBcInZvbHVtZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IHNob3cgZGVjaW1hbCBwbGFjZXMgb2Ygdm9sdW1lIGFuZCBhZGQgY29tbWFzXG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHRoaXMuYWRkQ29tbWFzKHZhbHVlTnVtYmVyLnRvRml4ZWQoMCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkgPT0gXCJtYXJrZXRjYXBcIikge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSB0aGlzLmFkZENvbW1hcyh2YWx1ZU51bWJlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlTnVtYmVyICUgMSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHZhbHVlTnVtYmVyLnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSB2YWx1ZU51bWJlci50b0ZpeGVkKDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2Ugc3RvcmUgaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG5cbiAgICBhc3luYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXREYXRhKHRoaXMudXJsLCB0aGlzLmRhdGEsIDEsIDEwMCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0RGF0YSh0aGlzLnVybCwgdGhpcy5kYXRhLCAxMDEsIDEwMCk7XG4gICAgICAgIHRoaXMuZGF0YUNvcHkgPSB0aGlzLmRhdGEuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGpzb25saWIuZ2V0S2V5cyh0aGlzLmRlc2lyZWRLZXlzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCFcIik7XG4gICAgfVxuICAgIC8vIEdpdmVuIHR3byBqc29uIG9iamVjdHMsIHJldHVybnMgYSBjb21wYXJpc29uIG9mIHRoZWlyIHJhbmsgdmFsdWVcbiAgICByYW5rQ29tcGFyZShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLnJhbmsgLSBiLnJhbms7XG4gICAgfVxuICAgIG9uVGFwKGFyZ3MpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJUYXAhXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhhcmdzKTtcbiAgICAgICAgbGV0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgIGNvbnRleHQ6IGFyZ3NcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKENvaW5JbmZvLCBvcHRpb25zKTtcbiAgICB9XG4gICAgY2xlYXJGb2N1cyhzZWFyY2gpIHtcbiAgICAgICAgaWYoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICBzZWFyY2guYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkQ29tbWFzKHgpIHtcbiAgICAgICAgcmV0dXJuIHgudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XG4gICAgfVxuICAgIC8vIFdpdGggYWxsIG9mIHRoZSByZXN1bHRzIGluIHRoaXMuZGF0YSBmcm9tIHRoZSBzdGFydCwgbm8gbmVlZCBmb3IgcmVxdWVzdHNcbiAgICBiYXNlVVJMID0gXCJodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvXCI7XG4gICAgZmlsdGVyUmVzdWx0cyhzdWJzdHJpbmc6IHN0cmluZykge1xuICAgICAgICBpZihzdWJzdHJpbmcgPT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5yZXZlcnREYXRhKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3Vic3RyaW5nID0gc3Vic3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIGZvcjogXCIgKyBzdWJzdHJpbmcpO1xuICAgICAgICBsZXQgZmlsdGVyZWREYXRhID0gW107XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBkYXRhIGFuZCBwdXNoIHRvIG5ldyBhcnJheSB0aGF0IGhhdmUgdGhlIHN1YnN0cmluZ1xuICAgICAgICBmb3IodmFyIG9iaiBvZiB0aGlzLmRhdGFDb3B5KSB7XG4gICAgICAgICAgICBpZihvYmoubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc3Vic3RyaW5nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkRGF0YS5wdXNoKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhID0gZmlsdGVyZWREYXRhLnNsaWNlKDApO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGEgaGFzIFwiICsgdGhpcy5kYXRhLmxlbmd0aCArIFwiIGVsZW1lbnRzXCIpO1xuICAgIH1cbiAgICBjbGVhclNlYXJjaChzZWFyY2g6IFNlYXJjaEJhcikge1xuICAgICAgICB0aGlzLnJldmVydERhdGEoKTtcbiAgICB9XG4gICAgcmV2ZXJ0RGF0YSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXZlcnRpbmcgZGF0YVwiKTtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhQ29weS5zbGljZSgwKTtcbiAgICB9XG4gICAgbnVtID0gMTtcbiAgICBsZXR0ZXJzID0gXCIxMjM0NTY3ODkwUVdFUlRZVUlPUEFTREZHSEpLTFpDVkJOTVwiO1xuICAgIGluc2VydERhdGEoKSB7XG4gICAgICAgIGxldCB3b3JkID0gXCJcIjtcbiAgICAgICAgbGV0IG1heCA9IHRoaXMubGV0dGVycy5sZW5ndGg7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IDEwO2krKykge1xuICAgICAgICAgICAgd29yZCArPSB0aGlzLmxldHRlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIklOU0VSVCBJTlRPIG1hcmtldCAocmFuaywgbmFtZSkgdmFsdWVzICg/LCA/KVwiLCBbdGhpcy5udW0sIHdvcmRdKS50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvbmUgaW5zZXJ0aW5nIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaW50RGF0YSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubnVtKys7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBJTlNFUlRJTkdcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpbnREYXRhKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIEZST00gbWFya2V0XCIpLnRoZW4oXG4gICAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyBkYXRhXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=