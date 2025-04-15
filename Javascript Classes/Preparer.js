import {Contact, PersonalName} from "./BasicInfo.js";
import {Address} from "./Location.js";

class Preparer
{
    /** @type {PersonalName} */ fullName = new PersonalName();
    /** @type {Address} */ mailingAddress = new Address();
    /** @type {Contact} */ contactInformation = new Contact();


}