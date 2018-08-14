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
    Portfolio.prototype.addEntry = function (id, name, price, amountOwned, purchasedPrice, date, percentChange) {
        this.entries.push(new portfolioEntry(id, name, price, amountOwned, purchasedPrice, date, percentChange));
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
        return timeLib_1.TimeLib.epochToHuman(this.getEntry(id).datePurchased);
    };
    Portfolio.prototype.getEntryDateEpoch = function (id) {
        return this.getEntry(id).datePurchased;
    };
    Portfolio.prototype.getTimeSincePurchase = function (id, currentDate) {
        var purchaseDate = this.getEntry(id).datePurchased;
        // Check if currentdate is string or number. Number means epoch format, string means human format
        if (isNaN(currentDate)) {
            // Is a string, convert to epoch
            currentDate = timeLib_1.TimeLib.humanToEpoch(currentDate);
        }
        // Calculate difference
        // currentDate is in seconds
        return this.timeConversion(currentDate - purchaseDate);
    };
    Portfolio.prototype.getTotalPercentChange = function () {
        var totalPercentChange = {
            "24h": this.getTotalWorth24h() / this.getTotalWorth(),
            "7d": this.getTotalWorth7d() / this.getTotalWorth(),
            "1h": this.getTotalWoth1h() / this.getTotalWorth()
        };
        return totalPercentChange;
        // Calculate what the total worth was 24h ago, 7d ago, 1h ago
    };
    Portfolio.prototype.getTotalWorth24h = function () {
        var totalWorth = 0;
        // Gets what the total worth was 24h ago
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            var change24h = Number(entry.percentChange["24h"]);
            var price24h = entry.price * change24h / 100;
            totalWorth += price24h;
        }
        return totalWorth;
    };
    Portfolio.prototype.getTotalWorth7d = function () {
        var totalWorth = 0;
        // Gets what the total worth was 7d ago
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            var change24h = Number(entry.percentChange["7d"]);
            var price24h = entry.price * change24h / 100;
            totalWorth += price24h;
        }
        return totalWorth;
    };
    Portfolio.prototype.getTotalWoth1h = function () {
        var totalWorth = 0;
        // Gets what the total worth was 1h ago
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            var change24h = Number(entry.percentChange["1h"]);
            var price24h = entry.price * change24h / 100;
            totalWorth += price24h;
        }
        return totalWorth;
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
    function portfolioEntry(id, name, price, amountOwned, purchasedPrice, datePurchased, percentChange) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amountOwned = amountOwned;
        this.purchasedPrice = purchasedPrice;
        this.datePurchased = datePurchased;
        this.percentChange = percentChange;
    }
    return portfolioEntry;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQW9DO0FBRXBDO0lBRUk7UUFEUSxZQUFPLEdBQW9CLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ2hCLDRCQUFRLEdBQVIsVUFBUyxFQUFVO1FBQ2YsR0FBRyxDQUFBLENBQWMsVUFBWSxFQUFaLEtBQUEsSUFBSSxDQUFDLE9BQU8sRUFBWixjQUFZLEVBQVosSUFBWTtZQUF6QixJQUFJLEtBQUssU0FBQTtZQUNULEVBQUUsQ0FBQSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1NBQ0o7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCw4QkFBVSxHQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNELDRCQUFRLEdBQVIsVUFBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxhQUFhO1FBQ3RFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUNELGlDQUFhLEdBQWI7UUFDSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUEsQ0FBYyxVQUFZLEVBQVosS0FBQSxJQUFJLENBQUMsT0FBTyxFQUFaLGNBQVksRUFBWixJQUFZO1lBQXpCLElBQUksS0FBSyxTQUFBO1lBQ1QsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsV0FB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LEdBQUcsVUFBVSxHQUFHLE9BQU8sR0FBRyxVQUFVLENBQUM7SUFDeEUsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQXJHRCxJQXFHQztBQXJHWSw4QkFBUztBQXNHdEIsOEJBQThCO0FBQzlCO0lBUUksd0JBQVksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsYUFBYTtRQUNsRixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaW1lTGliIH0gZnJvbSBcIi4vdGltZUxpYlwiO1xuXG5leHBvcnQgY2xhc3MgUG9ydGZvbGlvIHtcbiAgICBwcml2YXRlIGVudHJpZXM6cG9ydGZvbGlvRW50cnlbXSA9IFtdO1xuICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICBnZXRFbnRyeShpZDogc3RyaW5nKSB7XG4gICAgICAgIGZvcih2YXIgZW50cnkgb2YgdGhpcy5lbnRyaWVzKSB7XG4gICAgICAgICAgICBpZihpZCA9PSBlbnRyeS5pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnZXRFbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzO1xuICAgIH1cbiAgICBhZGRFbnRyeShpZCwgbmFtZSwgcHJpY2UsIGFtb3VudE93bmVkLCBwdXJjaGFzZWRQcmljZSwgZGF0ZSwgcGVyY2VudENoYW5nZSk6dm9pZCB7XG4gICAgICAgIHRoaXMuZW50cmllcy5wdXNoKG5ldyBwb3J0Zm9saW9FbnRyeShpZCwgbmFtZSwgcHJpY2UsIGFtb3VudE93bmVkLCBwdXJjaGFzZWRQcmljZSwgZGF0ZSwgcGVyY2VudENoYW5nZSkpO1xuICAgIH1cbiAgICBnZXRUb3RhbFdvcnRoKCk6bnVtYmVyIHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIGZvcih2YXIgZW50cnkgb2YgdGhpcy5lbnRyaWVzKSB7XG4gICAgICAgICAgICBzdW0gKz0gKGVudHJ5LnByaWNlICogZW50cnkuYW1vdW50T3duZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgfVxuICAgIGdldFRvdGFsQ29zdCgpOiBudW1iZXIge1xuICAgICAgICBsZXQgc3VtID0gMDtcbiAgICAgICAgZm9yKHZhciBlbnRyeSBvZiB0aGlzLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHN1bSArPSAoZW50cnkucHVyY2hhc2VkUHJpY2UgKiBlbnRyeS5hbW91bnRPd25lZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICB9XG4gICAgZ2V0VG90YWxQcm9maXQoKTogbnVtYmVyIHtcbiAgICBcdHJldHVybiB0aGlzLmdldFRvdGFsV29ydGgoKSAtIHRoaXMuZ2V0VG90YWxDb3N0KCk7XG4gICAgfVxuICAgIGdldFRvdGFsUHJvZml0UGVyY2VudCgpOm51bWJlciB7XG4gICAgXHRyZXR1cm4gdGhpcy5nZXRUb3RhbFByb2ZpdCgpIC8gdGhpcy5nZXRUb3RhbENvc3QoKSAqIDEwMDtcbiAgICB9XG4gICAgZ2V0RW50cnlEYXRlSHVtYW4oaWQ6IHN0cmluZykge1xuICAgIFx0cmV0dXJuIFRpbWVMaWIuZXBvY2hUb0h1bWFuKHRoaXMuZ2V0RW50cnkoaWQpLmRhdGVQdXJjaGFzZWQpO1xuICAgIH1cbiAgICBnZXRFbnRyeURhdGVFcG9jaChpZDogc3RyaW5nKSB7XG4gICAgXHRyZXR1cm4gdGhpcy5nZXRFbnRyeShpZCkuZGF0ZVB1cmNoYXNlZDtcbiAgICB9XG4gICAgZ2V0VGltZVNpbmNlUHVyY2hhc2UoaWQ6IHN0cmluZywgY3VycmVudERhdGUpIHtcbiAgICBcdGxldCBwdXJjaGFzZURhdGUgPSB0aGlzLmdldEVudHJ5KGlkKS5kYXRlUHVyY2hhc2VkO1xuICAgIFx0Ly8gQ2hlY2sgaWYgY3VycmVudGRhdGUgaXMgc3RyaW5nIG9yIG51bWJlci4gTnVtYmVyIG1lYW5zIGVwb2NoIGZvcm1hdCwgc3RyaW5nIG1lYW5zIGh1bWFuIGZvcm1hdFxuICAgIFx0aWYoaXNOYU4oY3VycmVudERhdGUpKSB7XG4gICAgXHRcdC8vIElzIGEgc3RyaW5nLCBjb252ZXJ0IHRvIGVwb2NoXG4gICAgXHRcdGN1cnJlbnREYXRlID0gVGltZUxpYi5odW1hblRvRXBvY2goY3VycmVudERhdGUpO1xuICAgIFx0fVxuICAgICAgICAvLyBDYWxjdWxhdGUgZGlmZmVyZW5jZVxuICAgICAgICAvLyBjdXJyZW50RGF0ZSBpcyBpbiBzZWNvbmRzXG4gICAgXHRyZXR1cm4gdGhpcy50aW1lQ29udmVyc2lvbihjdXJyZW50RGF0ZSAtIHB1cmNoYXNlRGF0ZSk7XG4gICAgfVxuICAgIGdldFRvdGFsUGVyY2VudENoYW5nZSgpOk9iamVjdCB7XG4gICAgICAgIGxldCB0b3RhbFBlcmNlbnRDaGFuZ2UgPSB7XG4gICAgICAgICAgICBcIjI0aFwiOiB0aGlzLmdldFRvdGFsV29ydGgyNGgoKSAvIHRoaXMuZ2V0VG90YWxXb3J0aCgpLFxuICAgICAgICAgICAgXCI3ZFwiOiB0aGlzLmdldFRvdGFsV29ydGg3ZCgpIC8gdGhpcy5nZXRUb3RhbFdvcnRoKCksXG4gICAgICAgICAgICBcIjFoXCI6IHRoaXMuZ2V0VG90YWxXb3RoMWgoKSAvIHRoaXMuZ2V0VG90YWxXb3J0aCgpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0b3RhbFBlcmNlbnRDaGFuZ2U7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGF0IHRoZSB0b3RhbCB3b3J0aCB3YXMgMjRoIGFnbywgN2QgYWdvLCAxaCBhZ29cblxuICAgIH1cbiAgICBwcml2YXRlIGdldFRvdGFsV29ydGgyNGgoKTpudW1iZXIge1xuICAgICAgICBsZXQgdG90YWxXb3J0aCA9IDA7XG4gICAgICAgIC8vIEdldHMgd2hhdCB0aGUgdG90YWwgd29ydGggd2FzIDI0aCBhZ29cbiAgICAgICAgZm9yKHZhciBlbnRyeSBvZiB0aGlzLmVudHJpZXMpIHtcbiAgICAgICAgICAgIGxldCBjaGFuZ2UyNGggPSBOdW1iZXIoZW50cnkucGVyY2VudENoYW5nZVtcIjI0aFwiXSk7XG4gICAgICAgICAgICBsZXQgcHJpY2UyNGggPSBlbnRyeS5wcmljZSAqIGNoYW5nZTI0aCAvIDEwMDtcbiAgICAgICAgICAgIHRvdGFsV29ydGggKz0gcHJpY2UyNGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvdGFsV29ydGg7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0VG90YWxXb3J0aDdkKCk6bnVtYmVyIHtcbiAgICAgICAgbGV0IHRvdGFsV29ydGggPSAwO1xuICAgICAgICAvLyBHZXRzIHdoYXQgdGhlIHRvdGFsIHdvcnRoIHdhcyA3ZCBhZ29cbiAgICAgICAgZm9yKHZhciBlbnRyeSBvZiB0aGlzLmVudHJpZXMpIHtcbiAgICAgICAgICAgIGxldCBjaGFuZ2UyNGggPSBOdW1iZXIoZW50cnkucGVyY2VudENoYW5nZVtcIjdkXCJdKTtcbiAgICAgICAgICAgIGxldCBwcmljZTI0aCA9IGVudHJ5LnByaWNlICogY2hhbmdlMjRoIC8gMTAwO1xuICAgICAgICAgICAgdG90YWxXb3J0aCArPSBwcmljZTI0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG90YWxXb3J0aDtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXRUb3RhbFdvdGgxaCgpOm51bWJlciB7XG4gICAgICAgIGxldCB0b3RhbFdvcnRoID0gMDtcbiAgICAgICAgLy8gR2V0cyB3aGF0IHRoZSB0b3RhbCB3b3J0aCB3YXMgMWggYWdvXG4gICAgICAgIGZvcih2YXIgZW50cnkgb2YgdGhpcy5lbnRyaWVzKSB7XG4gICAgICAgICAgICBsZXQgY2hhbmdlMjRoID0gTnVtYmVyKGVudHJ5LnBlcmNlbnRDaGFuZ2VbXCIxaFwiXSk7XG4gICAgICAgICAgICBsZXQgcHJpY2UyNGggPSBlbnRyeS5wcmljZSAqIGNoYW5nZTI0aCAvIDEwMDtcbiAgICAgICAgICAgIHRvdGFsV29ydGggKz0gcHJpY2UyNGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvdGFsV29ydGg7XG4gICAgfVxuICAgIHByaXZhdGUgdGltZUNvbnZlcnNpb24oc2Vjb25kczpudW1iZXIpIHtcbiAgICAgICAgbGV0IGRheXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA4NjQwMCk7XG4gICAgICAgIHNlY29uZHMgLT0gKDg2NDAwICogZGF5cyk7XG4gICAgICAgIGxldCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgICAgICBzZWNvbmRzIC09ICgzNjAwICogaG91cnMpO1xuICAgICAgICByZXR1cm4gZGF5cyArIFwiIGRheXMsIFwiICsgaG91cnMgKyBcIiBob3VycywgXCIgKyBzZWNvbmRzICsgXCIgc2Vjb25kc1wiO1xuICAgIH1cbn1cbi8vIFN0b3JlcyBkYXRlIGluIGVwb2NoIGZvcm1hdFxuY2xhc3MgcG9ydGZvbGlvRW50cnkge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHByaWNlOiBudW1iZXI7XG4gICAgYW1vdW50T3duZWQ6IG51bWJlcjtcbiAgICBwdXJjaGFzZWRQcmljZTogbnVtYmVyO1xuICAgIGRhdGVQdXJjaGFzZWQ6IG51bWJlcjtcbiAgICBwZXJjZW50Q2hhbmdlOiBPYmplY3Q7XG4gICAgY29uc3RydWN0b3IoaWQsIG5hbWUsIHByaWNlLCBhbW91bnRPd25lZCwgcHVyY2hhc2VkUHJpY2UsIGRhdGVQdXJjaGFzZWQsIHBlcmNlbnRDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnByaWNlID0gcHJpY2U7XG4gICAgICAgIHRoaXMuYW1vdW50T3duZWQgPSBhbW91bnRPd25lZDtcbiAgICAgICAgdGhpcy5wdXJjaGFzZWRQcmljZSA9IHB1cmNoYXNlZFByaWNlO1xuICAgICAgICB0aGlzLmRhdGVQdXJjaGFzZWQgPSBkYXRlUHVyY2hhc2VkO1xuICAgICAgICB0aGlzLnBlcmNlbnRDaGFuZ2UgPSBwZXJjZW50Q2hhbmdlO1xuICAgIH1cbn1cbiJdfQ==