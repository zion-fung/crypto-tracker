"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var FloatFormatter = /** @class */ (function () {
    function FloatFormatter() {
    }
    FloatFormatter.prototype.transform = function (value) {
        var number;
        var str;
        if (isNaN(value)) {
            str = value;
            number = Number(value);
        }
        else {
            number = value;
            str = value.toLocaleString();
        }
        // If number is not a float, return it
        if (str.indexOf(".") == -1) {
            return value;
        }
        // If the number is greater than 1 truncate to 2 decimal places
        if (number > 1) {
            return number.toFixed(2);
        }
        else {
            return number.toFixed(3);
        }
    };
    FloatFormatter = tslib_1.__decorate([
        core_1.Pipe({ name: "floatFormatter" })
    ], FloatFormatter);
    return FloatFormatter;
}());
exports.FloatFormatter = FloatFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXQtZm9ybWF0dGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbG9hdC1mb3JtYXR0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0Q7QUFHcEQ7SUFBQTtJQXVCQSxDQUFDO0lBdEJHLGtDQUFTLEdBQVQsVUFBVSxLQUFVO1FBQ2hCLElBQUksTUFBYSxDQUFDO1FBQ2xCLElBQUksR0FBVSxDQUFDO1FBQ2YsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDWixNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDZixHQUFHLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFDRCxzQ0FBc0M7UUFDdEMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsK0RBQStEO1FBQy9ELEVBQUUsQ0FBQSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUVMLENBQUM7SUF0QlEsY0FBYztRQUQxQixXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztPQUNsQixjQUFjLENBdUIxQjtJQUFELHFCQUFDO0NBQUEsQUF2QkQsSUF1QkM7QUF2Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7bmFtZTogXCJmbG9hdEZvcm1hdHRlclwifSlcclxuZXhwb3J0IGNsYXNzIEZsb2F0Rm9ybWF0dGVyIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSk6c3RyaW5nIHtcclxuICAgICAgICBsZXQgbnVtYmVyOm51bWJlcjtcclxuICAgICAgICBsZXQgc3RyOnN0cmluZztcclxuICAgICAgICBpZihpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgc3RyID0gdmFsdWU7XHJcbiAgICAgICAgICAgIG51bWJlciA9IE51bWJlcih2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbnVtYmVyID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHN0ciA9IHZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIG51bWJlciBpcyBub3QgYSBmbG9hdCwgcmV0dXJuIGl0XHJcbiAgICAgICAgaWYoc3RyLmluZGV4T2YoXCIuXCIpID09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gSWYgdGhlIG51bWJlciBpcyBncmVhdGVyIHRoYW4gMSB0cnVuY2F0ZSB0byAyIGRlY2ltYWwgcGxhY2VzXHJcbiAgICAgICAgaWYobnVtYmVyID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyLnRvRml4ZWQoMik7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gSWYgdGhlIG51bWJlciBpcyBsZXNzIHRoYW4gMSB0cnVuY2F0ZSB0byAzIGRlY2ltYWwgcGxhY2VzXHJcbiAgICAgICAgICAgIHJldHVybiBudW1iZXIudG9GaXhlZCgzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iXX0=