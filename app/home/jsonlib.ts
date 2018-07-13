export class jsonlib {
	// Given a json object, return the value associated with given key. The key can span multiple layers.
    // Example keys: "data.name", "data", "rank", "quotes.USD.price"
    // If it is not found, "undefined" is returned
    static nestedJsonFinder(data, path:string) {
        let index = path.indexOf(".");
        if(index == -1) {
        	if(data[path] == undefined) {
        		return "undefined";
        	}
            return data[path];
        } else {
            return this.nestedJsonFinder(data[path.substring(0, index)], path.substring(index + 1));
        }
    }
	// Returns an array of all of the keys in the given json object
    static getKeys(json) {
        let arr = [];
        for(var j in json) {
            arr.push(j);
        }
        return arr;
    }
	// Given a json object, return an array of json objects that are sorted by the function given
    static jsonSorter(obj:{}, func) {
        let arr = [];
        for(var o in obj) {
            arr.push(obj[o]);
        }
        arr.sort(func);
        return arr;
    }
}
