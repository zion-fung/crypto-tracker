import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { TextField } from "ui/text-field";
import { ModalDatetimepicker } from "nativescript-modal-datetimepicker";

@Component({
    selector: "modal-content",
    templateUrl: "./home/portfolio/dialog-content.component.html"
})
export class DialogContent {
    public prompt: string;
    headers = [
        {"id": "name", "hint": "Name", "keyboardType": "email"},
        {"id": "amountOwned", "hint": "Amount Owned", "keyboardType": "number"},
        {"id": "purchasePrice", "hint": "Purchase Price", "keyboardType": "number"},
        {"id": "datePurchased", "hint": "Date Purchased", "keyboardType": "datetime"}
    ];
    // Contains the results of the dialog and their default values
    results = {};
    constructor(private params: ModalDialogParams, private picker: ModalDatetimepicker) {
        this.prompt = params.context.promptMsg;
    }
    amountOwned: number;

    /* @param obj : The textfield object containing the text and id
    *
    * */
    update(obj: TextField) {
        let text = obj.text;
        if(text != undefined) {
            this.results[obj.id] = text;
        }
    }
    // Returns the reuslts of the dialog
    public add() {
        this.params.closeCallback(this.results);
    }
    // Returns an empty object since the dialog was canceled
    public close() {
        let result = {};
        this.params.closeCallback(result);
    } 
}