import { Component, OnInit } from "@angular/core";
import { jsonlib } from "./jsonlib"
import { Page, isAndroid } from "ui/page";
import { SearchBar } from "ui/search-bar";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    constructor(private page: Page) {
        page.actionBarHidden = true;
    }
	desiredKeys = {
		"Rank": "rank",
		"Name": "name",
        "Symbol": "symbol",
		"Price": "quotes.USD.price",
        "Marketcap": "quotes.USD.market_cap",
        "%_change_24h": "quotes.USD.percent_change_24h",
        "%_change_7d": "quotes.USD.percent_change_7d"
	}
	headers = [];
    url = "https://api.coinmarketcap.com/v2/ticker/?structure=array";
    data = [];
    // Given a url and an array, gets the data from the array and parses it into the array
    // Additionally it takes an optional start number, limit, and different currency
    async getData(url, storage, start?:number, limit?:number, convert?:string) {
        if(start) {
            url += "&start=" + start;
        }
        if(limit) {
            url += "&limit=" + limit;   
        }
        if(convert) {
            url += "&convert=" + convert;
            // Switch from default currency in desiredKeys
            let re = /USD/gi;
            for(let key in this.desiredKeys) {
                this.desiredKeys[key] = this.desiredKeys[key].replace(re, convert);
            }
        }
        console.log(url);
        // Gets json from the url
        let a = await fetch(url);
        let json = await a.json();
        // Checks to see if there was an error in the request
        if(json.metadata.error != null) { 
            console.log("Error requesting data");
            console.log(json.metadata.error);
            return;
        }
        // Parses the data and stores it
        let data = json.data;
        for(let info of data) {
            let newData = {};
            for(let key in this.desiredKeys) {
                let value = jsonlib.nestedJsonFinder(info, this.desiredKeys[key]);
                let valueNumber = Number(value);
                // If it is a number add a $ at the beginning and add commas
                if(isNaN(valueNumber)) {
                    newData[key] = value;
                } else {
                    // If value number is a float, reduce it to 2 decimal places
                    if(valueNumber % 1 != 0) {
                        newData[key] = valueNumber.toFixed(2);
                    } else {
                        newData[key] = valueNumber.toFixed(0);
                    }
                    // Otherwise store it
                }
            }
            storage.push(newData);
        }
    }
    ngOnInit() {
        this.getData(this.url, this.data, 1, 30);
        this.headers = jsonlib.getKeys(this.desiredKeys);
        console.log("Hello world!");
    }
    // Given two json objects, returns a comparison of their rank value
    rankCompare(a, b) {
        return a.rank - b.rank;
    }
    onTap(args) {
        console.log("Tap!");
        console.log(args);
    }
    clearFocus(search) {
        if(isAndroid) {
            search.android.clearFocus();
        }
    }
}
