module.exports = {

    smartUpdate: function (model, data, whitelist) {
        whitelist.forEach(name => {
            if (data[name] != undefined && data[name] != null) {
                model[name] = data[name];
            }
        });
        return model;
    },

    handleError: function (req, res, err) {
        console.error("Handle error:", err);
        res.status(500).json(err);
        throw new Error(err);
    },

    getObjectIdAsString: function (item) {
        if (typeof item == 'string') {
            return item;
        } else if (item._id && item._id.toString) {
            return item._id.toString();
        } else if (typeof item._id == 'string') {
            return item._id;
        } else if (item.toString) {
            return item.toString();
        } else {
            return ''; // ??
        }
    },

    /**
     * Inserts item into mongoose array of ObjectId items without causing duplicates
     * There might be a better way to do this with mongoose?
     */
    addToObjectIdArray: (array, itemToAdd) => {
        let existsAlready = false,
            itemToAddId = module.exports.getObjectIdAsString(itemToAdd);

        if (!array || !array.length) {
            array = [];
        }

        array.forEach(item => {
            let itemId = module.exports.getObjectIdAsString(item);
            if (itemId == itemToAddId) {
                existsAlready = true;
                return false;
            }
        });
        if (!existsAlready) {
            array.push(itemToAdd);
        }
        return array;
    },

    indexOfObjectId: (array, id) => {
        let indexInArray = -1;

        array.forEach((item, i) => {
            let itemId = module.exports.getObjectIdAsString(item);
            if (itemId == id) {
                indexInArray = i;
                return false;
            }
        });

        return indexInArray;
    },

    /**
     * Removes an item from an array of object ids
     * There might be an easier way to do this with mongoose?
     */
    removeFromObjectIdArray: (array, itemToRemove) => {
        let itemToRemoveId = module.exports.getObjectIdAsString(itemToRemove);

        if (!array || !array.length) {
            // it isn't even array, so it sure doesn't contain the thing
            return [];
        }

        let indexInArray = module.exports.indexOfObjectId(array, itemToRemoveId);
        
        if (indexInArray > -1) {
            array.splice(indexInArray, 1);
        }
        return array;
    },

    unionArrays: function() {
        let arrayKeys = Object.keys(arguments),
            union = [],
            obj = {};

        arrayKeys.forEach(key => {
            arguments[key].forEach(item => {
                if (typeof item == 'object') {
                    let itemKey;
                    if (item._id) {
                        itemKey = item._id.toString() || item._id;
                    } else {
                        itemKey = JSON.stringify(item);
                    }
                    obj[itemKey] = item;
                } else {
                    obj[item] = item;
                }
            });
        });

        Object.keys(obj).forEach(itemKey => {
            union.push(obj[itemKey]);
        })

        return union;
    },

    populations: {
        team: {
            path: 'admins members subscription',
            select: '-stripeCustomerId -password',
            populate: {
                path: 'subscription',
                select: '-stripeCustomerId'
            }
        },
        materials: {
            path: 'materials',
            options: {
                sort: 'name'
            }
        }
    },

    breakStringIntoParagraphs: (strings) => {
        let body = '';
        strings = [].concat(strings);
        strings.forEach(string => {
            string.split(/\r?\n/).forEach(p => {
                if (p.trim()) {
                    body += '<p>' + p + '</p>';
                }
            });
        });
        return body;
    },

    simpleDate: (dateString) => {
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
    },

    getMonthName: (month) => {
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
    },

    simpleTime: (dateString) => {
        let date = new Date(dateString),
            rawHours = date.getHours(),
            mins = date.getMinutes(),
            ampm = rawHours > 11 ? 'pm' : 'am',
            hours = rawHours > 12 ? rawHours - 12 : rawHours;

        return hours + ':' + mins + ' ' + ampm;
    }

}