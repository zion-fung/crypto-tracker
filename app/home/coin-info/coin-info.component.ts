import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { TextField } from "ui/text-field";
import { ModalDatetimepicker, PickerOptions, PickerResponse } from "nativescript-modal-datetimepicker";
import { alert } from "ui/dialogs";
import { screen } from "tns-core-modules/platform/platform"

@Component({
    selector: "coin-info",
    templateUrl: "./home/coin-info/coin-info.component.html"
})
export class CoinInfo {
    private data:object = {};
    private modalWidth;
    // Percent of screen width
    private modalWidthPercent = .90;
    constructor(private params: ModalDialogParams, private picker: ModalDatetimepicker) {
        this.data = this.params.context;
    }
    public close() {
        this.params.closeCallback();
    }
    ngOnInit() {
        this.modalWidth = screen.mainScreen.widthPixels * this.modalWidthPercent + "px";
    }
}