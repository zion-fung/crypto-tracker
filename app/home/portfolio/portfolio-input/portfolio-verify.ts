export class PortfolioVerify {
    // Returns true if date is valid, else false
    static verifyDate(dateString: string):boolean {
        let date = new Date(dateString);
        // Not a number = not a valid date
        if(isNaN(Number(date))) {
            return false;
        }
        // Check if date is in the future
        let currentDate = new Date();
        let a = Number(date);
        let b = Number(currentDate);
        // Date is in the future
        if(a > b) {
            return false;
        }
        return true;
    }
}