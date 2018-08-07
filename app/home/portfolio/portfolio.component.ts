import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Portfolio } from "./portfolio";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { PortfolioInput } from "./portfolio-input/portfolio-input.component";
import { NameMapper } from "../name-mapper";
import { jsonlib } from "../jsonlib";
var Sqlite = require( "nativescript-sqlite" );

@Component({
    moduleId: module.id,
    selector: 'portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
    private database: any;
    portfolio: Portfolio;
    entries;
    constructor(private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
        (new Sqlite("crypto.db")).then(db => {
            db.resultType(Sqlite.RESULTSASOBJECT);
            db.execSQL("CREATE TABLE IF NOT EXISTS portfolio(id INTEGER, name TEXT, price REAL, amountOwned REAL, purchasedPrice REAL, datePurchased TEXT)").then(result => {
                this.database = db;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("Open database error", error);
        });
    }
	ngOnInit() {
        this.portfolio = new Portfolio();
        this.entries = this.portfolio.getEntries();
    }
    newPortfolioEntry() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef
        };
        console.log("Opening dialog");
        this.modalService.showModal(PortfolioInput, options).then(
            result => {
                console.log(result);
                if(!result) {
                    return;
                }
                // User added new entry to portfolio
                if(JSON.stringify(result) != "{}") {
                    this.getPrice(result.name).then(price => {
                        // this.portfolio.addEntry(NameMapper.getId(result.name), result.name, price, result.amountOwned, result.purchasedPrice, result.datePurchased);
                        this.insertData(NameMapper.getId(result.name), result.name, price, result.amountOwned, result.purchasedPrice, result.datePurchased);
                    });
                }
                // console.log(this.portfolio);
                // this.entries = this.portfolio.getEntries();
            }, error => {
                console.log("Error on portfolio input response");
            })
    }
    // Given the name of a coin return its price
    async getPrice(name: string) {
        let response = await fetch("https://api.coinmarketcap.com/v2/ticker/" + NameMapper.getId(name));
        let json = await response.json();
        return jsonlib.nestedJsonFinder(json, "data.quotes.USD.price");
    }
    insertData(id: number, name: string, price: number, amountOwned: number, purchasedPrice: number, datePurchased: string) {
        this.database.execSQL("INSERT INTO portfolio (id, name, price, amountOwned, purchasedPrice, datePurchased) values (?, ?, ?, ?, ?, ?)", [id, name, price, amountOwned, purchasedPrice, datePurchased]).then(
            result => {
                console.log("Done inserting!");
            }, error => {
                console.log("ERROR INSERTING DATA", error);
            }
        )
    }
    clearData() {
        this.database.execSQL("DELETE FROM portfolio").then(
            success => {
                console.log("Deleted portfolio table");
            }, error => {
                console.log("Error deleting table", error);
            }
        )
    }
}
