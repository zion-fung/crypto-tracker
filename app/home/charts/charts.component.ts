import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { jsonlib } from "../jsonlib"
import { Page, isAndroid } from "ui/page";
import { SearchBar } from "ui/search-bar";
import { CoinInfo } from "./coin-info/coin-info.component";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { NameMapper } from "../name-mapper";
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
var Sqlite = require( "nativescript-sqlite" );
import { action } from "ui/dialogs";
import { desiredKeys, GlobalSettings } from "../global_settings";

@Component({
    selector: "charts",
    moduleId: module.id,
    templateUrl: "./charts.component.html",
    styleUrls: ["./charts.component.scss"]
})
// TODO: Add dropdowns to change exchange and maybe pick favorites?
export class ChartsComponent implements OnInit {
    currency: string = "USD";
    exchange: string = "CoinMarketCap";
    private database: any;
    controller: AbortController;
    signal: AbortSignal;
    constructor(private page: Page, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
        page.actionBarHidden = true;
        Sqlite.deleteDatabase("crypto.db");
        (new Sqlite("crypto.db")).then(db => {
            db.resultType(Sqlite.RESULTSASOBJECT);
            this.database = db;
            db.execSQL("CREATE TABLE IF NOT EXISTS market(rank INTEGER, name TEXT, symbol TEXT, price REAL, marketcap REAL, volume REAL, twentyFourHour REAL, sevenDay REAL, oneHour REAL)").then(result => {
                console.log("Market table creation successful");
                this.database.execSQL("DELETE FROM market");
                this.printData();
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("Open database error", error);
        });
    }
	desiredKeys = {};
	headers = [];
    private url = "https://api.coinmarketcap.com/v2/ticker/?structure=array";
    data = [];
    dataCopy = [];
    static staticData = [];
    static getDataCopy() {
        return this.staticData;
    }
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
            for(let key in desiredKeys) {
                desiredKeys[key] = desiredKeys[key].replace(re, convert);
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
        for (let info of data) {
            let parsedData = this.parseData(info);
            await this.database.execSQL("INSERT INTO market (rank, name, symbol, price, marketcap, volume, twentyFourHour, sevenDay, oneHour) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [parsedData["rank"], parsedData["name"], parsedData["symbol"], parsedData["price"], parsedData["marketcap"], parsedData["volume"], parsedData["24h"], parsedData["7d"], parsedData["1h"]]);
            this.data.push(parsedData);
        }
    }
    private parseData(data: any) {
        let newData = {};
        for (let key in desiredKeys) {
            let value = jsonlib.nestedJsonFinder(data, desiredKeys[key]);
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
                } else if (valueNumber % 1 != 0) { // number is a float
                    if(valueNumber > .20 || valueNumber < 0) {
                        newData[key] = valueNumber.toFixed(2);
                    } else {
                        newData[key] = valueNumber.toFixed(3);
                    }
                } else {
                    newData[key] = valueNumber.toFixed(0);
                }
                // Otherwise store it
            }
        }
        return newData;
    }

    async ngOnInit() {
        await this.getData(this.url, this.data, 1, 100, GlobalSettings.getCurrency());
        await this.getData(this.url, this.data, 101, 100, GlobalSettings.getCurrency());
        this.dataCopy = this.data.slice(0);
        ChartsComponent.staticData = this.dataCopy;
        this.headers = jsonlib.getKeys(desiredKeys);
        console.log("Hello world!");
    }
    // Given two json objects, returns a comparison of their rank value
    rankCompare(a, b) {
        return a.rank - b.rank;
    }
    onTap(args) {
        // console.log("Tap!");
        // console.log(args);
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
    // With all of the results in this.data from the start, no need for requests
    baseURL = "https://api.coinmarketcap.com/v2/ticker/";
    filterResults(substring: string) {
        if(substring == "") {
            this.revertData();
            return;
        }
        substring = substring.toLowerCase();
        // console.log("Searching for: " + substring);
        let filteredData = [];
        // Loop through data and push to new array that have the substring
        for(var obj of this.dataCopy) {
            if(obj.name.toLowerCase().indexOf(substring) != -1) {
                filteredData.push(obj);
            }
        }
        this.data = filteredData.slice(0);
        console.log("Data has " + this.data.length + " elements");
    }
    clearSearch(search: SearchBar) {
        this.revertData();
    }
    revertData() {
        console.log("Reverting data");
        this.data = this.dataCopy.slice(0);
    }
    num = 1;
    letters = "1234567890QWERTYUIOPASDFGHJKLZCVBNM";
    insertData() {
        let word = "";
        let max = this.letters.length;
        for(var i = 0;i < 10;i++) {
            word += this.letters.charAt(Math.floor(Math.random() * max));
        }
        this.database.execSQL("INSERT INTO market (rank, name) values (?, ?)", [this.num, word]).then(
            result => {
                console.log("Done inserting!");
                this.printData();
                this.num++;
            }, error => {
                console.log("ERROR INSERTING", error);
        });
    }
    printData() {
        this.database.all("SELECT * FROM market").then(
            result => {
                console.log(result);
            }, error => {
                console.log("Error fetching data", error);
            } 
        )
    }
    async changeCurrency() {
        let options = {
            title: "Choose a currency",
            cancelButtonText: "Cancel",
            actions: ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "USD", "ZAR", "BTC", "ETH", "XRP", "LTC", "BCH"]
        };
        await action(options).then(
            result => {
                if(result == "Cancel") {
                    return null;
                }
                this.currency = result;
                GlobalSettings.setCurrency(result);
                // Delete the table
                this.database.execSQL("DELETE FROM market").then(
                    success => {
                        
                    }, error => {
                        console.log("Error deleting market table from currency selection", error);
                        return;
                    }
                )
            }, error => {
                return;
            }
        )
        this.data = [];
        this.getData(this.url, this.data, 1, 100, GlobalSettings.getCurrency());
        this.getData(this.url, this.data, 101, 100, GlobalSettings.getCurrency());
        this.dataCopy = this.data.slice(0);
    }
    changeExchange() {
        let options = {
            title: "Choose a data source",
            cancelButtonText: "Cancel",
            actions: ["CoinMarketCap", "Bittrex", "Binance"]
        };
        action(options).then(
            result => {
                this.exchange = result;
            }, error => {

            }
        )
    }
}
