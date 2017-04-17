export class TimeUtil {

    static simpleDate(dateString: any): string {
        let date;
        if (typeof(dateString) == 'string') {
            date = new Date(dateString);
        } else {
            date = dateString;
        }

        let month = this.getMonthName(date.getMonth()),
            day = date.getDate(),
            year = date.getFullYear();

        return month + ' ' + day + ', ' + year;
    }

    static getMonthName(month: number): string {
        switch(month) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
        }
    }

    static simpleTime(dateString: string): string {
        let date = new Date(dateString),
            rawHours = date.getHours(),
            mins = date.getMinutes(),
            ampm = rawHours > 11 ? 'pm' : 'am',
            hours = rawHours > 12 ? rawHours - 12 : rawHours;

        return hours + ':' + mins + ' ' + ampm;
    }

}