import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "ui/page";
import { GlobalSettings } from "./global_settings";
var Sqlite = require( "nativescript-sqlite" );

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
// TODO: Add dropdowns to change exchange and maybe pick favorites?
export class HomeComponent implements OnInit {
    ngOnInit() {}
    private database: any;
    constructor(private page: Page) {
        page.actionBarHidden = true;
        (new Sqlite("crypto.db")).then(
            db => {
                db.resultType(Sqlite.RESULTSASOBJECTS);
                console.log("Successfully opened database in home");
                this.database = db;
            }, error => {
                console.log("Error opening database in home", error);
            }
        )
    }
    printMarket() {
        this.database.all("SELECT * FROM market").then(
            result => {
                console.log(result);
            }
        )
    }
    printPortfolio() {
        this.database.all("SELECT * FROM portfolio").then(
            table => {
                console.log("Portfolio table:", table);
            }, err => {
                console.log("Error printing table: ", err);
            }
        )
    }
    clearMarket() {
        this.database.execSQL("DELETE FROM market").then(
            success => {
                console.log("Successfully cleared market");
            }, error => {
                console.log("Error clearing market", error);
            }
        )
    }
    clearPorfolio() {
        this.database.execSQL("DELETE FROM porfolio").then(
            success => {
                console.log("Successfully cleared portfolio");
            }, error => {
                console.log("Error clearing portfolio", error);
            }
        )
    }
    printCurrency() {
        console.log(GlobalSettings.getCurrency());
    }
}
