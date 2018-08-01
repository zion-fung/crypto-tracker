"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Portfolio = /** @class */ (function () {
    function Portfolio() {
        this.entries = {};
    }
    Portfolio.prototype.addEntry = function (id, name, price, amountOwned, purchasedPrice) {
        this.entries[id] = new portfolioEntry(id, name, price, amountOwned, purchasedPrice);
    };
    Portfolio.prototype.getEntries = function () {
        return this.entries;
    };
    Portfolio.prototype.getTotalWorth = function () {
        var sum = 0;
        for (var key in this.entries) {
            sum += (this.entries[key].price * this.entries[key].amountOwned);
        }
        return sum;
    };
    Portfolio.prototype.getTotalCost = function () {
        var sum = 0;
        for (var key in this.entries) {
            sum += (this.entries[key].purchasedPrice * this.entries[key].amountOwned);
        }
        return sum;
    };
    return Portfolio;
}());
exports.Portfolio = Portfolio;
var portfolioEntry = /** @class */ (function () {
    function portfolioEntry(id, name, price, amountOwned, purchasedPrice) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amountOwned = amountOwned;
        this.purchasedPrice = purchasedPrice;
    }
    return portfolioEntry;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFzQkk7UUFyQlEsWUFBTyxHQUFVLEVBQUUsQ0FBQztJQXFCYixDQUFDO0lBcEJoQiw0QkFBUSxHQUFSLFVBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGNBQWM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNELDhCQUFVLEdBQVY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0QsaUNBQWEsR0FBYjtRQUNJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0QsZ0NBQVksR0FBWjtRQUNJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDO0FBdkJZLDhCQUFTO0FBd0J0QjtJQU1JLHdCQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxjQUFjO1FBQ3BELElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUG9ydGZvbGlvIHtcclxuICAgIHByaXZhdGUgZW50cmllczpvYmplY3QgPSB7fTtcclxuICAgIGFkZEVudHJ5KGlkLCBuYW1lLCBwcmljZSwgYW1vdW50T3duZWQsIHB1cmNoYXNlZFByaWNlKTp2b2lkIHtcclxuICAgICAgICB0aGlzLmVudHJpZXNbaWRdID0gbmV3IHBvcnRmb2xpb0VudHJ5KGlkLCBuYW1lLCBwcmljZSwgYW1vdW50T3duZWQsIHB1cmNoYXNlZFByaWNlKTtcclxuICAgIH1cclxuICAgIGdldEVudHJpZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllcztcclxuICAgIH1cclxuICAgIGdldFRvdGFsV29ydGgoKTpudW1iZXIge1xyXG4gICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuZW50cmllcykge1xyXG4gICAgICAgICAgICBzdW0gKz0gKHRoaXMuZW50cmllc1trZXldLnByaWNlICogdGhpcy5lbnRyaWVzW2tleV0uYW1vdW50T3duZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG4gICAgZ2V0VG90YWxDb3N0KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHN1bSA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5lbnRyaWVzKSB7XHJcbiAgICAgICAgICAgIHN1bSArPSAodGhpcy5lbnRyaWVzW2tleV0ucHVyY2hhc2VkUHJpY2UgKiB0aGlzLmVudHJpZXNba2V5XS5hbW91bnRPd25lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuY2xhc3MgcG9ydGZvbGlvRW50cnkge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHByaWNlOiBudW1iZXI7XHJcbiAgICBhbW91bnRPd25lZDogbnVtYmVyO1xyXG4gICAgcHVyY2hhc2VkUHJpY2U6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKGlkLCBuYW1lLCBwcmljZSwgYW1vdW50T3duZWQsIHB1cmNoYXNlZFByaWNlKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgICAgIHRoaXMuYW1vdW50T3duZWQgPSBhbW91bnRPd25lZDtcclxuICAgICAgICB0aGlzLnB1cmNoYXNlZFByaWNlID0gcHVyY2hhc2VkUHJpY2U7XHJcbiAgICB9XHJcbn0iXX0=