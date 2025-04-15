export const NA_STRING ="N/A";
const NA_STRING2 = "NA"; const NA_STRING3 = "NULL"; const NA_STRING4 = "UNDEFINED";
export const NA_CHAR = 'N';
export const NA_INT = Math.floor(-1);
export const NA_FLOAT = -1.00;

export const alphabeticalRegex = /^(?=.*[a-zA-Z])[a-zA-Z .-]+$/;


// Other functions that can be applied ubiquitously

/** Compares two strings, accent-considerate (ignoring case).
 * @param firstString string
 * @param otherString string
 * @returns {boolean} True if they are equivalent.
 */
export function equalsIgnoreCase(firstString, otherString)
{
    if ((firstString.trim()).localeCompare(otherString.trim(), undefined, {sensitivity:"accent"}) === 0)
    {return true;}
    else
    {return false;}
}

/** Checks if the provided input (a string or number) contains only digit characters.
 * For string input, normalization is applied to remove accents, making it accent‐considerate, and the check is case‑insensitive (digits are not affected by case).
 *
 * @param {string|number} input - The input to check.
 * @returns {boolean} True if the input is a number or if it's a string containing only digits.
 */
export function isInputDigitOnly(input)
{
    // For a number (primitive or Number object), check if it's a valid digit-only representation (including floats).
    if (typeof input === "number" || input instanceof Number)
    {return !Number.isNaN(input) && Number.isFinite(input);} // Allows numbers, including floats.
    else if (typeof input === "string" || input instanceof String)
    {
        // Normalize the input to remove any diacritical marks and spaces.
        const normalized = (input.normalize("NFD")).replace(/[\u0300-\u036f]/g, "");

        // Use a regular expression to verify that the normalized string contains only digits and optionally one decimal point.
        // The regexp ^\d+(\.\d+)?$ allows numbers like "123", "123.45", but disallows multiple decimal points.
        return /^\d+(\.\d+)?$/.test(normalized);
    }

    return false; // Return false if input is neither a number nor a string.
}

/**Attempts to parse a given input, and return a floored value
 * @param {string|number} input - The input to check.
 * @returns {number}
 */
export function fullyParseInteger(input)
{
    if (isInputDigitOnly(input))
    {
        if (typeof input == "string" || input instanceof String)
        {input = parseInt(input, 10);}
        else if (typeof input == "number" || input instanceof Number)
        {input = Math.floor(input);}

        if (Number.isNaN(input))
        {throw new Error(input + " is not a valid numerical.");}
        else
        {return input;}
    }
    else
    {throw new Error(input + " is not a valid numerical.");}
}

/**Attempts to parse a given input, and return a rounded float value
 * @param {string|number} input - The input to check.
 * @returns {number}
 */
export function fullyParseFloat(input)
{
    if (isInputDigitOnly(input))
    {
        if (typeof input === "string" || input instanceof String) // Convert string to a float
        {input = parseFloat(input);}
        else if (!(typeof input === "number" || input instanceof Number)) // Handle invalid numbers.
        {throw new Error(input + " is not a valid numerical.");}

        if (Number.isNaN(input))
        {throw new Error(input + " is not a valid numerical.");}

        // Extract the decimal portion and the whole number part.
        const decimal = input % 1; // Example: 123.75 -> 0.75
        const whole = Math.floor(input); // Example: 123.75 -> 123

        // Apply rounding conditions:
        if (decimal >= 0.75) // Round up for decimals 0.75 and above.
        {return Math.ceil(input);}
        else if (decimal <= 0.25) // Round down for decimals 0.25 and below.
        {return Math.floor(input);}
        else // Return the middle value (rounded to .5).
        {return whole + 0.5;}
    }
    else // Handle invalid input types.
    {throw new Error(input + " is not a valid numerical.");}
}

/**Checks if the provided string is empty.
 * @param {string} stringInput - The input to check.
 * @returns {boolean} True if the input is a number or if it's a string that is empty.
 */
export function isStringEmpty(stringInput)
{
    if (stringInput == null || (stringInput.trim()).length === 0)
    {return true;}
    else
    {return false;}
}

/**Checks if the provided string is loosely invalid.
 * @param {string} stringInput - The input to check.
 * @returns {boolean} True if the input is a number or if it's a string that is loosely invalid.
 */
export function isStringNotAvailable(stringInput)
{
    if (isStringEmpty(stringInput) === true)
    {return true;}

    if (equalsIgnoreCase(stringInput, NA_STRING) === true || equalsIgnoreCase(stringInput, NA_STRING2) === true ||
        equalsIgnoreCase(stringInput, NA_STRING3) === true || equalsIgnoreCase(stringInput, NA_STRING4) === true)
    {return true;}
    else
    {return false;}
}

/**Checks if the provided character is loosely invalid.
 * @param {string} characterInput - The input to check.
 * @returns {boolean} True if the input is a number or if it's a character that is loosely invalid.
 */
export function isCharacterNotAvailable(characterInput)
{
    if (isStringEmpty(characterInput) === true)
    {return true;}

    if (equalsIgnoreCase(characterInput, NA_CHAR) === true)
    {return true;}
    else
    {return false;}
}

const alphanumericalIncludingDashesRegex = /^[a-zA-Z0-9\s\-]+$/;
/** Checks if the provided string is alphanumerical, including dashes.
 * @param {string} stringInput - The input to check.
 * @returns {boolean} True if the input is a number or if it's a string that is loosely invalid.
 */
export function isInputAlphanumericalIncludingDashes(stringInput)
{
    return alphanumericalIncludingDashesRegex.test(stringInput);
}

/** Gets passed a function to test if it results in an error, then add the result into a given error list *
 * @param {string[]} errorMessageList
 * @param {function} passedFunction
 * @param {string} errorMessagePrefix
 */
export const tryToValidateErrorList = (errorMessageList, passedFunction, errorMessagePrefix = "") =>
{
    try
    {return passedFunction();}
    catch (e)
    {errorMessageList.push(errorMessagePrefix + e.message); return undefined;}
}

/** Validates the input as a boolean.
 * @param {boolean|Boolean} booleanInput - The input to validate.
 * @param {string} errorMessage - Custom error message for invalid inputs.
 * @returns {boolean} - The validated primitive boolean value.
 * @throws {Error} If the input is not a valid boolean.
 */
export function validateAndReturnBoolean(booleanInput, errorMessage = "")
{
    if (typeof booleanInput === "boolean" || booleanInput instanceof Boolean)
    {return Boolean(booleanInput);}
    else
    {throw new Error("The given boolean input is invalid; " + errorMessage);}
}