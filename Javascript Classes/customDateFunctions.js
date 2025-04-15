import {isStringEmpty, NA_STRING} from "./basicOperations.js";

/** @type {number} */ export const INVALIDDATE = 0;
/** @type {number} */ export const DEFAULTYEAR = 1850;
// {setDate, isThisDateBefore, isThisDateAfter, formatDateToString, returnDateYear, returnDateMonth, returnDateDay}
// Comparison methods

/** Checks if an other date is before the date being compared with.
 * @param {Date} thisDate
 * @param {Date} otherDate
 * @returns {boolean}
 */
/** Compares two dates; helper function
 * @param {Date} thisDate
 * @param {Date} otherDate
 * @returns {number}
 */
function compareDates(thisDate, otherDate)
{
    if (!(thisDate instanceof Date) || !(otherDate instanceof Date))
    {throw new Error("Both dates must be valid Date objects to compare.");}

    const thisYear = thisDate.getFullYear(); const otherYear = otherDate.getFullYear();
    if (thisYear !== otherYear) {return Math.floor(thisYear - otherYear);}

    const thisMonth = thisDate.getMonth(); const otherMonth = otherDate.getMonth();
    if (thisMonth !== otherMonth) {return Math.floor(thisMonth - otherMonth);}

    return Math.floor(thisDate.getDate() - otherDate.getDate());
}

/** Checks if an other date is before the date being compared with.
 * @param {Date} thisDate
 * @param {Date} otherDate
 * @returns {boolean}
 */
export function isThisDateBefore(thisDate, otherDate)
{return (compareDates(thisDate, otherDate) < 0);}
/** Checks if an other date is after the date being compared with.
 * @param {Date} thisDate
 * @param {Date} otherDate
 * @returns {boolean}
 */
export function isThisDateAfter(thisDate, otherDate)
{return (compareDates(thisDate, otherDate) > 0);}
/** Checks if two dates are equal to one another
 * @param {Date} thisDate
 * @param {Date} otherDate
 * @returns {boolean}
 */
export function isThisDateSame(thisDate, otherDate)
{
    if (thisDate == null && otherDate == null) {return true;}
    if (otherDate === thisDate) {return true;}
    return (compareDates(thisDate, otherDate) === 0);
}

/** Compares two date arrays.
 * @param {number[]} dateArrayA - [year, month, day]
 * @param {number[]} dateArrayB - [year, month, day]
 * @returns {number} A negative value if dateArrayA is before dateArrayB, positive if after, or 0 if equal.
 */
function compareNumberDates(dateArrayA, dateArrayB)
{
    if ((!Array.isArray(dateArrayA) || dateArrayA.length !== 3) || ((!Array.isArray(dateArrayB) || dateArrayB.length !== 3)))
    {throw new Error("Invalid input: Both date arrays must have exactly 3 elements [year, month, day].");}

    if (dateArrayA[0] !== dateArrayB[0])
    {return Math.floor(dateArrayA[0] - dateArrayB[0]);}

    if (dateArrayA[1] !== dateArrayB[1])
    {return Math.floor(dateArrayA[1] - dateArrayB[1]);}

    return Math.floor(dateArrayA[2] - dateArrayB[2]);
}
/** Checks if the first date array represents a date before the second.
 * @param {number[]} a - [year, month, day]
 * @param {number[]} b - [year, month, day]
 * @returns {boolean}
 */
export function isThisNumberDateArrayBefore(a, b)
{return (compareNumberDates(a, b) < 0);}
/** Checks if the first date array represents a date after the second.
 * @param {number[]} a - [year, month, day]
 * @param {number[]} b - [year, month, day]
 * @returns {boolean}
 */
export function isThisNumberDateArrayAfter(a, b)
{return (compareNumberDates(a, b) > 0);}
/** Checks if two date arrays are equal to one another.
 * @param {number[]} a - [year, month, day]
 * @param {number[]} b - [year, month, day]
 * @returns {boolean}
 */
export function isThisNumberDateArraySame(a, b)
{return (compareNumberDates(a, b) === 0);}

/** Returns the date in a MM/DD/YYYY format
 * @param {Date} date
 * @returns {string}
 */
export function formatDateToString(date)
{
    if (date == null || !(date instanceof Date))
    {return NA_STRING;}

    let month = (date.getMonth() + 1);
    let day = (date.getDate());
    let year = date.getFullYear();

    if (Number.isNaN(month) || Number.isNaN(day) || (Number.isNaN(year) || year <= DEFAULTYEAR))
    {return NA_STRING;}

    month = (month.toString()).padStart(2, "0");
    day = (day.toString()).padStart(2, "0");

    return `${month}/${day}/${year}`;
}

/** Returns the year of a date
 * @param {Date} date
 * @returns {number}
 */
export function returnDateYear(date)
{
    /** @type {number|NaN} */ const year = date.getFullYear();
    if (Number.isNaN(year) || year <= DEFAULTYEAR) {return INVALIDDATE;}

    return (!(Number.isNaN(year))) ? year: INVALIDDATE;
}
/** Returns the month of a date
 * @param {Date} date
 * @returns {number}
 */
export function returnDateMonth(date)
{
    /** @type {number|NaN} */ const year = date.getFullYear();
    if (Number.isNaN(year) || year <= DEFAULTYEAR) {return INVALIDDATE;}

    /** @type {number|NaN} */ const month = date.getMonth();
    return (!(Number.isNaN(month))) ? month+1: INVALIDDATE;
}
/** Returns the day of a date
 * @param {Date} date
 * @returns {number}
 */
export function returnDateDay(date)
{
    /** @type {number|NaN} */ const year = date.getFullYear();
    if (Number.isNaN(year) || year <= DEFAULTYEAR) {return INVALIDDATE;}

    /** @type {number|NaN} */ const day = date.getDate();
    return (!(Number.isNaN(day))) ? day: INVALIDDATE;
}

/** Sets the date using a string.
 * Acceptable formats:
 * - Slash-separated: "MM/DD/YYYY"; Dash-separated: "MM-DD-YYYY"; No separator: digit-only string (length 8) e.g., "MMDDYYYY"
 * - Can accept ISO formats YYYY-MM-DD
 * - Returns month in 0 based index.
 * @param {string} stringDate
 * @param {boolean} returnValue
 * @returns {number[]|boolean}
 */
function validateDateByString(stringDate, returnValue = false)
{
    if (isStringEmpty(stringDate))
    {throw new Error("Invalid date format. Provide a non-empty date string.");}

    stringDate = stringDate.trim();

    /** @type {number} */ let month= NaN, day= NaN, year = NaN;

    if (stringDate.includes("/") || stringDate.includes("-"))
    {
        // Normalize separators: if dashes are used, replace them with "/"
        /** @type {string} */ let normalizedDate = (stringDate.includes("-")) ? stringDate.replace(/-/g, "/"): stringDate;

        // Allow up to 4 digits in the first part; e.g., "YYYY/MM/DD" or "MM/DD/YYYY"
        const separatorRegex = /^\d{1,4}\/\d{1,2}\/\d{1,4}$/;
        if (!separatorRegex.test(normalizedDate))
        {throw new Error("Invalid date format. Use MM/DD/YYYY, MM-DD-YYYY, YYYY/MM/DD, MMDDYYYY formats.");}

        /** @type {string[]} */ const dateParts = normalizedDate.split("/");

        // If the first part has 4 digits, assume ISO: YYYY/MM/DD
        if (dateParts[0].length === 4)
        {
            year  = parseInt(dateParts[0], 10);
            month = parseInt(dateParts[1], 10) - 1; // JavaScript months are 0-indexed
            day   = parseInt(dateParts[2], 10);
        }
        else  // Otherwise, default to MM/DD/YYYY
        {
            month = parseInt(dateParts[0], 10) - 1;
            day   = parseInt(dateParts[1], 10);
            year  = parseInt(dateParts[2], 10);
        }
    }
    else // No separator present: we assume strictly MMDDYYYY.
    {
        // We require between 8 digits; the first 2 are month, next 2 are day, remainder is year.
        const noSeparatorRegex = /^\d{8}$/;
        if (!noSeparatorRegex.test(stringDate))
        {throw new Error("Invalid date format. Use MM/DD/YYYY, MM-DD-YYYY, YYYY/MM/DD, MMDDYYYY formats.");}

        // Extract month, day, and year based on MMDDYYYY.
        month = parseInt(stringDate.substring(0, 2), 10) - 1;   // MM: first two digits.
        day   = parseInt(stringDate.substring(2, 4), 10);       // DD: next two digits.
        year  = parseInt(stringDate.substring(4), 10);          // YYYY: remaining digits.
    }

    /** @type {boolean} */ let validatedFullDate = true;
    /** @type {Error} */ let fullDateErrorCaptured;
    try
    {validateDateByNumbers(year, month, day);}
    catch (fullDateError)
    {validatedFullDate = false; fullDateErrorCaptured = fullDateError;}

    if (validatedFullDate)
    {return (returnValue) ? [year, month, day]: true;}
    else
    {throw fullDateErrorCaptured;}
}
/** Validates the date using three separate numericals; Remember to always pass 0-based month
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @param {boolean} returnValue
 * @returns {number[]|boolean}
 */
function validateDateByNumbers(year, month, day, returnValue = false)
{
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day))
    {throw new Error("Failed to properly parse date. Check input values.");}

    const validYear = (year >= DEFAULTYEAR);
    if (!validYear)
    {throw new Error("Failed to properly parse year. Check input values.");}

    const validMonth = (month <= 11) && (month >= 0);
    if (!validMonth)
    {throw new Error("Failed to properly parse month. Check input values.");}

    let maxDays;
    switch (month)
    {
        case 0: case 2: case 4: case 6: case 7: case 9: case 11:
        maxDays = 31; break;
        case 3: case 5: case 8: case 10:
        maxDays = 30; break;
        case 1:
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) // Leap year
            {maxDays = 29;}
            else
            {maxDays = 28;}
            break;
        default:
            throw new Error("Failed to properly parse month. Check input values.");
    }

    const validDay = (day >= 1 && day <= maxDays);
    if (!validDay)
    {throw new Error("Failed to properly parse day. Check input values.");}

    return (returnValue) ? [year, month, day]: true;
}
/** Validates the date using a date object
 * @param {Date} dateObj
 * @param {boolean} returnValue
 * @returns {Date|boolean}
 */
function validateDateByDate(dateObj, returnValue = false)
{
    /** @type {number|NaN} */ let year = dateObj.getFullYear();
    /** @type {number|NaN} */ let month = dateObj.getMonth();
    /** @type {number|NaN} */ let day = dateObj.getDate();

    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day))
    {throw new Error("Failed to properly parse date. Check input values.");}

    return (returnValue) ? dateObj: true;
}

/** Validates the date using a date object, string, or three numbers
 * @param args
 * @returns {number[]|boolean}
 */
function validateDate(...args)
{
    // Check if the last argument is a boolean flag for returnValue.
    let returnValue = false;
    if (args.length && typeof args[args.length - 1] === "boolean")
    {returnValue = args.pop();}

    /** @type {number|NaN} */ let year = NaN, month = NaN, day = NaN;
    if (args.length === 1)
    {
        const dateInput = args[0];

        if (dateInput == null)
        {throw new Error("Date object or string cannot be null or empty.");}

        if (typeof (dateInput) === "string" || dateInput instanceof String)
        {
            /** @type {number[]} */ let validNumbers;

            try
            {
                /** @type {number[]} */ validNumbers = validateDateByString(args[0], true);
            }
            catch (dateStringError)
            {throw dateStringError;}

            return (returnValue) ? validNumbers: true;
        }
        else if (dateInput instanceof Date)
        {
            try
            {
                validateDateByDate(dateInput);
                year = dateInput.getFullYear(); month = dateInput.getMonth(); day = dateInput.getDate();
            }
            catch (dateObjectError)
            {throw dateObjectError;}

            return (returnValue) ? [year, month, day]: true;
        }
    }
    else if (args.length === 3)
    {
       /** @type {number[]} */ let validNumbers;

        try
        {
            /** @type {number[]} */ validNumbers = validateDateByNumbers(args[2], args[0]-1, args[1], true);
        }
        catch (dateNumberError)
        {throw dateNumberError;}

       return (returnValue) ? validNumbers: true;
   }
    else
    {throw new Error("Invalid number of arguments. Expected either 1 argument (date object or string) or 3 numbers (MM/DD/YYYY).");}
}

/** Validates the date using a date object, string, or three numbers
 * @param args
 * @returns {number[]}
 */
export function validateAndReturnDate(...args)
{
    args.push(true);

    try
    {return validateDate(...args);}
    catch (dateError)
    {throw dateError;}
}

/** Sets the date using a string, a CustomDate object, or three numericals.
 * Acceptable formats:
 * Slash-separated: "MM/DD/YYYY"; Dash-separated: "MM-DD-YYYY"; No separator: digit-only string (length 5-8) e.g., "MMDDYYYY"
 *
 * @param args
 * @param {Date} dateObject // This would be given by default as a parameter
 * @param {string} stringDate
 * @param {number} month
 * @param {number} day
 * @param {number} year
 * @throws {error} Upon invalid inputs
 * @returns {void}
 */
export function setDate(dateObject, ...args)
{
    const dateNumberArray = validateAndReturnDate(...args);
    dateObject.setFullYear(dateNumberArray[0], dateNumberArray[1], dateNumberArray[2]);
    dateObject.setHours(0, 0, 0, 0)
}

/** Helper function for constructors that deal with Date objects. Exists to maintain references for date objects given an array of numerical numbers meant for dates.
 * Can be a performance issue, due to re-referencing.
 * @param {number[]|null} dateNumberArray
 * @param {Date|null} dateDataField
 * @param {boolean} validNumberArray
 * @throws {error} Upon invalid inputs
 * @returns {Date}
 */
export function constructDateFromNumberArray(dateNumberArray, dateDataField, validNumberArray = false)
{
    if (dateNumberArray != null)
    {
        if (!validNumberArray)
        {
            try
            {
                validateDateByNumbers(dateNumberArray[0], dateNumberArray[1], dateNumberArray[2]);
                validNumberArray = true;
            }
            catch (numberArrayError)
            {throw numberArrayError;}
        }

        if (dateDataField != null && dateDataField instanceof Date)
        {
            dateDataField.setFullYear(dateNumberArray[0], dateNumberArray[1], dateNumberArray[2]);
            dateDataField.setHours(0, 0, 0, 0);
            return dateDataField;
        }
        else
        {return new Date(dateNumberArray[0], dateNumberArray[1], dateNumberArray[2]);}
    }
}
/** Helper function for constructors that deal with Date objects. Exists to maintain references for date objects.
 * Can be a performance issue, due to re-referencing.
 * @param {Date|null} dateDataField
 * @returns {Date}
 */
export function constructEmptyDate(dateDataField)
{
    if (dateDataField != null && dateDataField instanceof Date)
    {
        dateDataField.setFullYear(DEFAULTYEAR, 0, 1);
        dateDataField.setHours(0, 0, 0, 0);
        return dateDataField;
    }
    else
    {return new Date(DEFAULTYEAR, 0, 1);}
}
/** Helper function that deal with Date objects. Exists to maintain references for date objects.
 * Can be a performance issue, due to re-referencing.
 * @param {Date|number[]|string|String} dateDataField
 * @returns {boolean}
 */
export function isDateDefault(dateDataField)
{
    if (dateDataField != null && dateDataField instanceof Date)
    {
        if (returnDateYear(dateDataField) <= INVALIDDATE)
        {return true;}
        else
        {return false;}
    }
    else if (dateDataField != null && Array.isArray(dateDataField))
    {
        if (dateDataField.length === 3)
        {
            const potentialYear = dateDataField[0];
            if (potentialYear > 12) // Attempts to handle MM/DD/YYYY
            {
                if (potentialYear <= DEFAULTYEAR) {return true;}
                else {return false;}
            }
            else
            {
                if (dateDataField[2] <= DEFAULTYEAR) {return true;}
                else {return false;}
            }
        }
    }
    else if (dateDataField != null && (typeof dateDataField === "string" || dateDataField instanceof String))
    {
        try
        {
            const stringNumberArray = validateDateByString(dateDataField);
            if (stringNumberArray[0] <= DEFAULTYEAR) {return true;}
            else {return false;}
        }
        catch (e)
        {return true;}
    }
    else if (dateDataField === undefined)
    {
        return true;
    }
    else
    {
        return false;
    }
}
