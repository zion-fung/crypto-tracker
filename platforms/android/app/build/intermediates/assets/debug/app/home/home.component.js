"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var jsonlib_1 = require("./jsonlib");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.desiredKeys = {
            "Rank": "rank",
            "Name": "name",
            "Symbol": "symbol",
            "Price": "quotes.USD.price",
            "Marketcap": "quotes.USD.market_cap",
            "%_change_24h": "quotes.USD.percent_change_24h"
        };
        this.headers = [];
        this.url = "https://api.coinmarketcap.com/v2/ticker/?structure=array";
        this.data = [];
    }
    // Given a url and an array, gets the data from the array and parses it into the array
    // Additionally it takes an optional start number, limit, and different currency
    HomeComponent.prototype.getData = function (url, storage, start, limit, convert) {
        return __awaiter(this, void 0, void 0, function () {
            var re, key, a, json, data, _i, data_1, info, newData, key, value, valueNumber;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, fetch(url)];
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
                            newData = {};
                            for (key in this.desiredKeys) {
                                value = jsonlib_1.jsonlib.nestedJsonFinder(info, this.desiredKeys[key]);
                                valueNumber = Number(value);
                                // If it is a number add a $ at the beginning and add commas
                                if (isNaN(valueNumber)) {
                                    newData[key] = value;
                                }
                                else {
                                    newData[key] = valueNumber.toLocaleString();
                                }
                            }
                            storage.push(newData);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData(this.url, this.data, 1, 30)];
                    case 1:
                        _a.sent();
                        this.headers = jsonlib_1.jsonlib.getKeys(this.desiredKeys);
                        return [2 /*return*/];
                }
            });
        });
    };
    // Given two json objects, returns a comparison of their rank value
    HomeComponent.prototype.rankCompare = function (a, b) {
        return a.rank - b.rank;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html"
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxxQ0FBbUM7QUFPbkM7SUFMQTtRQU1DLGdCQUFXLEdBQUc7WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxNQUFNO1lBQ1IsUUFBUSxFQUFFLFFBQVE7WUFDeEIsT0FBTyxFQUFFLGtCQUFrQjtZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQzFDLGNBQWMsRUFBRSwrQkFBK0I7U0FDL0MsQ0FBQTtRQUNELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDVixRQUFHLEdBQUcsMERBQTBELENBQUM7UUFDakUsU0FBSSxHQUFHLEVBQUUsQ0FBQztJQXNEZCxDQUFDO0lBckRHLHNGQUFzRjtJQUN0RixnRkFBZ0Y7SUFDMUUsK0JBQU8sR0FBYixVQUFjLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBYSxFQUFFLEtBQWEsRUFBRSxPQUFlOzs7Ozs7d0JBQ3JFLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ1AsR0FBRyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQzdCLENBQUM7d0JBQ0QsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDUCxHQUFHLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQzt3QkFDN0IsQ0FBQzt3QkFDRCxFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzRCQUNULEdBQUcsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDOzRCQUV6QixFQUFFLEdBQUcsT0FBTyxDQUFDOzRCQUNqQixHQUFHLENBQUEsQ0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0NBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzRCQUN2RSxDQUFDO3dCQUNMLENBQUM7d0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFFVCxxQkFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUE7O3dCQUFwQixDQUFDLEdBQUcsU0FBZ0I7d0JBQ2IscUJBQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBckIsSUFBSSxHQUFHLFNBQWM7d0JBQ3pCLHFEQUFxRDt3QkFDckQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzRCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2pDLE1BQU0sZ0JBQUM7d0JBQ1gsQ0FBQzt3QkFFRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDckIsR0FBRyxDQUFBLE9BQWlCLEVBQUosYUFBSSxFQUFKLGtCQUFJLEVBQUosSUFBSTs0QkFBWixJQUFJOzRCQUNKLE9BQU8sR0FBRyxFQUFFLENBQUM7NEJBQ2pCLEdBQUcsQ0FBQSxDQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQ0FDMUIsS0FBSyxHQUFHLGlCQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDOUQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDaEMsNERBQTREO2dDQUM1RCxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dDQUN6QixDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7Z0NBQ2hELENBQUM7NEJBQ0wsQ0FBQzs0QkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUN6Qjs7Ozs7S0FDSjtJQUNLLGdDQUFRLEdBQWQ7Ozs7NEJBQ0MscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFBOzt3QkFBOUMsU0FBOEMsQ0FBQzt3QkFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7O0tBQ3BEO0lBQ0QsbUVBQW1FO0lBQ25FLG1DQUFXLEdBQVgsVUFBWSxDQUFDLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQS9EUSxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtTQUN2QyxDQUFDO09BQ1csYUFBYSxDQWlFekI7SUFBRCxvQkFBQztDQUFBLEFBakVELElBaUVDO0FBakVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsganNvbmxpYiB9IGZyb20gXCIuL2pzb25saWJcIlxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJIb21lXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0ZGVzaXJlZEtleXMgPSB7XG5cdFx0XCJSYW5rXCI6IFwicmFua1wiLFxuXHRcdFwiTmFtZVwiOiBcIm5hbWVcIixcbiAgICAgICAgXCJTeW1ib2xcIjogXCJzeW1ib2xcIixcblx0XHRcIlByaWNlXCI6IFwicXVvdGVzLlVTRC5wcmljZVwiLFxuICAgICAgICBcIk1hcmtldGNhcFwiOiBcInF1b3Rlcy5VU0QubWFya2V0X2NhcFwiLFxuXHRcdFwiJV9jaGFuZ2VfMjRoXCI6IFwicXVvdGVzLlVTRC5wZXJjZW50X2NoYW5nZV8yNGhcIlxuXHR9XG5cdGhlYWRlcnMgPSBbXTtcbiAgICB1cmwgPSBcImh0dHBzOi8vYXBpLmNvaW5tYXJrZXRjYXAuY29tL3YyL3RpY2tlci8/c3RydWN0dXJlPWFycmF5XCI7XG4gICAgZGF0YSA9IFtdO1xuICAgIC8vIEdpdmVuIGEgdXJsIGFuZCBhbiBhcnJheSwgZ2V0cyB0aGUgZGF0YSBmcm9tIHRoZSBhcnJheSBhbmQgcGFyc2VzIGl0IGludG8gdGhlIGFycmF5XG4gICAgLy8gQWRkaXRpb25hbGx5IGl0IHRha2VzIGFuIG9wdGlvbmFsIHN0YXJ0IG51bWJlciwgbGltaXQsIGFuZCBkaWZmZXJlbnQgY3VycmVuY3lcbiAgICBhc3luYyBnZXREYXRhKHVybCwgc3RvcmFnZSwgc3RhcnQ/Om51bWJlciwgbGltaXQ/Om51bWJlciwgY29udmVydD86c3RyaW5nKSB7XG4gICAgICAgIGlmKHN0YXJ0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImc3RhcnQ9XCIgKyBzdGFydDtcbiAgICAgICAgfVxuICAgICAgICBpZihsaW1pdCkge1xuICAgICAgICAgICAgdXJsICs9IFwiJmxpbWl0PVwiICsgbGltaXQ7ICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYoY29udmVydCkge1xuICAgICAgICAgICAgdXJsICs9IFwiJmNvbnZlcnQ9XCIgKyBjb252ZXJ0O1xuICAgICAgICAgICAgLy8gU3dpdGNoIGZyb20gZGVmYXVsdCBjdXJyZW5jeSBpbiBkZXNpcmVkS2V5c1xuICAgICAgICAgICAgbGV0IHJlID0gL1VTRC9naTtcbiAgICAgICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMuZGVzaXJlZEtleXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2lyZWRLZXlzW2tleV0gPSB0aGlzLmRlc2lyZWRLZXlzW2tleV0ucmVwbGFjZShyZSwgY29udmVydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codXJsKTtcbiAgICAgICAgLy8gR2V0cyBqc29uIGZyb20gdGhlIHVybFxuICAgICAgICBsZXQgYSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgIGxldCBqc29uID0gYXdhaXQgYS5qc29uKCk7XG4gICAgICAgIC8vIENoZWNrcyB0byBzZWUgaWYgdGhlcmUgd2FzIGFuIGVycm9yIGluIHRoZSByZXF1ZXN0XG4gICAgICAgIGlmKGpzb24ubWV0YWRhdGEuZXJyb3IgIT0gbnVsbCkgeyBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVxdWVzdGluZyBkYXRhXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coanNvbi5tZXRhZGF0YS5lcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gUGFyc2VzIHRoZSBkYXRhIGFuZCBzdG9yZXMgaXRcbiAgICAgICAgbGV0IGRhdGEgPSBqc29uLmRhdGE7XG4gICAgICAgIGZvcihsZXQgaW5mbyBvZiBkYXRhKSB7XG4gICAgICAgICAgICBsZXQgbmV3RGF0YSA9IHt9O1xuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5kZXNpcmVkS2V5cykge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGpzb25saWIubmVzdGVkSnNvbkZpbmRlcihpbmZvLCB0aGlzLmRlc2lyZWRLZXlzW2tleV0pO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZU51bWJlciA9IE51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgaXQgaXMgYSBudW1iZXIgYWRkIGEgJCBhdCB0aGUgYmVnaW5uaW5nIGFuZCBhZGQgY29tbWFzXG4gICAgICAgICAgICAgICAgaWYoaXNOYU4odmFsdWVOdW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IHZhbHVlTnVtYmVyLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RvcmFnZS5wdXNoKG5ld0RhdGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIG5nT25Jbml0KCkge1xuICAgIFx0YXdhaXQgdGhpcy5nZXREYXRhKHRoaXMudXJsLCB0aGlzLmRhdGEsIDEsIDMwKTtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0ganNvbmxpYi5nZXRLZXlzKHRoaXMuZGVzaXJlZEtleXMpO1xuICAgIH1cbiAgICAvLyBHaXZlbiB0d28ganNvbiBvYmplY3RzLCByZXR1cm5zIGEgY29tcGFyaXNvbiBvZiB0aGVpciByYW5rIHZhbHVlXG4gICAgcmFua0NvbXBhcmUoYSwgYikge1xuICAgICAgICByZXR1cm4gYS5yYW5rIC0gYi5yYW5rO1xuICAgIH1cblxufVxuIl19