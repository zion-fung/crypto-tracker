import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { jsonlib } from "./jsonlib"
import { Page, isAndroid } from "ui/page";
import { SearchBar } from "ui/search-bar";
import { CoinInfo } from "./coin-info/coin-info.component";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { NameMapper } from "./name-mapper";
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
// TODO: Add dropdowns to change exchange and maybe pick favorites?
export class HomeComponent implements OnInit {
    controller: AbortController;
    signal: AbortSignal;
    constructor(private page: Page, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
        page.actionBarHidden = true;
    }
	desiredKeys = {
		"rank": "rank",
		"name": "name",
        "symbol": "symbol",
		"price": "quotes.USD.price",
        "marketcap": "quotes.USD.market_cap",
        "volume": "quotes.USD.volume_24h",
        "24h": "quotes.USD.percent_change_24h",
        "7d": "quotes.USD.percent_change_7d",
        "1h": "quotes.USD.percent_change_1h"
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
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        let a = await fetch(url, {method: "GET", signal: this.signal});
        let json = await a.json();
        // Checks to see if there was an error in the request
        if(json.metadata.error != null) { 
            console.log("Error requesting data");
            console.log(json.metadata.error);
            return;
        }
        // Parses the data and stores it
        let data = json.data;
        storage.push(this.parseData(data));
    }
    private parseData(data: any) {
        let storage = [];
        for (let info of data) {
            let newData = {};
            for (let key in this.desiredKeys) {
                let value = jsonlib.nestedJsonFinder(info, this.desiredKeys[key]);
                let valueNumber = Number(value);
                // If it is a number add a $ at the beginning and add commas
                if (isNaN(valueNumber)) {
                    newData[key] = value;
                }
                else {
                    // If value number is a float, reduce it to 2 decimal places
                    // Custom rules here
                    if (key == "volume") {
                        // Don't show decimal places of volume and add commas
                        newData[key] = this.addCommas(valueNumber.toFixed(0));
                    }
                    else if (key == "marketcap") {
                        newData[key] = this.addCommas(valueNumber);
                    }
                    else if (valueNumber % 1 != 0) {
                        newData[key] = valueNumber.toFixed(2);
                    }
                    else {
                        newData[key] = valueNumber.toFixed(0);
                    }
                    // Otherwise store it
                }
            }
            storage.push(newData);
        }
        return storage;
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
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            context: args
        };
        this.modalService.showModal(CoinInfo, options);
    }
    clearFocus(search) {
        if(isAndroid) {
            search.android.clearFocus();
        }
    }
    addCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // TODO: create function to sort through results
    baseURL = "https://api.coinmarketcap.com/v2/ticker/";
    async filterResults(substring: string) {
        // Cancel all current requests
        this.controller.abort();
        // Find all id's in NameMapper that match substring
        let matchedIds:number[] = NameMapper.findIds(substring);
        // Make request for those id's
        let data = [];
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        for(var id of matchedIds) {
            let response = await fetch(this.baseURL + id, {signal: this.signal});
            let json = await response.json();
            data.push(this.parseData(json.data));
        }
        // Sort data
        data.sort(this.rankCompare);
        // Update existing data array
        this.data = [];
        this.data.push(data);
    }
}
