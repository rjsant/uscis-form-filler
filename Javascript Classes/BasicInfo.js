import {alphabeticalRegex, equalsIgnoreCase, fullyParseFloat, fullyParseInteger, isCharacterNotAvailable, isInputAlphanumericalIncludingDashes, isInputDigitOnly, isStringEmpty, isStringNotAvailable, tryToValidateErrorList, validateAndReturnBoolean} from "./basicOperations.js";
import {NA_STRING, NA_CHAR, NA_INT, NA_FLOAT} from "./basicOperations.js";
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
    DEFAULTYEAR, isDateDefault, constructEmptyDate
} from './customDateFunctions.js';
import {INVALIDDATE} from "./customDateFunctions.js";
import {Address, CityCountry} from "./Location.js";

// May the Lord have mercy on us all.

export default class BasicInfo
{
    /** @type {Birth} */ #origin;
    /** @type {PersonalName} */ #fullName;
    /** @type {SSN} */ #socialSecurity = new SSN();
    /** @type {boolean} */ #ifSamePersonalMailingAddress = true;
    /** @type {Address} */ #personalAddress;
    /** @type {Address} */ #mailingAddress;
    /** @type {Contact} */ #contactInformation = new Contact();

    constructor()
    {
        this.#origin = new Birth();
        this.#fullName = new PersonalName();
        this.#socialSecurity = new SSN();
        this.#ifSamePersonalMailingAddress = true;
        this.#personalAddress = new Address(); this.#mailingAddress = new Address();
        this.#contactInformation = new Contact();
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for Birth origin object
    // This Javascript shenanigans checks if origin exists, then checks if specified search exists; if not, output default silliness
    /** @returns {string} */    getBirthPlace() {return (this.#origin && (this.#origin).getBirthPlace()) || NA_STRING;}
    /** @returns {string} */    getBirthCity() {return (this.#origin && (this.#origin).getBirthCity()) || NA_STRING;}
    /** @returns {string} */    getBirthCountry() {return (this.#origin && (this.#origin).getBirthCountry()) || NA_STRING;}
    /** @returns {string} */    getBirthCertNum() {return (this.#origin && (this.#origin).getBirthCertNum()) || "";} // Non-necessary, can return empty value.
    /** @returns {string} */    getDoB() {return (this.#origin && (this.#origin).getDoB()) || NA_STRING;}
    /** @returns {Date|null} */ getDoBObj() {return (this.#origin) ? (this.#origin).getDoBObj(): null;}
    /** @returns {number} */    getYearOfBirth() {return (this.#origin) ? (this.#origin).getYearOfBirth(): INVALIDDATE;}
    /** @returns {number} */    getMonthOfBirth() {return (this.#origin) ? (this.#origin).getMonthOfBirth(): INVALIDDATE;}
    /** @returns {number} */    getDayOfBirth() {return (this.#origin) ? (this.#origin).getDayOfBirth(): INVALIDDATE;}
    /** @returns {number} */    getAge() {return (this.#origin) ? (this.#origin).getAge(): NA_INT;}
    /** @returns {boolean} */
    /** @returns {void} */      updateAge() {if (this.#origin) {(this.#origin).updateAge();}}
    /** @returns {string} */    getSex() {return (this.#origin) ? (this.#origin).getSex(): NA_CHAR;}

    // Mutable characteristics
    /** @returns {number} */    getHeightINCH() {return (this.#origin) ? (this.#origin).getHeightInch(): NA_FLOAT;}
    /** @returns {number} */    getHeightFT() {return (this.#origin) ? (this.#origin).getHeightFT(): NA_FLOAT;}
    /** @returns {number} */    getHeightCM() {return (this.#origin) ? (this.#origin).getHeightCM(): NA_FLOAT;}
    /** @returns {number} */    getWeightPounds() {return (this.#origin) ? (this.#origin).getWeightPounds(): NA_FLOAT;}
    /** @returns {number} */    getWeightKG() {return (this.#origin) ? (this.#origin).getWeightKG(): NA_FLOAT;}
    /** @returns {string} */    getEyeColor() {return (this.#origin) ? (this.#origin).getEyeColor(): "";} // Non-necessary, can return empty value.
    /** @returns {string} */    getHairColor() {return (this.#origin) ? (this.#origin).getHairColor(): "";} // Non-necessary, can return empty value.

    // Base Setters
    //
    #initializeEmptyOrigin()
    {
        if (!this.#origin) {this.#origin = new Birth();}
    }

    /** @param {Birth} originObj */
    setOriginObj(originObj)
    {
        if (originObj == null || !(originObj instanceof Birth)) {throw new Error("Origin object must be a valid Birth instance.");}
        else {this.#origin = originObj;}
    }

    // Setter methods using constructors for Birth origin object; if constructor is unneeded, then modify current object
    //
    /** Attempt to update or override Birth origin object
     * @param {boolean} override
     * @param {any} args */
    setOrigin(override, ...args)
    {
        if (args.length !== 2 && args.length !== 4) // Upon invalid number of arguments, throw error
        {throw new Error("Invalid number of arguments for modifying Origin.");}

        if (!this.#origin)
        {this.#origin = new Birth(...args); return;}

        if (override === true) // Attempt to override entire contents
        {
            try {(this.#origin).overrideFromArgs(...args);}
            catch (overrideError) {throw new Error("Failed to override Origin: " + overrideError.message);}
        }
        else // Attempt to update contents if overriding is false
        {
            try {(this.#origin).updateFromArgs(...args);}
            catch (updateError) {throw new Error("Failed to update Origin: " + updateError.message);}
        }
    }

    // Individual setter methods for Birth origin object, these always have initializeEmptyOrigin()
    //
    /** @param {string} city
     * @param country */
    setBirthPlace(city, country)
    {
        this.#initializeEmptyOrigin();
        (this.#origin).setBirthPlace(city, country);
    }

    /** @param {string} certNum */
    setBirthCertNum(certNum)
    {
        this.#initializeEmptyOrigin();
        (this.#origin).setBirthCertNum(certNum);
    }

    setDoB(...args)
    {
        this.#initializeEmptyOrigin();
        (this.#origin).setDoB(...args);
    }

    /** @param {string} sex */
    setSex(sex)
    {
        this.#initializeEmptyOrigin();
        (this.#origin).setSex(sex);
    }

    /** @param {number} inch */
    setHeightINCH(inch)
    {
        this.#initializeEmptyOrigin();
        (this.#origin).setHeightInch(inch);
    }

    /** @param {number} weight */
    setWeightPounds(weight)
    {
        this.#initializeEmptyOrigin();
        (this.#origin).setWeightPounds(weight);
    }

    /** @param {string} color */
    setEyeColor(color)
    {
        this.#initializeEmptyOrigin();
        (this.#origin).setEyeColor(color);
    }

    /** @param {string} color */
    setHairColor(color)
    {
        this.#initializeEmptyOrigin();
        (this.#origin).setHairColor(color);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for fullName object
    // This Javascript sorcery checks if fullName exists, then checks if specified search exists; if not, output default mischief
    /** @returns {string} */ getFirstName() {return (this.#fullName) ? (this.#fullName).getFirstName(): NA_STRING;}
    /** @returns {string} */ getMiddleName() {return (this.#fullName) ? (this.#fullName).getMiddleName(): "";} // Non-necessary, can return empty value.
    /** @returns {string} */ getLastName() {return (this.#fullName) ? (this.#fullName).getLastName(): NA_STRING;}
    /** @returns {string} */ getFullName() {return (this.#fullName) ? (this.#fullName).getFullName(): NA_STRING;}
    /** @returns {PersonalName} */ getFullNameObj() {return this.#fullName;}

    // Base Setters
    //
    #initializeEmptyFullName()
    {
        if (!this.#fullName) {this.#fullName = new PersonalName();}
    }

    /** @param {PersonalName} nameObj */
    setFullNameObj(nameObj)
    {
        if (!nameObj || !(nameObj instanceof PersonalName)) {throw new Error("Full name object must be a valid PersonalName nstance.");}
        else {this.#fullName = nameObj;}
    }

    // Setter methods using constructors for PersonalName fullName object; if constructor is unneeded, then modify current object
    //
    /** Attempt to update or override PersonalName fullName object
     * @param {boolean} override
     * @param {any} args */
    #setFullName(override, ...args)
    {
        if (args.length !== 1 && args.length !== 2 && args.length !== 3)
        {throw new Error("Invalid number of arguments for modifying Full Name.");}

        override = validateAndReturnBoolean(override, "Invalid override input for modifying full name.");

        if (!this.#fullName)
        {this.#fullName = new PersonalName(...args); return;}

        if (override === true) // Attempt to override entire contents
        {
            try {(this.#fullName).overrideFromArgs(...args);}
            catch (overrideError) {throw new Error("Failed to override full name: " + overrideError.message);}
        }
        else // Attempt to update contents if overriding is false
        {
            try {(this.#fullName).updateFromArgs(...args);}
            catch (updateError) {throw new Error("Failed to update full name: " + updateError.message);}
        }
    }
    updateFullName(...args)
    {this.#setFullName(false, ...args);}
    overrideFullName(...args)
    {this.#setFullName(true, ...args);}

    // Individual setter methods for PersonalName fullName object, these always have initializeEmptyName()
    //
    /** @param {string} fullName */
    setName(fullName)
    {
        this.#initializeEmptyFullName();
        (this.#fullName).setName(fullName);
    }

    /** @param {string} firstName */
    setFirstName(firstName)
    {
        this.#initializeEmptyFullName();
        (this.#fullName).setFirstName(firstName);
    }

    /** @param {string} middleName */
    setMiddleName(middleName)
    {
        this.#initializeEmptyFullName();
        (this.#fullName).setMiddleName(middleName);
    }

    /** @param {string} lastName */
    setLastName(lastName)
    {
        this.#initializeEmptyFullName();
        (this.#fullName).setLastName(lastName);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for SSN socialSecurity object
    // This Javascript witchery checks if SSN exists, then outputs specified search; if not, output default riff-raff
    /** @returns {string} */ getPureSSN() {return (this.#socialSecurity) ? (this.#socialSecurity).getPureSSN(): NA_STRING;}
    /** @returns {string} */ getFormattedSSN() {return (this.#socialSecurity) ? (this.#socialSecurity).getFormattedSSN(): NA_STRING;}

    // Base Setters
    //
    #initializeEmptySocialSecurity()
    {
        if (!this.#socialSecurity) {this.#socialSecurity = new SSN();}
    }

    /** @param {SSN} ssnObj ; @throws {Error} If the SSN is invalid. */
    setSocialSecurityObj(ssnObj)
    {
        if (!ssnObj || !(ssnObj instanceof SSN)) {throw new Error("Social security object must be a valid instance of SSN.");}
        else {this.#socialSecurity = ssnObj;}
    }

    // Setter methods using constructors for SSN socialSecurity object
    //
    /** @param {string} ssn
     * @throws {Error} If the SSN is invalid. */
    setSocialSecurity(ssn)
    {
        if (!this.#socialSecurity) {this.#socialSecurity = new SSN(ssn);}
        else {(this.#socialSecurity).setSSN(ssn);}
    }

    // Individual setter method for the SSN socialSecurity object, these always have initializeEmptySocialSecurity()
    //
    /** @param {string} pureSSN
     * @throws {Error} If the SSN is invalid. */
    setPureSSN(pureSSN)
    {
        this.#initializeEmptySocialSecurity();
        this.#socialSecurity.setSSN(pureSSN);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for Address personalAddress/mailingAddress objects
    // This Javascript witchery checks if Address object exists, if so, returns the specified search; if not, output default riff-raff
    /** @returns {string} */ getMailingAddressBaseAddress() {return (this.#mailingAddress) ? (this.#mailingAddress).getBaseAddress(): NA_STRING;}
    /** @returns {string} */ getMailingAddressChamber() {return (this.#mailingAddress) ? (this.#mailingAddress).getChamber(): "";} // Can return empty
    /** @returns {string} */ getMailingAddressCity() {return (this.#mailingAddress) ? (this.#mailingAddress).getCity(): NA_STRING;}
    /** @returns {string} */ getMailingAddressRegion() {return (this.#mailingAddress) ? (this.#mailingAddress).getRegion(): "";} // Can return empty
    /** @returns {string} */ getMailingAddressState() {return (this.#mailingAddress) ? (this.#mailingAddress).getState(): "";} // Can return empty
    /** @returns {string} */ getMailingAddressStateFully() {return (this.#mailingAddress) ? (this.#mailingAddress).getStateFully(): NA_STRING;} // Can return empty
    /** @returns {string} */ getMailingAddressCountry() {return (this.#mailingAddress) ? (this.#mailingAddress).getCountry(): NA_STRING;}
    /** @returns {string} */ getMailingAddressCountryFully() {return (this.#mailingAddress) ? (this.#mailingAddress).getCountryFully(): NA_STRING;}
    /** @returns {string} */ getMailingAddressCountryCode() {return (this.#mailingAddress) ? (this.#mailingAddress).getCountryCode(): NA_STRING;}
    /** @returns {string} */ getMailingAddressPostalCode() {return (this.#mailingAddress) ? (this.#mailingAddress).getPostalCode(): NA_STRING;}
    /** @returns {boolean} */ isMailingAddressDomestic() {return (this.#mailingAddress) ? (this.#mailingAddress).getIsAddressDomestic(): false;}

    // This is double ternary. The Lord will not be pleased with this; Checks ifSamePersonalMailingAddress is true, if so, return MailingAddress' respective values. Otherwise, do Javascript witchery on personalAddress
    /** @returns {string} */ getPersonalAddressBaseAddress() {return (this.#ifSamePersonalMailingAddress) ? this.getMailingAddressBaseAddress(): ((this.#personalAddress) ? this.#personalAddress.getBaseAddress(): NA_STRING); }
    /** @returns {string} */ getPersonalAddressChamber() {return (this.#ifSamePersonalMailingAddress) ? this.getMailingAddressChamber(): ((this.#personalAddress) ? this.#personalAddress.getChamber(): ""); } // Can return empty
    /** @returns {string} */ getPersonalAddressCity() {return (this.#ifSamePersonalMailingAddress) ? this.getMailingAddressCity(): ((this.#personalAddress) ? this.#personalAddress.getCity(): NA_STRING); }
    /** @returns {string} */ getPersonalAddressRegion() {return (this.#ifSamePersonalMailingAddress) ? this.getMailingAddressRegion(): ((this.#personalAddress) ? this.#personalAddress.getRegion(): ""); } // Can return empty
    /** @returns {string} */ getPersonalAddressState() {return (this.#ifSamePersonalMailingAddress) ? this.getMailingAddressState(): ((this.#personalAddress) ? this.#personalAddress.getState(): ""); } // Can return empty
    /** @returns {string} */ getPersonalAddressStateFully() {return (this.#ifSamePersonalMailingAddress) ? this.getMailingAddressStateFully(): ((this.#personalAddress) ? this.#personalAddress.getStateFully(): NA_STRING); } // Can return empty
    /** @returns {string} */ getPersonalAddressCountry() {return (this.#ifSamePersonalMailingAddress) ? this.getMailingAddressCountry(): ((this.#personalAddress) ? this.#personalAddress.getCountry(): NA_STRING); }
    /** @returns {string} */ getPersonalAddressCountryFully() {return (this.#ifSamePersonalMailingAddress) ? this.getMailingAddressCountryFully(): ((this.#personalAddress) ? this.#personalAddress.getCountryFully(): NA_STRING); }
    /** @returns {string} */ getPersonalAddressCountryCode() {return (this.#ifSamePersonalMailingAddress) ? this.getMailingAddressCountryCode(): ((this.#personalAddress) ? this.#personalAddress.getCountryCode(): NA_STRING); }
    /** @returns {string} */ getPersonalAddressPostalCode() {return (this.#ifSamePersonalMailingAddress) ? this.getMailingAddressPostalCode(): ((this.#personalAddress) ? this.#personalAddress.getPostalCode(): NA_STRING); }
    /** @returns {boolean} */ isPersonalAddressDomestic() {return (this.#ifSamePersonalMailingAddress) ? this.isMailingAddressDomestic(): ((this.#personalAddress) ? this.#personalAddress.getIsAddressDomestic(): false); }

    // Base Setters
    //
    /** @returns {Address} */
    #initializeEmptyAddress()
    {return new Address();}
    /** @returns {Address} */
    #initializeEmptyMailingAddress()
    {
        if (!this.#mailingAddress)
        {this.#mailingAddress = this.#initializeEmptyAddress();}
    }
    /** @returns {Address} */
    #initializeEmptyPersonalAddress()
    {
        if (!this.#personalAddress)
        {this.#personalAddress = this.#initializeEmptyAddress();}
    }

    #addressConsistency()
    {
        if (this.#ifSamePersonalMailingAddress)
        {
            if (this.#personalAddress == null && this.#mailingAddress != null)
            {this.#personalAddress = this.#mailingAddress;}
            else if (this.#personalAddress != null && this.#mailingAddress == null)
            {this.#mailingAddress = this.#personalAddress;}
            else if (this.#personalAddress != null && this.#mailingAddress != null)
            {this.#mailingAddress = this.#personalAddress;}
        }
    }
    /** @param {boolean} ifSamePersonalMailingAddress */
    setIfSamePersonalMailingAddress(ifSamePersonalMailingAddress)
    {
        try
        {this.#ifSamePersonalMailingAddress = validateAndReturnBoolean(ifSamePersonalMailingAddress, "Invalid boolean input for setting if mailing address is the same as personal address.");}
        catch (ifSamePersonalMailingAddressError)
        {throw ifSamePersonalMailingAddressError;}
    }

    /** @param {Address} mailingAddressObj
     * @param {boolean} ifSamePersonalMailingAddress */
    setMailingAddressObj(mailingAddressObj, ifSamePersonalMailingAddress)
    {
        if (mailingAddressObj == null || !(mailingAddressObj instanceof Address)) {throw new Error("Mailing address object must be a valid Address instance.");}
        else
        {this.setIfSamePersonalMailingAddress(ifSamePersonalMailingAddress); this.#mailingAddress = mailingAddressObj;}

        if (this.#ifSamePersonalMailingAddress) // Address consistency considers personal address as canonical, so if both personalAddress and mailingAddress exist, then mailingAddress cannot be updated or overridden.
        {this.#personalAddress = this.#mailingAddress;}
    }

    /** @param {Address} personalAddressObj
     * @param {boolean} ifSamePersonalMailingAddress */
    setPersonalAddressObj(personalAddressObj, ifSamePersonalMailingAddress)
    {
        if (personalAddressObj == null || !(personalAddressObj instanceof Address))
        {throw new Error("Personal address must be a valid Address instance.");}
        else
        {this.setIfSamePersonalMailingAddress(ifSamePersonalMailingAddress); this.#personalAddress = personalAddressObj;}

        if (this.#ifSamePersonalMailingAddress)
        {this.#addressConsistency();}
    }

    // Setter methods using constructors for Address object
    //
    /** Attempt to update or override Address mailingAddress object
     * @param {boolean} override
     * @param {boolean} ifSamePersonalMailingAddress
     * @param {any} args */
    #setMailingAddress(override, ifSamePersonalMailingAddress, ...args)
    {
        if (args.length !== 1 && args.length !== 2 && args.length !== 3 && args.length !== 4 && args.length !== 5 && args.length !== 6 && args.length !== 7)
        {throw new Error("Invalid number of arguments for modifying mailing address.");}

        override = validateAndReturnBoolean(override, "Invalid override input for modifying mailing address.");
        ifSamePersonalMailingAddress = validateAndReturnBoolean(ifSamePersonalMailingAddress);

        if (!this.#mailingAddress)
        {this.#mailingAddress = new Address(...args);}
        else
        {
            if (override === true) // Attempt to override entire contents
            {
                try {(this.#mailingAddress).overrideFromArgs(...args);}
                catch (overrideError) {throw new Error("Failed to override mailing address:\n" + overrideError.message);}
            }
            else // Attempt to update contents if overriding is false
            {
                try {(this.#mailingAddress).updateFromArgs(...args);}
                catch (updateError) {throw new Error("Failed to update mailing address:\n" + updateError.message);}
            }
        }

        this.#ifSamePersonalMailingAddress = ifSamePersonalMailingAddress;
        if (this.#ifSamePersonalMailingAddress) // Address consistency considers personal address as canonical, so if both personalAddress and mailingAddress exist, then mailingAddress cannot be updated or overridden.
        {this.#personalAddress = this.#mailingAddress;}
    }
    updateMailingAddress(ifSamePersonalMailingAddress, ...args)
    {this.#setMailingAddress(false, ifSamePersonalMailingAddress, ...args);}
    overrideMailingAddress(ifSamePersonalMailingAddress, ...args)
    {this.#setMailingAddress(true, ifSamePersonalMailingAddress, ...args);}

    /** Create a new mailing address, as an individual isn't always tethered to one place.
     * @param {boolean} ifSamePersonalMailingAddress
     * @param {any} args */
    setNewMailingAddress(ifSamePersonalMailingAddress, ...args)
    {
        if (args.length !== 1 && args.length !== 2 && args.length !== 3 && args.length !== 4 && args.length !== 5 && args.length !== 6 && args.length !== 7)
        {throw new Error("Invalid number of arguments for creating a mailing address.");}

        this.#mailingAddress = new Address(...args);

        this.setIfSamePersonalMailingAddress(ifSamePersonalMailingAddress);
        if (this.#ifSamePersonalMailingAddress) // Address consistency considers personal address as canonical, so if both personalAddress and mailingAddress exist, then mailingAddress cannot be updated or overridden.
        {this.#personalAddress = this.#mailingAddress;}
    }

    /** Attempt to update or override Address personalAddress object
     * @param {boolean} override
     * @param {boolean} ifSamePersonalMailingAddress
     * @param {any} args */
    #setPersonalAddress(override, ifSamePersonalMailingAddress, ...args)
    {
        if (args.length !== 1 && args.length !== 2 && args.length !== 3 && args.length !== 4 && args.length !== 5 && args.length !== 6 && args.length !== 7)
        {throw new Error("Invalid number of arguments for modifying personal address.");}

        ifSamePersonalMailingAddress = validateAndReturnBoolean(ifSamePersonalMailingAddress);

        if (!this.#personalAddress)
        {this.#personalAddress = new Address(...args);}
        else
        {
            if (override === true) // Attempt to override entire contents
            {
                try {(this.#personalAddress).overrideFromArgs(...args);}
                catch (overrideError) {throw new Error("Failed to override personal address:\n" + overrideError.message);}
            }
            else // Attempt to update contents if overriding is false
            {
                try {(this.#personalAddress).updateFromArgs(...args);}
                catch (updateError) {throw new Error("Failed to update personal address:\n" + updateError.message);}
            }
        }

        this.#ifSamePersonalMailingAddress = ifSamePersonalMailingAddress;
        if (this.#ifSamePersonalMailingAddress)
        {this.#addressConsistency();}
    }
    updatePersonalAddress(ifSamePersonalMailingAddress, ...args)
    {this.#setPersonalAddress(false, ifSamePersonalMailingAddress, ...args);}
    overridePersonalAddress(ifSamePersonalMailingAddress, ...args)
    {this.#setPersonalAddress(true, ifSamePersonalMailingAddress, ...args);}

    /** Create a new personal address, as an individual isn't always tethered to one place.
     * @param {boolean} ifSamePersonalMailingAddress
     * @param {any} args */
    setNewPersonalAddress(ifSamePersonalMailingAddress, ...args)
    {
        if (args.length !== 1 && args.length !== 2 && args.length !== 3 && args.length !== 4 && args.length !== 5 && args.length !== 6 && args.length !== 7)
        {throw new Error("Invalid number of arguments for creating a mailing address.");}

        this.#personalAddress = new Address(...args);

        this.setIfSamePersonalMailingAddress(ifSamePersonalMailingAddress);
        if (this.#ifSamePersonalMailingAddress)
        {this.#addressConsistency();}
    }

    // Individual setter method for the Address object, these always have initializeEmptyAddress()
    //
    /** A common helper to update the mailing address.
     * @param {string} setterFunctionName - The name of the mailing address setter (e.g. "setBaseAddress", "setCity", etc.).
     * @param {string} value - The value to pass to that setter.
     */
    #updateMailingAddressValue(setterFunctionName, value)
    {
        this.#initializeEmptyMailingAddress();
        this.#mailingAddress[setterFunctionName](value);

        if (this.#ifSamePersonalMailingAddress)
        {this.#addressConsistency();}
    }

    /** @param {string} baseAddress */ setMailingAddressBaseAddress(baseAddress){this.#updateMailingAddressValue((Address.prototype.setBaseAddress).name, baseAddress);}
    /** @param {string} chamber */ setMailingAddressChamber(chamber)            {this.#updateMailingAddressValue((Address.prototype.setChamber).name, chamber);}
    /** @param {string} city */ setMailingAddressCity(city)                     {this.#updateMailingAddressValue((Address.prototype.setCity).name, city);}
    /** @param {string} region */ setMailingAddressRegion(region)               {this.#updateMailingAddressValue((Address.prototype.setRegion).name, region);}
    /** @param {string} state */ setMailingAddressState(state)                  {this.#updateMailingAddressValue((Address.prototype.setState).name, state);}
    /** @param {string} postalCode */ setMailingAddressPostalCode(postalCode)   {this.#updateMailingAddressValue((Address.prototype.getPostalCode).name, postalCode);}
    /** @param {string} country */ setMailingAddressCountry(country)            {this.#updateMailingAddressValue((Address.prototype.setCountry).name, country);}

    /** A common helper to update the personal address.
     * @param {string} setterFunctionName - The name of the personal address setter (e.g. "setBaseAddress", "setCity", etc.).
     * @param {string} value - The value to pass to that setter.
     */
    #updatePersonalAddressValue(setterFunctionName, value)
    {
        this.#initializeEmptyPersonalAddress();
        this.#personalAddress[setterFunctionName](value);

        if (this.#ifSamePersonalMailingAddress)
        {this.#addressConsistency();}
    }

    /** @param {string} baseAddress */ setPersonalAddressBaseAddress(baseAddress){this.#updatePersonalAddressValue((Address.prototype.setBaseAddress).name, baseAddress);}
    /** @param {string} chamber */ setPersonalAddressChamber(chamber)            {this.#updatePersonalAddressValue((Address.prototype.setChamber).name, chamber);}
    /** @param {string} city */ setPersonalAddressCity(city)                     {this.#updatePersonalAddressValue((Address.prototype.setCity).name, city);}
    /** @param {string} region */ setPersonalAddressRegion(region)               {this.#updatePersonalAddressValue((Address.prototype.setRegion).name, region);}
    /** @param {string} state */ setPersonalAddressState(state)                  {this.#updatePersonalAddressValue((Address.prototype.setState).name, state);}
    /** @param {string} postalCode */ setPersonalAddressPostalCode(postalCode)   {this.#updatePersonalAddressValue((Address.prototype.getPostalCode).name, postalCode);}
    /** @param {string} country */ setPersonalAddressCountry(country)            {this.#updatePersonalAddressValue((Address.prototype.setCountry).name, country);}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for Contact contactInformation object
    // This Javascript jibber-jabber checks if contactInformation object exists, if so, return specified search if not, output default non-gibberish
    /** @returns {string} */ getEmail() {return (this.#contactInformation) ? (this.#contactInformation).getEmail(): NA_STRING;}
    /** @returns {number} */ getContactNumberCountryPrefix() {return (this.#contactInformation) ? (this.#contactInformation).getContactNumberCountryPrefix(): NA_INT;}
    /** @returns {string} */ getContactNumber() {return (this.#contactInformation) ? (this.#contactInformation).getContactNumber(): NA_STRING;}

    // Base Setters
    //
    #initializeEmptyContact()
    {if (!this.#contactInformation) {this.#contactInformation = new Contact();}}

    /** @param {Contact} contactInformationObj */
    setContactInformationObj(contactInformationObj)
    {
        if (contactInformationObj == null || !(contactInformationObj instanceof Contact))
        {throw new Error("Contact information object must be a valid Contact instance.");}
        else
        {this.#contactInformation = contactInformationObj;}
    }

    // Setter methods using constructors for Contact contactInformation object
    //
    /** Attempt to update or override Contact contactInformation object
     * @param {boolean} override
     * @param {any} args */
    #setContactInformation(override, ...args)
    {
        if (args.length !== 1 && args.length !== 2 && args.length !== 3)
        {throw new Error("Invalid number of arguments for modifying contact information.");}

        if (!this.#contactInformation)
        {this.#contactInformation = new Contact(...args); return;}

        if (override === true) // Attempt to override entire contents
        {
            try {(this.#contactInformation).overrideFromArgs(...args);}
            catch (overrideError) {throw new Error("Failed to override contact information:\n" + overrideError.message);}
        }
        else // Attempt to update contents if overriding is false
        {
            try {(this.#contactInformation).updateFromArgs(...args);}
            catch (updateError) {throw new Error("Failed to update contact information:\n" + updateError.message);}
        }
    }
    updateContactInformation(...args)
    {this.#setContactInformation(false, ...args);}
    overrideContactInformation(...args)
    {this.#setContactInformation(true, ...args);}

    /** Create new contact information, as an individual may not always have the same contact information.
     * @param {any} args */
    setNewContactInformation(...args)
    {
        if (args.length !== 1 && args.length !== 2 && args.length !== 3)
        {throw new Error("Invalid number of arguments for modifying contact information.");}

        this.#contactInformation = new Contact(...args);
    }

    // Individual setter method for the Contact contactInformation object, these always have initializeEmptyContact()
    //
    /** @param {string} email */
    setEmail(email)
    {
        this.#initializeEmptyContact();
        (this.#contactInformation).setEmail(email);
    }

    /** @param {string} contactNumberPrefix */
    setContactNumberPrefix(contactNumberPrefix)
    {
        this.#initializeEmptyContact();
        (this.#contactInformation).setContactNumberPrefix(contactNumberPrefix);
    }

    /** @param {string} contactNumber */
    setContactNumber(contactNumber)
    {
        this.#initializeEmptyContact();
        (this.#contactInformation).setContactNumber(contactNumber);
    }

    /** @param {string} fullContactNumber */
    setFullContactNumber(fullContactNumber)
    {
        this.#initializeEmptyContact();
        (this.#contactInformation).setFullContactNumber(fullContactNumber);
    }
}

/**@class Birth
 * @description Represents birth characteristics including:
 * - Sex, Place of Birth, Date of Birth, BirthCertificateIDNum
 * - Mutable characteristics: height (in inches), weight (in pounds), eye color, and hair color.
 */
class Birth
{
    // Enumerated values
    static ColorEnum = Object.freeze({
        // Eye colors
        BLACK: "BLACK", BLUE: "BLUE", BROWN: "BROWN", GRAY: "GRAY",
        GREEN: "GREEN", HAZEL: "HAZEL", MAROON: "MAROON", PINK: "PINK",
        // Hair colors
        BALD: "BALD", BLOND: "BLOND", RED: "RED",
        SANDY: "SANDY", WHITE: "WHITE",
        // Shared fallback
        OTHER: "OTHER"
    });
    static ColorAliases = Object.freeze({
        "N/A": "OTHER",
        "UNKNOWN": "OTHER",
        "NONE": "OTHER",
        "NA": "OTHER"
    });
    static Sexes =
    {
        M: "M",
        MALE: "M",
        MAN: "M",
        BOY: "M",
        F: "F",
        FEMALE: "F",
        WOMAN: "F",
        GIRL: "F",
        "N/A": "N",
        NA: "N",
        N: "N"
    };

    // Private fields
    /** @type {CityCountry} */ #birthPlace = new CityCountry();
    /** @type {string} */ #birthCertNum = ""; // Can be empty
    // /** @type {CustomDate} */ #DoB;
    /** @type {Date} */ #DoB;

    /** @type {number} */ #age = 0;
    // FEDERALES!!!!!!!!!! I swear there is a reason for this naming convention; also federales, it isn't my fault the age convention varies for some raisin 💤
    /** @type {boolean} */ #minor; // Age below 18
    /** @type {boolean} */ #superMinor; // Age below 16?
    /** @type {boolean} */ #supremeMinor; // Age below 14?

    /** @type {string} */ #sex; // Stored as a single-character string: 'M', 'F', or 'N'

    // Mutable birth characteristics
    /** @type {number} */ #heightInch;
    /** @type {number} */ #weightPounds;
    /** @type {string} */ #eyeColor = (Birth.ColorEnum).BROWN; // Can be empty
    /** @type {string} */ #hairColor = (Birth.ColorEnum).BLACK; // Can be empty

    /** Constructor can be invoked in ways
     * Constructor: Takes a Date object OR a date string alongside other fields.
     * - new Birth(dateOfBirth, sex)
     * - new Birth(dateOfBirth, birthCity, birthCountry, sex)
     *
     * @param args
     * @param {Date|string} dateOfBirth - A Date object or a string representing the date of birth.
     * @param {string} birthCity - The city of birth.
     * @param {string} birthCountry - The country of birth.
     * @param {string} sex - The sex ('M', 'F', or 'N').
     * @throws {Error} If the provided arguments are invalid.
     */
    constructor(...args)
    {
        if (args.length === 0) // Set default values
        {
            this.#DoB = new Date(DEFAULTYEAR, 0, 1);
            this.#sex = NA_CHAR;

            if (this.#birthPlace == null)
            {this.#birthPlace = new CityCountry();}
        }
        else
        {this.overrideFromArgs(...args);}
    }
    #populateFromArgs(updateAll, ...args)
    {
        if (args.length !== 2 && args.length !== 4)
        {throw new Error("Invalid number of arguments for constructing or overriding birth. Expected 2 or 4.");}

        /** @type {string[]} */ const errors = [];
        /** @type {Date|undefined} */ let newDateOfBirth = this.#DoB;
        /** @type {number[]|undefined} */ let newDateOfBirthNumberArray = undefined;
        /** @type {string|undefined} */ let newSex = (updateAll) ? undefined: this.#sex;

        /** @type {CityCountry|undefined} */ let newBirthPlace = this.#birthPlace;
        /** @type {string[]|undefined} */ let newBirthPlaceArray = undefined;

        switch (args.length)
        {
            case 2:
                newDateOfBirthNumberArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[0]));
                newSex = tryToValidateErrorList(errors, () => Birth.#validateAndReturnSex(args[1]));
                break;

            case 4:
                newDateOfBirthNumberArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[0]));
                newSex = tryToValidateErrorList(errors, () => Birth.#validateAndReturnSex(args[1]));
                newBirthPlaceArray = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCityCountryPlace(args[2], args[3]));
                break;
        }

        if (errors.length > 0)
        {throw new Error(errors.join("\n"));}

        if (newDateOfBirthNumberArray)
        {newDateOfBirth = constructDateFromNumberArray(newDateOfBirthNumberArray, newDateOfBirth, true);}
        else if (updateAll)
        {newDateOfBirth = constructEmptyDate(newDateOfBirth);}
        if (newBirthPlaceArray) // Since we are getting passed strings instead of an object to determine place of marriage, this is proper
        {newBirthPlace = CityCountry.constructCityCountryFromCityCountryArray(newBirthPlaceArray, newBirthPlace, true);}
        else if (updateAll)
        {newBirthPlace = CityCountry.constructEmptyCityCountry(newBirthPlace);}

        this.#DoB = newDateOfBirth;
        this.updateAge();
        this.#sex = newSex;
        // this.#birthPlace = newBirthPlace;
        this.#birthPlace = newBirthPlace;
    }
    /** Partial update: Only the provided fields override existing values. (For detailed update overloads: 3, 4, 5, 6, or 7 arguments.)
     * @param {...any} args
     * @throws {Error} if validations fail.
     */
    updateFromArgs(...args)
    {this.#populateFromArgs(false, ...args);}
    /** Full override update: Missing fields will be replaced by defaults (e.g. "" for optional).
     * @param {...any} args
     * @throws {Error} if validations fail.
     */
    overrideFromArgs(...args)
    {this.#populateFromArgs(true, ...args);}

    // Getter methods
    /** Returns the formatted birth place.
     * Returns "City, Country" if both values are available, N/A, Country" if the city is not available, "City, N/A" if the country is not available, or "N/A, N/A" if neither is available.
     * @returns {string} */
    /** @returns {string} */ getBirthPlace() {return (this.#birthPlace).getPlace();}
    /** @returns {string[]} */ #getBirthPlaceArr() {return (this.#birthPlace).getPlaceArr();}
    /** @returns {string} */ getBirthCity() {return (this.#birthPlace).getCity();}
    /** @returns {string} */ getBirthCountry() {return (this.#birthPlace).getCountry();}
    /** @returns {string} */ getBirthCountryFully() {return (this.#birthPlace).getCountryFully();}
    /** @returns {string} */ getBirthCountryCode() {return (this.#birthPlace).getCountryCode();}

    /** @returns {string} */ getBirthCertNum() {return this.#birthCertNum;} // Can be empty
    /** @returns {string} */ getDoB() {return formatDateToString(this.#DoB);}
    /** @returns {Date} */ getDoBObj() {return (!isDateDefault(this.#DoB)) ? this.#DoB: null;}
    /** @returns {number} */ getYearOfBirth() {return returnDateYear(this.#DoB);}
    /** @returns {number} */ getMonthOfBirth() {return returnDateMonth(this.#DoB);}
    /** @returns {number} */ getDayOfBirth() {return returnDateDay(this.#DoB);}
    /** @returns {number} */ getAge() {return (this.#age) ? this.#age: NA_INT;}
    /** @returns {string} */ getSex() {return (isCharacterNotAvailable(this.#sex)) ? NA_CHAR: this.#sex;}

    // Mutable birth characteristics getters
    /** @returns {number} */ getHeightInch() {return (this.#heightInch > 0) ? Math.round(this.#heightInch): NA_INT; }
    /** @returns {number} */ getHeightFT() {return (this.#heightInch > 0) ? Math.round((this.#heightInch / 12) * 100) / 100: NA_INT; }
    /** @returns {number} */ getHeightCM() {return (this.#heightInch > 0) ? Math.round(this.#heightInch * 2.54 * 100) / 100: NA_INT; }
    /** @returns {number} */ getWeightPounds() {return (this.#weightPounds > 0) ? Math.round(this.#weightPounds): NA_INT; }
    /** @returns {number} */ getWeightKG() {return (this.#weightPounds > 0) ? Math.round(this.#weightPounds / 2.205): NA_INT; }
    /** @returns {string} */ getEyeColor() {return this.#eyeColor;} // Can be empty
    /** @returns {string} */ getHairColor() {return this.#hairColor;} // Can be empty

    // Setter methods
    //
    /** Sets the Date of Birth (DoB).
     * Overloads:
     * - setDoB(Date)
     * - setDoB(String)
     * - setDoB(Number, Number, Number)  // month, day, year
     *
     * @param {...any} args - Either a single Date or String, or three numbers: month, day, year.
     * @throws {Error} If invalid arguments are provided.
     */
    setDoB(...args)
    {
        setDate(this.#DoB, ...args);
        this.updateAge();
    }
    updateAge()
    {
        this.#age = Birth.calculateAge(this.#DoB);

        if (this.#age < 18)
        {
            this.#minor = true;
            this.#superMinor = this.#age <= 16;
            this.#supremeMinor = this.#age <= 14;
        }
        else
        {
            this.#minor = false;
            this.#superMinor = false;
            this.#supremeMinor = false;
        }
    }

    /** Sets the birth city.
     * @param {string} birthCity
     * @throws {Error} If birth city is invalid.
     */
    setBirthCity(birthCity)
    {(this.#birthPlace).setCity(birthCity);}
    /** Sets the birth country.
     * @param {string} birthCountry
     * @throws {Error} If either parameter is null or empty.
     */
    setBirthCountry(birthCountry)
    {(this.#birthPlace).setCountry(birthCountry);}
    /** Sets the birth place with the specified city and country.
     * @param {string} birthCity
     * @param {string} birthCountry
     * @throws {Error} If either parameter is null or empty.
     */
    setBirthPlace(birthCity, birthCountry)
    {(this.#birthPlace).setCityCountryPlace(birthCity, birthCountry);}

    /** Validates the birth certificate number
     * @param {string} birthCertNum
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * @throws {Error} If the input is non-empty, then validate
     */
    static validateBirthCertNum(birthCertNum, returnValue = false)
    {
        birthCertNum = (birthCertNum.trim()).toUpperCase();

        if (isStringNotAvailable(birthCertNum))
        {return (returnValue) ? "": true;}
        else if (!isInputAlphanumericalIncludingDashes(birthCertNum))
        {throw new Error("Birth certificate number can only be alphanumerical.");}

        return (returnValue) ? birthCertNum: true;
    }
    /** Validates and returns the birth certificate number
     * @param {string} birthCertNum
     * @returns {string}
     * @throws {Error} If the input is non-empty, then validate
     */
    static #validateAndReturnBirthCertNum(birthCertNum)
    {
        try
        {return this.validateBirthCertNum(birthCertNum, true);}
        catch (birthCertificateNumError)
        {throw birthCertificateNumError;}
    }
    /** Sets the birth certificate number; Can be empty
     * @param {string} birthCertNum
     * @throws {Error} If either birthCertNum is invalid.
     */
    setBirthCertNum(birthCertNum)
    {this.#birthCertNum = Birth.#validateAndReturnBirthCertNum(birthCertNum);}

    /** Validates sex input
     * @param {string} sex - Must be 'M', 'F', or 'N'.
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * @throws {Error} If sex is invalid. */
    static validateSex(sex, returnValue = false)
    {
        sex = (typeof sex === "string") ? sex.trim().toUpperCase() : "";

        const mappedSex = Birth.Sexes[sex];

        if (!mappedSex)
        {throw new Error("Invalid sex format. Input must correspond to M, F, or N (not available).");}

        return (returnValue) ? mappedSex: true;
    }
    /** Validates and returns sex input
     * @param {string} sex - Must be 'M', 'F', or 'N'.
     * @throws {Error} If sex is invalid. */
    static #validateAndReturnSex(sex)
    {
        try
        {return this.validateSex(sex, true);}
        catch (sexError)
        {throw sexError;}
    }
    /** @param {string} sex - Must be 'M', 'F', or 'N'.
     * @throws {Error} If sex is invalid. */
    setSex(sex)
    {this.#sex = Birth.#validateAndReturnSex(sex);}

    // Mutable characteristics
    //
    /** Validates the input height given in inches
     * @param {string|number} heightInch
     * @param {boolean} returnValue
     * @returns {number|boolean}
     * @throws {Error} If the input is invalid
     */
    static validateHeightInch(heightInch, returnValue = false)
    {
        try
        {heightInch = fullyParseInteger(heightInch);}
        catch (heightError)
        {throw new Error("Height input must be numerical.");}

        if (heightInch <= 0)
        {throw new Error("Height input must be above 0 inches.")}

        return (returnValue) ? heightInch: true;
    }
    /** Validates and returns the input height given in inches
     * @param {string|number} heightInch
     * @returns {number}
     * @throws {Error} If the input is invalid
     */
    static #validateAndReturnHeightInch(heightInch)
    {
        try
        {return this.validateHeightInch(heightInch, true);}
        catch (heightError)
        {throw heightError;}
    }
    /** Sets the height in inches
     * @param {string|number} heightInch
     * @throws {Error} If the input is invalid
     */
    setHeightInch(heightInch)
    {this.#heightInch = Birth.#validateAndReturnHeightInch(heightInch);}

    /** Validates the input weight given in pounds
     * @param {string|number} weightPounds
     * @param {boolean} returnValue
     * @returns {number|boolean}
     * @throws {Error} If the input is invalid
     */
    static validateWeightPounds(weightPounds, returnValue = false)
    {
        try
        {weightPounds = fullyParseFloat(weightPounds);}
        catch (weightError)
        {throw new Error("Weight input must be numerical.");}

        if (weightPounds <= 0)
        {throw new Error("Weight input must be above 0 pounds.")}

        return (returnValue) ? weightPounds: true;
    }
    /** Validates and returns the input weight given in pounds
     * @param {string|number} weightPounds
     * @returns {number}
     * @throws {Error} If the input is invalid
     */
    static #validateAndReturnWeightPounds(weightPounds)
    {
        try
        {return this.validateWeightPounds(weightPounds, true);}
        catch (weightError)
        {throw weightError;}
    }
    /** Sets the input weight given in pounds
     * @param {string|number} weightPounds
     * @returns {number}
     * @throws {Error} If the input is invalid
     */
    setWeightPounds(weightPounds)
    {this.#weightPounds = Birth.#validateAndReturnHeightInch(weightPounds);}

    /** Validates the input color
     * @param {string} color
     * @param {string[]} invalidValues
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * @throws {Error} If the input is invalid
     */
    static validateColor(color, { invalidValues = [] } = {}, returnValue = false)
    {
        color = (typeof color == "string") ? (color.trim()).toUpperCase(): ""; // Normalize the input: trim and convert to uppercase.

        // Check for empty input.
        if (isStringEmpty(color))
        {throw new Error("Color input cannot be empty.");}

        // If the given color is an alias, convert it to the corresponding valid color.
        if ((this.ColorAliases).hasOwnProperty(color))
        {color = this.ColorAliases[color];}

        // Check against any disallowed values (e.g., for eye color).
        if (invalidValues.length > 0 && invalidValues.includes(color))
        {throw new Error(`${color} is not a valid color for this type.`);}

        // Verify that the color exists in the ColorEnum. If not, default to OTHER.
        if (!Object.values(this.ColorEnum).includes(color))
        {color = this.ColorEnum.OTHER;}

        return (returnValue) ? color : true;
    }

    /** Validates the input eye colour
     * @param {string} eyeColor
     * @returns {string}
     * @throws {Error} If the input is invalid
     */
    static #validateAndReturnEyeColor(eyeColor)
    {
        try
        {return this.validateColor(eyeColor, {invalidValues: [Birth.ColorEnum.BALD, Birth.ColorEnum.BLOND]}, true);}
        catch (eyeColorError)
        {throw eyeColorError;}
    }
    /** Sets the eye colour
     * @param {string} eyeColor
     * @throws {Error} If the input is invalid
     */
    setEyeColor(eyeColor)
    {this.#eyeColor = Birth.#validateAndReturnEyeColor(eyeColor);}

    /** Validates the input hair colour
     * @param {string} hairColor
     * @returns {string}
     * @throws {Error} If the input is invalid
     */
    static #validateAndReturnHairColor(hairColor)
    {
        try
        {return this.validateColor(hairColor, {}, true);}
        catch (hairColorError)
        {throw hairColorError;}
    }
    /** Sets the hair colour
     * @param {string} hairColor
     * @throws {Error} If the input is invalid
     */
    setHairColor(hairColor)
    {this.#hairColor = Birth.#validateAndReturnHairColor(hairColor);}

    // Misc functions
    //
    /** Returns a string representation of the Birth object.
     * @returns {string}
     */
    toString()
    {
        return "Date of Birth: " + formatDateToString(this.#DoB) +
            ", Birth Place: " + this.getBirthPlace() +
            (isStringNotAvailable(this.#birthCertNum) === false) ? (", Birth Certificate Number: " + this.#birthCertNum):"" +
            ", Sex: " + this.#sex;
    }

    /** Calculates the age based on a given Date (containing only year, month, and day).
     * @param {Date} dob - The date of birth.
     * @returns {number} - The calculated age.
     */
    static calculateAge(dob)
    {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();

        // If the current month is before the birth month, or the current month is the birth month but today’s day is before the birthday, then subtract one year from the calculated age.
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate()))
        {age--;}

        return age;
    }
}

/**@class PersonalName
 * @description Represents a person's name with first, middle, and last names.
 */
export class PersonalName
{
    // Private data fields.
    /** @type {string} */ #firstName = undefined;
    /** @type {string} */ #middleName = ""; // Can be empty
    /** @type {string} */ #lastName = undefined;

    /** Constructor can be invoked in four ways
     * new PersonalName() — sets all names to empty strings.
     * new PersonalName(fullName) — parses the full name.
     * new PersonalName(firstName, lastName) — with no middle name.
     * new PersonalName(firstName, middleName, lastName) — with a middle name.
     *
     * @param  {...any} args
     * @throws {Error} If the number of arguments is invalid.
     */
    constructor(...args)
    {
        if (args.length === 0) // Set default values
        {this.#firstName = NA_STRING; this.#middleName = ""; this.#lastName = NA_STRING;}
        else
        {this.overrideFromArgs(...args);}
    }
    #populateFromArgs(updateAll, ...args)
    {
        if (args.length !== 1 && args.length !== 2 && args.length !== 3)
        {throw new Error("Invalid number of arguments for constructing or overriding a PersonalName. Expected 1 to 3 arguments.");}

        /** @type {string[]} */ const errors = [];
        /** @type {string|undefined} */ let newFirstName = (updateAll) ? undefined: this.#firstName;
        /** @type {string} */ let newMiddleName = (updateAll) ? "": this.#middleName;
        /** @type {string|undefined} */ let newLastName = (updateAll) ? undefined: this.#lastName;

        // Need validate and return functions
        switch (args.length)
        {
            case 1:
                const fullNameComponents = tryToValidateErrorList(errors, () => PersonalName.#validateAndReturnFullName(args[0]));
                [newFirstName, newMiddleName, newLastName] = fullNameComponents;
                break;

            case 2:
                newFirstName = tryToValidateErrorList(errors, () => PersonalName.#validateAndReturnNonMiddleName(args[0]));
                newLastName = tryToValidateErrorList(errors, () => PersonalName.#validateAndReturnNonMiddleName(args[1]));
                break;

            case 3:
                newFirstName = tryToValidateErrorList(errors, () => PersonalName.#validateAndReturnNonMiddleName(args[0]));
                newMiddleName = tryToValidateErrorList(errors, () => PersonalName.#validateAndReturnMiddleName(args[1]));
                newLastName = tryToValidateErrorList(errors, () => PersonalName.#validateAndReturnNonMiddleName(args[2]));
                break;
        }

        if (errors.length > 0)
        {throw new Error(errors.join("\n"));}

        // Commit trimmed values
        this.#firstName = newFirstName;
        this.#middleName = newMiddleName ? newMiddleName: "";
        this.#lastName = newLastName;
    }
    /** Partial update: Only the provided fields override existing values. (For detailed update overloads: 3, 4, 5, 6, or 7 arguments.)
     * @param {...any} args
     * @throws {Error} if validations fail.
     */
    updateFromArgs(...args)
    {this.#populateFromArgs(false, ...args);}
    /** Full override update: Missing fields will be replaced by defaults (e.g. "" for optional).
     * @param {...any} args
     * @throws {Error} if validations fail.
     */
    overrideFromArgs(...args)
    {this.#populateFromArgs(true, ...args);}

    // Getter methods
    //
    /** @returns {string} */ getFirstName() {return (!isStringEmpty(this.#firstName)) ? this.#firstName: NA_STRING;}
    /** @returns {string} */ getMiddleName() {return (!isStringNotAvailable(this.#middleName)) ? this.#middleName: "";}
    /** @returns {string} */ getLastName() {return (!isStringEmpty(this.#lastName)) ? this.#lastName: NA_STRING;}
    /** If both first and last names are empty, returns NA_STRING. If first is empty and last exists, returns "NA_STRING [middle] last". If last is empty and first exists, returns "first [middle] NA_STRING".
     * Full name combining first, middle, and last names with NA_STRING substitutions.
     * @returns {string}
     */
    getFullName()
    {
        // Trim and check each name part.
        const first = !isStringEmpty(this.#firstName) ? this.#firstName.trim() : "";
        const middle = !isStringNotAvailable(this.#middleName) ? this.#middleName.trim() : "";
        const last = !isStringEmpty(this.#lastName) ? this.#lastName.trim() : "";

        // If both first and last are empty, return NA_STRING.
        if (first === "" && last === "")
        {return NA_STRING;}

        // Substitute NA_STRING for missing first or last names.
        const effectiveFirst = first || NA_STRING;
        const effectiveLast = last || NA_STRING;

        // Build the full name using middle if available.
        return (middle) ? `${effectiveFirst} ${middle} ${effectiveLast}`: `${effectiveFirst} ${effectiveLast}`;
    }

    // Setter methods
    //
    /**Validates the first or last name.
     * @param {string} name
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * @throws {Error} If name is null or empty.
     */
    static validateNonMiddleName(name, returnValue = false)
    {
        if (isStringEmpty(name))
        {throw new Error("Name cannot be empty.");}

        name = name.trim();
        if (!(alphabeticalRegex.test(name)))
        {throw new Error("Name must be alphabetical.");}

        return (returnValue) ? name: true;
    }
    /**Validates and returns the non-middle name.
     * @param {string} name
     * @returns {string}
     * @throws {Error} If name is null or empty.
     */
    static #validateAndReturnNonMiddleName(name)
    {
        try
        {return this.validateNonMiddleName(name, true);}
        catch (nameError)
        {throw nameError;}
    }
    /**Sets the first name.
     * @param {string} firstName - The first name to set.
     * @throws {Error} If firstName is null or empty.
     */
    setFirstName(firstName)
    {this.#firstName = PersonalName.#validateAndReturnNonMiddleName(firstName);}
    /**Sets the last name.
     * @param {string} lastName - The last name to set.
     * @throws {Error} If lastName is null or empty.
     */
    setLastName(lastName)
    {this.#lastName = PersonalName.#validateAndReturnNonMiddleName(lastName);}

    /** Validates the middle name.
     * @param {string} middleName
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * // @throws {Error} for future considerations
     */
    static validateMiddleName(middleName, returnValue = false)
    {
        if (isStringNotAvailable(middleName))
        {return (returnValue) ? "": true;}

        middleName = middleName.trim();
        if (!(alphabeticalRegex.test(middleName)))
        {throw new Error("Middle name must be alphabetical.");}

        return (returnValue) ? middleName: true;
    }
    /** Validates and returns the middle name.
     * @param {string} middleName
     * @returns {string}
     * // @throws {Error} for future considerations
     */
    static #validateAndReturnMiddleName(middleName)
    {
        try
        {return this.validateMiddleName(middleName, true);}
        catch (middleNameError)
        {throw middleNameError;}
    }
    /**Sets the middle name.
     * @param {string} middleName - The middle name to set.
     */
    setMiddleName(middleName) // Can be empty
    {this.#middleName = PersonalName.#validateAndReturnMiddleName(middleName);}

    /** Validates the full name.
     * @param {string|PersonalName} fullName
     * @param {boolean} returnValue
     * @returns {string[]|boolean}
     * @throws {Error} If full name is invalid.
     */
    static validateFullName(fullName, returnValue = false)
    {
        let extractedName;
        if (fullName != null && fullName instanceof PersonalName)
        {
            extractedName = fullName.getFullName();
            fullName = extractedName;
        }

        if (typeof fullName === "string" || fullName instanceof String)
        {
            if (isStringEmpty(fullName))
            {throw new Error("Full name cannot be null or empty.");}

            fullName = fullName.trim().replace(/\s+/g, " ");

            /** @type {number} */ const firstSpaceIndex = fullName.indexOf(" ");
            /** @type {number} */ const lastSpaceIndex = fullName.lastIndexOf(" ");

            if (firstSpaceIndex === -1) // There are no spaces, so we don't have at least two words.
            {
                throw new Error("Full name must contain at least a first name and a last name.");
            }
            else if (firstSpaceIndex === lastSpaceIndex) // Exactly two words — no middle name.
            {
                /** @type {string} */ const firstName = (fullName.substring(0, firstSpaceIndex)).trim();
                /** @type {string} */ const lastName = (fullName.substring(firstSpaceIndex + 1)).trim();

                if (isStringEmpty(firstName) || isStringEmpty(lastName))
                {throw new Error("First or last name cannot be empty.");}

                if (!(alphabeticalRegex.test(firstName)) || !(alphabeticalRegex.test(lastName)))
                {throw new Error("First and last names must be alphabetical.");}

                return (returnValue) ? [firstName, "", lastName] : true;
            }
            else // More than two words: first word, then the middle name is everything between the first and last space, then the last word.
            {
                /** @type {string} */ const firstName = (fullName.substring(0, firstSpaceIndex)).trim();
                /** @type {string} */ let middleName = (fullName.substring(firstSpaceIndex + 1, lastSpaceIndex)).trim();
                /** @type {string} */ const lastName = (fullName.substring(firstSpaceIndex + 1)).trim();

                if (isStringEmpty(firstName) || isStringEmpty(lastName))
                {throw new Error("First or last name cannot be empty.");}

                if (!(alphabeticalRegex.test(firstName)) || !(alphabeticalRegex.test(lastName)))
                {throw new Error("First and last names must be alphabetical.");}

                if (isStringNotAvailable(middleName))
                {middleName = "";}
                else
                {
                    if (!(alphabeticalRegex.test(middleName)))
                    {throw new Error("Middle name must be alphabetical.");}
                }

                return (returnValue) ? [firstName, middleName, lastName] : true;
            }
        }
    }
    /** Validates and returns the full name.
     * @param {string} fullName
     * @returns {string[]}
     * @throws {Error} If full name is invalid.
     */
    static #validateAndReturnFullName(fullName)
    {
        try
        {return this.validateFullName(fullName, true);}
        catch (fullNameError)
        {throw fullNameError;}
    }
    /** Sets the name.
     * @param {string} fullName - The full name to set.
     */
    setName(fullName)
    {
        /** @type {string[]} */ const nameArray = PersonalName.#validateAndReturnFullName(fullName);
        this.#firstName = nameArray[0]; this.#middleName = nameArray[1]; this.#lastName = nameArray[2];
    }

    /** Prints the full name to the console. */ printName() {console.log(this.getFullName());}

    /** Overrides the default toString() method to return the full name.
     * @returns {string} The full name.
     */
    toString()
    {return this.getFullName();}

    /**Compares this PersonalName instance with another for equality (case-insensitive).
     * @param {any} o - Another object to compare.
     * @returns {boolean} True if the full names are equal, false otherwise.
     */
    equals(o)
    {
        if (this === o)
        {return true;}

        if (!(o instanceof PersonalName))
        {return false;}

        return equalsIgnoreCase(this.getFullName(), o.getFullName());
    }

    /** Helper function for constructors that deal with PersonalName objects. Exists to maintain references for PersonalName objects given an array of strings meant for names.
     * Can be a performance issue, due to re-referencing.
     * @param {string[]|null} personalNameArray
     * @param {PersonalName|null} personalNameDataField
     * @param {boolean} validPersonalNameArray
     * @throws {error} Upon invalid inputs
     * @returns {PersonalName}
     */
    static constructPersonalNameFromNameArray(personalNameArray, personalNameDataField, validPersonalNameArray = false)
    {
        if (personalNameArray != null)
        {
            if (!validPersonalNameArray)
            {
                try
                {
                    this.validateFullName(personalNameArray[0] + " " + personalNameArray[1] + " " + personalNameArray[2]);
                    validPersonalNameArray = true;
                }
                catch (personalNameArrayError)
                {throw personalNameArrayError;}
            }

            if (personalNameDataField != null && personalNameDataField instanceof PersonalName)
            {
                personalNameDataField.setFirstName(personalNameDataField[0]);
                personalNameDataField.setMiddleName(personalNameDataField[1]);
                personalNameDataField.setLastName(personalNameDataField[2]);

                return personalNameDataField;
            }
            else
            {return new PersonalName(personalNameDataField[0], personalNameDataField[1], personalNameDataField[2]);}
        }
    }
    /** Helper function for constructors that deal with PersonalName objects. Exists to maintain references for PersonalName objects.
     * Can be a performance issue, due to re-referencing.
     * @param {PersonalName|null} personalNameDataField
     * @returns {PersonalName}
     */
    static constructEmptyPersonalName(personalNameDataField)
    {
        if (personalNameDataField != null && personalNameDataField instanceof PersonalName)
        {
            personalNameDataField.#firstName = NA_STRING;
            personalNameDataField.#middleName = "";
            personalNameDataField.#lastName = NA_STRING;
        }
        else
        {return new PersonalName();}
    }

    /** Helper function for constructors that deal with PersonalName objects. Exists to maintain references for PersonalName objects.
     * May need additional work.
     * Can be a performance issue, due to re-referencing.
     * @param {PersonalName|string[]|string} personalName
     * @returns {boolean}
     */
    static isNameDefault(personalName)
    {
        if (personalName != null && personalName instanceof PersonalName)
        {
            const firstName = personalName.getFirstName();
            const middleName = personalName.getMiddleName();
            const lastName = personalName.getLastName();

            if (firstName === NA_STRING && middleName === "" && lastName === NA_STRING)
            {return true;}
            else
            {return false;}
        }
        else if (personalName != null && Array.isArray(personalName))
        {
            if (personalName.length === 3)
            {
                if (personalName[0] === NA_STRING && personalName[1] === "" && personalName[2] === NA_STRING)
                {return true;}
                else
                {return false;}
            }
        }
        else if (personalName != null && (typeof personalName === "string" || personalName instanceof String))
        {
            const naStrIdx = personalName.trim().indexOf(NA_STRING);

            if (naStrIdx === -1)
            {return false;}
            else
            {return true;}
        }
    }
}

/**@class SSN
 * @description Class representing a social security number.
 */
class SSN // Simple enough to not need populateFromArgs, it can only take just one argument.
{
    /** @type {string} */ static INVALIDSSN = "000000000";

    // Private field
    /** @type {string} */ #pureSSN;

    /** Constructor that supports two cases:
     * SSN(): sets pureSSN to INVALIDSSN.
     * SSN(pureSSN): validates and sets the SSN.
     * @param args
     * @throws {Error} If the number of arguments is invalid.
     */
    constructor(...args)
    {
        if (args.length === 0)
        {this.#pureSSN = SSN.INVALIDSSN;}
        else if (args.length === 1)
        {this.setSSN(args[0]);}
        else
        {throw new Error("Invalid SSN format. Must be 9 digits or in XXX-XX-XXXX format.");}
    }

    /** Helper method to validate the SSN; Removing dashes and confirming there are exactly 9 digits.
     * @param {string} pureSSN
     * @throws {Error} If the SSN is invalid.
     */
    static validateSSN(pureSSN, returnValue = false)
    {
        if (isStringEmpty(pureSSN))
        {throw new Error("Invalid SSN format. Must be 9 digits or in XXX-XX-XXXX format.");}

        pureSSN = pureSSN.trim();

        if (pureSSN.length > 11)
        {throw new Error("Invalid SSN format. Must be 9 digits or in XXX-XX-XXXX format.");}

        /** @type {string} */ let cleanedSSN = pureSSN.replace(/[-\s]/g, ""); // Remove dashes and spaces

        // Validate that cleaned string is exactly 9 digits.
        if (!/^\d{9}$/.test(cleanedSSN))
        {throw new Error("Invalid SSN format. Must be 9 digits or in XXX-XX-XXXX format.");}

        return (returnValue) ? cleanedSSN: true;
    }
    /** Helper method to validate and return the SSN; Removing dashes and confirming there are exactly 9 digits.
     * @param {string} pureSSN
     * @throws {Error} If the SSN is invalid.
     */
    static #validateAndReturnSSN(pureSSN)
    {
       try
       {return this.validateSSN(pureSSN, true);}
       catch (socialSecurityError)
       {throw socialSecurityError;}
    }
    /** Setter method to validate and assign the SSN; Removing dashes and confirming there are exactly 9 digits.
     * @param {string} pureSSN
     * @throws {Error} If the SSN is invalid.
     */
    setSSN(pureSSN)
    {this.#pureSSN = SSN.#validateAndReturnSSN(pureSSN);}

    /** Returns the stored SSN as a pure 9-digit string.
     * @returns {string}
     */
    getPureSSN()
    {
        if (isStringEmpty(this.#pureSSN) || equalsIgnoreCase(this.#pureSSN, SSN.INVALIDSSN))
        {return SSN.INVALIDSSN;}
        else
        {return this.#pureSSN;}
    }

    /** Returns the formatted SSN in the form XXX-XX-XXXX.
     * @returns {string}
     */
    getFormattedSSN()
    {
        if (isStringEmpty(this.#pureSSN) || equalsIgnoreCase(this.#pureSSN, SSN.INVALIDSSN))
        {return "000-00-0000";}
        else
        {return(this.#pureSSN.substring(0, 3) + "-" + this.#pureSSN.substring(3, 5) + "-" + this.#pureSSN.substring(5, 9));}
    }

    /** Returns a string representation of the SSN.
     * @returns {string}
     */
    toString() {return this.getPureSSN();}

    /** Compares this SSN with another for equality (ignoring case).
     * @param {any} other - An object to compare.
     * @returns {boolean} True if they are equivalent.
     */
    equals(other)
    {
        if (other === this)
        {return true;}

        if (!(other instanceof SSN))
        {return false;}

        return equalsIgnoreCase(this.#pureSSN, other.getPureSSN());
    }
}

/** @class Contact
 * @description Class representing a contact's information including email and phone number details.
 */
export class Contact
{
    // Private fields
    /** @type {string} */ #email = undefined;
    /** @type {string} */ static emailDescription = "";

    /** @type {number} */ #contactNumberPrefix = undefined;
    /** @type {string} */ static contactNumberPrefixDescription = "";

    /** @type {string} */ #contactNumber = undefined;
    /** @type {string} */ static contactNumberDescription = "";

    /** Constructor that supports three cases:
     * Contact(): uses default values.
     * Contact(email, contactNumber): Takes in email and contact number
     * Contact(email, contactNumberPrefix, contactNumber): Takes in email, contactNumberPrefix, and contactNumber
     * @param {...any} args - The constructor arguments.
     * @throws {Error} If an invalid number of arguments is provided.
     */
    constructor(...args)
    {
        if (args.length === 0)
        {this.#email = NA_STRING; this.#contactNumberPrefix = NA_INT; this.#contactNumber = NA_STRING;}
        else
        {this.overrideFromArgs(...args);}
    }

    #populateFromArgs(updateAll, ...args)
    {
        if (args.length !== 1 && args.length !== 2 && args.length !== 3)
        {throw new Error("Invalid number of arguments for Contact. Expected 1 to 3 arguments.");}

        /** @type {string[]} */ const errors = [];

        /** @type {string|undefined} */ let newEmail = (updateAll) ? undefined: this.#email;
        /** @type {number} */ let newPrefix = (updateAll) ? undefined: this.#contactNumberPrefix;
        /** @type {string|undefined} */ let newContactNumber = (updateAll) ? undefined: this.#contactNumber;

        switch (args.length)
        {
            case 1:
                newEmail = tryToValidateErrorList(errors, () => Contact.#validateAndReturnEmail(args[0]));
                break;

            case 2:
                newEmail = tryToValidateErrorList(errors, () => Contact.#validateAndReturnEmail(args[0]));
                const result2 = tryToValidateErrorList(errors, () => Contact.#validateAndReturnFullContactNumber(args[1]));
                if (Array.isArray(result2))
                {
                    if (result2.length === 2)
                    {newPrefix = result2[0]; newContactNumber = result2[1];}
                    else if (result2.length === 1)
                    {newPrefix = 1; newContactNumber = result2[0];}
                }
                break;

            case 3:
                newEmail = tryToValidateErrorList(errors, () => Contact.#validateAndReturnEmail(args[0]));
                const result3 = tryToValidateErrorList(errors, () => Contact.#validateAndReturnFullContactNumber(args[2]));
                if (Array.isArray(result3))
                {
                    if (result3.length === 2)
                    {newPrefix = result3[0]; newContactNumber = result3[1];}
                    else if (result3.length === 1)
                    {newContactNumber = result3[0];}
                }
                break;
        }

        if (errors.length > 0)
        {throw new Error(errors.join("\n"));}

        // Apply updates
        this.#email = newEmail;
        this.#contactNumberPrefix = newPrefix; this.#contactNumber = newContactNumber;
    }
    /** Partial update: Only the provided fields override existing values.
     * @param {...any} args
     * @throws {Error} if validations fail.
     */
    updateFromArgs(...args) {this.#populateFromArgs(false, ...args);}
    /** Full override update: Missing fields will be replaced by undefined.
     * @param {...any} args
     * @throws {Error} if validations fail.
     */
    overrideFromArgs(...args) {this.#populateFromArgs(true, ...args);}

    // Getter methods
    /** Gets the stored email address.
     * @returns {string} The email address.
     */
    getEmail()
    {
        if (isStringNotAvailable(this.#email) === true)
        {return NA_STRING;}
        else
        {return this.#email;}
    }

    /** Gets the country prefix for the contact number.
     * @returns {number} The country prefix.
     */
    getContactNumberCountryPrefix()
    {
        if (this.#contactNumberPrefix == null || this.#contactNumberPrefix <= 0)
        {return NA_INT;}
        else
        {return this.#contactNumberPrefix;}
    }

    /**Gets the stored contact number.
     * @returns {string} The contact number.
     */
    getContactNumber()
    {
        if (isStringNotAvailable(this.#contactNumber) === true)
        {return NA_STRING;}
        else
        {return this.#contactNumber;}
    }

    // Setter methods
    //
    /** Validates email; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string} email
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * @throws {Error} If email is empty or does not contain '@' and '.' properly.
     */
    static validateEmail(email, returnValue = false)
    {
        if (isStringEmpty(email) === true)
        {throw new Error("Invalid email, it cannot be empty.");}

        /** @type {string} */ const trimmedEmail = email.trim();

        /** @type {number} */ const atIndex = trimmedEmail.indexOf("@");
        if (atIndex === -1)
        {throw new Error("Invalid email: missing '@' symbol.");}

        /** @type {number} */ const dotIndex = trimmedEmail.lastIndexOf(".");
        if (dotIndex === -1 || dotIndex < atIndex)
        {throw new Error("Email must contain '.' after '@'.");}

        return (returnValue) ? trimmedEmail: true;
    }
    /** Validates and returns a trimmed email.
     * @param {string} email
     * @returns {string}
     * @throws {Error} If email is empty or does not contain '@' and '.' properly.
     */
    static #validateAndReturnEmail(email)
    {
        try
        {return this.validateEmail(email, true);}
        catch (emailError)
        {throw emailError;}
    }
    /** Sets the email address.
     * @param {string} email
     * @throws {Error} if validation fails.
     */
    setEmail(email)
    {this.#email = Contact.#validateAndReturnEmail(email);}

    /** Private helper method to remove all non-digit characters from a number string.
     * @param {string} number - The number string to clean.
     * @returns {string} The cleaned number containing only digits.
     */
    static #cleanNumber(number)
    {return number.replace(/\D/g, "");}
    /** Private helper method that removes a prefix from a number if it is present.
     * @param {string} number - The original number.
     * @param {string} prefix - The prefix to remove.
     * @returns {string} The number with the prefix removed (if present).
     */
    #fixPrefix(number, prefix)
    {
        if (number.startsWith(prefix))
        {return number.substring(prefix.length);}
        else
        {return number;}
    }

    /** Validates the contact number prefix; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string|number} contactNumberPrefix
     * @param {boolean} returnValue
     * @returns {number|boolean}
     * @throws {Error} if prefix is invalid.
     */
    static validateContactNumberPrefix(contactNumberPrefix, returnValue = false)
    {
        /** @type {string} */ let prefixInString= String(contactNumberPrefix);

        if (contactNumberPrefix.charAt(0) === "+")
        {prefixInString = (prefixInString.substring(1, contactNumberPrefix.length)).trim();}
        else
        {prefixInString = prefixInString.trim();}

        if (isStringEmpty(prefixInString) || !isInputDigitOnly(prefixInString))
        {throw new Error("Country code must contain only digits.");}

        if (prefixInString.length > 3)
        {throw new Error("Country code must contain up to three digits.");}

        /** @type {number} */ const prefixInInt = parseInt(prefixInString, 10);
        if (Number.isNaN(prefixInInt) || prefixInInt <= 0 || prefixInInt > 999)
        {throw new Error("Country code must be non-zero and between 1 and 999.");}

        return (returnValue) ? Math.floor(prefixInInt): true;
    }
    /** Validates and returns the contact number prefix
     * @param {string|number} contactNumberPrefix
     * @returns {number}
     * @throws {Error} if prefix is invalid.
     */
    static #validateAndReturnContactNumberPrefix(contactNumberPrefix)
    {
        try
        {return this.validateContactNumberPrefix(contactNumberPrefix);}
        catch (contactNumberPrefixError)
        {throw contactNumberPrefixError;}
    }
    /** Sets the contact number country prefix using a string.
     * Validates that the prefix contains only digits and is at most three digits long. Also, if the local number already starts with the prefix, it removes it.
     * @param {string} contactNumberPrefixString - The country prefix as a string.
     * @throws {Error} If the prefix is invalid.
     */
    setContactNumberPrefix(contactNumberPrefixString)
    {
        // Validate and retrieve the prefix as an integer.
        /** @type {number} */ const validatedPrefixNumber = Contact.#validateAndReturnContactNumberPrefix(contactNumberPrefixString);
        // Convert the prefix string for checking in the instance contact number.
        /** @type {string} */ const prefixInString = (String(contactNumberPrefixString)).trim();

        // If the current contact number exists and starts with the prefix, remove it.
        if (!isStringEmpty(this.#contactNumber) && (this.#contactNumber).startsWith(prefixInString))
        {this.#contactNumber = this.#fixPrefix(this.#contactNumber, prefixInString);}

        // Set the validated prefix.
        this.#contactNumberPrefix = validatedPrefixNumber;
    }

    /** Validates a contact number string; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string} contactNumber
     * @param {boolean} returnValue
     * @returns {string}
     * @throws {Error} if contact number is invalid.
     */
    static validateContactNumber(contactNumber, returnValue = false)
    {
        if (contactNumber == null)
        {throw new Error("Contact number cannot be null.");}

        const cleaned = Contact.#cleanNumber(contactNumber);
        if (isStringEmpty(cleaned))
        {throw new Error("Contact number cannot be empty.");}

        if (contactNumber.charAt(0) === "+")
        {throw new Error("Contact number should not start with '+' in this overload.");}

        return (returnValue) ? cleaned: true;
    }
    /** Validates and returns a cleaned contact number string.
     * @param {string} contactNumber
     * @returns {string}
     * @throws {Error} if contact number is empty.
     */
    static #validateAndReturnContactNumber(contactNumber)
    {
        try
        {return this.validateContactNumber(contactNumber, true);}
        catch (contactNumberError)
        {throw contactNumberError;}
    }
    /** Sets the local contact number (without country code).
     * @param {string} contactNumber - The contact number to set.
     * @throws {Error} if validation fails.
     */
    setContactNumber(contactNumber)
    {this.#contactNumber = Contact.#validateAndReturnContactNumber(contactNumber);}

    /** Validates a full contact number; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string} fullContactNumber
     * @param {boolean} returnValue
     * @returns {[]|boolean}
     * @throws {Error} if contact number is invalid
     */
    static validateFullContactNumber(fullContactNumber, returnValue = false)
    {
        if (isStringEmpty(fullContactNumber) || isStringEmpty(Contact.#cleanNumber(fullContactNumber)))
        {throw new Error("Contact number cannot be empty.");}

        if (fullContactNumber.charAt(0) === "+")
        {
            // Ensure that a space exists to separate the country code.
            /** @type {number} */ let spaceIndex = fullContactNumber.indexOf(" ");
            if (spaceIndex === -1)
            {throw new Error("Contact number includes '+' but no space to separate the country code.");}

            /** @type {number} */ const countryCodePart = Contact.#validateAndReturnContactNumberPrefix(fullContactNumber.substring(1, spaceIndex)); // Extract potential country code
            /** @type {string} */ const remainingContactNumber = Contact.#validateAndReturnContactNumber(fullContactNumber.substring(spaceIndex + 1)); // Process the remaining part of the contact number and remove any non-digit characters from that substring

            return (returnValue) ? [countryCodePart, remainingContactNumber]: true;
        }
        else // If '+' is not found, assume the contents represent the contact number.
        {
            return (returnValue) ? [Contact.#validateAndReturnContactNumber(fullContactNumber)]: true;
        }
    }
    /** Validates and returns a full contact number
     * @param {string} fullContactNumber
     * @returns {[]}
     * @throws {Error} if contact number is invalid
     */
    static #validateAndReturnFullContactNumber(fullContactNumber)
    {
        try
        {return this.validateFullContactNumber(fullContactNumber, true);}
        catch (fullContactNumberError)
        {throw fullContactNumberError;}
    }
    /** Sets a full contact number string that may include a country code.
     * If the number starts with '+', a space is expected to delimit the country code from the rest of the number.
     *
     * @param {string} fullContactNumber - The full contact number to set.
     * @throws {Error} If '+' is present but no space separates the country code.
     */
    setFullContactNumber(fullContactNumber)
    {
        // The validate function here can return up to two length array.
        // As noted in the function, if the size is 2, the first value will be the prefix and the second value will be the contactNumber.
        // If the size is 1, the first value will be the contactNumber.
        /** @type {[]} */ const returnedValues = Contact.#validateAndReturnFullContactNumber(fullContactNumber);

        if (returnedValues.length === 2)
        {this.#contactNumberPrefix = returnedValues[0]; this.#contactNumber = returnedValues[1];}
        else if (returnedValues.length === 1)
        {this.#contactNumber = returnedValues[0];}
    }

    /** Returns a formatted string representation of the contact information.
     * @returns {string} A string containing the email and formatted contact number.
     */
    toString()
    {
        /** @type {string} */
        let outputEmail;

        if (isStringNotAvailable(this.#email) === true)
        {outputEmail = NA_STRING;}
        else
        {outputEmail = this.#email;}

        /** @type {string} */
        let outputContact;
        if (isStringNotAvailable(this.#contactNumber) === true)
        {outputContact = NA_STRING;}
        else if (this.#contactNumberPrefix >= 0)
        {outputContact = `+${this.#contactNumberPrefix} ${this.#contactNumber}`;}
        else
        {outputContact = this.#contactNumber;}

        return `Email: ${outputEmail}, Contact Number: ${outputContact}`;
    }

    /** Compares this Contact instance to another object for equality. The comparison is case-insensitive for both email and contact number.
     * @param {any} o - The object to compare.
     * @returns {boolean} True if both contact number and email match; otherwise false.
     */
    equals(o)
    {
        if (this === o)
        {return true;}

        if ((o instanceof Contact) === false)
        {return false;}

        /** @type {boolean} */
        const sameContactNumber = equalsIgnoreCase(this.#contactNumber, o.getContactNumber());
        if (sameContactNumber === false)
        {return false;}

        /** @type {boolean} */
        const sameEmailAddress = equalsIgnoreCase(this.#email, o.getEmail());
        if (sameEmailAddress === false)
        {return false;}

        return true;
    }
}