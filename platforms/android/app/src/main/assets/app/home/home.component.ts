import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "ui/page";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
// TODO: Add dropdowns to change exchange and maybe pick favorites?
export class HomeComponent implements OnInit {
    ngOnInit() {}
    constructor(private page: Page) {
        page.actionBarHidden = true;
    }
}
