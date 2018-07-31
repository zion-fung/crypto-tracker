"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonlib = /** @class */ (function () {
    function jsonlib() {
    }
    // Given a json object, return the value associated with given key. The key can span multiple layers.
    // Example keys: "data.name", "data", "rank", "quotes.USD.price"
    // If it is not found, "undefined" is returned
    jsonlib.nestedJsonFinder = function (data, path) {
        var index = path.indexOf(".");
        if (index == -1) {
            if (data[path] == undefined) {
                return "undefined";
            }
            return data[path];
        }
        else {
            return this.nestedJsonFinder(data[path.substring(0, index)], path.substring(index + 1));
        }
    };
    // Returns an array of all of the keys in the given json object
    jsonlib.getKeys = function (json) {
        var arr = [];
        for (var j in json) {
            arr.push(j);
        }
        return arr;
    };
    // Given a json object, return an array of json objects that are sorted by the function given
    jsonlib.jsonSorter = function (obj, func) {
        var arr = [];
        for (var o in obj) {
            arr.push(obj[o]);
        }
        arr.sort(func);
        return arr;
    };
    return jsonlib;
}());
exports.jsonlib = jsonlib;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbmxpYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpzb25saWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO0lBZ0NBLENBQUM7SUEvQkEscUdBQXFHO0lBQ2xHLGdFQUFnRTtJQUNoRSw4Q0FBOEM7SUFDdkMsd0JBQWdCLEdBQXZCLFVBQXdCLElBQUksRUFBRSxJQUFXO1FBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFBLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNwQixDQUFDO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUYsQ0FBQztJQUNMLENBQUM7SUFDSiwrREFBK0Q7SUFDckQsZUFBTyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDSiw2RkFBNkY7SUFDbkYsa0JBQVUsR0FBakIsVUFBa0IsR0FBTSxFQUFFLElBQUk7UUFDMUIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQztRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDZixNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDO0FBaENZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIGpzb25saWIge1xyXG5cdC8vIEdpdmVuIGEganNvbiBvYmplY3QsIHJldHVybiB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGdpdmVuIGtleS4gVGhlIGtleSBjYW4gc3BhbiBtdWx0aXBsZSBsYXllcnMuXHJcbiAgICAvLyBFeGFtcGxlIGtleXM6IFwiZGF0YS5uYW1lXCIsIFwiZGF0YVwiLCBcInJhbmtcIiwgXCJxdW90ZXMuVVNELnByaWNlXCJcclxuICAgIC8vIElmIGl0IGlzIG5vdCBmb3VuZCwgXCJ1bmRlZmluZWRcIiBpcyByZXR1cm5lZFxyXG4gICAgc3RhdGljIG5lc3RlZEpzb25GaW5kZXIoZGF0YSwgcGF0aDpzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSBwYXRoLmluZGV4T2YoXCIuXCIpO1xyXG4gICAgICAgIGlmKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgXHRpZihkYXRhW3BhdGhdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIFx0XHRyZXR1cm4gXCJ1bmRlZmluZWRcIjtcclxuICAgICAgICBcdH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFbcGF0aF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmVzdGVkSnNvbkZpbmRlcihkYXRhW3BhdGguc3Vic3RyaW5nKDAsIGluZGV4KV0sIHBhdGguc3Vic3RyaW5nKGluZGV4ICsgMSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHQvLyBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBvZiB0aGUga2V5cyBpbiB0aGUgZ2l2ZW4ganNvbiBvYmplY3RcclxuICAgIHN0YXRpYyBnZXRLZXlzKGpzb24pIHtcclxuICAgICAgICBsZXQgYXJyID0gW107XHJcbiAgICAgICAgZm9yKHZhciBqIGluIGpzb24pIHtcclxuICAgICAgICAgICAgYXJyLnB1c2goaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblx0Ly8gR2l2ZW4gYSBqc29uIG9iamVjdCwgcmV0dXJuIGFuIGFycmF5IG9mIGpzb24gb2JqZWN0cyB0aGF0IGFyZSBzb3J0ZWQgYnkgdGhlIGZ1bmN0aW9uIGdpdmVuXHJcbiAgICBzdGF0aWMganNvblNvcnRlcihvYmo6e30sIGZ1bmMpIHtcclxuICAgICAgICBsZXQgYXJyID0gW107XHJcbiAgICAgICAgZm9yKHZhciBvIGluIG9iaikge1xyXG4gICAgICAgICAgICBhcnIucHVzaChvYmpbb10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIuc29ydChmdW5jKTtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==