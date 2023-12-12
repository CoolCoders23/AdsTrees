// Desc: This file contains the date format function to
// be used in models where timestamps are used.
// The code is from the module 21 exercises.
// ==================================================================

// function to format a dates to add suffixes to dates
// ==================================================================
const addDateSuffix = (date) => {
    let dateStr = date.toString();

    // get last char of date string
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    return dateStr;
};
// ==================================================================

// function to format a timestamp, accepts the timestamp
// and an `options` object as parameters
// ==================================================================
module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
) => {
    // create month object
    const months = {
        0: monthLength === 'short' ? 'Jan' : 'January',
        1: monthLength === 'short' ? 'Feb' : 'February',
        2: monthLength === 'short' ? 'Mar' : 'March',
        3: monthLength === 'short' ? 'Apr' : 'April',
        4: monthLength === 'short' ? 'May' : 'May',
        5: monthLength === 'short' ? 'Jun' : 'June',
        6: monthLength === 'short' ? 'Jul' : 'July',
        7: monthLength === 'short' ? 'Aug' : 'August',
        8: monthLength === 'short' ? 'Sep' : 'September',
        9: monthLength === 'short' ? 'Oct' : 'October',
        10: monthLength === 'short' ? 'Nov' : 'November',
        11: monthLength === 'short' ? 'Dec' : 'December',
    };

    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    const dayOfMonth = dateSuffix
        ? addDateSuffix(dateObj.getDate())
        : dateObj.getDate();

    const year = dateObj.getFullYear();
    let hour =
    dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() - 12)
        : dateObj.getHours();

    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) {
        hour = 12;
    }

    // if hour is less than 10 (9:00am), add a leading zero
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

    // set `am` or `pm`
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    return formattedTimeStamp;
};
// ==================================================================
