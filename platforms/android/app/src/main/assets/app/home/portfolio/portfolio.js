"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timeLib_1 = require("./timeLib");
var Portfolio = /** @class */ (function () {
    function Portfolio() {
        this.entries = [];
    }
    Portfolio.prototype.getEntry = function (id) {
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (id == entry.id) {
                return entry;
            }
        }
        return undefined;
    };
    Portfolio.prototype.getEntries = function () {
        return this.entries;
    };
    Portfolio.prototype.addEntry = function (id, name, price, amountOwned, purchasedPrice, date) {
        this.entries.push(new portfolioEntry(id, name, price, amountOwned, purchasedPrice, date));
    };
    Portfolio.prototype.getTotalWorth = function () {
        var sum = 0;
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            sum += (entry.price * entry.amountOwned);
        }
        return sum;
    };
    Portfolio.prototype.getTotalCost = function () {
        var sum = 0;
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            sum += (entry.purchasedPrice * entry.amountOwned);
        }
        return sum;
    };
    Portfolio.prototype.getTotalProfit = function () {
        return this.getTotalWorth() - this.getTotalCost();
    };
    Portfolio.prototype.getTotalProfitPercent = function () {
        return this.getTotalProfit() / this.getTotalCost() * 100;
    };
    Portfolio.prototype.getEntryDateHuman = function (id) {
        return timeLib_1.TimeLib.epochToHuman(this.getEntry(id).date);
    };
    Portfolio.prototype.getEntryDateEpoch = function (id) {
        return this.getEntry(id).date;
    };
    Portfolio.prototype.getTimeSincePurchase = function (id, currentDate) {
        var purchaseDate = this.getEntry(id).date;
        // Check if currentdate is string or number. Number means epoch format, string means human format
        if (isNaN(currentDate)) {
            // Is a string, convert to epoch
            currentDate = timeLib_1.TimeLib.humanToEpoch(currentDate);
        }
        // Calculate difference
        // currentDate is in seconds
        return this.timeConversion(currentDate - purchaseDate);
    };
    Portfolio.prototype.timeConversion = function (seconds) {
        var days = Math.floor(seconds / 86400);
        seconds -= (86400 * days);
        var hours = Math.floor(seconds / 3600);
        seconds -= (3600 * hours);
        return days + " days, " + hours + " hours, " + seconds + " seconds";
    };
    return Portfolio;
}());
exports.Portfolio = Portfolio;
// Stores date in epoch format
var portfolioEntry = /** @class */ (function () {
    function portfolioEntry(id, name, price, amountOwned, purchasedPrice, datePurchased) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amountOwned = amountOwned;
        this.purchasedPrice = purchasedPrice;
        this.datePurchased = datePurchased;
    }
    return portfolioEntry;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQW9DO0FBRXBDO0lBRUk7UUFEUSxZQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ04sQ0FBQztJQUNoQiw0QkFBUSxHQUFSLFVBQVMsRUFBVTtRQUNmLEdBQUcsQ0FBQSxDQUFjLFVBQVksRUFBWixLQUFBLElBQUksQ0FBQyxPQUFPLEVBQVosY0FBWSxFQUFaLElBQVk7WUFBekIsSUFBSSxLQUFLLFNBQUE7WUFDVCxFQUFFLENBQUEsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsOEJBQVUsR0FBVjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCw0QkFBUSxHQUFSLFVBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxJQUFJO1FBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0QsaUNBQWEsR0FBYjtRQUNJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQSxDQUFjLFVBQVksRUFBWixLQUFBLElBQUksQ0FBQyxPQUFPLEVBQVosY0FBWSxFQUFaLElBQVk7WUFBekIsSUFBSSxLQUFLLFNBQUE7WUFDVCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM1QztRQUNE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IFRpbWVMaWIgfSBmcm9tIFwiLi90aW1lTGliXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9ydGZvbGlvIHtcclxuICAgIHByaXZhdGUgZW50cmllcyA9IFtdO1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG4gICAgZ2V0RW50cnkoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGZvcih2YXIgZW50cnkgb2YgdGhpcy5lbnRyaWVzKSB7XHJcbiAgICAgICAgICAgIGlmKGlkID09IGVudHJ5LmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50cnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGdldEVudHJpZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllcztcclxuICAgIH1cclxuICAgIGFkZEVudHJ5KGlkLCBuYW1lLCBwcmljZSwgYW1vdW50T3duZWQsIHB1cmNoYXNlZFByaWNlLCBkYXRlKTp2b2lkIHtcclxuICAgICAgICB0aGlzLmVudHJpZXMucHVzaChuZXcgcG9ydGZvbGlvRW50cnkoaWQsIG5hbWUsIHByaWNlLCBhbW91bnRPd25lZCwgcHVyY2hhc2VkUHJpY2UsIGRhdGUpKTtcclxuICAgIH1cclxuICAgIGdldFRvdGFsV29ydGgoKTpudW1iZXIge1xyXG4gICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgIGZvcih2YXIgZW50cnkgb2YgdGhpcy5lbnRyaWVzKSB7XHJcbiAgICAgICAgICAgIHN1bSArPSAoZW50cnkucHJpY2UgKiBlbnRyeS5hbW91bnRPd25lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcbiAgICBnZXRUb3RhbENvc3QoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgc3VtID0gMDtcclxuICAgICAgICBmb3IodmFyIGVudHJ5IG9mIHRoaXMuZW50cmllcykge1xyXG4gICAgICAgICAgICBzdW0gKz0gKGVudHJ5LnB1cmNoYXNlZFByaWNlICogZW50cnkuYW1vdW50T3duZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG4gICAgZ2V0VG90YWxQcm9maXQoKTogbnVtYmVyIHtcclxuICAgIFx0cmV0dXJuIHRoaXMuZ2V0VG90YWxXb3J0aCgpIC0gdGhpcy5nZXRUb3RhbENvc3QoKTtcclxuICAgIH1cclxuICAgIGdldFRvdGFsUHJvZml0UGVyY2VudCgpOm51bWJlciB7XHJcbiAgICBcdHJldHVybiB0aGlzLmdldFRvdGFsUHJvZml0KCkgLyB0aGlzLmdldFRvdGFsQ29zdCgpICogMTAwO1xyXG4gICAgfVxyXG4gICAgZ2V0RW50cnlEYXRlSHVtYW4oaWQ6IHN0cmluZykge1xyXG4gICAgXHRyZXR1cm4gVGltZUxpYi5lcG9jaFRvSHVtYW4odGhpcy5nZXRFbnRyeShpZCkuZGF0ZSk7XHJcbiAgICB9XHJcbiAgICBnZXRFbnRyeURhdGVFcG9jaChpZDogc3RyaW5nKSB7XHJcbiAgICBcdHJldHVybiB0aGlzLmdldEVudHJ5KGlkKS5kYXRlO1xyXG4gICAgfVxyXG4gICAgZ2V0VGltZVNpbmNlUHVyY2hhc2UoaWQ6IHN0cmluZywgY3VycmVudERhdGUpIHtcclxuICAgIFx0bGV0IHB1cmNoYXNlRGF0ZSA9IHRoaXMuZ2V0RW50cnkoaWQpLmRhdGU7XHJcbiAgICBcdC8vIENoZWNrIGlmIGN1cnJlbnRkYXRlIGlzIHN0cmluZyBvciBudW1iZXIuIE51bWJlciBtZWFucyBlcG9jaCBmb3JtYXQsIHN0cmluZyBtZWFucyBodW1hbiBmb3JtYXRcclxuICAgIFx0aWYoaXNOYU4oY3VycmVudERhdGUpKSB7XHJcbiAgICBcdFx0Ly8gSXMgYSBzdHJpbmcsIGNvbnZlcnQgdG8gZXBvY2hcclxuICAgIFx0XHRjdXJyZW50RGF0ZSA9IFRpbWVMaWIuaHVtYW5Ub0Vwb2NoKGN1cnJlbnREYXRlKTtcclxuICAgIFx0fVxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSBkaWZmZXJlbmNlXHJcbiAgICAgICAgLy8gY3VycmVudERhdGUgaXMgaW4gc2Vjb25kc1xyXG4gICAgXHRyZXR1cm4gdGhpcy50aW1lQ29udmVyc2lvbihjdXJyZW50RGF0ZSAtIHB1cmNoYXNlRGF0ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHRpbWVDb252ZXJzaW9uKHNlY29uZHM6bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGRheXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA4NjQwMCk7XHJcbiAgICAgICAgc2Vjb25kcyAtPSAoODY0MDAgKiBkYXlzKTtcclxuICAgICAgICBsZXQgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcclxuICAgICAgICBzZWNvbmRzIC09ICgzNjAwICogaG91cnMpO1xyXG4gICAgICAgIHJldHVybiBkYXlzICsgXCIgZGF5cywgXCIgKyBob3VycyArIFwiIGhvdXJzLCBcIiArIHNlY29uZHMgKyBcIiBzZWNvbmRzXCI7XHJcbiAgICB9XHJcbn1cclxuLy8gU3RvcmVzIGRhdGUgaW4gZXBvY2ggZm9ybWF0XHJcbmNsYXNzIHBvcnRmb2xpb0VudHJ5IHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBwcmljZTogbnVtYmVyO1xyXG4gICAgYW1vdW50T3duZWQ6IG51bWJlcjtcclxuICAgIHB1cmNoYXNlZFByaWNlOiBudW1iZXI7XHJcbiAgICBkYXRlUHVyY2hhc2VkOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihpZCwgbmFtZSwgcHJpY2UsIGFtb3VudE93bmVkLCBwdXJjaGFzZWRQcmljZSwgZGF0ZVB1cmNoYXNlZCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMucHJpY2UgPSBwcmljZTtcclxuICAgICAgICB0aGlzLmFtb3VudE93bmVkID0gYW1vdW50T3duZWQ7XHJcbiAgICAgICAgdGhpcy5wdXJjaGFzZWRQcmljZSA9IHB1cmNoYXNlZFByaWNlO1xyXG4gICAgICAgIHRoaXMuZGF0ZVB1cmNoYXNlZCA9IGRhdGVQdXJjaGFzZWQ7XHJcbiAgICB9XHJcbn1cclxuIl19