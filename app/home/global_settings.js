"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desiredKeys = {
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
var GlobalSettings = /** @class */ (function () {
    function GlobalSettings() {
    }
    GlobalSettings.setCurrency = function (currency) {
        this.currency = currency;
    };
    GlobalSettings.getCurrency = function () {
        return this.currency;
    };
    GlobalSettings.currency = "USD";
    return GlobalSettings;
}());
exports.GlobalSettings = GlobalSettings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsX3NldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsX3NldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxXQUFXLEdBQUc7SUFDdkIsTUFBTSxFQUFFLE1BQU07SUFDZCxNQUFNLEVBQUUsTUFBTTtJQUNkLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE9BQU8sRUFBRSxrQkFBa0I7SUFDM0IsV0FBVyxFQUFFLHVCQUF1QjtJQUNwQyxRQUFRLEVBQUUsdUJBQXVCO0lBQ2pDLEtBQUssRUFBRSwrQkFBK0I7SUFDdEMsSUFBSSxFQUFFLDhCQUE4QjtJQUNwQyxJQUFJLEVBQUUsOEJBQThCO0NBQ3ZDLENBQUE7QUFDRDtJQUFBO0lBUUEsQ0FBQztJQU5VLDBCQUFXLEdBQWxCLFVBQW1CLFFBQWdCO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFDTSwwQkFBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFOYyx1QkFBUSxHQUFHLEtBQUssQ0FBQztJQU9wQyxxQkFBQztDQUFBLEFBUkQsSUFRQztBQVJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGRlc2lyZWRLZXlzID0ge1xyXG4gICAgXCJyYW5rXCI6IFwicmFua1wiLFxyXG4gICAgXCJuYW1lXCI6IFwibmFtZVwiLFxyXG4gICAgXCJzeW1ib2xcIjogXCJzeW1ib2xcIixcclxuICAgIFwicHJpY2VcIjogXCJxdW90ZXMuVVNELnByaWNlXCIsXHJcbiAgICBcIm1hcmtldGNhcFwiOiBcInF1b3Rlcy5VU0QubWFya2V0X2NhcFwiLFxyXG4gICAgXCJ2b2x1bWVcIjogXCJxdW90ZXMuVVNELnZvbHVtZV8yNGhcIixcclxuICAgIFwiMjRoXCI6IFwicXVvdGVzLlVTRC5wZXJjZW50X2NoYW5nZV8yNGhcIixcclxuICAgIFwiN2RcIjogXCJxdW90ZXMuVVNELnBlcmNlbnRfY2hhbmdlXzdkXCIsXHJcbiAgICBcIjFoXCI6IFwicXVvdGVzLlVTRC5wZXJjZW50X2NoYW5nZV8xaFwiXHJcbn1cclxuZXhwb3J0IGNsYXNzIEdsb2JhbFNldHRpbmdzIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGN1cnJlbmN5ID0gXCJVU0RcIjtcclxuICAgIHN0YXRpYyBzZXRDdXJyZW5jeShjdXJyZW5jeTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeSA9IGN1cnJlbmN5O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldEN1cnJlbmN5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbmN5O1xyXG4gICAgfVxyXG59Il19