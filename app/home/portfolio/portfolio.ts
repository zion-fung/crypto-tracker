import { TimeLib } from "./timeLib";

export class Portfolio {
    private entries:portfolioEntry[] = [];
    constructor() {}
    getEntry(id: string) {
        for(var entry of this.entries) {
            if(id == entry.id) {
                return entry;
            }
        }
        return undefined;
    }
    getEntries() {
        return this.entries;
    }
    addEntry(id, name, price, amountOwned, purchasedPrice, date, percentChange):void {
        this.entries.push(new portfolioEntry(id, name, price, amountOwned, purchasedPrice, date, percentChange));
    }
    getTotalWorth():number {
        let sum = 0;
        for(var entry of this.entries) {
            sum += (entry.price * entry.amountOwned);
        }
        return sum;
    }
    getTotalCost(): number {
        let sum = 0;
        for(var entry of this.entries) {
            sum += (entry.purchasedPrice * entry.amountOwned);
        }
        return sum;
    }
    getTotalProfit(): number {
    	return this.getTotalWorth() - this.getTotalCost();
    }
    getTotalProfitPercent():number {
    	return this.getTotalProfit() / this.getTotalCost() * 100;
    }
    getEntryDateHuman(id: string) {
    	return TimeLib.epochToHuman(this.getEntry(id).datePurchased);
    }
    getEntryDateEpoch(id: string) {
    	return this.getEntry(id).datePurchased;
    }
    getTimeSincePurchase(id: string, currentDate) {
    	let purchaseDate = this.getEntry(id).datePurchased;
    	// Check if currentdate is string or number. Number means epoch format, string means human format
    	if(isNaN(currentDate)) {
    		// Is a string, convert to epoch
    		currentDate = TimeLib.humanToEpoch(currentDate);
    	}
        // Calculate difference
        // currentDate is in seconds
    	return this.timeConversion(currentDate - purchaseDate);
    }
    getTotalPercentChange():Object {
        let totalPercentChange = {
            "24h": this.getTotalWorth24h() / this.getTotalWorth(),
            "7d": this.getTotalWorth7d() / this.getTotalWorth(),
            "1h": this.getTotalWoth1h() / this.getTotalWorth()
        };
        return totalPercentChange;
        // Calculate what the total worth was 24h ago, 7d ago, 1h ago

    }
    private getTotalWorth24h():number {
        let totalWorth = 0;
        // Gets what the total worth was 24h ago
        for(var entry of this.entries) {
            let change24h = Number(entry.percentChange["24h"]);
            let price24h = entry.price * change24h / 100;
            totalWorth += price24h;
        }
        return totalWorth;
    }
    private getTotalWorth7d():number {
        let totalWorth = 0;
        // Gets what the total worth was 7d ago
        for(var entry of this.entries) {
            let change24h = Number(entry.percentChange["7d"]);
            let price24h = entry.price * change24h / 100;
            totalWorth += price24h;
        }
        return totalWorth;
    }
    private getTotalWoth1h():number {
        let totalWorth = 0;
        // Gets what the total worth was 1h ago
        for(var entry of this.entries) {
            let change24h = Number(entry.percentChange["1h"]);
            let price24h = entry.price * change24h / 100;
            totalWorth += price24h;
        }
        return totalWorth;
    }
    private timeConversion(seconds:number) {
        let days = Math.floor(seconds / 86400);
        seconds -= (86400 * days);
        let hours = Math.floor(seconds / 3600);
        seconds -= (3600 * hours);
        return days + " days, " + hours + " hours, " + seconds + " seconds";
    }
}
// Stores date in epoch format
class portfolioEntry {
    id: string;
    name: string;
    price: number;
    amountOwned: number;
    purchasedPrice: number;
    datePurchased: number;
    percentChange: Object;
    constructor(id, name, price, amountOwned, purchasedPrice, datePurchased, percentChange) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amountOwned = amountOwned;
        this.purchasedPrice = purchasedPrice;
        this.datePurchased = datePurchased;
        this.percentChange = percentChange;
    }
}
