"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeUtil = (function () {
    function TimeUtil() {
    }
    TimeUtil.simpleDate = function (dateString) {
        var date = new Date(dateString), month = this.getMonthName(date.getMonth()), day = date.getDate(), year = date.getFullYear();
        return month + ' ' + day + ', ' + year;
    };
    TimeUtil.getMonthName = function (month) {
        switch (month) {
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
    };
    return TimeUtil;
}());
exports.TimeUtil = TimeUtil;

//# sourceMappingURL=time.util.js.map
