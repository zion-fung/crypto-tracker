"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var FloatFormatter = /** @class */ (function () {
    function FloatFormatter() {
    }
    FloatFormatter.prototype.transform = function (value) {
        if (!value) {
            return undefined;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXQtZm9ybWF0dGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbG9hdC1mb3JtYXR0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0Q7QUFHcEQ7SUFBQTtJQTBCQSxDQUFDO0lBekJHLGtDQUFTLEdBQVQsVUFBVSxLQUFVO1FBQ2hCLEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNELElBQUksTUFBYSxDQUFDO1FBQ2xCLElBQUksR0FBVSxDQUFDO1FBQ2YsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDWixNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDZixHQUFHLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFDRCxzQ0FBc0M7UUFDdEMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsK0RBQStEO1FBQy9ELEVBQUUsQ0FBQSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUVMLENBQUM7SUF6QlEsY0FBYztRQUQxQixXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztPQUNsQixjQUFjLENBMEIxQjtJQUFELHFCQUFDO0NBQUEsQUExQkQsSUEwQkM7QUExQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtuYW1lOiBcImZsb2F0Rm9ybWF0dGVyXCJ9KVxuZXhwb3J0IGNsYXNzIEZsb2F0Rm9ybWF0dGVyIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnkpOnN0cmluZyB7XG4gICAgICAgIGlmKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbnVtYmVyOm51bWJlcjtcbiAgICAgICAgbGV0IHN0cjpzdHJpbmc7XG4gICAgICAgIGlmKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgc3RyID0gdmFsdWU7XG4gICAgICAgICAgICBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtYmVyID0gdmFsdWU7XG4gICAgICAgICAgICBzdHIgPSB2YWx1ZS50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIG51bWJlciBpcyBub3QgYSBmbG9hdCwgcmV0dXJuIGl0XG4gICAgICAgIGlmKHN0ci5pbmRleE9mKFwiLlwiKSA9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBudW1iZXIgaXMgZ3JlYXRlciB0aGFuIDEgdHJ1bmNhdGUgdG8gMiBkZWNpbWFsIHBsYWNlc1xuICAgICAgICBpZihudW1iZXIgPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyLnRvRml4ZWQoMik7XG4gICAgICAgIH0gZWxzZSB7IC8vIElmIHRoZSBudW1iZXIgaXMgbGVzcyB0aGFuIDEgdHJ1bmNhdGUgdG8gMyBkZWNpbWFsIHBsYWNlc1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlci50b0ZpeGVkKDMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0iXX0=