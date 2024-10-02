import moment from "moment";

//Check Variables
export const isEmpty = (item) => {
    if (item === null) {
        return true
    }
    else if (item === '') {
        return true;
    }
    else if (item === undefined) {
        return true;
    }
    else {
        return false;
    }
};

//Check array
export const isEmptyArray = (item) => {
    if (item && item.length <= 0)
        return true
    else
        return false;
};

export const isEmptyObj = (item) => {
    if (Object.keys(item).length === 0)
        return true
    else
        return false;
};


// Used for date format
export const dateFormat = (date) => {
    if (date) {
        return moment(date).format('DD/MM/YY');
    }
};

export const newdetaildateFormat = (date) => {
    if (date) {
        return moment(date).format('DD/MM/YY');
    }
};

export const newdateFormatseller = (date) => {
    if (date) {
        return moment(date).format('MMMM, YYYY');
    }
};

export const dateFormat2 = (date) => {
    if (date) {
        return moment(date).format('DD/MM/YY');
    }
};

export const timeFormat = (date) => {
    if (date) {
        return moment(date).format('DD MMM, LT');
    }
};

export const newdateFormat = (date) => {
    if (date) {
        return moment(date).format('DD/MM/YY');
    }
};


// Remove all items except the last one

export const arrayIds = (array) => {
    if (array && array.length > 0) {
        const newArr = array.filter(obj => obj.id !== 0).map(obj => obj.id);
        return newArr;
    }
};

export const fullDateTimeFormat = (time) => {
    if (time) {
        let momentTime = moment(time).format('YYYY-MM-DD hh:mm:ss');
        return momentTime
    }
};

export const fullDateTime = (date) => {
    if (date) {
        return moment(date).format('YYYY-MM-DD hh:mm A');
    }
};

export const fullDateTime11 = (date) => {
    if (date) {
        return moment(date).format('DD/MM/YY hh:mm A');
    }
};

// Used for date format
export const dateFormating = (date) => {
    if (date) {
        return moment(date).format('DD/MM/YY');
    }
};

export const numberOfCharacters = (str, length) => {
    if (str.length <= length) {
        return str;
    } else {
        return str.substring(0, length) + "...";
    }
};

export const formatSecToMin = (totalSeconds) => {
    if (totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }
};

export const maskNumber = (number) => {
    if (number) {
        const numberStr = String(number);
        if (numberStr.length <= 6) {
            return "Number too short to mask";
        }
        const maskedNumber = numberStr.slice(0, 2) + '****' + numberStr.slice(-4);
        return maskedNumber;
    }
};

export function countValidValues(obj) {
    if (obj) {
        let count = 0;
        for (let key in obj) {
            if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
                count++;
            }
        }
        return count;
    }
};

export function isNotFutureDate(dateString) {
    if (dateString) {
        let givenDate = new Date(dateString);
        let currentDate = new Date();
        givenDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        return givenDate <= currentDate;
    } else {
        return false;
    }
};

export const getRelativeTime = (date) => {
    if (date) {
        return moment(date).fromNow();
    }
};

export const getExtension = (path) => {
    path = path.split('-');
    let ext = path[path.length - 1].split('.');
    return ext.length > 1 ? ext[ext.length - 1].toLowerCase() : null;
}