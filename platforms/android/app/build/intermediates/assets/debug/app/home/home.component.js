"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var jsonlib_1 = require("./jsonlib");
var page_1 = require("ui/page");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(page) {
        this.page = page;
        this.desiredKeys = {
            "Rank": "rank",
            "Name": "name",
            "Symbol": "symbol",
            "Price": "quotes.USD.price",
            "Marketcap": "quotes.USD.market_cap",
            "%_change_24h": "quotes.USD.percent_change_24h",
            "%_change_7d": "quotes.USD.percent_change_7d"
        };
        this.headers = [];
        this.url = "https://api.coinmarketcap.com/v2/ticker/?structure=array";
        this.data = [];
        page.actionBarHidden = true;
    }
    // Given a url and an array, gets the data from the array and parses it into the array
    // Additionally it takes an optional start number, limit, and different currency
    HomeComponent.prototype.getData = function (url, storage, start, limit, convert) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var re, key, a, json, data, _i, data_1, info, newData, key, value, valueNumber;
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
                                    // If value number is a float, reduce it to 2 decimal places
                                    if (valueNumber % 1 != 0) {
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
                        return [2 /*return*/];
                }
            });
        });
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
    };
    HomeComponent.prototype.clearFocus = function (search) {
        if (page_1.isAndroid) {
            search.android.clearFocus();
        }
    };
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html"
        }),
        tslib_1.__metadata("design:paramtypes", [page_1.Page])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBa0Q7QUFDbEQscUNBQW1DO0FBQ25DLGdDQUEwQztBQVExQztJQUNJLHVCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUdqQyxnQkFBVyxHQUFHO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsTUFBTTtZQUNSLFFBQVEsRUFBRSxRQUFRO1lBQ3hCLE9BQU8sRUFBRSxrQkFBa0I7WUFDckIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxjQUFjLEVBQUUsK0JBQStCO1lBQy9DLGFBQWEsRUFBRSw4QkFBOEI7U0FDbkQsQ0FBQTtRQUNELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDVixRQUFHLEdBQUcsMERBQTBELENBQUM7UUFDakUsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQWJOLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFhRCxzRkFBc0Y7SUFDdEYsZ0ZBQWdGO0lBQzFFLCtCQUFPLEdBQWIsVUFBYyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQWEsRUFBRSxLQUFhLEVBQUUsT0FBZTs7Ozs7O3dCQUNyRSxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNQLEdBQUcsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO3dCQUM3QixDQUFDO3dCQUNELEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ1AsR0FBRyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQzdCLENBQUM7d0JBQ0QsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs0QkFDVCxHQUFHLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQzs0QkFFekIsRUFBRSxHQUFHLE9BQU8sQ0FBQzs0QkFDakIsR0FBRyxDQUFB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QUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ0Qsa0NBQVUsR0FBVixVQUFXLE1BQU07UUFDYixFQUFFLENBQUEsQ0FBQyxnQkFBUyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUFuRlEsYUFBYTtRQUx6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7U0FDdkMsQ0FBQztpREFFNEIsV0FBSTtPQURyQixhQUFhLENBb0Z6QjtJQUFELG9CQUFDO0NBQUEsQUFwRkQsSUFvRkM7QUFwRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBqc29ubGliIH0gZnJvbSBcIi4vanNvbmxpYlwiXG5pbXBvcnQgeyBQYWdlLCBpc0FuZHJvaWQgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiSG9tZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB9XG5cdGRlc2lyZWRLZXlzID0ge1xuXHRcdFwiUmFua1wiOiBcInJhbmtcIixcblx0XHRcIk5hbWVcIjogXCJuYW1lXCIsXG4gICAgICAgIFwiU3ltYm9sXCI6IFwic3ltYm9sXCIsXG5cdFx0XCJQcmljZVwiOiBcInF1b3Rlcy5VU0QucHJpY2VcIixcbiAgICAgICAgXCJNYXJrZXRjYXBcIjogXCJxdW90ZXMuVVNELm1hcmtldF9jYXBcIixcbiAgICAgICAgXCIlX2NoYW5nZV8yNGhcIjogXCJxdW90ZXMuVVNELnBlcmNlbnRfY2hhbmdlXzI0aFwiLFxuICAgICAgICBcIiVfY2hhbmdlXzdkXCI6IFwicXVvdGVzLlVTRC5wZXJjZW50X2NoYW5nZV83ZFwiXG5cdH1cblx0aGVhZGVycyA9IFtdO1xuICAgIHVybCA9IFwiaHR0cHM6Ly9hcGkuY29pbm1hcmtldGNhcC5jb20vdjIvdGlja2VyLz9zdHJ1Y3R1cmU9YXJyYXlcIjtcbiAgICBkYXRhID0gW107XG4gICAgLy8gR2l2ZW4gYSB1cmwgYW5kIGFuIGFycmF5LCBnZXRzIHRoZSBkYXRhIGZyb20gdGhlIGFycmF5IGFuZCBwYXJzZXMgaXQgaW50byB0aGUgYXJyYXlcbiAgICAvLyBBZGRpdGlvbmFsbHkgaXQgdGFrZXMgYW4gb3B0aW9uYWwgc3RhcnQgbnVtYmVyLCBsaW1pdCwgYW5kIGRpZmZlcmVudCBjdXJyZW5jeVxuICAgIGFzeW5jIGdldERhdGEodXJsLCBzdG9yYWdlLCBzdGFydD86bnVtYmVyLCBsaW1pdD86bnVtYmVyLCBjb252ZXJ0PzpzdHJpbmcpIHtcbiAgICAgICAgaWYoc3RhcnQpIHtcbiAgICAgICAgICAgIHVybCArPSBcIiZzdGFydD1cIiArIHN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGlmKGxpbWl0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImbGltaXQ9XCIgKyBsaW1pdDsgICBcbiAgICAgICAgfVxuICAgICAgICBpZihjb252ZXJ0KSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImY29udmVydD1cIiArIGNvbnZlcnQ7XG4gICAgICAgICAgICAvLyBTd2l0Y2ggZnJvbSBkZWZhdWx0IGN1cnJlbmN5IGluIGRlc2lyZWRLZXlzXG4gICAgICAgICAgICBsZXQgcmUgPSAvVVNEL2dpO1xuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5kZXNpcmVkS2V5cykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzaXJlZEtleXNba2V5XSA9IHRoaXMuZGVzaXJlZEtleXNba2V5XS5yZXBsYWNlKHJlLCBjb252ZXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgICAgICAvLyBHZXRzIGpzb24gZnJvbSB0aGUgdXJsXG4gICAgICAgIGxldCBhID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgICAgbGV0IGpzb24gPSBhd2FpdCBhLmpzb24oKTtcbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGVyZSB3YXMgYW4gZXJyb3IgaW4gdGhlIHJlcXVlc3RcbiAgICAgICAgaWYoanNvbi5tZXRhZGF0YS5lcnJvciAhPSBudWxsKSB7IFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXF1ZXN0aW5nIGRhdGFcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uLm1ldGFkYXRhLmVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYXJzZXMgdGhlIGRhdGEgYW5kIHN0b3JlcyBpdFxuICAgICAgICBsZXQgZGF0YSA9IGpzb24uZGF0YTtcbiAgICAgICAgZm9yKGxldCBpbmZvIG9mIGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBuZXdEYXRhID0ge307XG4gICAgICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmRlc2lyZWRLZXlzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ganNvbmxpYi5uZXN0ZWRKc29uRmluZGVyKGluZm8sIHRoaXMuZGVzaXJlZEtleXNba2V5XSk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlTnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBJZiBpdCBpcyBhIG51bWJlciBhZGQgYSAkIGF0IHRoZSBiZWdpbm5pbmcgYW5kIGFkZCBjb21tYXNcbiAgICAgICAgICAgICAgICBpZihpc05hTih2YWx1ZU51bWJlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdmFsdWUgbnVtYmVyIGlzIGEgZmxvYXQsIHJlZHVjZSBpdCB0byAyIGRlY2ltYWwgcGxhY2VzXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlTnVtYmVyICUgMSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSB2YWx1ZU51bWJlci50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gdmFsdWVOdW1iZXIudG9GaXhlZCgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2Ugc3RvcmUgaXRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdG9yYWdlLnB1c2gobmV3RGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLnVybCwgdGhpcy5kYXRhLCAxLCAzMCk7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGpzb25saWIuZ2V0S2V5cyh0aGlzLmRlc2lyZWRLZXlzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCFcIik7XG4gICAgfVxuICAgIC8vIEdpdmVuIHR3byBqc29uIG9iamVjdHMsIHJldHVybnMgYSBjb21wYXJpc29uIG9mIHRoZWlyIHJhbmsgdmFsdWVcbiAgICByYW5rQ29tcGFyZShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLnJhbmsgLSBiLnJhbms7XG4gICAgfVxuICAgIG9uVGFwKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJUYXAhXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhhcmdzKTtcbiAgICB9XG4gICAgY2xlYXJGb2N1cyhzZWFyY2gpIHtcbiAgICAgICAgaWYoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICBzZWFyY2guYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=