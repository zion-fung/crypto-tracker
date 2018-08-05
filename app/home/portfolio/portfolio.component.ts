import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Portfolio } from "./portfolio";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { PortfolioInput } from "./portfolio-input/portfolio-input.component";
import { NameMapper } from "../name-mapper";
import { jsonlib } from "../jsonlib";

@Component({
    moduleId: module.id,
    selector: 'portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
    portfolio: Portfolio;
    entries;
    constructor(private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {}
	ngOnInit() {
        this.portfolio = new Portfolio();
        this.entries = this.portfolio.getEntries();
    }
    async newPortfolioEntry() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef
        };
        console.log("Opening dialog");
        let result = await this.modalService.showModal(PortfolioInput, options);
        console.log(result);
        // User added new entry to portfolio
        if(JSON.stringify(result) != "{}") {
            let price = await this.getPrice(result.name);
            this.portfolio.addEntry(NameMapper.getId(result.name), result.name, price, result.amountOwned, result.purchasedPrice, result.datePurchased);
        }
        console.log(this.portfolio);
        this.entries = this.portfolio.getEntries();
    }
    // Given the name of a coin return its price
    async getPrice(name: string) {
        let response = await fetch("https://api.coinmarketcap.com/v2/ticker/" + NameMapper.getId(name));
        let json = await response.json();
        return jsonlib.nestedJsonFinder(json, "data.quotes.USD.price");
    }
}
