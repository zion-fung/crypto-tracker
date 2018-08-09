import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { TextField } from "ui/text-field";
import { ModalDatetimepicker, PickerOptions, PickerResponse } from "nativescript-modal-datetimepicker";
import { alert } from "ui/dialogs";
import { NameMapper } from "../../name-mapper";
import { isAndroid } from "ui/page";
import { SearchBar } from '../../../../node_modules/tns-core-modules/ui/search-bar/search-bar';
var Sqlite = require( "nativescript-sqlite" );
import { PortfolioVerify } from "./portfolio-verify";

@Component({
    selector: "modal-content",
    templateUrl: "./home/portfolio/portfolio-input/portfolio-input.component.html",
    styleUrls: ['./home/portfolio/portfolio-input/portfolio-input.component.scss']
})
// TODO: Remove human ability to enter date and add functionality of buttons and search bar
export class PortfolioInput {
    private incorrectDateString = "Date must be in format: DD/MM/YYYY and not in the future";
    // Contains the ids of every field that must be filled out
    private ids = ["name", "amountOwned", "purchasedPrice", "datePurchased"];
    // Contains the results of the dialog and their default values
    results = {};
    searchResults = [];
    market = [];
    private database: any;
    showResults:boolean = false;
    searchBar: SearchBar;
    defaultPrice: string;
    constructor(private params: ModalDialogParams, private picker: ModalDatetimepicker) {
        (new Sqlite("crypto.db")).then(
            db => {
                db.resultType(Sqlite.RESULTSASOBJECTS);
                this.database = db;
                this.database.all("SELECT * FROM market").then(
                    result => {
                        this.market = result;
                    }
                )
            }, error => {
                console.log("Error opening database in portfolio input", error);
            }
        )
    }
    currentPrice:number;
    inputOpacity = "1";
    ngOnInit() {
        let today = new Date();
        this.results["datePurchased"] = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();    
        this.results["amountOwned"] = 0;
        this.results["name"] = "";
    }
    /* @param obj : The textfield object containing the text and id
    *
    * */
    update(obj: TextField) {
        let text = obj.text;
        if(text != undefined) {
            this.results[obj.id] = text;
        }
    }
    increaseAmountOwned() {
        this.results["amountOwned"]++;
    }
    decreaseAmountOwned() {
        if(this.results["amountOwned"] > 0) {
            this.results["amountOwned"]--;
        }
    }
    // Returns the results of the dialog
    public add() {
        if(this.results["datePurchased"] && !this.verifyDate(this.results["datePurchased"])) {
            alert(this.incorrectDateString);
            return;
        }
        if(!this.verifyFields()) {
            alert("All fields must be filled out");
            return;
        }
        if(!this.verifyCoin(this.results["name"])) {
            alert("Coin does not exist");
            return;
        }
        this.params.closeCallback(this.results);
    }
    // Returns an empty object since the dialog was canceled
    public close() {
        let result = {};
        this.params.closeCallback(result);
    }
    showDateTimePicker() {
        let startDate = new Date(this.results["datePurchased"]);
        // Verify that date is in correct format
        if(!this.verifyDate(startDate.toString())) {
            // alert(this.incorrectDateString);
            // return;
            startDate = new Date();
        }
        // If it is not a number, then no date was chosen
        if(isNaN(Number(startDate))) {
            startDate = new Date();
        }
        let options: PickerOptions = {
            is24HourView: false,
            cancelLabel: "Cancel",
            doneLabel: "Done",
            startingDate: startDate
        };
        this.picker.pickDate(options).then(
            result => {
                let response = <PickerResponse>result;
                this.results["datePurchased"] = response.month + "/" + response.day + "/" + response.year;
            }
        )
    }
    // Given a date string verify if it's valid and has a year of 4 digits
    private verifyDate(dateString: string):boolean {
        return PortfolioVerify.verifyDate(dateString);
    }
    // Verifies that every field is filled out
    private verifyFields():boolean {
        for(var field of this.ids) {
            if(!this.results[field]) {
                return false;
            }
        }
        return true;
    }
    // Verifies that the coin inputed by the user actually exists
    private verifyCoin(name: string):boolean {
        if(NameMapper.getId(name)) {
            return true;
        }
        return false;
    }
    clearFocus(search) {
        this.searchBar = search;
        if(isAndroid) {
            search.android.clearFocus();
        }
    }
    filterResults(substring: string) {
        if(substring == "") {
            this.clearResults();
            this.inputOpacity = "1";
            this.showResults = false;
            return;
        }
        this.showResults = true;
        this.inputOpacity = "0";
        substring = substring.toLowerCase();
        this.searchResults = [];
        // Look through charts data and find coins that match
        for(var data of this.market) {
            let name:string = data.name;
            if(name.toLowerCase().indexOf(substring) != -1) {
                this.searchResults.push(data.name);
            }
        }
        this.searchBar.focus();
    }
    clearResults() {
        this.searchResults = [];
        this.results["name"] = "";
    }
    resetPrice() {
        this.results["purchasedPrice"] = this.defaultPrice;
    }
    chooseName(name:string):void {
        // Set name label
        this.results["name"] = name;
        // Set search bar text to name
        this.searchBar.text = name;
        // Clear results
        this.searchResults = [];
        // Hide results element and show input fields
        this.showResults = false;
        this.inputOpacity = "1";
        // Get price and set it to the text field and default price
        name = name.toLowerCase();
        for(var coin of this.market) {
            // Found matching object
            if(coin["name"].toLowerCase() == name) {
                this.defaultPrice = coin["price"].toFixed(2);
                this.results["purchasedPrice"] = this.defaultPrice;
                break;
            }
        }
    }
}