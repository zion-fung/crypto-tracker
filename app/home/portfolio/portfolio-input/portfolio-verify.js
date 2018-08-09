"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PortfolioVerify = /** @class */ (function () {
    function PortfolioVerify() {
    }
    // Returns true if date is valid, else false
    PortfolioVerify.verifyDate = function (dateString) {
        var date = new Date(dateString);
        // Not a number = not a valid date
        if (isNaN(Number(date))) {
            return false;
        }
        // Check if date is in the future
        var currentDate = new Date();
        var a = Number(date);
        var b = Number(currentDate);
        // Date is in the future
        if (a > b) {
            return false;
        }
        return true;
    };
    return PortfolioVerify;
}());
exports.PortfolioVerify = PortfolioVerify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLXZlcmlmeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcnRmb2xpby12ZXJpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO0lBa0JBLENBQUM7SUFqQkcsNENBQTRDO0lBQ3JDLDBCQUFVLEdBQWpCLFVBQWtCLFVBQWtCO1FBQ2hDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLGtDQUFrQztRQUNsQyxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELGlDQUFpQztRQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUIsd0JBQXdCO1FBQ3hCLEVBQUUsQ0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDO0FBbEJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFBvcnRmb2xpb1ZlcmlmeSB7XHJcbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgZGF0ZSBpcyB2YWxpZCwgZWxzZSBmYWxzZVxyXG4gICAgc3RhdGljIHZlcmlmeURhdGUoZGF0ZVN0cmluZzogc3RyaW5nKTpib29sZWFuIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG4gICAgICAgIC8vIE5vdCBhIG51bWJlciA9IG5vdCBhIHZhbGlkIGRhdGVcclxuICAgICAgICBpZihpc05hTihOdW1iZXIoZGF0ZSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgZGF0ZSBpcyBpbiB0aGUgZnV0dXJlXHJcbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgYSA9IE51bWJlcihkYXRlKTtcclxuICAgICAgICBsZXQgYiA9IE51bWJlcihjdXJyZW50RGF0ZSk7XHJcbiAgICAgICAgLy8gRGF0ZSBpcyBpbiB0aGUgZnV0dXJlXHJcbiAgICAgICAgaWYoYSA+IGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSJdfQ==