export class Portfolio {
    private entries:object = {};
    addEntry(id, name, price, amountOwned, purchasedPrice):void {
        this.entries[id] = new portfolioEntry(id, name, price, amountOwned, purchasedPrice);
    }
    getEntries() {
        return this.entries;
    }
    getTotalWorth():number {
        let sum = 0;
        for(var key in this.entries) {
            sum += (this.entries[key].price * this.entries[key].amountOwned);
        }
        return sum;
    }
    getTotalCost(): number {
        let sum = 0;
        for(var key in this.entries) {
            sum += (this.entries[key].purchasedPrice * this.entries[key].amountOwned);
        }
        return sum;
    }
    constructor() {}
}
class portfolioEntry {
    id: string;
    name: string;
    price: number;
    amountOwned: number;
    purchasedPrice: number;
    constructor(id, name, price, amountOwned, purchasedPrice) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amountOwned = amountOwned;
        this.purchasedPrice = purchasedPrice;
    }
}