import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
    selector: "my-modal",
    templateUrl: "./portfolio.modal.html",
})
export class ModalComponent {

    public frameworks: Array<string>;

    public constructor(private params: ModalDialogParams) {
        this.frameworks = [
            "NativeScript",
            "Xamarin",
            "Onsen UI",
            "Ionic Framework",
            "React Native"
        ];
    }

    public close(res: string) {
        this.params.closeCallback(res);
    }

}