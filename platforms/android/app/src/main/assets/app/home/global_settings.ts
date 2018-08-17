export const desiredKeys = {
    "rank": "rank",
    "name": "name",
    "symbol": "symbol",
    "price": "quotes.USD.price",
    "marketcap": "quotes.USD.market_cap",
    "volume": "quotes.USD.volume_24h",
    "24h": "quotes.USD.percent_change_24h",
    "7d": "quotes.USD.percent_change_7d",
    "1h": "quotes.USD.percent_change_1h"
}
export class GlobalSettings {
    private static currency = "USD";
    static setCurrency(currency: string) {
        this.currency = currency;
    }
    static getCurrency() {
        return this.currency;
    }
}