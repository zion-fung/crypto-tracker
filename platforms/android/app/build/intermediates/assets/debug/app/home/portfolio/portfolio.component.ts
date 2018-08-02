import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Portfolio } from "./portfolio";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { DialogContent } from "./dialog-content.component";

@Component({
    moduleId: module.id,
    selector: 'portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
    portfolio: Portfolio;
    constructor(private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {}
	ngOnInit() {}
    async newPortfolioEntry() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef
        };
        let result = await this.modalService.showModal(DialogContent, options);
        console.log(result);
    }
}
