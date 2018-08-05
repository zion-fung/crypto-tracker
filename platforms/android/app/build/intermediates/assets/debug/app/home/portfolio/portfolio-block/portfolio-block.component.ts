import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'portfolio-block',
    templateUrl: './portfolio-block.component.html',
    styleUrls: ['./portfolio-block.component.css']
})

export class PortfolioBlockComponent{
    @Input() name;
    @Input() amountOwned;
    @Input() price;
    @Input() datePurchased;
}