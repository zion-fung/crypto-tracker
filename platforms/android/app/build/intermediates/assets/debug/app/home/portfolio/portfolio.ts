import { TimeLib } from "./timeLib";

export class Portfolio {
    private entries = [];
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
    addEntry(id, name, price, amountOwned, purchasedPrice, date):void {
        this.entries.push(new portfolioEntry(id, name, price, amountOwned, purchasedPrice, date));
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
    	return TimeLib.epochToHuman(this.getEntry(id).date);
    }
    getEntryDateEpoch(id: string) {
    	return this.getEntry(id).date;
    }
    getTimeSincePurchase(id: string, currentDate) {
    	let purchaseDate = this.getEntry(id).date;
    	// Check if currentdate is string or number. Number means epoch format, string means human format
    	if(isNaN(currentDate)) {
    		// Is a string, convert to epoch
    		currentDate = TimeLib.humanToEpoch(currentDate);
    	}
        // Calculate difference
        // currentDate is in seconds
    	return this.timeConversion(currentDate - purchaseDate);
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
    constructor(id, name, price, amountOwned, purchasedPrice, datePurchased) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amountOwned = amountOwned;
        this.purchasedPrice = purchasedPrice;
        this.datePurchased = datePurchased;
    }
}
