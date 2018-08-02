"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeLib = /** @class */ (function () {
    function TimeLib() {
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }
    // Return format is: 8/1/2018 15:22:22
    TimeLib.epochToHuman = function (unixTimestamp) {
        var date = new Date(unixTimestamp);
        var year = "" + date.getFullYear();
        var month = "" + (date.getMonth() + 1);
        var dayOfMonth = "" + date.getDate();
        var hour = "" + date.getHours();
        if (hour.length == 1) {
            hour = "0" + hour;
        }
        var minute = "" + date.getMinutes();
        if (minute.length == 1) {
            minute = "0" + minute;
        }
        var second = "" + date.getSeconds();
        if (second.length == 1) {
            second = "0" + second;
        }
        return month + "/" + dayOfMonth + "/" + year + " " + hour + ":" + minute + ":" + second;
    };
    TimeLib.humanToEpoch = function (human) {
        var date = new Date(human);
        return date.getTime() / 1000;
    };
    return TimeLib;
}());
exports.TimeLib = TimeLib;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZUxpYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRpbWVMaWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO1FBQ1MsV0FBTSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQXlCdkcsQ0FBQztJQXhCQSxzQ0FBc0M7SUFDNUIsb0JBQVksR0FBbkIsVUFBb0IsYUFBcUI7UUFDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkMsSUFBSSxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQyxJQUFJLEtBQUssR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxVQUFVLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFBSSxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQyxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEMsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQzFCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUM1RixDQUFDO0lBQ0csb0JBQVksR0FBbkIsVUFBb0IsS0FBSztRQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBQ0YsY0FBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVGltZUxpYiB7XHJcblx0cHJpdmF0ZSBtb250aHMgPSBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl07XHJcblx0Ly8gUmV0dXJuIGZvcm1hdCBpczogOC8xLzIwMTggMTU6MjI6MjJcclxuICAgIHN0YXRpYyBlcG9jaFRvSHVtYW4odW5peFRpbWVzdGFtcDogbnVtYmVyKTpzdHJpbmcge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodW5peFRpbWVzdGFtcCk7XHJcbiAgICAgICAgbGV0IHllYXIgPSBcIlwiICsgZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIGxldCBtb250aCA9IFwiXCIgKyAoZGF0ZS5nZXRNb250aCgpICsgMSk7XHJcbiAgICAgICAgbGV0IGRheU9mTW9udGggPSBcIlwiICsgZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgbGV0IGhvdXIgPSBcIlwiICsgZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgIGlmKGhvdXIubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgaG91ciA9IFwiMFwiICsgaG91cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1pbnV0ZSA9IFwiXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICBpZihtaW51dGUubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgbWludXRlID0gXCIwXCIgKyBtaW51dGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWNvbmQgPSBcIlwiICsgZGF0ZS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgaWYoc2Vjb25kLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHNlY29uZCA9IFwiMFwiICsgc2Vjb25kO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9udGggKyBcIi9cIiArIGRheU9mTW9udGggKyBcIi9cIiArIHllYXIgKyBcIiBcIiArIGhvdXIgKyBcIjpcIiArIG1pbnV0ZSArIFwiOlwiICsgc2Vjb25kO1xyXG4gICAgfVxyXG5cdHN0YXRpYyBodW1hblRvRXBvY2goaHVtYW4pOm51bWJlciB7XHJcblx0XHRsZXQgZGF0ZSA9IG5ldyBEYXRlKGh1bWFuKTtcclxuXHRcdHJldHVybiBkYXRlLmdldFRpbWUoKSAvIDEwMDA7XHJcblx0fVxyXG59XHJcbiJdfQ==