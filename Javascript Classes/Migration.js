import {alphabeticalRegex, NA_STRING, validateAndReturnBoolean} from "./basicOperations.js"
import {equalsIgnoreCase, isInputDigitOnly, isStringEmpty, isStringNotAvailable, tryToValidateErrorList} from "./basicOperations.js";

import {
    setDate,
    isThisDateBefore,
    isThisDateAfter,
    formatDateToString,
    returnDateYear,
    returnDateMonth,
    returnDateDay,
    validateAndReturnDate,
    constructDateFromNumberArray,
    isThisNumberDateArrayBefore,
    isThisNumberDateArrayAfter,
    DEFAULTYEAR, isDateDefault, constructEmptyDate
} from './customDateFunctions.js';
import {INVALIDDATE} from "./customDateFunctions.js";

export default class Migration
{
    /** @type {PermanentResidentCard} */ #greenCard;
    /** @type {Citizenship} */ #citizenshipCertificate;

    /** @type {boolean} */ #citizenOfUS;
    /** @type {boolean} */ #legalPermanentResident;

    constructor()
    {
        this.#greenCard = new PermanentResidentCard();
        this.#legalPermanentResident = true;

        this.#citizenshipCertificate = undefined;
        this.#citizenOfUS = false;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for PermanentResidentCard GreenCard object
    // This Javascript shenanigans checks if PermanentResidentCard exists, if so, returns the specified search; if not, output default silliness
    /** @returns {string} */ getAlienNumber() {return this.#greenCard ? (this.#greenCard).getAlienNumber(): NA_STRING;}
    /** @returns {string} */ getGreenCardReceiptNumber() {return this.#greenCard ? (this.#greenCard).getReceiptNumber(): NA_STRING;}
    /** @returns {string} */ getGreenCardCategory() {return this.#greenCard ? (this.#greenCard).getCategory(): NA_STRING;}

    /** @returns {string} */ getGreenCardResidenceDate() {return this.#greenCard ? (this.#greenCard).getResidenceDate(): NA_STRING;}
    /** @returns {Date|null} */ getGreenCardResidenceDateObj() {return this.#greenCard ? (this.#greenCard).getResidenceDateObj(): null;}
    /** @returns {number} */ getGreenCardYearOfResidenceDate() {return this.#greenCard ? (this.#greenCard).getYearOfResidence(): INVALIDDATE;}
    /** @returns {number} */ getGreenCardMonthOfResidenceDate() {return this.#greenCard ? (this.#greenCard).getMonthOfResidence(): INVALIDDATE;}
    /** @returns {number} */ getGreenCardDayOfResidenceDate() {return this.#greenCard ? (this.#greenCard).getDayOfResidence(): INVALIDDATE;}

    /** @returns {string} */ getGreenCardExpiryDate() {return this.#greenCard ? (this.#greenCard).getExpiryDate(): NA_STRING;}
    /** @returns {Date|null} */ getGreenCardExpiryDateObj() {return this.#greenCard ? (this.#greenCard).getExpiryDateObj(): null;}
    /** @returns {number} */ getGreenCardYearOfExpiryDate() {return this.#greenCard ? (this.#greenCard).getYearOfExpiry(): INVALIDDATE;}
    /** @returns {number} */ getGreenCardMonthOfExpiryDate() {return this.#greenCard ? (this.#greenCard).getMonthOfExpiry(): INVALIDDATE;}
    /** @returns {number} */ getGreenCardDayOfExpiryDate() {return this.#greenCard ? (this.#greenCard).getDayOfExpiry(): INVALIDDATE;}

    // Base Setters
    //
    #initializeEmptyGreenCard()
    {
        if (!this.#greenCard)
        {
            if (this.#legalPermanentResident === false && this.#citizenOfUS === false)
            {throw new Error("Must possess legal permanent residence and/or citizenship before modifying Green Card.");}
            else
            {this.#greenCard = new PermanentResidentCard();}
        }
    }

    /** @param {PermanentResidentCard} greenCardObj */
    setGreenCardObj(greenCardObj)
    {
        if (!(this.#legalPermanentResident) && !(this.#citizenOfUS))
        {throw new Error("Must possess legal permanent residence and/or citizenship before modifying Green Card.");}

        if (greenCardObj == null || !(greenCardObj instanceof PermanentResidentCard)) {throw new Error("Permanent Resident Card object cannot be null.");}
        else {this.#greenCard = greenCardObj;}
    }

    // Setter methods using constructors for PermanentResidentCard greenCard object; if constructor is unneeded, then modify current object
    //
    /** Attempt to update or override PermanentResidentCard greenCard object
     * @param {boolean} override
     * @param {any} args */
    #setGreenCard(override, ...args)
    {
        if (!(this.#legalPermanentResident) && !(this.#citizenOfUS))
        {throw new Error("Must possess legal permanent residence and/or citizenship before modifying Green Card.");}

        if (args.length !== 1 && args.length !== 2 && args.length !== 3 && args.length !== 4 && args.length !== 5)
        {throw new Error("Invalid number of arguments for modifying Green Card.");}

        if (!this.#greenCard)
        {this.#greenCard = new PermanentResidentCard(...args); return;}

        if (override === true) // Attempt to override entire contents
        {
            try {(this.#greenCard).overrideFromArgs(...args);}
            catch (overrideError) {throw new Error("Failed to override Green Card:\n" + overrideError.message);}
        }
        else // Attempt to update contents if overriding is false
        {
            try {(this.#greenCard).updateFromArgs(...args);}
            catch (updateError) {throw new Error("Failed to update Green Card:\n" + updateError.message);}
        }
    }
    updateGreenCard(...args)
    {this.#setGreenCard(false, ...args);}
    overrideGreenCard(...args)
    {this.#setGreenCard(true, ...args);}

    // Individual setter methods for PermanentResidentCard greenCard object, these always have initializeEmptyGreenCard()
    //
    /** @param {string} alienNumber */
    setGreenCardAlienNumber(alienNumber)
    {
        this.#initializeEmptyGreenCard();
        (this.#greenCard).setAlienNumber(alienNumber);

        if (this.#citizenOfUS) // If citizen, then modify citizenship certificate
        {
            this.#initializeEmptyCitizenshipCertificate();
            (this.#citizenshipCertificate).setUSCISRegistrationNumber(this.#greenCard);
        }
    }

    /** @param {string} receiptNumber */
    setGreenCardReceiptNumber(receiptNumber)
    {
        this.#initializeEmptyGreenCard();
        (this.#greenCard).setReceiptNumber(receiptNumber);
    }

    /** @param {string} category */
    setGreenCardCategory(category)
    {
        this.#initializeEmptyGreenCard();
        (this.#greenCard).setCategory(category);
    }

    /** @param {Date|string|number} args */
    setGreenCardResidenceDate(...args)
    {
        this.#initializeEmptyGreenCard();
        (this.#greenCard).setResidenceDate(...args);
    }

    /** @param {Date|string|number} args */
    setGreenCardExpiryDate(...args)
    {
        this.#initializeEmptyGreenCard();
        (this.#greenCard).setExpiryDate(...args);
    }

    // Miscellaneous setter methods related to Citizenship citizenshipCertificate object
    //
    /** @param {boolean} ifLegalPermanentResident */
    setLegalPermanentResident(ifLegalPermanentResident)
    {
        try
        {this.#legalPermanentResident = validateAndReturnBoolean(ifLegalPermanentResident, "Invalid argument input for changing legal permanent residence status.");}
        catch (legalPermanentResidentError)
        {throw legalPermanentResidentError;}
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for Citizenship citizenshipCertificate object
    // This Javascript sorcery checks if citizenshipCertificate exists, if so, returns the specified search; if not, output default mischief
    /** @returns {string} */ getUSCitizenshipCertificateNumber() {return this.#citizenshipCertificate ? this.#citizenshipCertificate.getUSCitizenshipCertificateNumber(): NA_STRING;}

    // Checks greenCard's existence, then does search within greenCard; if not found, then do the same for citizenshipCertificate
    /** @returns {string} */ getUSCISRegistrationNumber() {return (this.#greenCard && (this.#greenCard).getAlienNumber()) || (this.#citizenshipCertificate && this.#citizenshipCertificate.getUSCISRegistrationNo()) || NA_STRING;}
    /** @returns {string} */ getLocationOfRegistration() {return this.#citizenshipCertificate ? this.#citizenshipCertificate.getLocationOfRegistration(): NA_STRING;}

    /** @returns {string} */ getCitizenshipDateOfRegistration() {return this.#citizenshipCertificate ? this.#citizenshipCertificate.getDateOfRegistration(): NA_STRING;}
    /** @returns {Date|null} */ getCitizenshipDateOfRegistrationObj() {return this.#citizenshipCertificate ? this.#citizenshipCertificate.getDateOfRegistrationObj(): null;}
    /** @returns {number} */ getCitizenshipYearOfRegistrationDate() {return this.#citizenshipCertificate ? this.#citizenshipCertificate.getYearOfRegistration(): INVALIDDATE;}
    /** @returns {number} */ getCitizenshipMonthOfRegistrationDate() {return this.#citizenshipCertificate ? this.#citizenshipCertificate.getMonthOfRegistration(): INVALIDDATE;}
    /** @returns {number} */ getCitizenshipDayOfRegistrationDate() {return this.#citizenshipCertificate ? this.#citizenshipCertificate.getDayOfRegistration(): INVALIDDATE;}

    // Base Setters
    //
    #initializeEmptyCitizenshipCertificate()
    {
        if (!this.#citizenshipCertificate)
        {
            if (this.#citizenOfUS === false)
            {throw new Error("Must possess citizenship before modifying citizenship certificate.");}
            else
            {this.#citizenshipCertificate = new Citizenship();}
        }
    }

    /** @param {Citizenship} citizenshipCertificateObj */
    setCitizenshipCertificateObj(citizenshipCertificateObj)
    {
        if (this.#citizenOfUS === false)
        {throw new Error("Must possess citizenship before modifying citizenship certificate.");}

        if (citizenshipCertificateObj == null) {throw new Error("Citizenship certificate object cannot be null.");}
        else {this.#citizenshipCertificate = citizenshipCertificateObj;}
    }

    // Setter method using constructor for Citizenship citizenshipCertificate object; if constructor is unneeded, then modify current object
    //
    /** Attempt to update or override the Citizenship citizenshipCertificate object
     * - 2 arguments: (certificate number, date).
     * - 3 arguments: (certificate number, registration number, and date).
     * - 4 arguments: (certificate number, registration number, date, and location).
     * @param {boolean} override
     * @param {any} args */
    #setCitizenshipCertificate(override, ...args)
    {
        if (this.#citizenOfUS === false)
        {throw new Error("Must possess citizenship before modifying citizenship certificate.");}

        if (args.length !== 2 && args.length !== 3 && args.length !== 4)
        {throw new Error("Invalid number of arguments for modifying the citizenship certificate.");}

        if (!this.#citizenshipCertificate)
        {this.#citizenshipCertificate = new Citizenship(...args); return;}

        if (override === true) // Attempt to override entire contents
        {
            try {(this.#citizenshipCertificate).overrideFromArgs(...args);}
            catch (overrideError) {throw new Error("Failed to override the citizenship certificate: " + overrideError.message);}
        }
        else // Attempt to update contents if overriding is false
        {
            try {(this.#citizenshipCertificate).updateFromArgs(...args);}
            catch (updateError) {throw new Error("Failed to update the citizenship certificate: " + updateError.message);}
        }
    }
    updateCitizenshipCertificate(...args)
    {this.#setCitizenshipCertificate(false, ...args)}
    overrideCitizenshipCertificate(...args)
    {this.#setCitizenshipCertificate(true, ...args)}

    // Individual setter methods for Citizenship citizenshipCertificate object, these always have initializeEmptyCitizenshipCertificate()
    //
    /** @param {string} usCitizenshipCertificateNumber */
    setCitizenshipCertificateNumber(usCitizenshipCertificateNumber)
    {
        this.#initializeEmptyCitizenshipCertificate();
        (this.#citizenshipCertificate).setUSCitizenshipCertificateNumber(usCitizenshipCertificateNumber);
    }

    /** @param {string} uscisRegistrationNumber */
    setCitizenshipCertificateUSCISRegistrationNumber(uscisRegistrationNumber)
    {
        this.#initializeEmptyCitizenshipCertificate();
        this.setGreenCardAlienNumber(uscisRegistrationNumber);
    }

    /** @param {string} locationOfRegistration */
    setCitizenshipCertificateLocationOfRegistration(locationOfRegistration)
    {
        this.#initializeEmptyCitizenshipCertificate();
        (this.#citizenshipCertificate).setLocationOfRegistration(locationOfRegistration);
    }

    /** @param {Date|string|number} args */
    setCitizenshipCertificateDateOfRegistration(...args)
    {
        this.#initializeEmptyCitizenshipCertificate();
        (this.#citizenshipCertificate).setDateOfRegistration(...args);
    }

    // Miscellaneous setter methods related to Citizenship citizenshipCertificate object
    //
    /** @param {boolean} ifUSCitizen */
    setCitizenOfUS(ifUSCitizen)
    {
        try
        {this.#citizenOfUS = validateAndReturnBoolean(ifUSCitizen, "Invalid argument input for setting US Citizenship status.");}
        catch (ifUsCitizenError)
        {throw ifUsCitizenError;}
    }
}

class PermanentResidentCard
{
    /** @type {number} */ static alienNumberCapacity = 10;
    /** @type {number} */ static receiptNumberCapacity = 13;
    /** @type {number} */ static categoryCapacity = 5;

    // Unique: Alien number, IOE Number, ResidenceDate, ExpiryDate, Category
    // Inherited: Given Name (first name and middle name), Surname (last name), DoB, Country of Birth

    /** @type {string} */ #alienNumber; // Maximum length is 9, 10 if A is included
    /** @type {string} */ #receiptNumber; // Maximum length is 13
    /** @type {string} */ #category; // Typically has a max length of 3, but can be 5
    /** @type {Date} */ #residenceDate;
    /** @type {Date} */ #expiryDate;

    /** Creates an instance of PermanentResidentCard.
     * Overloads:
     * - No arguments: Initializes all fields to default values.
     * - 1 argument: (alienNumber). Rest set to undefined.
     * - 2 arguments: (alienNumber, residenceDate). Rest set to undefined.
     * - 3 arguments: (alienNumber, receiptNumber, residenceDate).
     * - 4 arguments: (alienNumber, receiptNumber, residenceDate, expiryDate).
     * - 5 arguments: (alienNumber, receiptNumber, category, residenceDate, expiryDate).
     *
     * @param {...any} args - One of the valid argument combinations.
     * @throws {Error} If the provided arguments are invalid or validations fail.
     */
    constructor(...args)
    {
        if (args.length === 0) // Default initialization.
        {
            this.#alienNumber = NA_STRING; this.#receiptNumber = NA_STRING; this.#category = NA_STRING;
            this.#residenceDate = new Date(DEFAULTYEAR, 0, 1);
            this.#expiryDate = new Date(DEFAULTYEAR, 0, 1);
            return;
        }
        else
        {this.overrideFromArgs(...args);}
    }

    /** Private helper that populates (or updates) object data using the provided arguments.
     * If updateAll is true, it assumes a full population is desired (for the constructor); If false, then only the provided values override the existing ones.
     * @param {any} args - The input arguments.
     * @param {boolean} updateAll - If true, missing fields will be treated as "update to undefined". Otherwise, missing parameters preserve existing property values.
     * @throws {Error} if any validation fails.
     */
    #populateFromArgs(updateAll, ...args)
    {
        if (args.length !== 1 && args.length !== 2 && args.length !== 3 && args.length !== 4 && args.length !== 5)
        {throw new Error("Invalid number of arguments for constructing or modifying a permanent resident card.");}

        // Start with current values if doing a partial update. Otherwise, set all values to be undefined at first.
        /** @type {string[]} */ const errors = [];
        /** @type {string|undefined} */ let newAlienNumber = (updateAll) ? undefined: this.#alienNumber;
        /** @type {string|undefined} */ let newReceiptNumber = (updateAll) ? undefined: this.#receiptNumber;
        /** @type {string|undefined} */ let newCategory = (updateAll) ? undefined: this.#category;

        /** @type {Date|undefined} */ let newResidenceDate = this.#residenceDate;
        /** @type {number[]|undefined} */ let newResidenceDateArray = undefined;
        /** @type {Date|undefined} */ let newExpiryDate = this.#expiryDate;
        /** @type {number[]|undefined} */ let newExpiryDateArray = undefined;

        // Map arguments to the appropriate fields.
        switch (args.length)
        {
            case 1:
                newAlienNumber = tryToValidateErrorList(errors, () => PermanentResidentCard.#validateAndReturnAlienNumber(args[0]));
                break;

            case 2:
                newAlienNumber = tryToValidateErrorList(errors, () => PermanentResidentCard.#validateAndReturnAlienNumber(args[0]));
                newResidenceDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[1]));
                break;

            case 3:
                newAlienNumber = tryToValidateErrorList(errors, () => PermanentResidentCard.#validateAndReturnAlienNumber(args[0]));
                newReceiptNumber = tryToValidateErrorList(errors, () => PermanentResidentCard.#validateAndReturnReceiptNumber(args[1]));
                newResidenceDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[2]));
                break;

            case 4:
                newAlienNumber = tryToValidateErrorList(errors, () => PermanentResidentCard.#validateAndReturnAlienNumber(args[0]));
                newReceiptNumber = tryToValidateErrorList(errors, () => PermanentResidentCard.#validateAndReturnReceiptNumber(args[1]));
                newResidenceDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[2]));
                newExpiryDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[3]));
                break;

            case 5:
                newAlienNumber = tryToValidateErrorList(errors, () => PermanentResidentCard.#validateAndReturnAlienNumber(args[0]));
                newReceiptNumber = tryToValidateErrorList(errors, () => PermanentResidentCard.#validateAndReturnReceiptNumber(args[1]));
                newCategory = tryToValidateErrorList(errors, () => PermanentResidentCard.#validateAndReturnCategory(args[2]));
                newResidenceDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[3]));
                newExpiryDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[4]));
                break;
        }

        // Determine the candidate arrays that will be used for ordering validation.
        // When updateAll is true, we use only the new candidate arrays—even if one is missing, we don’t fall back to the stored Date’s number array.
        // When updateAll is false, we fall back on the stored value if no candidate array is provided.

        let finalResidenceNumbers = null; let finalExpiryNumbers= null;
        /** @type {boolean} */ let performDateCheck = true;
        if (updateAll)
        {
            finalResidenceNumbers = (newResidenceDateArray) ? newResidenceDateArray: null;
            finalExpiryNumbers = (newExpiryDateArray) ? newExpiryDateArray: null;
        }
        else
        {
            try {finalResidenceNumbers = (newResidenceDateArray) ? newResidenceDateArray: ((newResidenceDate != null && newResidenceDate instanceof Date) ? validateAndReturnDate(newResidenceDate): null);}
            catch (e) {finalResidenceNumbers = this.#residenceDate; performDateCheck = false;}
            try {finalExpiryNumbers = (newExpiryDateArray) ? newExpiryDateArray: ((newExpiryDate != null && newExpiryDate instanceof Date) ? validateAndReturnDate(newExpiryDate): null);}
            catch (e) {finalExpiryNumbers = this.#expiryDate; performDateCheck = false;}
        }

        if (performDateCheck && finalResidenceNumbers && finalExpiryNumbers)
        {
            if (!isThisNumberDateArrayBefore(finalResidenceNumbers, finalExpiryNumbers))
            {errors.push("Residence date must be before the expiry date.");}
            else if (!isThisNumberDateArrayAfter(finalExpiryNumbers, finalResidenceNumbers))
            {errors.push("Expiry date must be after the residence date.");}
        }

        if (errors.length > 0)
        {throw new Error(errors.join("\n"));}

        if (newResidenceDateArray)
        {newResidenceDate = constructDateFromNumberArray(newResidenceDateArray, newResidenceDate, true);}
        else if (updateAll)
        {newResidenceDate = constructEmptyDate(newResidenceDate);}

        if (newExpiryDateArray)
        {newExpiryDate = constructDateFromNumberArray(newExpiryDateArray, newExpiryDate, true);}
        else if (updateAll)
        {newExpiryDate = constructEmptyDate(newExpiryDate);}

        // Commit the validated values.
        this.#alienNumber = newAlienNumber; this.#receiptNumber = newReceiptNumber; this.#category = newCategory;
        this.#residenceDate = newResidenceDate; this.#expiryDate = newExpiryDate;
    }
    /** A public method used for updating an existing PermanentResidentCard instance. The update is done in a partial fashion so that omitted values will remain unchanged.
     * @param {...any} args - Overloaded argument combinations for a partial update.
     * @throws {Error} if validations fail.
     */
    updateFromArgs(...args)
    {this.#populateFromArgs(false, ...args);}
    /** A public method used for overriding a PermanentResidentCard instance. The update is done in an overriding fashion so that omitted values will be set to undefined.
     * @param {...any} args - Overloaded argument combinations for an overriding update.
     * @throws {Error} if validations fail.
     */
    overrideFromArgs(...args)
    {this.#populateFromArgs(true, ...args);}

    // Getter methods
    //
    /** @return {string} */ getAlienNumber() {return (isStringNotAvailable(this.#alienNumber) === true) ? NA_STRING: this.#alienNumber;}
    /** @return {string} */ getReceiptNumber() {return (isStringNotAvailable(this.#receiptNumber) === true) ? NA_STRING: this.#receiptNumber;}
    /** @return {string} */ getCategory() {return (isStringNotAvailable(this.#category) === true) ? NA_STRING: this.#category;}

    /** @return {string} */ getResidenceDate() {return formatDateToString(this.#residenceDate);}
    /** @return {Date} */ getResidenceDateObj() {return (this.#residenceDate);}
    /** @return {number} */ getYearOfResidence() {return returnDateYear(this.#residenceDate);}
    /** @return {number} */ getMonthOfResidence() {return returnDateMonth(this.#residenceDate);}
    /** @return {number} */ getDayOfResidence() {return returnDateDay(this.#residenceDate);}
    /** @return {string} */ getExpiryDate() {return formatDateToString(this.#expiryDate);}
    /** @return {Date} */ getExpiryDateObj() {return (this.#expiryDate);}
    /** @return {number} */ getYearOfExpiry() {return returnDateYear(this.#expiryDate);}
    /** @return {number} */ getMonthOfExpiry() {return returnDateMonth(this.#expiryDate);}
    /** @return {number} */ getDayOfExpiry() {return returnDateDay(this.#expiryDate);}

    // Setter methods
    //
    /** Validates the alien number.
     * @param {string} alienNumber - The alien number input.
     * @param {boolean} returnValue
     * @return {string|boolean}
     * @throws {Error} If the validation fails.
     */
    static validateAlienNumber(alienNumber, returnValue = false) // Static as it needs to run before declaring an instance
    {
        if (isStringEmpty(alienNumber))
        {throw new Error("Alien number cannot be empty.");}

        const cleanedAlienNumber = alienNumber.replace(/[-\s]/g, ""); // Trim space and dashes
        const alienNumberRegex = new RegExp(`^[Aa]?\\d{1,${PermanentResidentCard.alienNumberCapacity - 1}}$`);

        if (!(alienNumberRegex.test(cleanedAlienNumber)))
        {throw new Error("Invalid alien number format. It must have 9 digits, preceded by the letter 'A'.")}

        if ((cleanedAlienNumber.charAt(0)).toUpperCase() === "A")
        {
            if (cleanedAlienNumber.length > PermanentResidentCard.alienNumberCapacity)
            {throw new Error(`Alien number (with leading 'A') cannot exceed ${PermanentResidentCard.alienNumberCapacity} characters.`);}
        }
        else
        {
            if (cleanedAlienNumber.length > (PermanentResidentCard.alienNumberCapacity - 1))
            {throw new Error(`Alien number cannot exceed ${PermanentResidentCard.alienNumberCapacity - 1} digits when no leading 'A' is provided.`);}
        }

        const finalAlienNumber = (cleanedAlienNumber.startsWith("A") || cleanedAlienNumber.startsWith("a")) ? cleanedAlienNumber.toUpperCase(): "A" + cleanedAlienNumber;

        return (returnValue) ? finalAlienNumber: true;
    }
    /** Validates and returns the alien number.
     * @param {string} alienNumber
     * @return {string} The validated and formatted alien number.
     * @throws {Error} If the validation fails.
     */
    static #validateAndReturnAlienNumber(alienNumber) // Static as it needs to run before declaring an instance
    {
        try
        {return this.validateAlienNumber(alienNumber, true);}
        catch (alienNumberError)
        {throw alienNumberError;}
    }
    /** Sets the alien number after validation.
     * @param {string} alienNumber
     * @throws {Error} If the input is invalid.
     */
    setAlienNumber(alienNumber)
    {this.#alienNumber = PermanentResidentCard.#validateAndReturnAlienNumber(alienNumber);}

    /** Validates the IOE number.
     * @param {string} receiptNumber - The IOE number input.
     * @param {boolean} returnValue
     * @return {string|boolean}
     * @throws {Error} If the validation fails.
     */
    static validateReceiptNumber(receiptNumber, returnValue = false)
    {
        if (isStringEmpty(receiptNumber))
        {throw new Error("Receipt number cannot be empty.");}

        let cleanedReceiptNumber = receiptNumber.replace(/[-\s]/g, "");
        if (cleanedReceiptNumber.length !== PermanentResidentCard.receiptNumberCapacity)
        {throw new Error(`Receipt number must be exactly ${PermanentResidentCard.receiptNumberCapacity} characters long.`);}

        cleanedReceiptNumber = cleanedReceiptNumber.toUpperCase();
        const firstThreeCharacters = cleanedReceiptNumber.substring(0, 3);
        if (!/^[A-Z]{3}$/.test(firstThreeCharacters))
        {throw new Error("The first three characters of receipt number must be alphabetical.");}

        const remaining = cleanedReceiptNumber.substring(3);
        if (!/^\d{10}$/.test(remaining))
        {throw new Error("The last 10 characters of the receipt number must be numeric digits.");}

        return (returnValue) ? cleanedReceiptNumber: true;
    }
    /** Validates and returns the IOE number.
     * @param {string} receiptNumber
     * @return {string} The validated IOE number.
     * @throws {Error} If the validation fails.
     */
    static #validateAndReturnReceiptNumber(receiptNumber)
    {
        try
        {return this.validateReceiptNumber(receiptNumber, true);}
        catch (receiptNumberError)
        {throw receiptNumberError;}
    }
    /** Sets the IOE number after validation.
     * @param {string} ioeNumber
     * @throws {Error} If the input is invalid.
     */
    setReceiptNumber(ioeNumber)
    {this.#receiptNumber = PermanentResidentCard.#validateAndReturnReceiptNumber(ioeNumber);}

    /** Validates the category.
     * @param {string} category - The category input.
     * @param {boolean} returnValue
     * @return {string|boolean}
     * @throws {Error} If the validation fails.
     */
    static validateCategory(category, returnValue = false)
    {
        if (isStringEmpty(category))
        {throw new Error("Category input cannot be empty.");}

        const trimmedCategory = (category.trim()).toUpperCase();
        if (trimmedCategory.length > PermanentResidentCard.categoryCapacity)
        {throw new Error(`Category cannot exceed ${PermanentResidentCard.categoryCapacity} characters.`);}

        if (!/^[A-Z0-9]+$/.test(trimmedCategory))
        {throw new Error("Category must be alphanumerical (letters and digits only).");}

        return (returnValue) ? trimmedCategory: true;
    }
    /** Validates and returns the category.
     * @param {string} category
     * @return {string} The validated category.
     * @throws {Error} If the validation fails.
     */
    static #validateAndReturnCategory(category)
    {
        try
        {return this.validateCategory(category, true);}
        catch (categoryError)
        {throw categoryError;}
    }
    /** Sets the category after validation.
     * @param {string} category
     * @throws {Error} If the input is invalid.
     */
    setCategory(category)
    {this.#category = PermanentResidentCard.#validateAndReturnCategory(category);}

    /** Sets the residence date.
     * Overloads:
     * - setResidenceDate(Date)
     * - setResidenceDate(String)
     * - setResidenceDate(Number, Number, Number)  // month, day, year
     *
     * @param {...any} args - The date parameters.
     * @throws {Error} If the arguments are invalid.
     */
    setResidenceDate(...args)
    {
        const candidateResidenceNumbers = validateAndReturnDate(...args);

        if (this.#expiryDate != null && this.#expiryDate instanceof Date && !isDateDefault(this.#expiryDate))
        {
            const expiryNumbers = validateAndReturnDate(this.#expiryDate);
            if (!isThisNumberDateArrayBefore(candidateResidenceNumbers, expiryNumbers))
            {throw new Error("Residence date must be before the expiry date");}
        }

        this.#residenceDate = constructDateFromNumberArray(candidateResidenceNumbers, this.#residenceDate, true);
        //(this.#residenceDate).setFullYear(candidateResidenceNumbers[0], candidateResidenceNumbers[1], candidateResidenceNumbers[2]);
        //(this.#residenceDate).setHours(0, 0, 0, 0);
    }
    /** Sets the expiry date.
     * Overloads:
     * - setExpiryDate(Date)
     * - setExpiryDate(String)
     * - setExpiryDate(Number, Number, Number)  // month, day, year
     *
     * @param {...any} args - The date parameters.
     * @throws {Error} If the arguments are invalid.
     */
    setExpiryDate(...args)
    {
        const candidateExpiryNumbers = validateAndReturnDate(...args);

        if (this.#residenceDate != null && this.#residenceDate instanceof Date && !isDateDefault(this.#residenceDate))
        {
            const residenceNumbers = validateAndReturnDate(this.#residenceDate);
            if (!isThisNumberDateArrayAfter(candidateExpiryNumbers, residenceNumbers))
            {throw new Error("Expiry date must be after the residence date");}
        }

        this.#expiryDate = constructDateFromNumberArray(candidateExpiryNumbers, this.#expiryDate, true);
        //(this.#expiryDate).setFullYear(candidateExpiryNumbers[0], candidateExpiryNumbers[1], candidateExpiryNumbers[2]);
        //(this.#expiryDate).setHours(0, 0, 0, 0);
    }

    /**Returns a string representation of the PermanentResidentCard.
     * @return {string} Information combining alien number and IOE number.
     */
    toString()
    {return "Alien Number: " + this.getAlienNumber() + "; Receipt Number: " + this.getReceiptNumber();}

    /**Compares this PermanentResidentCard instance with another object for equality. The comparison is case-insensitive for both alien and IOE numbers.
     * @param {any} o - The object to compare.
     * @return {boolean} True if both alien and IOE numbers match; otherwise, false.
     */
    equals(o)
    {
        if (this === o)
        {return true;}

        if (!(o instanceof PermanentResidentCard))
        {return false;}

        const sameAlienNumber = equalsIgnoreCase(this.#alienNumber, o.getAlienNumber());
        if (!sameAlienNumber)
        {return false;}

        const sameIOENumber = equalsIgnoreCase(this.#receiptNumber, o.getReceiptNumber());
        if (!sameIOENumber)
        {return false;}

        return true;
    }
}

class Citizenship
{
    /** @type {number} */ static certificateNumberCapacity = 10;

    /** @type {string} */ #usCitizenshipCertificateNumber;
    /** @type {string} */ #uscisRegistrationNumber; // Inherited: PermanentResidentCard USCISRegistrationNumber
    /** @type {string} */ #locationOfRegistration;
    /** @type {Date} */ #dateOfRegistration;

    /**Constructs a new Citizenship instance.
     * Overloads:
     * - No arguments: Initialize with default values.
     * - 2 arguments (certificate number, date)
     * - 3 arguments: (certificate number, registration number (PermanentResidentCard instance), and date). CityCountry is set to undefined.
     * - 4 arguments: (certificate number, registration number (PermanentResidentCard instance), date, and location).
     *
     * @param {...any} args - The constructor arguments.
     * @throws {Error} if validation fails.
     */
    constructor(...args)
    {
        if (args.length === 0)
        {
            this.#usCitizenshipCertificateNumber = NA_STRING; this.#uscisRegistrationNumber = NA_STRING; this.#locationOfRegistration = NA_STRING;
            this.#dateOfRegistration = new Date(DEFAULTYEAR, 0, 1); return;
        }
        else
        {this.overrideFromArgs(...args);}
    }
    /** Internal helper to populate (or update) instance data with the values in args. When updateAll is true (for the constructor) missing fields are set to undefined.When false (for updateFromArgs), missing values are preserved.
     * @param {any} args - The incoming parameters.
     * @param {boolean} updateAll - If true, fields not supplied are set to undefined. If false, missing parameters are left unchanged.
     * @throws {Error} if any validation fails.
     */
    #populateFromArgs(updateAll, ...args)
    {
        if (args.length !== 2 && args.length !== 3 && args.length !== 4)
        {throw new Error("Invalid number of arguments for updating or overriding Citizenship. Expected 2, 3, or 4 arguments.");}

        /** @type {PermanentResidentCard} */ let greenCardInstance = undefined;
        switch (args.length)
        {
            case 3: case 4:
                if (!(args[1] instanceof PermanentResidentCard))
                {throw new Error("Invalid Green Card instance.");}
                else
                {greenCardInstance = args[1];}
                break;
        }

        /** @type {string[]} */ const errors = [];

        // Start with current values if doing a partial update. Otherwise, set all values to be undefined at first.
        /** @type {string|undefined} */ let newUSCitizenshipCertificateNumber = (updateAll) ? undefined: this.#usCitizenshipCertificateNumber;
        /** @type {string|undefined} */ let newUSCISRegistrationNumber = (updateAll) ? undefined: this.#uscisRegistrationNumber;

        /** @type {Date|undefined} */ let newDateOfRegistration = (updateAll) ? undefined: this.#dateOfRegistration;
        /** @type {number[]|undefined} */ let newDateOfRegistrationNumberArray = undefined;

        /** @type {string|undefined} */ let newLocationOfRegistration = (updateAll) ? undefined: this.#locationOfRegistration;

        switch (args.length)
        {
            case 2:
                newUSCitizenshipCertificateNumber = tryToValidateErrorList(errors, () => Citizenship.#validateAndReturnUSCitizenshipCertificateNumber(args[0]));
                newDateOfRegistrationNumberArray = tryToValidateErrorList(errors, () => validateAndReturnDate(...args[1]));
                break;

            case 3:
                newUSCitizenshipCertificateNumber = tryToValidateErrorList(errors, () => Citizenship.#validateAndReturnUSCitizenshipCertificateNumber(args[0]));
                newUSCISRegistrationNumber = tryToValidateErrorList(errors, () => Citizenship.#validateAndReturnUSCISRegistrationNumber(greenCardInstance));
                newDateOfRegistrationNumberArray = tryToValidateErrorList(errors, () => validateAndReturnDate(...args[2]));
                break;

            case 4:
                newUSCitizenshipCertificateNumber = tryToValidateErrorList(errors, () => Citizenship.#validateAndReturnUSCitizenshipCertificateNumber(args[0]));
                newUSCISRegistrationNumber = tryToValidateErrorList(errors, () => Citizenship.#validateAndReturnUSCISRegistrationNumber(greenCardInstance));
                newDateOfRegistrationNumberArray = tryToValidateErrorList(errors, () => validateAndReturnDate(...args[2]));
                newLocationOfRegistration = tryToValidateErrorList(errors, () => Citizenship.#validateAndReturnLocationOfRegistration(args[3]));
                break;
        }

        // If any errors were recorded, throw a combined error.
        if (errors.length > 0)
        {throw new Error(errors.join("; "));}

        if (newDateOfRegistrationNumberArray)
        {newDateOfRegistration = constructDateFromNumberArray(newDateOfRegistrationNumberArray, newDateOfRegistration, true);}

        // Commit the validated/merged values.
        this.#usCitizenshipCertificateNumber = newUSCitizenshipCertificateNumber;
        this.#uscisRegistrationNumber = newUSCISRegistrationNumber;
        this.#dateOfRegistration = newDateOfRegistration;
        this.#locationOfRegistration = newLocationOfRegistration;
    }
    /**Updates the Citizenship instance properties from the given arguments. Fields that are not provided will remain unchanged.
     * @param {...any} args - Overloaded argument combinations.
     * @throws {Error} if validation fails.
     */
    updateFromArgs(...args)
    {this.#populateFromArgs(false, ...args);}
    /**Overrides the Citizenship instance properties from the given arguments. Fields that are not provided will be set to undefined.
     * @param {...any} args - Overloaded argument combinations.
     * @throws {Error} if validation fails.
     */
    overrideFromArgs(...args)
    {this.#populateFromArgs(true, ...args);}

    // Getter methods
    //
    /** @returns {string} */ getUSCitizenshipCertificateNumber() {return (isStringNotAvailable(this.#usCitizenshipCertificateNumber) === true) ? NA_STRING: this.#usCitizenshipCertificateNumber;}
    /** @returns {string} */ getUSCISRegistrationNo() {return (isStringNotAvailable(this.#uscisRegistrationNumber) === true) ? NA_STRING: this.#uscisRegistrationNumber;}
    /** @returns {string} */ getLocationOfRegistration() {return (isStringNotAvailable(this.#locationOfRegistration) === true) ? NA_STRING: this.#locationOfRegistration;}
    /** @returns {string} */ getDateOfRegistration() {return formatDateToString(this.#dateOfRegistration);}
    /** @returns {Date} */ getDateOfRegistrationObj() {return (this.#dateOfRegistration);}
    /** @returns {number} */ getYearOfRegistration() {return returnDateYear(this.#dateOfRegistration);}
    /** @returns {number} */ getMonthOfRegistration() {return returnDateMonth(this.#dateOfRegistration);}
    /** @returns {number} */ getDayOfRegistration() {return returnDateDay(this.#dateOfRegistration);}

    // Setter methods
    //
    /** Validates the US Citizenship or Naturalization certificate number.
     * @param {string} usCitizenshipCertificateNumber - The US Citizenship or Naturalization certificate number input.
     * @param {boolean} returnValue
     * @return {string|boolean} The validated and formatted US Citizenship or Naturalization certificate number.
     * @throws {Error} If the validation fails.
     */
    static validateUSCitizenshipCertificateNumber(usCitizenshipCertificateNumber, returnValue = false)
    {
        if (isStringEmpty(usCitizenshipCertificateNumber))
        {throw new Error("US Citizenship or Naturalization certificate number cannot be empty.");}

        // Remove all whitespace and convert to uppercase.
        const finalCertificateNumber = (usCitizenshipCertificateNumber.replace(/\s/g, "")).toUpperCase();

        if (finalCertificateNumber.length > Citizenship.certificateNumberCapacity) // Validate length: must be no greater than Citizenship.certificateNumberCapacity.
        {throw new Error(`Certificate number cannot exceed ${Citizenship.certificateNumberCapacity} characters.`);}

        if (!/^[A-Z0-9]+$/.test(finalCertificateNumber)) // Validate that the certificate number is alphanumerical (letters and digits only).
        {throw new Error("Certificate number must be alphanumerical (uppercase letters and digits only).");}

        return (returnValue) ? finalCertificateNumber: true;
    }
    /** Validates and returns the US Citizenship or Naturalization certificate number.
     * @param {string} usCitizenshipCertificateNumber
     * @return {string}
     * @throws {Error} If the validation fails.
     */
    static #validateAndReturnUSCitizenshipCertificateNumber(usCitizenshipCertificateNumber)
    {
        try
        {return this.validateUSCitizenshipCertificateNumber(usCitizenshipCertificateNumber, true);}
        catch (citizenshipCertNumError)
        {throw citizenshipCertNumError;}
    }
    /** Sets the US Citizenship or Naturalization certificate number after validation.
     * @param {string} usCitizenshipCertificateNumber
     * @return {void}
     * @throws {Error} If the input is invalid.
     */
    setUSCitizenshipCertificateNumber(usCitizenshipCertificateNumber)
    {this.#usCitizenshipCertificateNumber = Citizenship.#validateAndReturnUSCitizenshipCertificateNumber(usCitizenshipCertificateNumber);}

    /** Validates the location of registration.
     * @param {string} locationOfRegistration - The location of registration input.
     * @param {boolean} returnValue
     * @return {string|boolean}
     * @throws {Error} If the input is invalid.
     */
    static validateLocationOfRegistration(locationOfRegistration, returnValue = false)
    {
        locationOfRegistration = locationOfRegistration.trim();

        if (isStringEmpty(locationOfRegistration))
        {throw new Error("CityCountry of registration cannot be empty.");}

        if (!(alphabeticalRegex.test(locationOfRegistration)))
        {throw new Error("CityCountry of registration must be alphabetical.");}

        return (returnValue) ? locationOfRegistration: true;
    }
    /** Validates and returns location of registration.
     * @param {string} locationOfRegistration
     * @throws {Error} If the input is invalid.
     * @return {string}
     */
    static #validateAndReturnLocationOfRegistration(locationOfRegistration)
    {
        try
        {return this.validateLocationOfRegistration(locationOfRegistration, true);}
        catch (locationOfRegistrationError)
        {throw locationOfRegistrationError;}
    }
    /** Sets the location of registration after validation.
     * @param {string} locationOfRegistration
     * @throws {Error}
     */
    setLocationOfRegistration(locationOfRegistration)
    {this.#locationOfRegistration = Citizenship.#validateAndReturnLocationOfRegistration(locationOfRegistration);}

    // Setting the USCIS registration number will be handled primarily by the Migration class
    //
    /** Validates and returns
     * @param {PermanentResidentCard} greenCard - Green card object of the PermanentResidentCard class.
     * @throws {Error} If the input is invalid.
     * @return {string}
     */
    static #validateAndReturnUSCISRegistrationNumber(greenCard)
    {
        if (greenCard == null || !(greenCard instanceof PermanentResidentCard))
        {throw new Error("Invalid Green Card instance.");}

        try
        {return PermanentResidentCard.validateAlienNumber(greenCard.getAlienNumber(), true);}
        catch (alienNumberError)
        {throw alienNumberError;}
    }
    /** Sets the USCIS registration number given a greenCard object input.
     * @param {PermanentResidentCard} greenCard - GreenCard object of the PermanentResidentCard class.
     * @throws {Error} If the input is invalid.
     */
    setUSCISRegistrationNumber(greenCard)
    {this.#uscisRegistrationNumber = Citizenship.#validateAndReturnUSCISRegistrationNumber(greenCard);}

    /** Sets the Date of registration
     * Overloads:
     * - setDateOfRegistration(Date)
     * - setDateOfRegistration(String)
     * - setDateOfRegistration(Number, Number, Number)  // month, day, year
     *
     * @param {...any} args - Either a single date or string, or three numbers: month, day, year.
     * @throws {Error} If invalid arguments are provided.
     */
    setDateOfRegistration(...args) {setDate(this.#dateOfRegistration, ...args);}

    /**Returns a string representation of Citizenship.
     * @return {string} Information combining Citizenship certificate and registration number, along with location and registration date.
     */
    toString()
    {
        let result = "Citizenship certificate and registration number: " + this.getUSCitizenshipCertificateNumber() + "; " + this.getUSCISRegistrationNo() + "\nRegistration ";

        if (isStringNotAvailable(this.getLocationOfRegistration()) === false)
        {result += "location and date: " + this.getLocationOfRegistration() + " on " + this.getDateOfRegistration();}
        else
        {result += "date: " + this.getDateOfRegistration();}

        return result;
    }

    equals(o)
    {
        if (this === o)
        {return true;}

        if (!(o instanceof Citizenship))
        {return false;}

        /** @type {boolean} */ const sameUSCitizenshipCertificateNumber = equalsIgnoreCase(this.#usCitizenshipCertificateNumber, o.getUSCitizenshipCertificateNumber());
        if (!sameUSCitizenshipCertificateNumber)
        {return false;}

        /** @type {boolean} */ const sameUSCISRegistrationNumber = equalsIgnoreCase(this.#uscisRegistrationNumber, o.getUSCISRegistrationNo());
        if (!sameUSCISRegistrationNumber)
        {return false;}

        return true;
    }
}

/* class Passport */