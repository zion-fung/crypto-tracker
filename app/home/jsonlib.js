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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbmxpYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpzb25saWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO0lBZ0NBLENBQUM7SUEvQkEscUdBQXFHO0lBQ2xHLGdFQUFnRTtJQUNoRSw4Q0FBOEM7SUFDdkMsd0JBQWdCLEdBQXZCLFVBQXdCLElBQUksRUFBRSxJQUFXO1FBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFBLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNwQixDQUFDO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUYsQ0FBQztJQUNMLENBQUM7SUFDSiwrREFBK0Q7SUFDckQsZUFBTyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDSiw2RkFBNkY7SUFDbkYsa0JBQVUsR0FBakIsVUFBa0IsR0FBTSxFQUFFLElBQUk7UUFDMUIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQztRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDZixNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDO0FBaENZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIGpzb25saWIge1xuXHQvLyBHaXZlbiBhIGpzb24gb2JqZWN0LCByZXR1cm4gdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBnaXZlbiBrZXkuIFRoZSBrZXkgY2FuIHNwYW4gbXVsdGlwbGUgbGF5ZXJzLlxuICAgIC8vIEV4YW1wbGUga2V5czogXCJkYXRhLm5hbWVcIiwgXCJkYXRhXCIsIFwicmFua1wiLCBcInF1b3Rlcy5VU0QucHJpY2VcIlxuICAgIC8vIElmIGl0IGlzIG5vdCBmb3VuZCwgXCJ1bmRlZmluZWRcIiBpcyByZXR1cm5lZFxuICAgIHN0YXRpYyBuZXN0ZWRKc29uRmluZGVyKGRhdGEsIHBhdGg6c3RyaW5nKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHBhdGguaW5kZXhPZihcIi5cIik7XG4gICAgICAgIGlmKGluZGV4ID09IC0xKSB7XG4gICAgICAgIFx0aWYoZGF0YVtwYXRoXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgXHRcdHJldHVybiBcInVuZGVmaW5lZFwiO1xuICAgICAgICBcdH1cbiAgICAgICAgICAgIHJldHVybiBkYXRhW3BhdGhdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmVzdGVkSnNvbkZpbmRlcihkYXRhW3BhdGguc3Vic3RyaW5nKDAsIGluZGV4KV0sIHBhdGguc3Vic3RyaW5nKGluZGV4ICsgMSkpO1xuICAgICAgICB9XG4gICAgfVxuXHQvLyBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBvZiB0aGUga2V5cyBpbiB0aGUgZ2l2ZW4ganNvbiBvYmplY3RcbiAgICBzdGF0aWMgZ2V0S2V5cyhqc29uKSB7XG4gICAgICAgIGxldCBhcnIgPSBbXTtcbiAgICAgICAgZm9yKHZhciBqIGluIGpzb24pIHtcbiAgICAgICAgICAgIGFyci5wdXNoKGopO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXHQvLyBHaXZlbiBhIGpzb24gb2JqZWN0LCByZXR1cm4gYW4gYXJyYXkgb2YganNvbiBvYmplY3RzIHRoYXQgYXJlIHNvcnRlZCBieSB0aGUgZnVuY3Rpb24gZ2l2ZW5cbiAgICBzdGF0aWMganNvblNvcnRlcihvYmo6e30sIGZ1bmMpIHtcbiAgICAgICAgbGV0IGFyciA9IFtdO1xuICAgICAgICBmb3IodmFyIG8gaW4gb2JqKSB7XG4gICAgICAgICAgICBhcnIucHVzaChvYmpbb10pO1xuICAgICAgICB9XG4gICAgICAgIGFyci5zb3J0KGZ1bmMpO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cbn1cbiJdfQ==