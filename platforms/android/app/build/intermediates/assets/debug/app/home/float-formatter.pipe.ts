import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: "floatFormatter"})
export class FloatFormatter implements PipeTransform {
    transform(value: any):string {
        let number:number;
        let str:string;
        if(isNaN(value)) {
            str = value;
            number = Number(value);
        } else {
            number = value;
            str = value.toLocaleString();
        }
        // If number is not a float, return it
        if(str.indexOf(".") == -1) {
            return value;
        }
        // If the number is greater than 1 truncate to 2 decimal places
        if(number > 1) {
            return number.toFixed(2);
        } else { // If the number is less than 1 truncate to 3 decimal places
            return number.toFixed(3);
        }
        
    }
}