"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timeLib_1 = require("./timeLib");
var Portfolio = /** @class */ (function () {
    function Portfolio() {
        this.entries = {};
    }
    Portfolio.prototype.addEntry = function (id, name, price, amountOwned, purchasedPrice, date) {
        this.entries[id] = new portfolioEntry(id, name, price, amountOwned, purchasedPrice, date);
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
    Portfolio.prototype.getTotalProfit = function () {
        return this.getTotalWorth() - this.getTotalCost();
    };
    Portfolio.prototype.getTotalProfitPercent = function () {
        return this.getTotalProfit() / this.getTotalCost() * 100;
    };
    Portfolio.prototype.getEntryDateHuman = function (id) {
        return timeLib_1.TimeLib.epochToHuman(this.entries[id].date);
    };
    Portfolio.prototype.getEntryDateEpoch = function (id) {
        return this.entries[id].date;
    };
    Portfolio.prototype.getTimeSincePurchase = function (id, currentDate) {
        var purchaseDate = this.entries[id].date;
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
    function portfolioEntry(id, name, price, amountOwned, purchasedPrice, date) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amountOwned = amountOwned;
        this.purchasedPrice = purchasedPrice;
        this.date = date;
    }
    return portfolioEntry;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQW9DO0FBRXBDO0lBRUk7UUFEUSxZQUFPLEdBQVUsRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUNoQiw0QkFBUSxHQUFSLFVBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxJQUFJO1FBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxjQUFjLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0QsaUNBQWEsR0FBYjtRQUNJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0QsZ0NBQVksR0FBWjtRQUNJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0Qsa0NBQWMsR0FBZDtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFDRCx5Q0FBcUIsR0FBckI7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDMUQsQ0FBQztJQUNELHFDQUFpQixHQUFqQixVQUFrQixFQUFVO1FBQzNCLE1BQU0sQ0FBQyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDRCxxQ0FBaUIsR0FBakIsVUFBa0IsRUFBVTtRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUNELHdDQUFvQixHQUFwQixVQUFxQixFQUFVLEVBQUUsV0FBVztRQUMzQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN6QyxpR0FBaUc7UUFDakcsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixnQ0FBZ0M7WUFDaEMsV0FBVyxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDRSx1QkFBdUI7UUFDdkIsNEJBQTRCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ08sa0NBQWMsR0FBdEIsVUFBdUIsT0FBYztRQUNqQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQztRQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLEtBQUssR0FBRyxVQUFVLEdBQUcsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUN4RSxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBbERELElBa0RDO0FBbERZLDhCQUFTO0FBbUR0Qiw4QkFBOEI7QUFDOUI7SUFPSSx3QkFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLElBQUk7UUFDMUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRpbWVMaWIgfSBmcm9tIFwiLi90aW1lTGliXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9ydGZvbGlvIHtcclxuICAgIHByaXZhdGUgZW50cmllczpvYmplY3QgPSB7fTtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuICAgIGFkZEVudHJ5KGlkLCBuYW1lLCBwcmljZSwgYW1vdW50T3duZWQsIHB1cmNoYXNlZFByaWNlLCBkYXRlKTp2b2lkIHtcclxuICAgICAgICB0aGlzLmVudHJpZXNbaWRdID0gbmV3IHBvcnRmb2xpb0VudHJ5KGlkLCBuYW1lLCBwcmljZSwgYW1vdW50T3duZWQsIHB1cmNoYXNlZFByaWNlLCBkYXRlKTtcclxuICAgIH1cclxuICAgIGdldFRvdGFsV29ydGgoKTpudW1iZXIge1xyXG4gICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuZW50cmllcykge1xyXG4gICAgICAgICAgICBzdW0gKz0gKHRoaXMuZW50cmllc1trZXldLnByaWNlICogdGhpcy5lbnRyaWVzW2tleV0uYW1vdW50T3duZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG4gICAgZ2V0VG90YWxDb3N0KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHN1bSA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5lbnRyaWVzKSB7XHJcbiAgICAgICAgICAgIHN1bSArPSAodGhpcy5lbnRyaWVzW2tleV0ucHVyY2hhc2VkUHJpY2UgKiB0aGlzLmVudHJpZXNba2V5XS5hbW91bnRPd25lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcbiAgICBnZXRUb3RhbFByb2ZpdCgpOiBudW1iZXIge1xyXG4gICAgXHRyZXR1cm4gdGhpcy5nZXRUb3RhbFdvcnRoKCkgLSB0aGlzLmdldFRvdGFsQ29zdCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VG90YWxQcm9maXRQZXJjZW50KCk6bnVtYmVyIHtcclxuICAgIFx0cmV0dXJuIHRoaXMuZ2V0VG90YWxQcm9maXQoKSAvIHRoaXMuZ2V0VG90YWxDb3N0KCkgKiAxMDA7XHJcbiAgICB9XHJcbiAgICBnZXRFbnRyeURhdGVIdW1hbihpZDogc3RyaW5nKSB7XHJcbiAgICBcdHJldHVybiBUaW1lTGliLmVwb2NoVG9IdW1hbih0aGlzLmVudHJpZXNbaWRdLmRhdGUpO1xyXG4gICAgfVxyXG4gICAgZ2V0RW50cnlEYXRlRXBvY2goaWQ6IHN0cmluZykge1xyXG4gICAgXHRyZXR1cm4gdGhpcy5lbnRyaWVzW2lkXS5kYXRlO1xyXG4gICAgfVxyXG4gICAgZ2V0VGltZVNpbmNlUHVyY2hhc2UoaWQ6IHN0cmluZywgY3VycmVudERhdGUpIHtcclxuICAgIFx0bGV0IHB1cmNoYXNlRGF0ZSA9IHRoaXMuZW50cmllc1tpZF0uZGF0ZTtcclxuICAgIFx0Ly8gQ2hlY2sgaWYgY3VycmVudGRhdGUgaXMgc3RyaW5nIG9yIG51bWJlci4gTnVtYmVyIG1lYW5zIGVwb2NoIGZvcm1hdCwgc3RyaW5nIG1lYW5zIGh1bWFuIGZvcm1hdFxyXG4gICAgXHRpZihpc05hTihjdXJyZW50RGF0ZSkpIHtcclxuICAgIFx0XHQvLyBJcyBhIHN0cmluZywgY29udmVydCB0byBlcG9jaFxyXG4gICAgXHRcdGN1cnJlbnREYXRlID0gVGltZUxpYi5odW1hblRvRXBvY2goY3VycmVudERhdGUpO1xyXG4gICAgXHR9XHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIGRpZmZlcmVuY2VcclxuICAgICAgICAvLyBjdXJyZW50RGF0ZSBpcyBpbiBzZWNvbmRzXHJcbiAgICBcdHJldHVybiB0aGlzLnRpbWVDb252ZXJzaW9uKGN1cnJlbnREYXRlIC0gcHVyY2hhc2VEYXRlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgdGltZUNvbnZlcnNpb24oc2Vjb25kczpudW1iZXIpIHtcclxuICAgICAgICBsZXQgZGF5cyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDg2NDAwKTtcclxuICAgICAgICBzZWNvbmRzIC09ICg4NjQwMCAqIGRheXMpO1xyXG4gICAgICAgIGxldCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xyXG4gICAgICAgIHNlY29uZHMgLT0gKDM2MDAgKiBob3Vycyk7XHJcbiAgICAgICAgcmV0dXJuIGRheXMgKyBcIiBkYXlzLCBcIiArIGhvdXJzICsgXCIgaG91cnMsIFwiICsgc2Vjb25kcyArIFwiIHNlY29uZHNcIjtcclxuICAgIH1cclxufVxyXG4vLyBTdG9yZXMgZGF0ZSBpbiBlcG9jaCBmb3JtYXRcclxuY2xhc3MgcG9ydGZvbGlvRW50cnkge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHByaWNlOiBudW1iZXI7XHJcbiAgICBhbW91bnRPd25lZDogbnVtYmVyO1xyXG4gICAgcHVyY2hhc2VkUHJpY2U6IG51bWJlcjtcclxuICAgIGRhdGU6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKGlkLCBuYW1lLCBwcmljZSwgYW1vdW50T3duZWQsIHB1cmNoYXNlZFByaWNlLCBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgICAgIHRoaXMuYW1vdW50T3duZWQgPSBhbW91bnRPd25lZDtcclxuICAgICAgICB0aGlzLnB1cmNoYXNlZFByaWNlID0gcHVyY2hhc2VkUHJpY2U7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcclxuICAgIH1cclxufVxyXG4iXX0=