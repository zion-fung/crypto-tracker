export class TimeLib {
	private months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// Return format is: 8/1/2018 15:22:22
    static epochToHuman(unixTimestamp: number):string {
        let date = new Date(unixTimestamp);
        let year = "" + date.getFullYear();
        let month = "" + (date.getMonth() + 1);
        let dayOfMonth = "" + date.getDate();
        let hour = "" + date.getHours();
        if(hour.length == 1) {
            hour = "0" + hour;
        }
        let minute = "" + date.getMinutes();
        if(minute.length == 1) {
            minute = "0" + minute;
        }
        let second = "" + date.getSeconds();
        if(second.length == 1) {
            second = "0" + second;
        }
        return month + "/" + dayOfMonth + "/" + year + " " + hour + ":" + minute + ":" + second;
    }
	static humanToEpoch(human):number {
		let date = new Date(human);
		return date.getTime() / 1000;
	}
}
