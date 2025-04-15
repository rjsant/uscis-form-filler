import {equalsIgnoreCase, isStringEmpty, isStringNotAvailable, NA_STRING, tryToValidateErrorList, validateAndReturnBoolean} from "./basicOperations.js";

export class CityCountry
{
    // "Enum" for countries; this was harvested from https://gist.github.com/incredimike/1469814
    static countryList = Object.freeze({
        "US": "United States of America (the)",
        "AF": "Afghanistan",
        "AL": "Albania",
        "DZ": "Algeria",
        "AS": "American Samoa",
        "AD": "Andorra",
        "AO": "Angola",
        "AI": "Anguilla",
        "AQ": "Antarctica",
        "AG": "Antigua and Barbuda",
        "AR": "Argentina",
        "AM": "Armenia",
        "AW": "Aruba",
        "AU": "Australia",
        "AT": "Austria",
        "AZ": "Azerbaijan",
        "BS": "Bahamas (the)",
        "BH": "Bahrain",
        "BD": "Bangladesh",
        "BB": "Barbados",
        "BY": "Belarus",
        "BE": "Belgium",
        "BZ": "Belize",
        "BJ": "Benin",
        "BM": "Bermuda",
        "BT": "Bhutan",
        "BO": "Bolivia (Plurinational State of)",
        "BQ": "Bonaire, Sint Eustatius and Saba",
        "BA": "Bosnia and Herzegovina",
        "BW": "Botswana",
        "BV": "Bouvet Island",
        "BR": "Brazil",
        "IO": "British Indian Ocean Territory (the)",
        "BN": "Brunei Darussalam",
        "BG": "Bulgaria",
        "BF": "Burkina Faso",
        "BI": "Burundi",
        "CV": "Cabo Verde",
        "KH": "Cambodia",
        "CM": "Cameroon",
        "CA": "Canada",
        "KY": "Cayman Islands (the)",
        "CF": "Central African Republic (the)",
        "TD": "Chad",
        "CL": "Chile",
        "CN": "China",
        "CX": "Christmas Island",
        "CC": "Cocos Keeling Islands (the)",
        "CO": "Colombia",
        "KM": "Comoros (the)",
        "CD": "Congo (the Democratic Republic of the)",
        "CG": "Congo (the)",
        "CK": "Cook Islands (the)",
        "CR": "Costa Rica",
        "HR": "Croatia",
        "CU": "Cuba",
        "CW": "Curaçao",
        "CY": "Cyprus",
        "CZ": "Czechia",
        "CI": "Côte d'Ivoire",
        "DK": "Denmark",
        "DJ": "Djibouti",
        "DM": "Dominica",
        "DO": "Dominican Republic (the)",
        "EC": "Ecuador",
        "EG": "Egypt",
        "SV": "El Salvador",
        "GQ": "Equatorial Guinea",
        "ER": "Eritrea",
        "EE": "Estonia",
        "SZ": "Eswatini",
        "ET": "Ethiopia",
        "FK": "Falkland Islands (Islas Malvinas)",
        "FO": "Faroe Islands (the)",
        "FJ": "Fiji",
        "FI": "Finland",
        "FR": "France",
        "GF": "French Guiana",
        "PF": "French Polynesia",
        "TF": "French Southern Territories (the)",
        "GA": "Gabon",
        "GM": "Gambia (the)",
        "GE": "Georgia",
        "DE": "Germany",
        "GH": "Ghana",
        "GI": "Gibraltar",
        "GR": "Greece",
        "GL": "Greenland",
        "GD": "Grenada",
        "GP": "Guadeloupe",
        "GU": "Guam",
        "GT": "Guatemala",
        "GG": "Guernsey",
        "GN": "Guinea",
        "GW": "Guinea-Bissau",
        "GY": "Guyana",
        "HT": "Haiti",
        "HM": "Heard Island and McDonald Islands",
        "VA": "Holy See (the)",
        "HN": "Honduras",
        "HK": "Hong Kong",
        "HU": "Hungary",
        "IS": "Iceland",
        "IN": "India",
        "ID": "Indonesia",
        "IR": "Iran (Islamic Republic of)",
        "IQ": "Iraq",
        "IE": "Ireland",
        "IM": "Isle of Man",
        "IL": "Israel",
        "IT": "Italy",
        "JM": "Jamaica",
        "JP": "Japan",
        "JE": "Jersey",
        "JO": "Jordan",
        "KZ": "Kazakhstan",
        "KE": "Kenya",
        "KI": "Kiribati",
        "KP": "Korea (the Democratic People's Republic of)",
        "KR": "Korea (the Republic of)",
        "KW": "Kuwait",
        "KG": "Kyrgyzstan",
        "LA": "Lao People's Democratic Republic (the)",
        "LV": "Latvia",
        "LB": "Lebanon",
        "LS": "Lesotho",
        "LR": "Liberia",
        "LY": "Libya",
        "LI": "Liechtenstein",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "MO": "Macao",
        "MG": "Madagascar",
        "MW": "Malawi",
        "MY": "Malaysia",
        "MV": "Maldives",
        "ML": "Mali",
        "MT": "Malta",
        "MH": "Marshall Islands (the)",
        "MQ": "Martinique",
        "MR": "Mauritania",
        "MU": "Mauritius",
        "YT": "Mayotte",
        "MX": "Mexico",
        "FM": "Micronesia (Federated States of)",
        "MD": "Moldova (the Republic of)",
        "MC": "Monaco",
        "MN": "Mongolia",
        "ME": "Montenegro",
        "MS": "Montserrat",
        "MA": "Morocco",
        "MZ": "Mozambique",
        "MM": "Myanmar",
        "NA": "Namibia",
        "NR": "Nauru",
        "NP": "Nepal",
        "NL": "Netherlands (the)",
        "NC": "New Caledonia",
        "NZ": "New Zealand",
        "NI": "Nicaragua",
        "NE": "Niger (the)",
        "NG": "Nigeria",
        "NU": "Niue",
        "NF": "Norfolk Island",
        "MP": "Northern Mariana Islands (the)",
        "NO": "Norway",
        "OM": "Oman",
        "PK": "Pakistan",
        "PW": "Palau",
        "PS": "Palestine (State of)",
        "PA": "Panama",
        "PG": "Papua New Guinea",
        "PY": "Paraguay",
        "PE": "Peru",
        "PH": "Philippines (the)",
        "PN": "Pitcairn",
        "PL": "Poland",
        "PT": "Portugal",
        "PR": "Puerto Rico",
        "QA": "Qatar",
        "MK": "Republic of North Macedonia",
        "RO": "Romania",
        "RU": "Russian Federation (the)",
        "RW": "Rwanda",
        "RE": "Réunion",
        "BL": "Saint Barthélemy",
        "SH": "Saint Helena, Ascension and Tristan da Cunha",
        "KN": "Saint Kitts and Nevis",
        "LC": "Saint Lucia",
        "MF": "Saint Martin (French part)",
        "PM": "Saint Pierre and Miquelon",
        "VC": "Saint Vincent and the Grenadines",
        "WS": "Samoa",
        "SM": "San Marino",
        "ST": "Sao Tome and Principe",
        "SA": "Saudi Arabia",
        "SN": "Senegal",
        "RS": "Serbia",
        "SC": "Seychelles",
        "SL": "Sierra Leone",
        "SG": "Singapore",
        "SX": "Sint Maarten (Dutch part)",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "SB": "Solomon Islands",
        "SO": "Somalia",
        "ZA": "South Africa",
        "GS": "South Georgia and the South Sandwich Islands",
        "SS": "South Sudan",
        "ES": "Spain",
        "LK": "Sri Lanka",
        "SD": "Sudan (the)",
        "SR": "Suriname",
        "SJ": "Svalbard and Jan Mayen",
        "SE": "Sweden",
        "CH": "Switzerland",
        "SY": "Syrian Arab Republic",
        "TW": "Taiwan",
        "TJ": "Tajikistan",
        "TZ": "Tanzania (United Republic of)",
        "TH": "Thailand",
        "TL": "Timor-Leste",
        "TG": "Togo",
        "TK": "Tokelau",
        "TO": "Tonga",
        "TT": "Trinidad and Tobago",
        "TN": "Tunisia",
        "TR": "Turkey",
        "TM": "Turkmenistan",
        "TC": "Turks and Caicos Islands (the)",
        "TV": "Tuvalu",
        "UG": "Uganda",
        "UA": "Ukraine",
        "AE": "United Arab Emirates (the)",
        "GB": "United Kingdom of Great Britain and Northern Ireland (the)",
        "UM": "United States Minor Outlying Islands (the)",
        "UY": "Uruguay",
        "UZ": "Uzbekistan",
        "VU": "Vanuatu",
        "VE": "Venezuela (Bolivarian Republic of)",
        "VN": "Vietnam",
        "VG": "Virgin Islands (British)",
        "VI": "Virgin Islands (U.S.)",
        "WF": "Wallis and Futuna",
        "EH": "Western Sahara",
        "YE": "Yemen",
        "ZM": "Zambia",
        "ZW": "Zimbabwe",
        "AX": "Åland Islands"
    });

    /** @type {string[]} */ #cityCountry = [NA_STRING, NA_STRING];
    /** @type {boolean} */ #isCountryDomestic = true;
    static DOMESTIC_REGEX = /^(US|USA|UNITED STATES(?: OF AMERICA)?|AMERICA)$/i;

    constructor()
    {
        this.#cityCountry = [NA_STRING, NA_STRING];
        this.#isCountryDomestic = true;
    }

    // Getters
    /** @returns {string} */ getPlace() {return (isStringNotAvailable(this.#cityCountry[0]) && isStringNotAvailable(this.#cityCountry[1])) ? NA_STRING: `${this.getCity()}, ${this.getCountry()}`;}
    /** @returns {string[]} */ getPlaceArr() {return this.#cityCountry;}
    /** @returns {string} */ getCity() {return (isStringNotAvailable(this.#cityCountry[0])) ? NA_STRING: this.#cityCountry[0];}
    /** @returns {string} */ getCountry() {return (isStringNotAvailable(this.#cityCountry[1])) ? NA_STRING: ((CityCountry.countryList[this.#cityCountry[1]]).split('(')[0]).trim();} // ngl, God will curse us for this witchcraft
    /** @returns {string} */ getCountryFully() {return (isStringNotAvailable(this.#cityCountry[1])) ? NA_STRING: CityCountry.countryList[this.#cityCountry[1]];}
    /** @returns {string} */ getCountryCode() {return (isStringNotAvailable(this.#cityCountry[1])) ? NA_STRING: this.#cityCountry[1];}
    /** @returns {boolean} */ getIsCountryDomestic() {return this.#isCountryDomestic;}

    toString()
    {return this.getPlace();}

    // Setters
    // CITY
    /** Validates a city; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string} city
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * @throws {Error} if city is empty.
     */
    static validateCity(city, returnValue = false)
    {
        if (isStringEmpty(city))
        {throw new Error("City cannot be null or empty.");}
        else
        {return (returnValue) ? city.trim(): true;}
    }
    /** Validates and returns a trimmed city.
     * @param {string} city
     * @returns {string}
     * @throws {Error} if city is empty.
     */
    static validateAndReturnCity(city)
    {
        try
        {return this.validateCity(city, true);}
        catch (cityError)
        {throw cityError;}
    }
    /** Sets the city.
     * @param {string} city
     * @param {boolean} requireValidation
     * @throws {Error} If the city is null or empty.
     */
    setCity(city, requireValidation = true)
    {
        requireValidation = validateAndReturnBoolean(requireValidation, "Invalid validation input for setting city.");

        if (requireValidation)
        {this.#cityCountry[0] = CityCountry.validateAndReturnCity(city);}
        else
        {this.#cityCountry[0] = city;}
    }

    // COUNTRY
    /** Validates a country; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string} country
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * @throws {Error} if country is invalid.
     */
    static validateCountry(country, returnValue = false)
    {
        country = country.trim();

        if (!((CityCountry.countryList).hasOwnProperty(country)))
        {throw new Error(`Invalid country code: ${country}`);}

        if (isStringEmpty(country) || (country).length > 2)
        {throw new Error("Country cannot be null, empty, or greater than 2 characters.");}
        else
        {return (returnValue) ? country.toUpperCase(): true;}
    }
    /** Validates and returns a trimmed country.
     * @param {string} country
     * @returns {string}
     * @throws {Error} if country is invalid.
     */
    static validateAndReturnCountry(country)
    {
        try
        {return this.validateCountry(country, true);}
        catch (countryError)
        {throw countryError;}
    }
    /** Sets the country, it must be two characters.
     * @param {string} country
     * @param {boolean} requireValidation
     * @throws {Error} If the country is null or empty.
     */
    setCountry(country, requireValidation = true)
    {
        requireValidation = validateAndReturnBoolean(requireValidation, "Invalid validation input for setting country.");

        if (requireValidation)
        {this.#cityCountry[1] = CityCountry.validateAndReturnCountry(country);}
        else
        {this.#cityCountry[1] = country;}

        this.#isCountryDomestic = (CityCountry.DOMESTIC_REGEX).test(this.#cityCountry[1]);
    }

    // CITY & COUNTRY
    /** Validates the birth place
     * @param {string} city
     * @param {string} country
     * @param {boolean} returnValue
     * @returns {string[]|boolean}
     * @throws {Error} If birth country is invalid, but does not validate birth city.
     */
    static validateCityCountryPlace(city, country, returnValue = false)
    {
        try
        {city = CityCountry.validateAndReturnCity(city);}
        catch (e)
        {city = NA_STRING;}

        country = CityCountry.validateAndReturnCountry(country);

        return (returnValue) ? [city, country]: true;
    }
    /** Validates and returns the birth place
     * @param {string} city
     * @param {string} country
     * @returns {string[]}
     * @throws {Error} If either parameter is null or empty.
     */
    static validateAndReturnCityCountryPlace(city, country)
    {
        try
        {return CityCountry.validateCityCountryPlace(city, country, true);}
        catch (cityCountryPlaceError)
        {throw cityCountryPlaceError;}
    }
    /** Sets the birth place with the specified city and country.
     * @param {string} city
     * @param {string} country
     * @throws {Error} If either parameter is null or empty.
     */
    setCityCountryPlace(city, country)
    {
        /** @type {string[]} */ const localCityCountry = CityCountry.validateAndReturnCityCountryPlace(city, country);
        this.#cityCountry[0] = localCityCountry[0]; this.#cityCountry[1] = localCityCountry[1];
    }

    equals(o)
    {
        if (this === o)
        {return true;}

        if (!(o instanceof CityCountry))
        {return false;}

        /** @type {boolean} */ const sameCity = equalsIgnoreCase(this.#cityCountry[0], o.getCity());
        if (!sameCity)
        {return false;}

        /** @type {boolean} */ const sameCountry = equalsIgnoreCase(this.#cityCountry[1], o.getCountryCode());
        if (!sameCountry)
        {return false;}

        return true;
    }

    /** Helper function for constructors that deal with CityCountry objects. Exists to maintain references for CityCountry objects given an array of strings meant for city and country.
     * Can be a performance issue, due to re-referencing.
     * @param {string[]|null} cityCountryArray
     * @param {CityCountry|null} cityCountryDataField
     * @param {boolean} validCityCountryArray
     * @throws {error} Upon invalid inputs
     * @returns {CityCountry}
     */
    static constructCityCountryFromCityCountryArray(cityCountryArray, cityCountryDataField, validCityCountryArray = false)
    {
        if (cityCountryArray != null)
        {
            if (!validCityCountryArray)
            {
                try
                {
                    this.validateCityCountryPlace(cityCountryArray[0], cityCountryArray[1]);
                    validCityCountryArray = true;
                }
                catch (cityCountryArrayError)
                {throw cityCountryArrayError;}
            }

            if (cityCountryDataField != null && cityCountryDataField instanceof CityCountry)
            {cityCountryDataField.setCityCountryPlace(cityCountryArray[0], cityCountryArray[1]);}
            else
            {
                let returningCityCountry = new CityCountry();
                returningCityCountry.setCityCountryPlace(cityCountryArray[0], cityCountryArray[1]);
                return returningCityCountry;
            }
        }
    }
    /** Helper function for constructors that deal with PersonalName objects. Exists to maintain references for CityCountry objects.
     * Can be a performance issue, due to re-referencing.
     * @param {CityCountry|null} cityCountryDataField
     * @returns {CityCountry}
     */
    static constructEmptyCityCountry(cityCountryDataField)
    {
        if (cityCountryDataField != null && cityCountryDataField instanceof CityCountry)
        {
            cityCountryDataField.#cityCountry = [NA_STRING, NA_STRING];
            cityCountryDataField.#isCountryDomestic = true;
        }
        else
        {return new CityCountry();}
    }

}

/** @class Address
 * @description Class addresses in strings: baseAddress, chamber (APT, FLR, etc.), city, region, state, country, postalCode. Boolean includes: isAddressDomestic.
 */
export class Address
{
    // Define an "enum" for U.S. states using a frozen object
    static USStates = Object.freeze({
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    });

    // Private fields
    /** @type {string} */ #baseAddress = undefined;
    /** @type {string} */ #chamber = ""; // This field can be empty.
    // /** @type {string} */ #city = undefined;
    /** @type {string} */ #region = ""; // This field can be empty.
    /** @type {string} */ #state = ""; // This field can be empty; This field will be determined by a drop down menu only if the country selected is the US.
    /** @type {string} */ #postalCode = undefined;
    // /** @type {string} */ #country = undefined; // This field will be determined by a drop down menu, and will hold the ISO codes
    /** @type {CityCountry} */ #cityCountry = new CityCountry();
    // /** @type {boolean} */ #isAddressDomestic = true;

    /** Constructor overloads:
     * - new Address() // No arguments – initializes default values.
     * - new Address(USBasicAddress) // 1 argument: US‑style address string.
     * - new Address(foreignBasicAddress, foreignCountry) // 2 arguments: Foreign‑style address.
     * - new Address(baseAddress, city, postalCode) // 3 arguments: Detailed update without a state or country.
     * - new Address(baseAddress, city, postalCode, country) // 4 arguments: Detailed update without a state.
     * - new Address(baseAddress, city, state, postalCode, country) // 5 arguments: Detailed update including state.
     * - new Address(baseAddress, chamber, city, state, postalCode, country) // 6 arguments: Detailed update including chamber.
     * - new Address(baseAddress, chamber, city, region, state, postalCode, country) // 7 arguments: Detailed update including chamber and region.
     *
     * If no arguments are given, default values are used; otherwise, the supplied arguments are passed to #populateFromArgs for a full override.
     *
     * @param {...any} args
     */
    constructor(...args)
    {
        if (args.length === 0)  // Default initialization
        {
            this.#baseAddress = NA_STRING; this.#chamber = "";
            this.#region = "";
            this.#state = ""; this.#postalCode = NA_STRING;
            // this.#city = NA_STRING; this.#country = NA_STRING;

            if (!this.#cityCountry)
            {this.#cityCountry = new CityCountry();}
        }
        else // For any nonempty constructor call, perform a full override.
        {this.#populateFromArgs(args, true);}
    }

    #populateFromArgs(args, updateAll)
    {
        if (![1, 2, 3, 4, 5, 6, 7].includes(args.length))
        {throw new Error("Invalid number of arguments for updating or overriding Address. Expected at least 1 argument, up to 7 arguments.");}

        const errors = [];
        // Initialize all fields with defaults
        /** @type {string|undefined} */ let newBaseAddress = (updateAll) ? undefined: this.#baseAddress;
        /** @type {string} */ let newChamber = (updateAll) ? "": this.#chamber;
        /** @type {string|undefined} */ let newCity = (updateAll) ? undefined: (this.#cityCountry).getCity();
        /** @type {string} */ let newRegion = (updateAll) ? "": this.#region;
        /** @type {string} */ let newState = (updateAll) ? "": this.#state;
        /** @type {string|undefined} */ let newPostalCode = (updateAll) ? undefined: this.#postalCode;
        /** @type {string|undefined} */ let newCountry = (args.length === 3) ? (this.#cityCountry).getCountry(): ((updateAll) ? undefined: (this.#cityCountry).getCountry());

        function checkIfCountryIsDomestic(country)
        {
            if (isStringEmpty(country) || equalsIgnoreCase(country, NA_STRING))
            {return true;}
            else
            {return (CityCountry.DOMESTIC_REGEX).test(country);}
        }

        /** @type {string[]} */ let USAddrArr;
        /** @type {string[]} */ let foreignAddrArr;
        switch(args.length)
        {
            case 1:
                try {USAddrArr = Address.#validateAndReturnUSAddress(args[0]);}
                catch(e) {errors.push(e.message);}

                if (errors.length > 0)
                {throw new Error(errors.join());}

                newBaseAddress = USAddrArr[0];
                newCity = USAddrArr[1];
                newState = USAddrArr[2];
                newPostalCode = USAddrArr[3];
                newCountry = USAddrArr[4];
                break;

            case 2:
                try {foreignAddrArr = Address.#validateAndReturnForeignAddress(args[0], args[1]);}
                catch(e) {errors.push(e.message);}

                if (errors.length > 0)
                {throw new Error(errors.join());}

                newBaseAddress = foreignAddrArr[0];
                newCity = foreignAddrArr[1];
                newPostalCode = foreignAddrArr[2];
                newCountry = foreignAddrArr[3];
                break;

            case 3:
                newBaseAddress = tryToValidateErrorList(errors, () => Address.#validateAndReturnBaseAddress(args[0]));
                newCity        = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCity(args[1]));
                newPostalCode  = tryToValidateErrorList(errors, () => Address.#validateAndReturnPostalCode(args[2]));
                break;

            case 4:
                newBaseAddress = tryToValidateErrorList(errors, () => Address.#validateAndReturnBaseAddress(args[0]));
                newCity        = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCity(args[1]));
                newPostalCode  = tryToValidateErrorList(errors, () => Address.#validateAndReturnPostalCode(args[2]));
                newCountry     = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCountry(args[3]));
                break;

            case 5:
                newBaseAddress = tryToValidateErrorList(errors, () => Address.#validateAndReturnBaseAddress(args[0]));
                newCity        = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCity(args[1]));
                newPostalCode  = tryToValidateErrorList(errors, () => Address.#validateAndReturnPostalCode(args[3]));
                newCountry     = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCountry(args[4]));

                newState       = tryToValidateErrorList(errors, () => Address.#validateAndReturnState(args[2], checkIfCountryIsDomestic(newCountry)));
                break;

            case 6:
                newBaseAddress = tryToValidateErrorList(errors, () => Address.#validateAndReturnBaseAddress(args[0]));
                newChamber     = tryToValidateErrorList(errors, () => Address.#validateAndReturnChamber(args[1]));
                newCity        = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCity(args[2]));
                newPostalCode  = tryToValidateErrorList(errors, () => Address.#validateAndReturnPostalCode(args[4]));
                newCountry     = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCountry(args[5]));

                newState       = tryToValidateErrorList(errors, () => Address.#validateAndReturnState(args[3], checkIfCountryIsDomestic(newCountry)));
                break;

            case 7:
                newBaseAddress = tryToValidateErrorList(errors, () => Address.#validateAndReturnBaseAddress(args[0]));
                newChamber     = tryToValidateErrorList(errors, () => Address.#validateAndReturnChamber(args[1]));
                newCity        = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCity(args[2]));
                newRegion      = tryToValidateErrorList(errors, () => Address.#validateAndReturnRegion(args[3]));
                newPostalCode  = tryToValidateErrorList(errors, () => Address.#validateAndReturnPostalCode(args[5]));
                newCountry     = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCountry(args[6]));

                newState       = tryToValidateErrorList(errors, () => Address.#validateAndReturnState(args[4], checkIfCountryIsDomestic(newCountry)));
                break;
        }

        // For overloads with a country parameter, adjust the country:
        if ([3,4,5,6,7].includes(args.length) && newCountry != null)
        {newCountry = (CityCountry.DOMESTIC_REGEX).test(newCountry) ? "US": newCountry.toUpperCase();}

        if (errors.length > 0)
        {throw new Error(errors.join("\n"));}

        this.#baseAddress = newBaseAddress;
        this.#chamber = newChamber;
        this.#region = newRegion;
        this.#state = newState;
        this.#postalCode = newPostalCode;
        // this.#city = newCity;
        (this.#cityCountry).setCity(newCity, false);
        // this.#country = newCountry;
        (this.#cityCountry).setCountry(newCountry, false);
        // this.#isAddressDomestic = (CityCountry.DOMESTIC_REGEX).test(newCountry);
    }
    /** Partial update: Only the provided fields override existing values. (For detailed update overloads: 3, 4, 5, 6, or 7 arguments.)
     * @param {...any} args
     * @throws {Error} if validations fail.
     */
    updateFromArgs(...args)
    {this.#populateFromArgs(args, false);}
    /** Full override update: Missing fields will be replaced by defaults (e.g. "" for optional).
     * @param {...any} args
     * @throws {Error} if validations fail.
     */
    overrideFromArgs(...args)
    {this.#populateFromArgs(args, true);}

    /** Parses and validates a raw address string into its components using the given country code.
     * If the country is domestic (e.g., "US"), the format must be:
     *   "BaseAddress, City, State-PostalCode" or "BaseAddress, City, State PostalCode"
     * If the country is foreign, the format must be:
     *   "BaseAddress, City-PostalCode" or "BaseAddress, City PostalCode"
     *
     * @param {string} rawAddress - The unparsed address string.
     * @param {string} countryCode - The ISO 3166-1 alpha-2 code for the country (e.g., "US", "FR").
     * @param {boolean} [returnValue=false] - Whether to return the parsed components as an array.
     * @returns {boolean | string[]} `true` if valid and returnValue is false; otherwise, an array:
     *   - Domestic: [base, city, state, postal, "US"]
     *   - Foreign: [base, city, postal, countryCode]
     * @throws {Error} If parsing or validation fails.
     */
    static validateFullAddress(rawAddress, countryCode= "US", returnValue = false)
    {
        if (isStringEmpty(rawAddress))
        {throw new Error("Address cannot be null or empty.");}

        countryCode.toUpperCase();

        /** @type {string[]} */ const errors = [];
        /** @type {string[]} */ const parts = rawAddress.split(",");

        if (countryCode === "US")
        {
            if (parts.length < 3)
            {throw new Error("Invalid US address format. Expected: BaseAddress, City, State-PostalCode.");}

            /** @type {string|undefined} */ const base = tryToValidateErrorList(errors, () => Address.#validateAndReturnBaseAddress(parts[0]));
            /** @type {string|undefined} */ const city = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCity(parts[1]));

            /** @type {string} */ const statePostalField = parts[2].trim();
            /** @type {string[]} */ let statePostal = [];

            if (statePostalField.includes("-"))
            {statePostal = statePostalField.split("-");}
            else if (statePostalField.includes(" "))
            {
                /** @type {number} */ const spaceIdx = statePostalField.indexOf(" ");
                statePostal = [statePostalField.substring(0, spaceIdx), statePostalField.substring(spaceIdx + 1),];
            }

            if (statePostal.length !== 2)
            {errors.push("Invalid address format. State and Postal Code must be separated by '-' or space.");}

            /** @type {string|undefined} */ const state = tryToValidateErrorList(errors, () => Address.#validateAndReturnState(statePostal[0], true));
            /** @type {string|undefined} */ const postal = tryToValidateErrorList(errors, () => Address.#validateAndReturnPostalCode(statePostal[1]));

            if (errors.length > 0)
            {throw new Error(errors.join("\n"));}

            return (returnValue) ? [base, city, state, postal, "US"]: true;
        }
        else // ---- Foreign format (INTL) ----
        {
            if (parts.length < 2)
            {throw new Error("Invalid international address format. Expected: BaseAddress, City-PostalCode.");}

            /** @type {string|undefined} */ const country = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCountry(countryCode));
            if (errors.length > 0)
            {throw new Error("Invalid country code.");}

            /** @type {string|undefined} */ const base = tryToValidateErrorList(errors, () => Address.#validateAndReturnBaseAddress(parts[0]));
            /** @type {string} */ const cityPostalField = parts[1].trim();
            /** @type {string[]} */ let cityPostal = [];

            if (cityPostalField.includes("-"))
            {cityPostal = cityPostalField.split("-");}
            else if (cityPostalField.includes(" "))
            {
                /** @type {number} */ const idx = cityPostalField.indexOf(" ");
                cityPostal = [cityPostalField.substring(0, idx), cityPostalField.substring(idx + 1),];
            }

            if (cityPostal.length !== 2)
            {errors.push("Invalid foreign address format. City and Postal Code must be separated by '-' or space.");}

            /** @type {string|undefined} */ const city = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCity(cityPostal[0]));
            /** @type {string|undefined} */ const postal = tryToValidateErrorList(errors, () => Address.#validateAndReturnPostalCode(cityPostal[1]));

            if (errors.length > 0) throw new Error(errors.join("\n"));
            return returnValue ? [base, city, postal, country]: true;
        }
    }

    /** Validates and returns the US-Style address.
     * @param {string} USFullAddress - The base address.
     * @returns {string[]} - Returns, in order: Base address, city, state, postal code, country
     * @throws {Error} If USBasicAddress invalid.
     */
    static #validateAndReturnUSAddress(USFullAddress)
    {
        try
        {return this.validateFullAddress(USFullAddress, "US", true);}
        catch (USFullAddressError)
        {throw USFullAddressError;}
    }
    /** Sets the US-Style address.
     * @param {string} USFullAddress - The base address.
     * @throws {Error} If USBasicAddress is null or empty.
     */
    setUSAddress(USFullAddress)
    {
        const USAddressArr = Address.#validateAndReturnUSAddress(USFullAddress);
        this.#baseAddress = USAddressArr[0];
        (this.#cityCountry).setCity(USAddressArr[1], false);
        this.#state = USAddressArr[2];
        this.#postalCode = USAddressArr[3];
        (this.#cityCountry).setCountry(USAddressArr[4], false);
    }

    /** Validates and returns the foreign-style address.
     * @param {string} foreignBasicAddress - The base foreign address.
     * @param {string} foreignCountry - The base country
     * @returns {string[]} - [base, city, postal, countryCode]
     * @throws {Error} If foreignBasicAddress is null or empty.
     */
    static #validateAndReturnForeignAddress(foreignBasicAddress, foreignCountry)
    {
        try
        {return this.validateFullAddress(foreignBasicAddress, foreignCountry, true);}
        catch (foreignAddressError)
        {throw foreignAddressError;}
    }
    /** Sets the foreign-style address.
     * @param {string} foreignBasicAddress - The base foreign address.
     * @param {string} foreignCountry - The base country
     * @returns {void}
     * @throws {Error} If foreignBasicAddress is null or empty.
     */
    setForeignAddress(foreignBasicAddress, foreignCountry)
    {
        const foreignAddressArr = Address.#validateAndReturnForeignAddress(foreignBasicAddress, foreignCountry);
        this.#baseAddress = foreignAddressArr[0];
        (this.#cityCountry).setCity(foreignAddressArr[1], false);
        this.#postalCode = foreignAddressArr[2];
        (this.#cityCountry).setCountry(foreignAddressArr[3], false);
    }

    // Standard Getters.
    //
    /** @returns {string} */ getBaseAddress() {return (isStringNotAvailable(this.#baseAddress)) ? NA_STRING: this.#baseAddress;}
    /** @returns {string} */ getChamber() {return this.#chamber;} // Can return empty
    /** @returns {string} */ getCity() {return (this.#cityCountry).getCity();}
    /** @returns {string} */ getRegion() {return this.#region;} // Can return empty
    /** @returns {string} */ getState() {return (this.getIsAddressDomestic()) ? ((Address.USStates).hasOwnProperty(this.#state) ? this.#state: NA_STRING): this.#state;} // Can return empty if not domestic
    /** @returns {string} */ getStateFully() {return (this.getIsAddressDomestic()) ? ((Address.USStates).hasOwnProperty(this.#state) ? Address.USStates[this.#state]: NA_STRING): this.getState();} // Can return empty if not domestic
    /** @returns {string} */ getPostalCode() {return (isStringNotAvailable(this.#postalCode)) ? NA_STRING: this.#postalCode;}
    /** @returns {string} */ getPostalCodePrefix() {return isStringNotAvailable(this.#postalCode) ? NA_STRING: this.#postalCode.split(/[-\s]/, 2)[0].trim();}
    /** @returns {string} */
    getPostalCodeSuffix() // No one-liners here, God will weep if I desecrate this function that way
    {
        if (isStringNotAvailable(this.#postalCode)) {return NA_STRING;}

        const code = this.#postalCode;
        const idxDash  = code.indexOf('-'); const idxSpace = code.indexOf(' ');

        let sepIndex = -1;

        // Determine the position of the first occurring separator ("-" or " ")
        if (idxDash === -1 && idxSpace === -1) // No separator: no suffix exists.
        {return NA_STRING;}
        else if (idxDash === -1)
        {sepIndex = idxSpace;}
        else if (idxSpace === -1)
        {sepIndex = idxDash;}
        else
        {sepIndex = Math.min(idxDash, idxSpace);}

        return code.substring(sepIndex + 1).trim();
    }

    /** @returns {string} */ getCountry() {return (this.#cityCountry).getCountry();}
    /** @returns {string} */ getCountryFully() {return (this.#cityCountry).getCountryFully();}
    /** @returns {string} */ getCountryCode() {return (this.#cityCountry).getCountryCode();}
    /** @returns {boolean} */ getIsAddressDomestic() {return (this.#cityCountry).getIsCountryDomestic();}

    // Setters using validation methods
    //
    /** Validates base address; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string} baseAddress
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * @throws {Error} if baseAddress is empty.
     */
    static validateBaseAddress(baseAddress, returnValue = false)
    {
        if (isStringEmpty(baseAddress))
        {throw new Error("Base address cannot be null or empty.");}

        return (returnValue) ? baseAddress.trim(): true;
    }
    /** Validates and returns a trimmed base address.
     * @param {string} baseAddress
     * @returns {string}
     * @throws {Error} if baseAddress is empty.
     */
    static #validateAndReturnBaseAddress(baseAddress)
    {
        try
        {return this.validateBaseAddress(baseAddress, true);}
        catch (baseAddressError)
        {throw baseAddressError;}
    }
    /** Sets the base address.
     * @param {string} baseAddress
     * @returns {void}
     * @throws {Error} if baseAddress is null or empty.
     */
    setBaseAddress(baseAddress)
    {this.#baseAddress = Address.#validateAndReturnBaseAddress(baseAddress);}

    /** Validates the chamber; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string} chamber
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * @throws {Error} if the chamber format is invalid.
     */
    static validateChamber(chamber, returnValue = false)
    {
        if (isStringEmpty(chamber))
        {return (returnValue) ? "": true;}

        /** @type {string} */ const chamberTrimmed = chamber.trim();
        /** @type {string} */ const chamberCleaned = (chamberTrimmed.replace(/\./g, "")).toUpperCase();
        if (!(  chamberCleaned.startsWith("APT") || chamberCleaned.startsWith("FL") || chamberCleaned.startsWith("FLR") ||
            chamberCleaned.startsWith("STE") || chamberCleaned.startsWith("WO") || chamberCleaned.startsWith("VILL")))
        {
            throw new Error("Invalid chamber format. Viable acronyms are APT, FL, STE, WO, and VILL.");
        }
        else
        {return (returnValue) ? chamberTrimmed: true;}
    }
    /** Validates and returns a properly formatted chamber. If the input is empty, returns "".
     * @param {string} chamber
     * @returns {string}
     * @throws {Error} if the chamber format is invalid.
     */
    static #validateAndReturnChamber(chamber)
    {
        try
        {return this.validateChamber(chamber, true);}
        catch (chamberError)
        {throw chamberError;}
    }
    /** Sets the chamber. Remove periods and check against allowed acronyms.
     * @param {string} chamber
     * @returns {void}
     * @throws {Error} If the chamber format is invalid.
     */
    setChamber(chamber)
    {this.#chamber = Address.#validateAndReturnChamber(chamber);}

    /** Validates a region; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string} region
     * @param {boolean} returnValue
     * @returns {string|boolean}
     */
    static validateRegion(region, returnValue = false)
    {
        if (isStringEmpty(region))
        {return (returnValue) ? "": true;}
        else
        {return (returnValue) ? region.trim(): true;}
    }
    /** Validates and returns a trimmed region. If input is empty or undefined, returns "".
     * @param {string} region
     * @returns {string}
     */
    static #validateAndReturnRegion(region)
    {
        try
        {return this.validateRegion(region, true);}
        catch (regionError)
        {throw regionError;}
    }
    /** Sets the region.
     * @param {string} region
     * @returns {void}
     */
    setRegion(region) // This field can be empty
    {this.#region = Address.#validateAndReturnRegion(region);}

    /** Validates a state; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string} state
     * @param {boolean} isAddressDomestic
     * @param {boolean} returnValue
     * @returns {string|boolean}
     */
    static validateState(state, isAddressDomestic, returnValue = false)
    {
        state = state.trim();

        if (isAddressDomestic)
        {
            if (isStringEmpty(state) || state.length > 2)
            {throw new Error("State cannot be empty, and must be in a two letter code.");}

            if (!((Address.USStates).hasOwnProperty(state)))
            {throw new Error(`Invalid state code: ${state}`);}

            return (returnValue) ? state: true;
        }
        else
        {
            if (isStringEmpty(state))
            {return (returnValue) ? "": true;}
            else
            {return (returnValue) ? state: true;}
        }
    }
    /** Validates and returns a trimmed state. If input is empty or undefined, returns "".
     * @param {string} state
     * @param {boolean} isAddressDomestic
     * @returns {string}
     */
    static #validateAndReturnState(state, isAddressDomestic)
    {
        try
        {return this.validateState(state, isAddressDomestic, true);}
        catch (stateError)
        {throw stateError;}
    }
    /** Sets the state.
     * @param {string} state
     * @returns {void}
     */
    setState(state) // This field can be empty
    {this.#state = Address.#validateAndReturnState(state, this.getIsAddressDomestic());}

    /** Sets the city.
     * @param {string} city
     * @returns {void}
     * @throws {Error} If the city is null or empty.
     */
    setCity(city)
    {(this.#cityCountry).setCity(city);}
    /** Sets the country, it must be two characters.
     * @param {string} country
     * @throws {Error} If the country is null or empty.
     */
    setCountry(country)
    {(this.#cityCountry).setCountry(country);}

    /** Validates a postal code; We can ignore the returned value as we wish, as it is handled by a later function
     * @param {string} postalCode
     * @param {boolean} returnValue
     * @returns {string|boolean}
     * @throws {Error} if postal code is invalid.
     */
    static validatePostalCode(postalCode, returnValue = false)
    {
        if (isStringEmpty(postalCode))
        {throw new Error("Postal code cannot be null or empty.");}
        else
        {return (returnValue) ? postalCode.trim(): true;}
    }
    /** Validates and returns a trimmed postal code.
     * @param {string} postalCode
     * @returns {string}
     * @throws {Error} if postal code is invalid.
     */
    static #validateAndReturnPostalCode(postalCode)
    {
        try
        {return this.validatePostalCode(postalCode, true);}
        catch (postalCodeError)
        {throw postalCodeError;}
    }
    /** Sets the postal code.
     * @param {string} postalCode
     * @returns {void}
     * @throws {Error} If the postal code is null or empty.
     */
    setPostalCode(postalCode)
    {this.#postalCode = Address.#validateAndReturnPostalCode(postalCode);}

    // Miscellaneous functions
    /**Returns a formatted string representation of the address.
     * @returns {string} A string containing the formatted address.
     */
    toString()
    {
        // Using isStringNotAvailable to check for non-applicable fields; checks for empty and applicable N/A values.
        /** @type {string} */ let outputChamber = (!isStringNotAvailable(this.#chamber)) ? this.#chamber: "";
        /** @type {string} */ let outputRegion = (!isStringNotAvailable(this.#region)) ? this.#region + ", ": "";
        /** @type {string} */ let outputState = (!isStringNotAvailable(this.#state)) ? this.#state + ", ": "";

        return (
            this.#baseAddress + ", " +
            outputChamber +
            (this.#cityCountry).getCity() + ", " +
            outputRegion +
            outputState +
            this.#postalCode + ", " +
            (this.#cityCountry).getCountry()
        );
    }

    /** Compares this Address instance to another object for equality. The comparison is case-insensitive for baseAddress, city, state (if applicable), and postalCode.
     * @param {any} o - The object to compare.
     * @returns {boolean} True if both addresses match; otherwise false.
     */
    equals(o)
    {
        if (this === o)
        {return true;}

        if (!(o instanceof Address))
        {return false;}

        // /** @type {Address} */ const a = o;
        /** @type {boolean} */ const sameBaseAddress = equalsIgnoreCase(this.#baseAddress, o.getBaseAddress());
        if (!sameBaseAddress)
        {return false;}

        /** @type {boolean} */ const sameCity = equalsIgnoreCase(this.getCity(), o.getCity());
        if (!sameCity)
        {return false;}

        // If both states are provided (non-null/empty), compare them.
        if ((isStringEmpty(this.#state)) && (isStringEmpty(o.getState())))
        {
            /** @type {boolean} */ const sameState = equalsIgnoreCase(this.#state, o.getState());
            if (!sameState)
            {return false;}
        }

        /** @type {boolean} */ const samePostalCode = equalsIgnoreCase(this.#postalCode, o.getPostalCode());
        if (!samePostalCode)
        {return false;}

        /** @type {boolean} */ const sameCountry = equalsIgnoreCase(this.getCountryCode(), o.getCountryCode());
        if (!sameCountry)
        {return false;}

        return true;
    }
}