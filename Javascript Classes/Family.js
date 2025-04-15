import BasicInfo, {PersonalName} from "./BasicInfo.js";
import Migration from "./Migration.js";
import {
    equalsIgnoreCase,
    isStringEmpty, isStringNotAvailable,
    NA_STRING,
    tryToValidateErrorList,
    validateAndReturnBoolean
} from "./basicOperations.js";
import {
    constructDateFromNumberArray, constructEmptyDate, DEFAULTYEAR,
    formatDateToString, isDateDefault,
    isThisDateSame,
    isThisNumberDateArrayAfter,
    isThisNumberDateArrayBefore, isThisNumberDateArraySame,
    returnDateDay,
    returnDateMonth,
    returnDateYear,
    validateAndReturnDate
} from "./customDateFunctions.js";
import {CityCountry} from "./Location.js";

class Family
{
    static #nextId = 1;
    /** @type {FamilyMember[]} */ familyMembers = [new FamilyMember()];

    // Marriage list is a 2D Array, which shows the marriage of two people per array element [FamilyMember, FamilyMember]
    /** @type {FamilyMember[[]]} */ #marriageList = [[]];

    constructor()
    {
        this.id = Family.#nextId++;
    }

    // Dealing with Family members
    /**
     * @param {FamilyMember} familyMemberToAdd
     */
    addFamilyMember(familyMemberToAdd)
    {
        if (familyMemberToAdd == null || !(familyMemberToAdd instanceof FamilyMember))
        {throw new Error("Invalid family member instance.");}


    }


    // Family Marriage 2D Array
    //
    /** Finds the index of a marriage pair containing both specified FamilyMember objects, regardless of order.
     * @param {FamilyMember} member1 - A FamilyMember object.
     * @param {FamilyMember} member2 - A FamilyMember object.
     * @param {FamilyMember[[]]} marriageList - A FamilyMember object list.
     * @returns {number} The index of the pair if found, or -1 if not found.
     */
    static findMarriagePairIndexForMembers(member1, member2, marriageList)
    {
        return marriageList.findIndex(pair => (pair[0] === member1 && pair[1] === member2) || (pair[0] === member2 && pair[1] === member1) );
    }
    /**  Helper function to find the index of the marriage pair containing the specified FamilyMember.
     * @param {FamilyMember} member - The family member to search for.
     * @returns {number} - The index of the marriage pair containing the member or -1 if not found.
     */
    findFamilyMemberPairIndex(member)
    {return this.#marriageList.findIndex(pair => pair.includes(member));}
    /** Searches the marriageList for a pair containing the given FamilyMember.
     * @param {FamilyMember} member - The family member to look for.
     * @returns {FamilyMember[] | null} - Returns the marriage pair (an array of 2 FamilyMember objects) if found; otherwise, returns null.
     */
    findMarriagePair(member)
    {
        const index = this.findFamilyMemberPairIndex(member);
        return index !== -1 ? this.#marriageList[index] : null;
    }
    /** Determines and returns the current spouse for the given FamilyMember.
     * @param {FamilyMember} member - The family member whose spouse is being sought.
     * @returns {FamilyMember | null} - Returns the spouse if the member is part of a marriage pair; otherwise, returns null.
     */
    getCurrentSpouse(member)
    {
        const pair = this.findMarriagePair(member);
        if (pair) // Assuming each pair always has two members, return the one that is not the supplied member.
        {return pair[0] === member ? pair[1]: pair[0];}
        return null;
    }
    /** Removes the marriage pair that contains the given FamilyMember from the marriageList.
     * @param {FamilyMember} member - The family member whose marriage pair should be removed.
     * @returns {boolean} - Returns true if the pair was found and removed, or false if not.
     */
    removeMarriagePair(member)
    {
        const index = this.findFamilyMemberPairIndex(member);
        if (index !== -1)
        {
            this.#marriageList.splice(index, 1);
            return true;
        }

        return false;
    }

    deleteFamily()
    {
        Family.#nextId--;
        delete this.Family;
    }
}

class FamilyMember
{
    /** @type {BasicInfo} */ basicInformation = new BasicInfo();
    /** @type {Migration} */ migrationInformation = new Migration();
    /** @type {Marriage} */ marriageInformation = new Marriage();


    // Getter methods
    /** @returns {BasicInfo} */ getBasicInformation() {return this.basicInformation;}
    /** @returns {Migration} */ getMigrationInformation() {return this.migrationInformation;}
    /** @returns {Marriage} */ getMarriageInformation() {return this.marriageInformation;}
    /** @returns {MarriageEvent[]} */ getMarriageEvents() {return this.marriageInformation.getMarriageEvents();}

    // Miscellaneous
    equals(o)
    {
        if (o === this)
        {return true;}

        if (!(o instanceof FamilyMember))
        {return false;}

        /** @type {boolean} */ const sameSSN = (this.basicInformation.getPureSSN()) === (o.basicInformation.getPureSSN());
        if (!sameSSN)
        {return false;}

        /** @type {boolean} */ const sameName = equalsIgnoreCase(this.basicInformation.getFullName(), o.basicInformation.getFullName());
        if (!sameName)
        {return false;}

        /** @type {boolean} */ const sameBirth = equalsIgnoreCase(this.basicInformation.getDoB(), o.basicInformation.getDoB());
        if (!sameBirth)
        {return false;}

        return true;
    }


}

class Marriage
{
    static MarriageStatus = Object.freeze(
    {
        SINGLE: "SINGLE",
        MARRIED: "MARRIED",
        DIVORCED: "DIVORCED",
        WIDOWED: "WIDOWED",
        SEPARATED: "SEPARATED",
        ANNULLED: "ANNULLED"
    });

    /** @type {MarriageEvent[]} */ #marriageEvents;
    /** @type {string} */ #maritalStatus;

    constructor()
    {
        this.#marriageEvents = [];
        this.#maritalStatus = (Marriage.MarriageStatus).SINGLE;
    }

    // Famil marriage pending
    static addMarriageWithinFamily(firstSpouse, secondSpouse, familyMarriageList, isCurrentSpouse = true, ...args)
    {

    }

    /** Adds marriage. This is intended to be called by the FamilyMember class, and is intended to add marriages to a self's marriage event list.
     * We should not call this in the event of adding marriage for a current spouse; we can create a function in the Family class to validate spousal status, however.
     * @param {FamilyMember} firstSpouse
     * @param {FamilyMember} secondSpouse
     * @param isCurrentSpouse
     * @param args
     */
    static addMarriage(firstSpouse, secondSpouse, isCurrentSpouse = false, ...args)
    {
        isCurrentSpouse = validateAndReturnBoolean(isCurrentSpouse);

        if (isCurrentSpouse)
        {throw new Error("Do not call this function in order to add a marriage for a current spouse.");}

        // Extract the two FamilyMember objects' name objects.
        /** @type {PersonalName} */ const firstSpousePersonalNameObj = (firstSpouse.getBasicInformation()).getFullNameObj();
        /** @type {PersonalName} */ const secondSpousePersonalNameObj = (secondSpouse.getBasicInformation()).getFullNameObj();

        // Overwrite the first two arguments with the PersonalName objects.
        if (args.length < 1 || args.length > 3) // Validate argument count (expect a total of 3–5 parameters for MarriageEvent).
        {throw new Error("Invalid arguments for adding a marriage event. Must have at least two family member instances and a date representing the begin date.");}
        /** @type {MarriageEvent} */ let marriageToAdd = new MarriageEvent(firstSpousePersonalNameObj, secondSpousePersonalNameObj, ...args);

        // Retrieve each spouse's marriage record.
        /** @type {Marriage} */ const firstSpouseMarriageObject = firstSpouse.getMarriageInformation();
        /** @type {Marriage} */ const secondSpouseMarriageObject = secondSpouse.getMarriageInformation();

        // Check for duplicates in both records.
        /** @type {number} */ const firstSpouseDuplicateMarriageObjectIdx = firstSpouseMarriageObject.ifMarriageEventPresent(marriageToAdd, true);
        /** @type {number} */ const secondSpouseDuplicateMarriageObjectIdx = secondSpouseMarriageObject.ifMarriageEventPresent(marriageToAdd, true);

        // If duplicates are found, extract the existing information arrays.
        /** @type {MarriageEvent} */ let existingEventForFirstSpouse;
        if (firstSpouseDuplicateMarriageObjectIdx !== -1)
        {existingEventForFirstSpouse = firstSpouseMarriageObject.getMarriageEvents()[firstSpouseDuplicateMarriageObjectIdx];}

        /** @type {MarriageEvent} */ let existingEventForSecondSpouse;
        if (secondSpouseDuplicateMarriageObjectIdx !== -1)
        {existingEventForSecondSpouse = secondSpouseMarriageObject.getMarriageEvents()[secondSpouseDuplicateMarriageObjectIdx];}

        let finalMarriageEventInformation;
        if (firstSpouseDuplicateMarriageObjectIdx !== -1 && secondSpouseDuplicateMarriageObjectIdx !== -1) // Duplicates found at both spouses' marriage events list
        {
            finalMarriageEventInformation = MarriageEvent.synchronizeMarriageEvents(marriageToAdd, existingEventForFirstSpouse, existingEventForSecondSpouse);

            let marriageEndDate = null;
            if (finalMarriageEventInformation[finalMarriageEventInformation.length-1] != null)
            {marriageEndDate = finalMarriageEventInformation.pop();}

            finalMarriageEventInformation = MarriageEvent.buildValidMarriageEventInformation(finalMarriageEventInformation);
            existingEventForFirstSpouse.setMarriageEndDate(marriageEndDate);
            existingEventForFirstSpouse.overrideFromArgs(finalMarriageEventInformation);
            secondSpouseMarriageObject.#overrideMarriageForOtherSpouse(existingEventForSecondSpouse, existingEventForFirstSpouse, secondSpouseDuplicateMarriageObjectIdx, isCurrentSpouse);
        }
        else if (firstSpouseDuplicateMarriageObjectIdx !== -1) // Duplicate found at first spouse's marriage event list
        {
            finalMarriageEventInformation = MarriageEvent.synchronizeMarriageEvents(marriageToAdd, existingEventForFirstSpouse);
            finalMarriageEventInformation[0] = firstSpousePersonalNameObj; finalMarriageEventInformation[1] = secondSpousePersonalNameObj;

            let marriageEndDate = null;
            if (finalMarriageEventInformation[finalMarriageEventInformation.length-1] != null)
            {marriageEndDate = finalMarriageEventInformation.pop();}

            finalMarriageEventInformation = MarriageEvent.buildValidMarriageEventInformation(finalMarriageEventInformation);
            existingEventForFirstSpouse.setMarriageEndDate(marriageEndDate);
            existingEventForFirstSpouse.overrideFromArgs(finalMarriageEventInformation);
            (secondSpouseMarriageObject.getMarriageEvents()).push(existingEventForFirstSpouse);
        }
        else if (secondSpouseDuplicateMarriageObjectIdx !== -1) // Duplicate found at second spouse's marriage event list
        {
            finalMarriageEventInformation = MarriageEvent.synchronizeMarriageEvents(marriageToAdd, existingEventForSecondSpouse);
            finalMarriageEventInformation[0] = secondSpousePersonalNameObj; finalMarriageEventInformation[1] = firstSpousePersonalNameObj;

            let marriageEndDate = null;
            if (finalMarriageEventInformation[finalMarriageEventInformation.length-1] != null)
            {marriageEndDate = finalMarriageEventInformation.pop();}

            finalMarriageEventInformation = MarriageEvent.buildValidMarriageEventInformation(finalMarriageEventInformation);
            existingEventForSecondSpouse.setMarriageEndDate(marriageEndDate);
            existingEventForSecondSpouse.overrideFromArgs(finalMarriageEventInformation);
            (firstSpouseMarriageObject.getMarriageEvents()).push(existingEventForSecondSpouse);
        }
        else if (firstSpouseDuplicateMarriageObjectIdx === -1 && secondSpouseDuplicateMarriageObjectIdx === -1) // Duplicates have not been found
        {
            (firstSpouseMarriageObject.getMarriageEvents()).push(marriageToAdd);
            secondSpouseMarriageObject.#addMarriageForOtherSpouse(marriageToAdd);
        }
    }

    /** Adds a marriage, it assumes that isCurrentSpouse is false
     * This is intended to be called by the second spouse's marriage object
     * @param {MarriageEvent} marriageToAdd
     * @param {boolean} isCurrentSpouse
     * @return {string}
     */
    #addMarriageForOtherSpouse(marriageToAdd, isCurrentSpouse = false)
    {
        if (isCurrentSpouse)
        {
            this.#marriageEvents.push(marriageToAdd);
            this.setMaritalStatus(Marriage.MarriageStatus.MARRIED);
        }
        else
        {
            this.#marriageEvents.push(marriageToAdd);
        }
    }
    /** Overrides a marriage, it assumes that isCurrentSpouse is false
     * This is intended to be called by the second spouse's marriage object
     * @param {MarriageEvent} baseMarriageEvent
     * @param {MarriageEvent} existingMarriageEvent
     * @param {number} overrideIdx
     * @param {boolean} isCurrentSpouse
     * @return {string}
     */
    #overrideMarriageForOtherSpouse(baseMarriageEvent, existingMarriageEvent, overrideIdx, isCurrentSpouse)
    {
        if (overrideIdx === -1)
        {overrideIdx = this.ifMarriageEventPresent(baseMarriageEvent, true);}

        this.getMarriageEvents()[overrideIdx] = existingMarriageEvent;

        if (isCurrentSpouse)
        {this.setMaritalStatus(Marriage.MarriageStatus.MARRIED);}
        else
        {}
    }

    /** Removes marriage. This is intended to be called by the FamilyMember class, and is intended to give an end date to marriages to a self's marriage event list.
     * We should not call this in the event of ending marriage for a current spouse; we can create a function in the Family class to validate spousal status, however.
     * @param {FamilyMember} firstSpouse
     * @param {FamilyMember} secondSpouse
     * @param {MarriageEvent} marriageToTerminate
     * @param {Date} marriageEndDate
     * @param {Marriage.MarriageStatus|string} terminationReason
     * @param isCurrentSpouse
     */
    static endMarriageInFamily(firstSpouse, secondSpouse, marriageEndDate, terminationReason= Marriage.MarriageStatus.DIVORCED, isCurrentSpouse = true)
    {

    }
    /** Removes marriage. This is intended to be called by the FamilyMember class, and is intended to give an end date to marriages to a self's marriage event list.
     * We should not call this in the event of ending marriage for a current spouse; we can create a function in the Family class to validate spousal status, however.
     * @param {FamilyMember} firstSpouse
     * @param {FamilyMember} secondSpouse
     * @param {MarriageEvent} marriageToTerminate
     * @param {Date} marriageEndDate
     * @param {Marriage.MarriageStatus|string} terminationReason
     * @param isCurrentSpouse
     */
    static endMarriage(firstSpouse, secondSpouse, marriageEndDate, terminationReason = Marriage.MarriageStatus.DIVORCED, isCurrentSpouse = false)
    {
        // Retrieve each spouse's marriage record.
        /** @type {Marriage} */ const firstSpouseMarriageObject = firstSpouse.getMarriageInformation();
        /** @type {Marriage} */ const secondSpouseMarriageObject = secondSpouse.getMarriageInformation();
        /** @type {PersonalName} */ const firstSpouseNameObject = (firstSpouse.getBasicInformation()).getFullNameObj();
        /** @type {PersonalName} */ const secondSpouseNameObject = (secondSpouse.getBasicInformation()).getFullNameObj();
        /** @type {MarriageEvent[]} */ const firstSpouseMarriageEvents = firstSpouseMarriageObject.getMarriageEvents();
        /** @type {MarriageEvent[]} */ const secondSpouseMarriageEvents = secondSpouseMarriageObject.getMarriageEvents();

        // Define a predicate to check the names. It returns true if the event has matching spouse names,
        // regardless of order.
        const namesMatch = (event) =>
        {
            const eventFirstNameObj = event.getFirstSpouseNameObj();
            const eventSecondNameObj = event.getSecondSpouseNameObj();
            return (firstSpouseNameObject === eventFirstNameObj) && (secondSpouseNameObject === eventSecondNameObj) ||
                (firstSpouseNameObject === eventSecondNameObj) && (secondSpouseNameObject === eventFirstNameObj);
        };

        // Locate the candidate events from each Marriage record that match the given names.
        const candidateEventFirst = firstSpouseMarriageEvents.find(namesMatch);
        const candidateEventSecond = secondSpouseMarriageEvents.find(namesMatch);

        // Helper to determine if an event is considered terminated.
        const isTerminated = (event) => event.getMarriageEndDate() !== null && event.getMarriageEndDateObj() instanceof Date;

        if (candidateEventFirst && candidateEventSecond) // Case 1: Both candidate events exist.
        {
            if (!isTerminated(candidateEventFirst) && !isTerminated(candidateEventSecond)) // Neither event is terminated; update both.
            {
                candidateEventFirst.setMarriageEndDate(marriageEndDate);
                candidateEventSecond.setMarriageEndDate(marriageEndDate);
            }
            else if (isTerminated(candidateEventFirst) && !isTerminated(candidateEventSecond)) // The first event is terminated; update the second accordingly.
            {
                candidateEventSecond.setMarriageEndDate(candidateEventFirst.getMarriageEndDateObj());
            }
            else if (!isTerminated(candidateEventFirst) && isTerminated(candidateEventSecond)) // The second event is terminated; update the first accordingly.
            {
                candidateEventFirst.setMarriageEndDate(candidateEventSecond.getMarriageEndDateObj()); // May potentially have referencing issues, fix maybe needed
            }
            else // Both are terminated already.
            {
                console.warn("Both marriage event records are already terminated.");
            }
        }
        // Case 2: Only one candidate event was found.
        else if (candidateEventFirst)
        {
            if (!isTerminated(candidateEventFirst))
            {candidateEventFirst.setMarriageEndDate(marriageEndDate);}
        }
        else if (candidateEventSecond)
        {
            if (!isTerminated(candidateEventSecond))
            {candidateEventSecond.setMarriageEndDate(marriageEndDate);}
        }
        else
        {throw new Error("No active matching marriage event found using the provided family members and criteria.");}
    }

    // Getter
    /** @returns {string} */ getMaritalStatus() {return (!isStringEmpty(this.#maritalStatus)) ? this.#maritalStatus: NA_STRING;}
    /** @returns {MarriageEvent[]} */ getMarriageEvents() {return this.#marriageEvents;}

    /** @param {number} idx
     * @returns {MarriageEvent} */
    getMarriageEvent(idx) {return this.#marriageEvents[idx];}

    /** Checks if duplicate marriage is present or not, and returns index
     * @param {MarriageEvent} marriageEvent
     * @param {boolean} returnValue
     * @return {number|boolean}
     */
    ifMarriageEventPresent(marriageEvent, returnValue = false)
    {
        if (!returnValue)
        {return (this.#marriageEvents).some(event => event.equals(marriageEvent));}
        else
        {return (this.#marriageEvents).findIndex(event => event.equals(marriageEvent));}
    }

    /** Validates the marital status
     * @param {string} maritalStatus
     * @param {boolean} returnValue
     * @return {string|boolean}
     */
    static validateMaritalStatus(maritalStatus, returnValue = false)
    {
        maritalStatus = (maritalStatus.trim()).toUpperCase();

        // Validate the normalized status against the MarriageStatus enum values
        if (!Object.values(Marriage.MarriageStatus).includes(maritalStatus))
        {throw new Error(`${maritalStatus} is not a valid marital status.`);}

        return (returnValue) ? maritalStatus: true;
    }
    /** Validates and returns the marital status
     * @param {string} maritalStatus
     * @return {string}
     */
    static #validateAndReturnMaritalStatus(maritalStatus)
    {
        try
        {return this.validateMaritalStatus(maritalStatus, true);}
        catch (maritalStatusError)
        {throw maritalStatusError;}
    }
    /** Sets the marital status
     * @param {string|Marriage.MarriageStatus} maritalStatus
     * @return {string}
     */
    setMaritalStatus(maritalStatus)
    {this.#maritalStatus = Marriage.#validateAndReturnMaritalStatus(maritalStatus);}
}

class MarriageEvent
{
    // Private fields
    /** @type {PersonalName} */ #firstSpouseName;
    /** @type {PersonalName} */ #secondSpouseName;
    /** @type {CityCountry} */ #placeOfMarriage = new CityCountry();
    /** @type {Date} */ #marriageBeginDate = undefined;
    /** @type {Date} */ #marriageEndDate; // Can be empty

    /** Constructor can be invoked in many ways; Should be invoked indirectly, as we are passing name objects
     * - new MarriageEvent();
     * - new MarriageEvent(firstFamilyMemberNameObject, secondFamilyMemberNameObject); 2 args
     * - new MarriageEvent(firstFamilyMemberNameObject, secondFamilyMemberNameObject, marriageBeginDate); 3 args
     * - new MarriageEvent(firstFamilyMemberNameObject, secondFamilyMemberNameObject, marriageBeginDate, countryOfMarriage); 4 args
     * - new MarriageEvent(firstFamilyMemberNameObject, secondFamilyMemberNameObject, marriageBeginDate, countryOfMarriage, cityOfMarriage); 5 args
     * - new MarriageEvent(firstFamilyMemberNameObject, secondFamilyMemberNameObject, marriageBeginDate, countryOfMarriage, cityOfMarriage, marriageEndDate); 6 args
     * @param  {...any} args
     * @throws {Error} If the number of arguments is invalid.
     */
    constructor(...args)
    {
        if (args.length === 0) // Set default values
        {
            this.#firstSpouseName = new PersonalName(); this.#secondSpouseName = new PersonalName();
            this.#marriageBeginDate = new Date(DEFAULTYEAR, 0, 1);

            if (!this.#placeOfMarriage)
            {this.#placeOfMarriage = new CityCountry();}
        }
        else
        {this.overrideFromArgs(...args);}
    }
    #populateFromArgs(updateAll, ...args)
    {
        if (args.length !== 2 && args.length !== 3 && args.length !== 4 && args.length !== 5 && args.length !== 6)
        {throw new Error("Invalid number of arguments for constructing or modifying a marriage event.");}

        if ((args[0] == null || !(args[0] instanceof PersonalName)) || (args[1] == null || !(args[1] instanceof PersonalName)))
        {throw new Error("Invalid name instances for constructing or modifying a marriage event.");}

        /** @type {string[]} */ const errors = [];
        /** @type {PersonalName|null} */ let newFirstSpouseName = this.#firstSpouseName;
        /** @type {string[]|undefined} */ let newFirstSpouseNameArray = undefined;
        /** @type {PersonalName} */ const firstSpouseNameObj = args[0]; // We are getting passed a name object

        /** @type {PersonalName|null} */ let newSecondSpouseName = this.#secondSpouseName;
        /** @type {string[]|undefined} */ let newSecondSpouseNameArray= undefined;
        /** @type {PersonalName} */ const secondSpouseNameObj = args[1]; // We are getting passed a name object

        /** @type {Date|null} */ let newMarriageBeginDate = this.#marriageBeginDate;
        /** @type {number[]|undefined} */ let newMarriageBeginDateArray = undefined;

        /** @type {CityCountry|null} */ let newPlaceOfMarriage = this.#placeOfMarriage;
        /** @type {string[]|undefined} */ let newPlaceOfMarriageArray = undefined;

        /** @type {Date|null} */ let newMarriageEndDate = this.#marriageEndDate;
        /** @type {number[]|undefined} */ let newMarriageEndDateArray = undefined;

        switch (args.length)
        {
            case 2:
                newFirstSpouseNameArray = tryToValidateErrorList(errors, () => PersonalName.validateFullName(firstSpouseNameObj, true));
                newSecondSpouseNameArray = tryToValidateErrorList(errors, () => PersonalName.validateFullName(secondSpouseNameObj, true));
                break;

            case 3:
                newFirstSpouseNameArray = tryToValidateErrorList(errors, () => PersonalName.validateFullName(firstSpouseNameObj, true));
                newSecondSpouseNameArray = tryToValidateErrorList(errors, () => PersonalName.validateFullName(secondSpouseNameObj, true));
                newMarriageBeginDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[2]));
                break;

            case 4:
                newFirstSpouseNameArray = tryToValidateErrorList(errors, () => PersonalName.validateFullName(firstSpouseNameObj, true));
                newSecondSpouseNameArray = tryToValidateErrorList(errors, () => PersonalName.validateFullName(secondSpouseNameObj, true));
                newMarriageBeginDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[2]));
                newPlaceOfMarriageArray = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCityCountryPlace(NA_STRING, args[3]));
                break;

            case 5:
                newFirstSpouseNameArray = tryToValidateErrorList(errors, () => PersonalName.validateFullName(firstSpouseNameObj, true));
                newSecondSpouseNameArray = tryToValidateErrorList(errors, () => PersonalName.validateFullName(secondSpouseNameObj, true));
                newMarriageBeginDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[2]));
                newPlaceOfMarriageArray = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCityCountryPlace(args[4], args[3]));
                break;

            case 6:
                newFirstSpouseNameArray = tryToValidateErrorList(errors, () => PersonalName.validateFullName(firstSpouseNameObj, true));
                newSecondSpouseNameArray = tryToValidateErrorList(errors, () => PersonalName.validateFullName(secondSpouseNameObj, true));
                newMarriageBeginDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[2]));
                newPlaceOfMarriageArray = tryToValidateErrorList(errors, () => CityCountry.validateAndReturnCityCountryPlace(args[4], args[3]));
                newMarriageEndDateArray = tryToValidateErrorList(errors, () => validateAndReturnDate(args[5]));
                break;
        }

        // For non-primitive values that are dependent on one another
        let finalMarriageBeginDate; let finalMarriageEndDate;
        /** @type {boolean} */ let performDateCheck = true;
        if (updateAll)
        {
            finalMarriageBeginDate = (newMarriageBeginDateArray) ? newMarriageBeginDateArray: null;
            finalMarriageEndDate = (newMarriageEndDateArray) ? newMarriageEndDateArray: null;
        }
        else // Since we do an argument by argument basis, we still prioritise those "constructed" from a validation process
        {
            try {finalMarriageBeginDate = (newMarriageBeginDateArray) ? newMarriageBeginDateArray: ((newMarriageBeginDate != null && newMarriageBeginDate instanceof Date) ? validateAndReturnDate(newMarriageBeginDate): null);}
            catch (e) {finalMarriageBeginDate = this.#marriageBeginDate; performDateCheck = false;}
            try {finalMarriageEndDate = (newMarriageEndDateArray) ? newMarriageEndDateArray: ((newMarriageEndDate != null && newMarriageEndDate instanceof Date) ? validateAndReturnDate(newMarriageEndDate): null);}
            catch (e) {finalMarriageEndDate = this.#marriageEndDate; performDateCheck = false;}
        }

        if (performDateCheck && isThisNumberDateArraySame(finalMarriageBeginDate, finalMarriageEndDate))
        {performDateCheck = false;}

        if (performDateCheck && finalMarriageBeginDate && finalMarriageEndDate)
        {
            if (!isThisNumberDateArrayBefore(finalMarriageBeginDate, finalMarriageEndDate))
            {errors.push("Marriage begin date must be before the end date.");}
            else if (!isThisNumberDateArrayAfter(finalMarriageEndDate, finalMarriageBeginDate))
            {errors.push("Marriage end date must be after the begin date.");}
        }

        if (errors.length > 0)
        {throw new Error(errors.join("\n"));}

        // If the arrays are not undefined, it means that it is proper
        if (newFirstSpouseNameArray) // We are getting passed an object, so we have to set it as such
        {newFirstSpouseName = firstSpouseNameObj;}
        else if (updateAll && !(newFirstSpouseName instanceof PersonalName))
        {newFirstSpouseName = PersonalName.constructPersonalNameFromNameArray(newFirstSpouseNameArray, newFirstSpouseName, true);}
        else if (updateAll)
        {newFirstSpouseName = new PersonalName.constructEmptyPersonalName(newFirstSpouseName);}

        if (newSecondSpouseNameArray)
        {newSecondSpouseName = secondSpouseNameObj;}
        else if (updateAll && !(newSecondSpouseName instanceof PersonalName))
        {newSecondSpouseName = PersonalName.constructPersonalNameFromNameArray(newSecondSpouseNameArray, newSecondSpouseName, true);}
        else if (updateAll)
        {newSecondSpouseName = PersonalName.constructEmptyPersonalName(newSecondSpouseName);}

        if (newPlaceOfMarriageArray) // Since we are getting passed strings instead of an object to determine place of marriage, this is proper
        {newPlaceOfMarriage = CityCountry.constructCityCountryFromCityCountryArray(newPlaceOfMarriageArray, newPlaceOfMarriage, true);}
        else if (updateAll)
        {newPlaceOfMarriage = CityCountry.constructEmptyCityCountry(newPlaceOfMarriage);}

        if (newMarriageBeginDateArray)
        {newMarriageBeginDate = constructDateFromNumberArray(newMarriageBeginDateArray, newMarriageBeginDate, true);}
        else if (updateAll)
        {newMarriageBeginDate = constructEmptyDate(newMarriageBeginDate);}

        if (newMarriageEndDateArray)
        {newMarriageEndDate = constructDateFromNumberArray(newMarriageEndDateArray, newMarriageEndDate, true);}
        else if (updateAll)
        {newMarriageEndDate = constructEmptyDate(newMarriageEndDate);}

        this.#firstSpouseName = newFirstSpouseName;
        this.#secondSpouseName = newSecondSpouseName;
        this.#placeOfMarriage = newPlaceOfMarriage;
        this.#marriageBeginDate = newMarriageBeginDate;
        this.#marriageEndDate = newMarriageEndDate;
    }
    /** Partial update: Only the provided fields override existing values. (For detailed update overloads: 3, 4, 5, 6, or 7 arguments.)
     * @param {...any} args
     * @throws {Error} if validations fail.
     */
    updateFromArgs(...args)
    {this.#populateFromArgs(false, ...args);}
    /** Full override update: Missing fields will be replaced by defaults.
     * @param {...any} args
     * @throws {Error} if validations fail.
     */
    overrideFromArgs(...args)
    {this.#populateFromArgs(true, ...args);}

    // Getter methods
    //
    /** @returns {string} */ getFirstSpouseName() {return (this.#firstSpouseName) ? (this.#firstSpouseName).getFullName(): NA_STRING;}
    /** @returns {PersonalName} */ getFirstSpouseNameObj() {return !(PersonalName.isNameDefault(this.#firstSpouseName)) ? this.#firstSpouseName: null;}
    /** @returns {string} */ getSecondSpouseName() {return (this.#secondSpouseName) ? (this.#secondSpouseName).getFullName(): NA_STRING;}
    /** @returns {PersonalName} */ getSecondSpouseNameObj() {return !(PersonalName.isNameDefault(this.#secondSpouseName)) ? this.#secondSpouseName: null;}
    /** @returns {string} */ getPlaceOfMarriage() {return (this.#placeOfMarriage).getPlace();}
    /** @returns {string} */ getCityOfMarriage() {return (this.#placeOfMarriage).getCity();}
    /** @returns {string} */ getCountryOfMarriage() {return (this.#placeOfMarriage).getCountry();}
    /** @returns {string} */ getCountryCodeOfMarriage() {return (this.#placeOfMarriage).getCountryCode();}
    /** @returns {string} */ getFullCountryOfMarriage() {return (this.#placeOfMarriage).getCountryFully();}

    /** @returns {string} */ getMarriageBeginDate() {return formatDateToString(this.#marriageBeginDate);}
    /** @returns {Date} */ getMarriageBeginDateObj() {return (!isDateDefault(this.#marriageBeginDate)) ? this.#marriageBeginDate: null;}
    /** @returns {number} */ getYearOfMarriageBeginDate() {return returnDateYear(this.#marriageBeginDate);}
    /** @returns {number} */ getMonthOfMarriageBeginDate() {return returnDateMonth(this.#marriageBeginDate);}
    /** @returns {number} */ getDayOfMarriageBeginDate() {return returnDateDay(this.#marriageBeginDate);}
    /** @returns {string} */ getMarriageEndDate() {return formatDateToString(this.#marriageEndDate);}
    /** @returns {Date} */ getMarriageEndDateObj() {return (!isDateDefault(this.#marriageEndDate)) ? this.#marriageEndDate: null;}
    /** @returns {number} */ getYearOfMarriageEndDate() {return returnDateYear(this.#marriageEndDate);}
    /** @returns {number} */ getMonthOfMarriageEndDate() {return returnDateMonth(this.#marriageEndDate);}
    /** @returns {number} */ getDayOfMarriageEndDate() {return returnDateDay(this.#marriageEndDate);}

    // Setter methods
    //
    /** Validates a spouse name given a family member object
     * @param {PersonalName} spouseMemberPersonalNameObject
     * @param {boolean} returnValue
     * @return {PersonalName|boolean}
     */
    static validateSpouseName(spouseMemberPersonalNameObject, returnValue = false)
    {
        if (spouseMemberPersonalNameObject == null || !(spouseMemberPersonalNameObject instanceof PersonalName))
        {throw Error("Spouse must have a valid name instance.");}

        // /** @type {PersonalName} */ let spouseMemberNameObject = (spouseMemberObject.basicInformation).getFullNameObj();
        try
        {PersonalName.validateFullName(spouseMemberPersonalNameObject);}
        catch (nameError)
        {throw new Error("Spouse must have valid name.")}

       return (returnValue) ? spouseMemberPersonalNameObject: true;
    }
    /** Validates and returns a spouse name given a family member object
     * @param {PersonalName} spouseMemberPersonalNameObject
     * @return {PersonalName}
     */
    static #validateAndReturnSpouseName(spouseMemberPersonalNameObject)
    {
        try
        {return this.validateSpouseName(spouseMemberPersonalNameObject, true);}
        catch (nameError)
        {throw nameError;}
    }
    /** Set first spouse name using a family member object
     * @param {PersonalName} firstSpousePersonalNameObject
     */
    setFirstSpouseName(firstSpousePersonalNameObject)
    {this.#firstSpouseName = MarriageEvent.#validateAndReturnSpouseName(firstSpousePersonalNameObject);}
    /** Set second spouse name using a family member object
     * @param {PersonalName} secondSpousePersonalNameObject
     */
    setSecondSpouseName(secondSpousePersonalNameObject)
    {this.#secondSpouseName = MarriageEvent.#validateAndReturnSpouseName(secondSpousePersonalNameObject);}
    /** Set spouse pair
     * @param {FamilyMember} firstSpouseObject
     * @param {FamilyMember} secondSpouseObject
     * @param {boolean} requireValidation
     */
    setSpousePair(firstSpouseObject, secondSpouseObject, requireValidation = true)
    {
        if ((firstSpouseObject == null || secondSpouseObject == null) || (!(firstSpouseObject instanceof FamilyMember) || !(secondSpouseObject instanceof FamilyMember)))
        {throw new Error("Both spouses must be of a valid family member instance.");}

        /** @type {PersonalName} */ let firstSpouseFullNameObj = (firstSpouseObject.getBasicInformation()).getFullNameObj();
        /** @type {PersonalName} */ let secondSpouseFullNameObj = (secondSpouseObject.getBasicInformation()).getFullNameObj();

        this.setSpouseNamePair(firstSpouseFullNameObj, secondSpouseFullNameObj, requireValidation);
    }
    /** Set spouse pair using Personal Name objects
     * @param {PersonalName} firstSpousePersonalNameObject
     * @param {PersonalName} secondSpousePersonalNameObject
     * @param {boolean} requireValidation
     */
    setSpouseNamePair(firstSpousePersonalNameObject, secondSpousePersonalNameObject, requireValidation = true)
    {
        const errors = [];
        if (requireValidation)
        {
            firstSpousePersonalNameObject = tryToValidateErrorList(errors, () => MarriageEvent.#validateAndReturnSpouseName(firstSpousePersonalNameObject), "First spouse: ");
            secondSpousePersonalNameObject = tryToValidateErrorList(errors, () => MarriageEvent.#validateAndReturnSpouseName(secondSpousePersonalNameObject), "Second spouse: ");

            if (errors.length > 0)
            {throw new Error(errors.join("\n"));}
        }

        this.#firstSpouseName = firstSpousePersonalNameObject;
        this.#secondSpouseName = secondSpousePersonalNameObject;
    }

    setPlaceOfMarriageCity(city)
    {
        if (this.getCountryCodeOfMarriage() === NA_STRING)
        {throw new Error("Place of marriage must include country if it intends to have a city.");}
        (this.#placeOfMarriage).setCity(city);
    }
    setPlaceOfMarriageCountry(country)
    {(this.#placeOfMarriage).setCountry(country);}
    setPlaceOfMarriage(city, country)
    {(this.#placeOfMarriage).setCityCountryPlace(city, country);}

    /** Sets the marriage begin date.
     * Overloads:
     * - setMarriageBeginDate(Date)
     * - setMarriageBeginDate(String)
     * - setMarriageBeginDate(Number, Number, Number)  // month, day, year
     *
     * @param {...any} args - The date parameters.
     * @throws {Error} If the arguments are invalid.
     */
    setMarriageBeginDate(...args)
    {
        const candidateMarriageBeginNumbers = validateAndReturnDate(...args);

        if (this.#marriageEndDate != null && this.#marriageEndDate instanceof Date && !isDateDefault(this.#marriageEndDate))
        {
            const marriageEndNumbers = validateAndReturnDate(this.#marriageEndDate);
            if (!isThisNumberDateArrayBefore(candidateMarriageBeginNumbers, marriageEndNumbers) && !isThisNumberDateArraySame(candidateMarriageBeginNumbers, marriageEndNumbers))
            {throw new Error("Marriage begin date must be before marriage end date.");}
        }

        this.#marriageBeginDate = constructDateFromNumberArray(candidateMarriageBeginNumbers, this.#marriageBeginDate, true);
        // (this.#marriageBeginDate).setFullYear(candidateMarriageBeginNumbers[0], candidateMarriageBeginNumbers[1], candidateMarriageBeginNumbers[2]);
        // (this.#marriageBeginDate).setHours(0, 0, 0, 0);
    }
    /** Sets the marriage end date.
     * Overloads:
     * - setMarriageEndDate(Date)
     * - setMarriageEndDate(String)
     * - setMarriageEndDate(Number, Number, Number)  // month, day, year
     *
     * @param {...any} args - The date parameters.
     * @throws {Error} If the arguments are invalid.
     */
    setMarriageEndDate(...args)
    {
        const candidateMarriageEndNumbers = validateAndReturnDate(...args);

        if (this.#marriageBeginDate != null && this.#marriageBeginDate instanceof Date && !isDateDefault(this.#marriageBeginDate))
        {
            const marriageBeginNumbers = validateAndReturnDate(this.#marriageBeginDate);
            if (!isThisNumberDateArrayAfter(candidateMarriageEndNumbers, marriageBeginNumbers) && !isThisNumberDateArraySame(candidateMarriageEndNumbers, marriageBeginNumbers))
            {throw new Error("Marriage end date must be after marriage begin date.");}
        }

        this.#marriageEndDate = constructDateFromNumberArray(candidateMarriageEndNumbers, this.#marriageEndDate, true);
        // (this.#marriageEndDate).setFullYear(candidateMarriageEndNumbers[0], candidateMarriageEndNumbers[1], candidateMarriageEndNumbers[2]);
        // (this.#marriageEndDate).setHours(0, 0, 0, 0);
    }
    clearMarriageEnd()
    {this.#marriageEndDate = undefined;}

    equals(o)
    {
        if (this === o)
        {return true;}

        if (!(o instanceof MarriageEvent))
        {return false;}

        const thisFirstSpouse = this.getFirstSpouseNameObj();
        const thisSecondSpouse = this.getSecondSpouseNameObj();
        const otherFirstSpouse = o.getFirstSpouseNameObj();
        const otherSecondSpouse = o.getSecondSpouseNameObj();
        const sameNameVariation =
            ((thisFirstSpouse && otherFirstSpouse) && thisFirstSpouse === otherFirstSpouse && (thisSecondSpouse && otherSecondSpouse) && thisSecondSpouse === otherSecondSpouse) ||
            ((thisFirstSpouse && otherSecondSpouse) && thisFirstSpouse === otherSecondSpouse && (thisSecondSpouse && otherFirstSpouse) && thisSecondSpouse === otherFirstSpouse);

        if (!sameNameVariation)
        {return false;}

        const sameMarriageBeginDate = isThisDateSame(this.#marriageBeginDate, o.getMarriageBeginDateObj());
        if (!sameMarriageBeginDate)
        {return false;}

        const sameCountryOfMarriage = (this.#placeOfMarriage).getCountryCode() === (o.getCountryCodeOfMarriage());
        if (!sameCountryOfMarriage)
        {return false;}

        const sameMarriageEndDate = isThisDateSame(this.#marriageEndDate, o.getMarriageEndDateObj());
        if (!sameMarriageEndDate)
        {return false;}

        return true;
    }

    // Miscellaneous functions
    /** Extract the marriage information from an event
     * @param {MarriageEvent} marriageEvent
     * @return {any[]}
     */
    static extractMarriageEventInformation(marriageEvent)
    {
        return [marriageEvent.getFirstSpouseNameObj(), marriageEvent.getSecondSpouseNameObj(), marriageEvent.getMarriageBeginDate(),
            marriageEvent.getCountryCodeOfMarriage(), marriageEvent.getCityOfMarriage(), marriageEvent.getMarriageEndDateObj()];
    }
    /** Synchronises information from the list of marriage events. Prioritises the base marriage always, then fall back is given to others.
     * @param {MarriageEvent} baseMarriageToAdd
     * @param {MarriageEvent} marriageEvent1
     * @param {MarriageEvent} marriageEvent2
     * @return {any[]}
     */
    static synchronizeMarriageEvents(baseMarriageToAdd, marriageEvent1, marriageEvent2 = null)
    {
        if (!(baseMarriageToAdd instanceof MarriageEvent) || !(marriageEvent1 instanceof MarriageEvent))
        {throw new Error("The given marriage events are invalid.");}
        if ((marriageEvent2 != null && !(marriageEvent2 instanceof MarriageEvent)))
        {throw new Error("The given marriage events are invalid.");}

        const baseMarriageInformation = MarriageEvent.extractMarriageEventInformation(baseMarriageToAdd);
        const marriageEvent1Information = MarriageEvent.extractMarriageEventInformation(marriageEvent1);
        let marriageEvent2Information;

        if (marriageEvent2 instanceof MarriageEvent)
        {marriageEvent2Information = MarriageEvent.extractMarriageEventInformation(marriageEvent2);}

        /** Returns a prioritized value from three candidates.
         * @param {*} newVal - The new candidate value.
         * @param {*} oldVal1 - The first fallback value.
         * @param {*} oldVal2 - The second fallback value.
         * @param {function(any): boolean} validator - A function that validates the value.
         * @param {*} defaultValue - The default value to use if none are valid.
         * @returns {*} - The chosen value.
         */
        function prioritizedValue(newVal, oldVal1, oldVal2, validator, defaultValue = NA_STRING)
        {
            if (validator(newVal)) {return newVal;}
            if (validator(oldVal1)) {return oldVal1;}
            if (validator(oldVal2)) {return oldVal2;}
            return defaultValue;
        }

        // Validators
        const isValidPersonalName = (val) => val != null && val instanceof PersonalName;
        const isValidDate = (val) => val != null && val instanceof Date;
        const isValidString = (val) => typeof val === "string" && val !== NA_STRING && val.trim() !== "";

        const finalMarriageEventInformation =
            [
                prioritizedValue(
                    baseMarriageInformation[0],
                    marriageEvent1Information[0],
                    marriageEvent2Information ? marriageEvent2Information[0]: null,
                    isValidPersonalName,
                    null
                ),

                prioritizedValue(
                    baseMarriageInformation[1],
                    marriageEvent1Information[1],
                    marriageEvent2Information ? marriageEvent2Information[1]: null,
                    isValidPersonalName,
                    null
                ),

                prioritizedValue(
                    baseMarriageInformation[2],
                    marriageEvent1Information[2],
                    marriageEvent2Information ? marriageEvent2Information[2]: null,
                    isValidDate,
                    null
                ),

                prioritizedValue(
                    baseMarriageInformation[3],
                    marriageEvent1Information[3],
                    marriageEvent2Information ? marriageEvent2Information[3]: NA_STRING,
                    isValidString,
                    NA_STRING
                ),

                prioritizedValue(
                    baseMarriageInformation[4],
                    marriageEvent1Information[4],
                    marriageEvent2Information ? marriageEvent2Information[4]: NA_STRING,
                    isValidString,
                    NA_STRING
                ),

                prioritizedValue(
                    baseMarriageInformation[5],
                    marriageEvent1Information[5],
                    marriageEvent2Information ? marriageEvent2Information[5]: null,
                    isValidDate,
                    null
                )
            ];
    }
    /** Build a valid array from a synchronized marriage event
     * @param {any[]} synchronizedMarriageEventInformation
     * @return {any[]}
     */
    static buildValidMarriageEventInformation(synchronizedMarriageEventInformation)
    {
        const firstInvalidIndex = synchronizedMarriageEventInformation.findIndex(value => value == null || value === NA_STRING);
        return (firstInvalidIndex === -1) ? synchronizedMarriageEventInformation: synchronizedMarriageEventInformation.slice(0, firstInvalidIndex);
    }
}