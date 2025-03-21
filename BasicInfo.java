public class BasicInfo
{
    final public static String NA_STRING = "N/A";
    final public static char NA_CHAR = 'N';
    final public static int NA_INTEGER = -1;
    final public static double NA_DOUBLE = -1.00;

    Birth origin;
    Name fullName;
    SSN socialSecurity = new SSN();
    boolean ifSamePersonalMailingAddress = true; Address personalAddress, mailingAddress;
    ContactInformation contactInfo;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for Birth origin object
    public String getBirthPlace()
    {if (this.origin == null || origin.getBirthPlace() == null || origin.getBirthPlace().isEmpty()) {return NA_STRING;} else {return origin.getBirthPlace();} }
    public String getBirthCity()
    {if (this.origin == null || origin.getBirthCity() == null || origin.getBirthCity().isEmpty()) {return NA_STRING;} else {return origin.getBirthCity();} }
    public String getBirthCountry()
    {if (this.origin == null || origin.getBirthCountry() == null || origin.getBirthCountry().isEmpty()) {return NA_STRING;} else {return origin.getBirthCountry();} }
    public String getBirthCertNum()
    {if (this.origin == null || origin.getBirthCertNum() == null || origin.getBirthCertNum().isEmpty()) {return NA_STRING;}  else {return origin.getBirthCertNum();} }
    public String getDoB()
    {if (this.origin == null || origin.getDoB() == null || origin.getDoB().isEmpty()) {return NA_STRING;} else {return origin.getDoB();} }
    Date getDoBObj()
    {if (this.origin == null) {return null;} else {return origin.getDoBObj();} }
    public int getYearOfBirth()
    {if (this.origin == null) {return Date.INVALIDDATE;} else {return origin.getYearOfBirth();} }
    public int getMonthOfBirth()
    {if (this.origin == null) {return Date.INVALIDDATE;} else {return origin.getMonthOfBirth();} }
    public int getDayOfBirth()
    {if (this.origin == null) {return Date.INVALIDDATE;} else {return origin.getDayOfBirth();} }
    public char getSex()
    {if (this.origin == null) {return NA_CHAR;} else {return origin.getSex();}}

    // Getter methods for mutable Birth origin object
    public double getHeightINCH() {return (this.origin != null) ? origin.getHeightINCH():NA_DOUBLE;}
    public double getHeightFT() {return (this.origin != null) ? origin.getHeightFT():NA_DOUBLE;}
    public double getHeightCM() {return (this.origin != null) ? origin.getHeightCM():NA_DOUBLE;}
    public double getWeightPounds() {return (this.origin != null) ? origin.getWeightPounds():NA_DOUBLE;}
    public double getWeightKG() {return (this.origin != null) ? origin.getWeightKG():NA_DOUBLE;}
    public String getEyeColor() {return (this.origin != null) ? origin.getEyeColor():NA_STRING;}
    public String getHairColor() {return (this.origin != null) ? origin.getHairColor():NA_STRING;}

    // Base Setters
    private void initializeEmptyOrigin()
    {
        if (this.origin == null) {this.origin = new Birth(new Date(), NA_STRING, NA_STRING, NA_CHAR);}
    }
    public void setOriginObj(Birth IN_originObj)
    {
        if (IN_originObj == null) {throw new IllegalArgumentException("IN_originObj cannot be null.");}
        this.origin = IN_originObj;
    }

    // Setter methods using constructors for Birth origin object; if constructor is unneeded, then modify current object
    public void setOrigin(Date IN_dateOfBirth, String IN_birthCity, String IN_birthCountry, char IN_sex)
    {
        if (this.origin == null)
        {this.origin = new Birth(IN_dateOfBirth, IN_birthCity, IN_birthCountry, IN_sex);}
        else
        {origin.setDoB(IN_dateOfBirth); origin.setBirthPlace(IN_birthCity, IN_birthCountry); origin.setSex(IN_sex);}
    }
    public void setOrigin(String IN_dateOfBirth, String IN_birthCity, String IN_birthCountry, char IN_sex)
    {
        if (this.origin == null)
        {this.origin = new Birth(IN_dateOfBirth, IN_birthCity, IN_birthCountry, IN_sex);}
        else
        {this.origin.setDoB(IN_dateOfBirth); this.origin.setBirthPlace(IN_birthCity, IN_birthCountry); this.origin.setSex(IN_sex);}
    }

    // Individual setter methods for Birth origin object, these always have initializeEmptyOrigin()
    public void setBirthPlace(String IN_birthCity, String IN_birthCountry)
    {
        if (this.origin == null) {initializeEmptyOrigin();}
        origin.setBirthPlace(IN_birthCity, IN_birthCountry);
    }
    public void setBirthCertNum(String IN_birthCertNum)
    {
        if (this.origin == null) {initializeEmptyOrigin();}
        origin.setBirthCertNum(IN_birthCertNum);
    }
    public void setDoB(Date IN_DoB)
    {
        if (IN_DoB == null) {throw new IllegalArgumentException("IN_DoB cannot be null.");}
        if (this.origin == null) {initializeEmptyOrigin();}
        origin.setDoB(IN_DoB);
    }
    public void setDoB(int IN_month, int IN_day, int IN_year)
    {
        if (this.origin == null) {initializeEmptyOrigin();}
        origin.setDoB(IN_month, IN_day, IN_year);
    }
    public void setDoB(String IN_date)
    {
        if (this.origin == null) {initializeEmptyOrigin();}
        origin.setDoB(IN_date);
    }
    public void setSex(char IN_sex)
    {
        if (this.origin == null) {initializeEmptyOrigin();}
        origin.setSex(IN_sex);
    }

    // Mutable characteristics
    public void setHeightINCH(int IN_heightINCH)
    {
        if (this.origin == null) {initializeEmptyOrigin();}
        origin.setHeightINCH(IN_heightINCH);
    }
    public void setWeightPounds(double IN_weightPounds)
    {
        if (this.origin == null) {initializeEmptyOrigin();}
        origin.setWeightPounds(IN_weightPounds);
    }
    public void setEyeColor(String IN_eyeColor)
    {
        if (this.origin == null) {initializeEmptyOrigin();}
        origin.setEyeColor(IN_eyeColor);
    }
    public void setHairColor(String IN_hairColor)
    {
        if (this.origin == null) {initializeEmptyOrigin();}
        origin.setHairColor(IN_hairColor);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for Name fullName object
    public String getFirstName()
    {if (this.fullName == null || fullName.getFirstName().isEmpty()) {return NA_STRING;} else {return fullName.getFirstName();} }
    public String getMiddleName()
    {if (this.fullName == null) {return "";} else {return fullName.getMiddleName();} }
    public String getLastName()
    {if (this.fullName == null || fullName.getLastName().isEmpty()) {return NA_STRING;} else {return fullName.getLastName();} }
    public String getFullName()
    {if (this.fullName == null || fullName.getFullName().isEmpty()) {return NA_STRING;} else {return fullName.getFullName();} }

    // Base Setters
    private void initializeEmptyFullName()
    {
        if (this.fullName == null) {this.fullName = new Name();} // Default constructor sets all names to ""
    }
    public void setFullNameObj(Name IN_fullNameObj)
    {
        if (IN_fullNameObj == null) {throw new IllegalArgumentException("IN_fullNameObj cannot be null.");}
        this.fullName = IN_fullNameObj;
    }

    // Setter methods using constructors for Name fullName object; if constructor is unneeded, then modify current object
    public void setFullName(String IN_fullName) // One-argument version: full name
    {
        if (this.fullName == null)
        {this.fullName = new Name(IN_fullName);}
        else
        {fullName.setName(IN_fullName);}
    }
    public void setFullName(String IN_firstName, String IN_lastName) // Two-argument version: first and last names
    {
        if (this.fullName == null)
        {this.fullName = new Name(IN_firstName, IN_lastName);}
        else
        {fullName.setFirstName(IN_firstName); fullName.setLastName(IN_lastName);}
    }
    public void setFullName(String IN_firstName, String IN_middleName, String IN_lastName) // Three-argument version: first, middle, and last names
    {
        if (this.fullName == null)
        {this.fullName = new Name(IN_firstName, IN_middleName, IN_lastName);}
        else
        {fullName.setFirstName(IN_firstName); fullName.setMiddleName(IN_middleName); fullName.setLastName(IN_lastName);}
    }

    // Individual setter methods for Name fullName object, these always have initializeEmptyName()
    public void setFirstName(String IN_firstName)
    {
        if (this.fullName == null) {initializeEmptyFullName();}
        fullName.setFirstName(IN_firstName);
    }
    public void setMiddleName(String IN_middleName)
    {
        if (this.fullName == null) {initializeEmptyFullName();}
        fullName.setMiddleName(IN_middleName);
    }
    public void setLastName(String IN_lastName)
    {
        if (this.fullName == null) {initializeEmptyFullName();}
        fullName.setLastName(IN_lastName);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for SSN socialSecurity object
    public String getPureSSN() {return (this.socialSecurity != null && !socialSecurity.getPureSSN().isEmpty()) ? socialSecurity.getPureSSN():NA_STRING;}
    public String getFormattedSSN() {return (this.socialSecurity != null && !socialSecurity.getFormattedSSN().isEmpty()) ? socialSecurity.getFormattedSSN():NA_STRING;}

    // Base Setters
    private void initializeEmptySocialSecurity()
    {
        if (this.socialSecurity == null) {this.socialSecurity = new SSN();} // Defaults to 000-00-0000
    }
    public void setSocialSecurityObj(SSN IN_socialSecurityObj)
    {
        if (IN_socialSecurityObj == null)
        {throw new IllegalArgumentException("IN_socialSecurityObj cannot be null.");}
        else
        {this.socialSecurity = IN_socialSecurityObj;}
    }

    // Setter methods using constructors for SSN socialSecurity object
    public void setSocialSecurity(String IN_pureSSN)
    {
        if (this.socialSecurity == null)
        {this.socialSecurity = new SSN(IN_pureSSN); return;}
        else
        {socialSecurity.setSSN(IN_pureSSN);}
    }

    // Individual setter method for the SSN socialSecurity object, these always have initializeEmptySocialSecurity()
    public void setPureSSN(String IN_pureSSN)
    {
        if (this.socialSecurity == null)
        {initializeEmptySocialSecurity();}
        socialSecurity.setSSN(IN_pureSSN);
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for Address personalAddress/mailingAddress objects
    public String getMailingAddressBaseAddress() {return (this.mailingAddress != null && !mailingAddress.getBaseAddress().isEmpty()) ? mailingAddress.getBaseAddress():NA_STRING;}
    public String getMailingAddressChamber() {return (this.mailingAddress != null && !mailingAddress.getChamber().isEmpty()) ? mailingAddress.getChamber():NA_STRING;}
    public String getMailingAddressCity() {return (this.mailingAddress != null && !mailingAddress.getCity().isEmpty()) ? mailingAddress.getCity():NA_STRING;}
    public String getMailingAddressRegion() {return (this.mailingAddress != null && !mailingAddress.getRegion().isEmpty()) ? mailingAddress.getRegion():NA_STRING;}
    public String getMailingAddressState() {return (this.mailingAddress != null && !mailingAddress.getState().isEmpty()) ? mailingAddress.getState():NA_STRING;}
    public String getMailingAddressPostalCode() {return (this.mailingAddress != null && !mailingAddress.getPostalCode().isEmpty()) ? mailingAddress.getPostalCode():NA_STRING;}
    public String getMailingAddressCountry() {return (this.mailingAddress != null && !mailingAddress.getCountry().isEmpty()) ? mailingAddress.getCountry():NA_STRING;}
    public boolean getIsMailingAddressDomestic() {return (this.mailingAddress != null) ? mailingAddress.getIsAddressDomestic():false;}

    public String getPersonalAddressBaseAddress()
    {
        if (ifSamePersonalMailingAddress == true && this.personalAddress == null) {return getMailingAddressBaseAddress();}
        else
        {return (this.personalAddress != null && !personalAddress.getBaseAddress().isEmpty()) ? personalAddress.getBaseAddress():NA_STRING;}
    }
    public String getPersonalAddressChamber()
    {
        if (ifSamePersonalMailingAddress == true)
        {return getMailingAddressChamber();}
        else
        {return (this.personalAddress != null && !personalAddress.getChamber().isEmpty()) ? personalAddress.getChamber():NA_STRING;}
    }
    public String getPersonalAddressCity()
    {
        if (ifSamePersonalMailingAddress == true)
        {return getMailingAddressCity();}
        else
        {return (this.personalAddress != null && !personalAddress.getCity().isEmpty()) ? personalAddress.getCity():NA_STRING;}
    }
    public String getPersonalAddressRegion()
    {
        if (ifSamePersonalMailingAddress == true)
        {return getMailingAddressRegion();}
        else
        {return (this.personalAddress != null && !personalAddress.getRegion().isEmpty()) ? personalAddress.getRegion():NA_STRING;}
    }
    public String getPersonalAddressState()
    {
        if (ifSamePersonalMailingAddress == true)
        {return getMailingAddressState();}
        else
        {return (this.personalAddress != null && !personalAddress.getState().isEmpty()) ? personalAddress.getState():NA_STRING;}
    }
    public String getPersonalAddressPostalCode()
    {
        if (ifSamePersonalMailingAddress == true)
        {return getMailingAddressPostalCode();}
        else
        {return (this.personalAddress != null && !personalAddress.getPostalCode().isEmpty()) ? personalAddress.getPostalCode():NA_STRING;}
    }
    public String getPersonalAddressCountry()
    {
        if (ifSamePersonalMailingAddress == true)
        {return getMailingAddressCountry();}
        else
        {return (this.personalAddress != null && !personalAddress.getCountry().isEmpty()) ? personalAddress.getCountry():NA_STRING;}
    }
    public boolean getIsPersonalAddressDomestic()
    {
        if (ifSamePersonalMailingAddress == true)
        {return getIsMailingAddressDomestic();}
        else
        {return (this.personalAddress != null) ? personalAddress.getIsAddressDomestic():false;}
    }

    // Base Setters and Helper
    private Address initializeEmptyAddress()
    {
        Address placeholderAddress = new Address(); // Need to convert this instead of setting but having it on default constructor
        placeholderAddress.setBaseAddress(NA_STRING); placeholderAddress.setCity(NA_STRING); placeholderAddress.setState(NA_STRING);
        placeholderAddress.setRegion(NA_STRING); placeholderAddress.setPostalCode(NA_STRING); placeholderAddress.setCountry(NA_STRING);

        return placeholderAddress;
    }
    private void addressConsistency() // Is only ever meant to be called when both personal and mailing address are both the same
    {
        if (this.ifSamePersonalMailingAddress == true)
        {
            if (this.personalAddress == null && this.mailingAddress != null)
            {
                this.personalAddress = this.mailingAddress;
                return;
            }
            else if (this.personalAddress != null && this.mailingAddress == null)
            {
                this.mailingAddress = this.personalAddress;
                return;
            }
            else if (this.personalAddress != null && this.mailingAddress != null)
            {
                this.mailingAddress = this.personalAddress;
            }
            else if (this.personalAddress == null && this.mailingAddress == null)
            {
                return;
            }
        }
        else if (this.ifSamePersonalMailingAddress == false)
        {
            return;
        }
    }
    public void setIfSamePersonalMailingAddress(boolean ifSamePersonalMailingAddress)
    {
        this.ifSamePersonalMailingAddress = ifSamePersonalMailingAddress;
    }

    public void setMailingAddressObj(Address IN_mailingAddress, boolean IN_ifSamePersonalMailingAddress)
    {
        if (IN_mailingAddress == null) {throw new IllegalArgumentException("IN_mailingAddress cannot be null.");}
        else
        {setIfSamePersonalMailingAddress(IN_ifSamePersonalMailingAddress); this.mailingAddress = IN_mailingAddress;}

        if (this.ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setPersonalAddressObj(Address IN_personalAddress, boolean IN_ifSamePersonalMailingAddress)
    {
        if (IN_personalAddress == null) {throw new IllegalArgumentException("IN_personalAddress cannot be null.");}
        else
        {setIfSamePersonalMailingAddress(IN_ifSamePersonalMailingAddress); this.personalAddress = IN_personalAddress;}

        if (this.ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }

    // Setter methods using constructors for Address personalAddress/mailingAddress object
    public void setMailingAddress(String IN_USBasicAddress, boolean IN_ifSamePersonalMailingAddress)
    {
        if (this.mailingAddress == null)
        {
            setIfSamePersonalMailingAddress(IN_ifSamePersonalMailingAddress);
            this.mailingAddress = new Address(IN_USBasicAddress);
        }
        else
        {
            setIfSamePersonalMailingAddress(IN_ifSamePersonalMailingAddress);
            mailingAddress.setUSAddress(IN_USBasicAddress);
        }

        if (this.ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setForeignMailingAddress(String IN_foreignBasicAddress, String IN_foreignCountry, boolean IN_ifSamePersonalMailingAddress)
    {
        if (this.mailingAddress == null)
        {
            setIfSamePersonalMailingAddress(IN_ifSamePersonalMailingAddress);
            this.mailingAddress = new Address(IN_foreignBasicAddress, IN_foreignCountry);
        }
        else
        {
            setIfSamePersonalMailingAddress(IN_ifSamePersonalMailingAddress);
            mailingAddress.setForeignAddress(IN_foreignBasicAddress, IN_foreignCountry);
        }

        if (this.ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }

    public void setPersonalAddress(String IN_USBasicAddress, boolean IN_ifSamePersonalMailingAddress)
    {
        if (this.personalAddress == null)
        {
            setIfSamePersonalMailingAddress(IN_ifSamePersonalMailingAddress);
            personalAddress = new Address(IN_USBasicAddress);
        }
        else
        {
            setIfSamePersonalMailingAddress(IN_ifSamePersonalMailingAddress);
            personalAddress.setUSAddress(IN_USBasicAddress);
        }

        if (this.ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setForeignPersonalAddress(String IN_foreignBasicAddress, String IN_foreignCountry, boolean IN_ifSamePersonalMailingAddress)
    {
        if (this.personalAddress == null)
        {
            setIfSamePersonalMailingAddress(IN_ifSamePersonalMailingAddress);
            this.personalAddress = new Address(IN_foreignBasicAddress, IN_foreignCountry);
        }
        else
        {
            setIfSamePersonalMailingAddress(IN_ifSamePersonalMailingAddress);
            personalAddress.setForeignAddress(IN_foreignBasicAddress, IN_foreignCountry);
        }

        if (this.ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }

    // Individual setter methods for the Address personalAddress and mailingAddress objects, these always have initializeEmptyAddress()
    public void setMailingAddressBaseAddress(String IN_baseAddress)
    {
        if (this.mailingAddress == null)
        {this.mailingAddress = initializeEmptyAddress();}
        mailingAddress.setBaseAddress(IN_baseAddress);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setMailingAddressCity(String IN_city)
    {
        if (this.mailingAddress == null)
        {this.mailingAddress = initializeEmptyAddress();}
        mailingAddress.setCity(IN_city);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setMailingAddressRegion(String IN_region)
    {
        if (this.mailingAddress == null)
        {this.mailingAddress = initializeEmptyAddress();}
        mailingAddress.setRegion(IN_region);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setMailingAddressState(String IN_state)
    {
        if (this.mailingAddress == null)
        {this.mailingAddress = initializeEmptyAddress();}
        mailingAddress.setState(IN_state);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setMailingAddressPostalCode(String IN_postalCode)
    {
        if (this.mailingAddress == null)
        {this.mailingAddress = initializeEmptyAddress();}
        mailingAddress.setPostalCode(IN_postalCode);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setMailingAddressCountry(String IN_country)
    {
        if (this.mailingAddress == null)
        {this.mailingAddress = initializeEmptyAddress();}
        mailingAddress.setCountry(IN_country);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }

    public void setPersonalAddressBaseAddress(String IN_baseAddress)
    {
        if (this.personalAddress == null)
        {this.personalAddress = initializeEmptyAddress();}
        personalAddress.setBaseAddress(IN_baseAddress);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setPersonalAddressCity(String IN_city)
    {
        if (this.personalAddress == null)
        {this.personalAddress = initializeEmptyAddress();}
        personalAddress.setCity(IN_city);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setPersonalAddressRegion(String IN_region)
    {
        if (this.personalAddress == null)
        {this.personalAddress = initializeEmptyAddress();}
        personalAddress.setRegion(IN_region);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setPersonalAddressState(String IN_state)
    {
        if (this.personalAddress == null)
        {this.personalAddress = initializeEmptyAddress();}
        personalAddress.setState(IN_state);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setPersonalAddressPostalCode(String IN_postalCode)
    {
        if (this.personalAddress == null)
        {this.personalAddress = initializeEmptyAddress();}
        personalAddress.setPostalCode(IN_postalCode);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
    public void setPersonalAddressCountry(String IN_country)
    {
        if (this.personalAddress == null)
        {this.personalAddress = initializeEmptyAddress();}
        personalAddress.setCountry(IN_country);

        if (ifSamePersonalMailingAddress == true)
        {addressConsistency();}
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Getter methods for ContactInformation contactInfo object
    public String getEmail()
    {if (this.contactInfo == null || this.contactInfo.getEmail() == null || contactInfo.getEmail().isEmpty()) {return NA_STRING;} else {return contactInfo.getEmail();} }
    public int getContactNumberCountryPrefix()
    {if (this.contactInfo == null) {return NA_INTEGER;} else {return contactInfo.getContactNumberCountryPrefix();} }
    public String getContactNumber()
    {if (this.contactInfo == null || this.contactInfo.getContactNumber() == null || contactInfo.getContactNumber().isEmpty()) {return NA_STRING;} else {return contactInfo.getContactNumber();} }

    // Base Setters and Helper
    private ContactInformation initializeEmptyContactInformation()
    {return new ContactInformation();}
    public void setContactInfoObj(ContactInformation IN_contactInfoObj)
    {
        if (IN_contactInfoObj == null)
        {throw new IllegalArgumentException("IN_contactInfoObj cannot be null");}
        else
        {this.contactInfo = IN_contactInfoObj;}
    }

    // Setter methods using constructors for ContactInformation contactInfo object
    public void setContactInfo(String IN_email, String IN_contactNumber)
    {
        if (this.contactInfo == null)
        {contactInfo = new ContactInformation(IN_email, IN_contactNumber);}
        else
        {contactInfo.setEmail(IN_email); contactInfo.setContactNumber(IN_contactNumber);}
    }
    public void setContactInfo(String IN_email, int IN_contactNumberCountryPrefix, String IN_contactNumber)
    {
        if (this.contactInfo == null)
        {contactInfo = new ContactInformation(IN_email, IN_contactNumberCountryPrefix, IN_contactNumber);}
        else
        {
            contactInfo.setEmail(IN_email);
            if (IN_contactNumber.charAt(0) == '+')
            {contactInfo.setContactNumber(IN_contactNumber);}
            else
            {contactInfo.setContactNumber(IN_contactNumber); contactInfo.setContactNumberCountryPrefix(String.valueOf(IN_contactNumberCountryPrefix));}
        }
    }

    // Individual setter methods for the ContactInformation contactInfo object, these always have initializeEmptyContactInformation()
    public void setEmail(String IN_Email)
    {
        if (this.contactInfo == null)
        {this.contactInfo = initializeEmptyContactInformation();}
        (this.contactInfo).setEmail(IN_Email);
    }
    public void setContactNumber(String IN_contactNumber)
    {
        if (this.contactInfo == null)
        {this.contactInfo = initializeEmptyContactInformation();}
        (this.contactInfo).setContactNumber(IN_contactNumber);
    }
    public void setContactNumberCountryPrefix(String contactNumberCountryPrefixString)
    {
        if (this.contactInfo == null)
        {this.contactInfo = initializeEmptyContactInformation();}
        (this.contactInfo).setContactNumberCountryPrefix(contactNumberCountryPrefixString);
    }
}

class Birth
{
    // Sex, Place of Birth, Date of Birth, BirthCertificateIDNum
    private String[] birthPlace; // City & Country
    private String birthCertNum;
    private Date DoB;
    private char sex;

    // Mutable birth characteristics
    private double heightINCH, weightPounds;
    private String eyeColor, hairColor;

    // Constructor: Takes a Date object and other fields
    Birth(Date dateOfBirth, String birthCity, String birthCountry, char sex)
    {
        setDoB(dateOfBirth);
        this.birthPlace = new String[2]; this.setBirthPlace(birthCity.trim(), birthCountry.trim()); // Use setter for validation
        this.setSex(sex); // Validate and assign sex
        this.birthCertNum = BasicInfo.NA_STRING;
    }

    // Constructor: Takes date as String and other fields
    Birth(String dateOfBirth, String birthCity, String birthCountry, char sex)
    {this(new Date(dateOfBirth), birthCity, birthCountry, sex);}

    // Getter methods
    private String[] getBirthPlaceArr() {return birthPlace;}
    String getBirthPlace()
    {
        String birthCity = (birthPlace[0] != null && !birthPlace[0].equalsIgnoreCase("N/A")) ? birthPlace[0]: "";
        String birthCountry = (birthPlace[1] != null && !birthPlace[1].equalsIgnoreCase("N/A")) ? birthPlace[1]: "";
        return birthCity + (birthCity.isEmpty() || birthCountry.isEmpty() ? "": ", ") + birthCountry;
    }
    String getBirthCity() {return birthPlace[0];}
    String getBirthCountry() {return birthPlace[1];}
    String getBirthCertNum() {return birthCertNum;}
    String getDoB() {return DoB.toString();}
    Date getDoBObj() {return DoB;}
    int getYearOfBirth() {return DoB.getYear();}
    int getMonthOfBirth() {return DoB.getMonth();}
    int getDayOfBirth() {return DoB.getDay();}
    char getSex() {return sex;}

    // Mutable birth characteristics
    double getHeightINCH() {return Math.round(heightINCH);}
    double getHeightFT() {return Math.round((heightINCH/12)*100.0)/100.0;}
    double getHeightCM() {return Math.round((heightINCH*2.54)*100.0)/100.0;}

    double getWeightPounds() {return Math.round(weightPounds);}
    double getWeightKG() {return Math.round(weightPounds*(1/2.205));}

    String getEyeColor() {return eyeColor;}
    String getHairColor() {return hairColor;}

    // Setter methods
    void setBirthPlace(String birthCity, String birthCountry)
    {
        if (birthCity == null || birthCity.trim().isEmpty() || birthCountry == null || birthCountry.trim().isEmpty())
        {throw new IllegalArgumentException("City of birth and country of birth cannot be null or empty.");}
        this.birthPlace[0] = birthCity.trim();
        this.birthPlace[1] = birthCountry.trim();
    }

    void setBirthCertNum(String birthCertNum)
    {
        if (birthCertNum == null || birthCertNum.trim().isEmpty())
        {throw new IllegalArgumentException("Birth Certificate Number cannot be null or empty.");}
        this.birthCertNum = birthCertNum.trim();
    }

    void setDoB(Date IN_DoB)
    {
        if (IN_DoB == null) {throw new IllegalArgumentException("DoBObj cannot be null.");}
        this.DoB = IN_DoB;
    }
    void setDoB(int IN_month, int IN_day, int IN_year) {DoB = new Date(IN_month, IN_day, IN_year);}
    void setDoB(String IN_date) {DoB = new Date(IN_date);}

    void setSex(char sex)
    {
        if (sex != 'M' && sex != 'F' && sex != 'N')
        {throw new IllegalArgumentException("Invalid sex format, input either M, F, or N for not available.");}
        this.sex = sex;
    }

    void setHeightINCH(int heightINCH) {this.heightINCH = heightINCH;}
    void setWeightPounds(double weightPounds) {this.weightPounds = weightPounds;}
    void setEyeColor(String eyeColor) {this.eyeColor = eyeColor;}
    void setHairColor(String hairColor) {this.hairColor = hairColor;}

    @Override
    public String toString()
    {
        return "Date of Birth: " + DoB +
                ", Birth Place: " + getBirthPlace() +
                ", Birth Certificate Number: " +
                (birthCertNum != null && !birthCertNum.equalsIgnoreCase("N/A") ? birthCertNum : "") +
                ", Sex: " + sex;
    }
}

class Name
{
    private String firstName, middleName, lastName;

    // Constructors
    Name()
    {this.firstName = ""; this.middleName = ""; this.lastName = "";}

    Name(String fullName)
    {setName(fullName);}

    Name(String firstName, String lastName)
    {this.setFirstName(firstName); this.setLastName(lastName);}

    Name(String firstName, String middleName, String lastName)
    {this.setFirstName(firstName); this.setMiddleName(middleName); this.setLastName(lastName);}

    // Setter methods with validation
    void setFirstName(String firstName)
    {
        if (firstName == null || firstName.trim().isEmpty())
        {throw new IllegalArgumentException("First name cannot empty.");}
        this.firstName = firstName.trim();
    }

    void setMiddleName(String middleName)
    {
        if (middleName != null && middleName.trim().isEmpty() == false)
        {this.middleName = middleName.trim();}
        else
        {this.middleName = "";}
    }

    void setLastName(String lastName)
    {
        if (lastName == null || lastName.trim().isEmpty())
        {throw new IllegalArgumentException("Last name cannot be empty.");}
        this.lastName = lastName.trim();
    }

    public void setName(String fullName)
    {
        if (fullName == null || fullName.trim().isEmpty())
        {throw new IllegalArgumentException("Full name cannot be null or empty.");}
        fullName = fullName.trim();

        int firstSpaceIndex = fullName.indexOf(' '); int lastSpaceIndex = fullName.lastIndexOf(' ');

        if (firstSpaceIndex == -1) // There are no spaces, so we don't have at least two words.
        {throw new IllegalArgumentException("Full name must contain at least a first name and a last name.");}
        else if (firstSpaceIndex == lastSpaceIndex) // Exactly two words: first name and last name; no middle name.
        {
            setFirstName(fullName.substring(0, firstSpaceIndex).trim());
            this.middleName = "";
            setLastName(fullName.substring(firstSpaceIndex + 1).trim());
        }
        else // More than two words: first word, then the middle name is everything between the first and last space, then the last word.
        {
            setFirstName(fullName.substring(0, firstSpaceIndex).trim());
            setMiddleName(fullName.substring(firstSpaceIndex + 1, lastSpaceIndex).trim());
            setLastName(fullName.substring(lastSpaceIndex + 1).trim());
        }
    }

    // Getter methods
    String getFirstName() {return firstName;}
    String getMiddleName() {return middleName;}
    String getLastName() {return lastName;}

    String getFullName()
    {
        if (middleName.isEmpty() == false)
        {return firstName + " " + middleName + " " + lastName;}
        else
        {return firstName + " " + lastName;}
    }

    // Print the name
    void printName() {System.out.println(this.getFullName());}

    @Override // Override the toString() method to return full name
    public String toString() {return this.getFullName();}

    @Override
    public boolean equals(Object o)
    {
        if (o == this)
        {return true;}

        if (!(o instanceof Name))
        {return false;}

        return (this.getFullName().equalsIgnoreCase(((Name) o).getFullName()));
    }
    /*  Javascript considerations
     *
     *
     */
}

class SSN
{
    final public static String INVALIDSSN = "000000000";

    private String pureSSN;

    SSN() {this.pureSSN = INVALIDSSN;}
    SSN(String pureSSN) {this.setSSN(pureSSN);}

    // Setter method
    void setSSN(String pureSSN)
    {
        if (pureSSN == null || pureSSN.trim().isEmpty())
        {throw new IllegalArgumentException("Invalid SSN format. Must be 9 digits or in XXX-XX-XXXX format.");}

        // Remove dashes
        pureSSN = pureSSN.trim().replaceAll("-", "");

        // Regex to validate it matches 9 digits
        if (pureSSN.matches("^\\d{9}$") == false)
        {throw new IllegalArgumentException("Invalid SSN format. Must be 9 digits or in XXX-XX-XXXX format.");}

        // Assign to SSNs properly after validation
        this.pureSSN = pureSSN;
    }

    // Getter method
    String getPureSSN() {return pureSSN;}
    String getFormattedSSN() {return pureSSN.substring(0, 3) + "-" + pureSSN.substring(3, 5) + "-" + pureSSN.substring(5, 9);}

    @Override
    public String toString()
    {return getPureSSN();}

    @Override
    public boolean equals(Object o)
    {
        if (o == this)
        {return true;}

        if (!(o instanceof SSN))
        {return false;}

        return (this.getPureSSN().equalsIgnoreCase(((SSN) o).getPureSSN()));
    }
    /*  Javascript considerations
    * equals() method is overridden
    *
     */
}

class Date
{
    final public static int INVALIDDATE = 0;

    // Data fields
    private int month, day, year;

    // Constructors
    Date()
    {year = INVALIDDATE; month = INVALIDDATE; day = INVALIDDATE;}

    Date(int month, int day, int year)
    {setYear(year); setMonth(month); setDay(day);}

    Date(String date)
    {setDate(date);}

    // Getter methods
    int getDay() {return day;}
    int getMonth() {return month;}
    int getYear() {return year;}

    // Setter methods with proper conditions
    private void setDay(int day)
    {
        int maxDays;
        switch (month)
        {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            maxDays = 31;
            break;
            case 4: case 6: case 9: case 11:
            maxDays = 30;
            break;
            case 2:
                if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
                {maxDays = 29;} // Leap year day
                else
                {maxDays = 28;}
                break;
            default:
                this.day = 1;
                return;
        }

        if (day < 1 || (day > maxDays))
        {this.day = 1;} // Default to 1 if day is invalid
        else
        {this.day = day;}
    }

    private void setMonth(int month)
    {
        if (month < 1 || month > 12)
        {this.month = 1;} // Default to January
        else
        {this.month = month;}
    }

    private void setYear(int year)
    {
        if (year < 0)
        {
            this.year = INVALIDDATE;
            return;
        }
        this.year = year;
    }

    void setDate(String date)
    {
        if (date == null || date.trim().isEmpty())
        {throw new IllegalArgumentException("Invalid date format. Provide a non-empty date string.");}

        date = date.trim();

        // Check if the input contains '/' or '-'
        if (date.contains("/") || date.contains("-"))
        {
            // For slash-separated dates
            if (date.contains("/"))
            {
                // Matches one or two digits for month, one or two digits for day, and one to four digits for year.
                if (!date.matches("\\d{1,2}/\\d{1,2}/\\d{1,4}"))
                {
                    throw new IllegalArgumentException("Invalid date format. Use MM/DD/YYYY format with 1-2 digit month and day, and 1-4 digit year.");
                }
                String[] parts = date.split("/");
                setMonth(Integer.parseInt(parts[0]));
                setDay(Integer.parseInt(parts[1]));
                setYear(Integer.parseInt(parts[2]));
            }
            else
            {
                // For dash-separated dates.
                if (!date.matches("\\d{1,2}-\\d{1,2}-\\d{1,4}"))
                {throw new IllegalArgumentException("Invalid date format. Use MM-DD-YYYY format with 1-2 digit month and day, and 1-4 digit year.");}

                String[] parts = date.split("-");
                setMonth(Integer.parseInt(parts[0])); setDay(Integer.parseInt(parts[1])); setYear(Integer.parseInt(parts[2]));
            }
        }
        else // No separator: expect a digit-only string of length 5 to 8.
        {
            if (!date.matches("\\d{5,8}"))
            {throw new IllegalArgumentException("Invalid date format. Expect a digit-only string of 5 to 8 digits for MMDDYYYY.");}

            // Assume the format is: first 2 digits: month; next 2 digits: day; rest: year.
            String monthPart = date.substring(0, 2);
            String dayPart = date.substring(2, 4);
            String yearPart = date.substring(4);
            setMonth(Integer.parseInt(monthPart)); setDay(Integer.parseInt(dayPart)); setYear(Integer.parseInt(yearPart));
        }
    }

    // Extra methods
    public boolean before(Date otherDate)
    {
        if (otherDate == null)
        {throw new IllegalArgumentException("The date to compare cannot be null.");}

        if (this.year < otherDate.year)
        {return true;}
        else if (this.year == otherDate.year && this.month < otherDate.month)
        {return true;}
        else if (this.year == otherDate.year && this.month == otherDate.month && this.day < otherDate.day)
        {return true;}
        else
        {return false;}
    }

    public boolean after(Date otherDate)
    {
        if (otherDate == null)
        {throw new IllegalArgumentException("The date to compare cannot be null.");}

        if (this.year > otherDate.year)
        {return true;}
        else if (this.year == otherDate.year && this.month > otherDate.month)
        {return true;}
        else if (this.year == otherDate.year && this.month == otherDate.month && this.day > otherDate.day)
        {return true;}
        else
        {return false;}
    }

    @Override // Override toString method to return month, day, and year
    public String toString()
    {return month + "/" + day + "/" + year;}

    @Override
    public boolean equals(Object o)
    {
        if (o == this)
        {return true;}

        if (!(o instanceof Date))
        {return false;}

        Date d = (Date) o;
        boolean sameMonth = (this.getMonth() == d.getMonth());
        if (sameMonth == false)
        {return false;}

        boolean sameDay = (this.getDay() == d.getDay());
        if (sameDay == false)
        {return false;}

        boolean sameYear = (this.getYear() == d.getYear());
        if (sameYear == false)
        {return false;}

        return true; // If all conditions are met properly, then return true; otherwise, the return false will stop from ever reaching this condition
    }

    /*  Javascript considerations
    * equals(Object o) method has been overridden
    * toString() method has been overridden
    *
     */
}

class Address
{
    // Data Fields
    // Region also counts as County; Chamber counts as APT, FL, etc.
    private String baseAddress, chamber, city, region, state, country, postalCode;
    private boolean isAddressDomestic;
    private static final String DOMESTIC_REGEX = "\"^(?i)(US|USA|UNITED STATES(?: OF AMERICA)?|AMERICA)$\"\n";

    public Address() {}
    public Address(String USBasicAddress)
    {setUSAddress(USBasicAddress);}
    public Address(String foreignBasicAddress, String foreignCountry)
    {setForeignAddress(foreignBasicAddress, foreignCountry);}

    // Method to set a US-style address
    public void setUSAddress(String USBasicAddress)
    {
        if (USBasicAddress == null || USBasicAddress.trim().isEmpty())
        {throw new IllegalArgumentException("Address cannot be null or empty.");}

        // Split the input string by commas.
        String[] baseAddressFields = USBasicAddress.split(",");
        if (baseAddressFields.length < 3)
        {throw new IllegalArgumentException("Invalid address format. Expected: BaseAddress, City, State-PostalCode.");}

        // Parse BaseAddress and City.
        setBaseAddress(baseAddressFields[0].trim());
        setCity(baseAddressFields[1].trim());

        // Parse State and PostalCode.
        String[] statePostal;
        if (baseAddressFields[2].contains("-"))
        {statePostal = baseAddressFields[2].trim().split("-");}
        else
        {statePostal = baseAddressFields[2].trim().split(" ");}
        if (statePostal.length != 2)
        {throw new IllegalArgumentException("Invalid address format. State and PostalCode must be separated by '-' or space.");}

        setState(statePostal[0].trim());
        setPostalCode(statePostal[1].trim());
        setCountry("US"); isAddressDomestic = true;
    }

    // Method to set a foreign-style address
    public void setForeignAddress(String foreignBasicAddress, String foreignCountry)
    {
        if (foreignBasicAddress == null || foreignBasicAddress.trim().isEmpty())
        {throw new IllegalArgumentException("Foreign address cannot be null or empty.");}

        // Split the input string by commas.
        String[] baseAddressFields = foreignBasicAddress.split(",");
        if (baseAddressFields.length < 2)
        {throw new IllegalArgumentException("Invalid address format. Foreign address format expected: BaseAddress, City-PostalCode.");}

        // Assign BaseAddress.
        setBaseAddress(baseAddressFields[0].trim());

        // Parse City and PostalCode.
        String[] cityPostal;
        if (baseAddressFields[1].contains("-"))
        {cityPostal = baseAddressFields[1].trim().split("-");}
        else
        {cityPostal = baseAddressFields[1].trim().split(" ");}
        if (cityPostal.length != 2)
        {throw new IllegalArgumentException("Invalid foreign address format. City and Postal Code must be separated by '-' or space.");}

        setCity(cityPostal[0].trim());
        setPostalCode(cityPostal[1].trim());
        setCountry(foreignCountry); isAddressDomestic = false;
    }

    public void setBaseAddress(String baseAddress)
    {
        if (baseAddress == null || baseAddress.trim().isEmpty())
        {throw new IllegalArgumentException("Base address cannot be null or empty.");}
        this.baseAddress = baseAddress.trim();
    }
    public void setChamber(String chamber)
    {
        // Basic validation: remove periods and check against allowed acronyms.
        String chamberTrimmed = chamber.trim();
        String chamberCleaned = chamberTrimmed.replace(".", "").toUpperCase();
        if (!(chamberCleaned.startsWith("APT") || chamberCleaned.startsWith("FL") || chamberCleaned.startsWith("FLR") ||
                chamberCleaned.startsWith("STE") || chamberCleaned.startsWith("WO") || chamberCleaned.startsWith("VILL")))
        {
            throw new IllegalArgumentException("Invalid chamber format. Viable acronyms are APT, FL, STE, WO, and VILL.");
        }
        this.chamber = chamberTrimmed;
    }
    public void setCity(String city)
    {
        if (city == null || city.trim().isEmpty())
        {throw new IllegalArgumentException("City cannot be null or empty.");}
        this.city = city.trim();
    }
    public void setCountry(String country)
    {
        if (country == null || country.trim().isEmpty())
        {throw new IllegalArgumentException("Country cannot be null or empty.");}
        this.country = country.trim();

        if (this.country.matches(DOMESTIC_REGEX))
        {
            isAddressDomestic = true;
        }
        else
        {isAddressDomestic = false;}
    }

    // Standard Getters and Setters for other fields.
    public String getBaseAddress() {return baseAddress;}
    public String getChamber() {return chamber;}
    public String getCity() {return city;}
    public String getRegion() {return region;}
    public String getState() {return state;}
    public String getPostalCode() {return postalCode;}
    public String getCountry() {return country;}
    public boolean getIsAddressDomestic() {return isAddressDomestic;}

    public void setRegion(String region) {this.region = region.trim();}
    public void setState(String state) {this.state = state.trim();}
    public void setPostalCode(String postalCode) {this.postalCode = postalCode.trim();}

    @Override
    public String toString()
    {
        return baseAddress +
                ((chamber != null && !chamber.trim().isEmpty() && !chamber.equalsIgnoreCase(BasicInfo.NA_STRING)) ? " " + chamber : "") +
                ", " + city +
                ((region != null && !region.trim().isEmpty() && !region.equalsIgnoreCase(BasicInfo.NA_STRING)) ? ", " + region : "") +
                ((state != null && !state.trim().isEmpty() && !state.equalsIgnoreCase(BasicInfo.NA_STRING)) ? ", " + state : "") +
                ((postalCode != null && !postalCode.trim().isEmpty() && !postalCode.equalsIgnoreCase(BasicInfo.NA_STRING)) ? ", " + postalCode : "") +
                ", " + country;
    }

    @Override
    public boolean equals(Object o)
    {
        if (o == this)
        {return true;}

        if (!(o instanceof Address))
        {return false;}

        Address a = (Address) o;
        boolean sameBaseAddress = (this.getBaseAddress().equalsIgnoreCase(a.getBaseAddress()));
        if (sameBaseAddress == false)
        {return false;}

        boolean sameCity = (this.getCity().equalsIgnoreCase(a.getCity()));
        if (sameCity == false)
        {return false;}

        if ((this.state != null || !this.getState().isEmpty()) && (a.state != null || !a.getState().isEmpty()))
        {
            boolean sameState = (this.getState().equalsIgnoreCase(a.getState()));
            if (sameState == false)
            {return false;}
        }

        boolean samePostalCode = (this.getPostalCode().equalsIgnoreCase(a.getPostalCode()));
        if (samePostalCode == false)
        {return false;}

        return true;
    }

    /*  Javascript considerations
     * equals(Object o) method has been overridden
     * toString() method has been overridden
     *
     */
}

class ContactInformation
{
    private String email, contactNumber;
    private int contactNumberCountryPrefix = 0;

    ContactInformation()
    {email = BasicInfo.NA_STRING; contactNumberCountryPrefix = 1; contactNumber = BasicInfo.NA_STRING;}

    ContactInformation(String email, String contactNumber)  // Constructor 1: Takes email and contact number.
    {
        setEmail(email);

        if (contactNumber != null && (contactNumber.trim()).isEmpty() == false && contactNumber.charAt(0) == '+')
        {setFullContactNumber(contactNumber);}
        else
        {contactNumberCountryPrefix = 1; setContactNumber(contactNumber);}
    }
    ContactInformation(String email, int contactNumberCountryPrefix, String contactNumber)
    {
        setEmail(email);

        // If the provided contact number starts with '+', let setFullContactNumber handle it.
        if (contactNumber != null && (contactNumber.trim()).isEmpty() == false && contactNumber.charAt(0) == '+')
        {setFullContactNumber(contactNumber);}
        else
        {
            String cleanedNumber = cleanNumber(contactNumber); // Get the string version of the prefix.

            String prefixString = String.valueOf(contactNumberCountryPrefix);

            if (cleanedNumber.startsWith(prefixString)) // If the cleaned number already starts with the prefix, remove it.
            {cleanedNumber = fixPrefix(cleanedNumber, prefixString);}

            setContactNumberCountryPrefix(contactNumberCountryPrefix);  // Validate and assign the prefix.

            this.contactNumber = cleanedNumber; // Assign the cleaned local number.
        }
    }

    void setEmail(String email)
    {
        if (email == null || (email.trim()).isEmpty() == true)
        {throw new IllegalArgumentException("Invalid email, it cannot be empty.");}

        String trimmedEmail = email.trim();
        int atIndex = trimmedEmail.indexOf('@');
        if (atIndex == -1)
        {throw new IllegalArgumentException("Invalid email: missing '@' symbol.");}

        int dotIndex = trimmedEmail.lastIndexOf('.', atIndex); // Check for a '.' immediately after the '@' symbol
        if (dotIndex == -1)
        {throw new IllegalArgumentException("Invalid email: missing '.'.");}
        else if (dotIndex < atIndex)
        {throw new IllegalArgumentException("Invalid email: missing '.' after '@'.");}

        this.email = trimmedEmail;
    }
    void setContactNumber(String contactNumber)
    {
        if (contactNumber == null || (cleanNumber(contactNumber)).isEmpty() == true)   // Set both fields to empty if no input is provided.
        {this.contactNumber = BasicInfo.NA_STRING; return;}

        if (contactNumber.charAt(0) == '+')
        {throw new IllegalArgumentException("Contact number includes '+' at start, this function does not support this.");}

        this.contactNumber = cleanNumber(contactNumber);
    }
    void setFullContactNumber(String fullContactNumber)
    {
        if (fullContactNumber == null || (cleanNumber(fullContactNumber)).isEmpty() == true) // Set both fields to empty if no input is provided.
        {this.contactNumber = BasicInfo.NA_STRING; this.contactNumberCountryPrefix = 0; return;}

        if (fullContactNumber.charAt(0) == '+')
        {
            int spaceIndex = fullContactNumber.indexOf(' '); // Ensure that a space exists to separate the country code.
            if (spaceIndex == -1)
            {throw new IllegalArgumentException("Contact number includes '+' but no space to separate country code.");}

            String countryCodePart = fullContactNumber.substring(1, spaceIndex); // Extract potential country code
            setContactNumberCountryPrefix(countryCodePart);

            String remaining = fullContactNumber.substring(spaceIndex + 1); // Process the remaining part of the contact number and remove any non-digit characters from that substring
            this.contactNumber = cleanNumber(remaining);
        }
        else
        {
            // If there is no country code indicated, do nothing to the prefix.
            this.contactNumber = cleanNumber(fullContactNumber); // Clean the input by removing all non-digit characters.
        }
    }
    void setContactNumberCountryPrefix(String contactNumberCountryPrefixString)
    {
        if (contactNumberCountryPrefixString == null || contactNumberCountryPrefixString.matches("\\d+") == false) // Validate that the extracted country code is only digits.
        {throw new IllegalArgumentException("Country code must contain only digits.");}
        if (contactNumberCountryPrefixString.length() > 3) // Validate the length of the country code candidate:
        {throw new IllegalArgumentException("Country code length cannot exceed 3 digits.");}

        if (contactNumber != null && contactNumber.isEmpty() == false && contactNumber.startsWith(contactNumberCountryPrefixString))
        {this.contactNumber = fixPrefix(contactNumber, contactNumberCountryPrefixString);}

        setContactNumberCountryPrefix(Integer.parseInt(contactNumberCountryPrefixString));
    }
    private void setContactNumberCountryPrefix(int contactNumberCountryPrefix)
    {
        if (contactNumberCountryPrefix == 0 || contactNumberCountryPrefix > 999)
        {throw new IllegalArgumentException("Country code must be non-zero and can contain only up to three digits.");}
        else
        {this.contactNumberCountryPrefix = contactNumberCountryPrefix;}
    }
    private String cleanNumber(String number)
    {return number.replaceAll("\\D", "");}
    private String fixPrefix(String number, String prefix)
    {
        if (number.startsWith(prefix))
        {return number.substring(prefix.length());}
        else
        {return number;}
    }

    // Getter and Setter for contactNumber
    String getEmail() {return email;}
    int getContactNumberCountryPrefix() {return contactNumberCountryPrefix;}
    String getContactNumber() {return contactNumber;}

    // toString method that formats the output according to available information.
    @Override
    public String toString()
    {
        String outputEmail;
        if (email == null || email.isEmpty())
        {outputEmail = BasicInfo.NA_STRING;}
        else
        {outputEmail = email;}

        String outputContact;
        if (contactNumber == null || contactNumber.isEmpty())
        {outputContact = BasicInfo.NA_STRING;}
        else if (contactNumberCountryPrefix != 0)
        {outputContact = "+" + contactNumberCountryPrefix + " " + contactNumber;}
        else
        {outputContact = contactNumber;}

        return "Email: " + outputEmail + ", Contact Number: " + outputContact;
    }

    @Override
    public boolean equals(Object o)
    {
        if (o == this)
        {return true;}

        if (!(o instanceof ContactInformation))
        {return false;}

        ContactInformation co = (ContactInformation) o;
        boolean sameContactNumber = (this.getContactNumber()).equalsIgnoreCase(co.getContactNumber());
        if (sameContactNumber == false)
        {return false;}

        boolean sameEmailAddress = (this.getEmail()).equalsIgnoreCase(co.getEmail());
        if (sameEmailAddress == false)
        {return false;}

        return true;
    }

    /*  Javascript considerations
     * toString() method has been overridden
     * equals() method has been overridden
     * setContactNumberCountryPrefix(int) is overloaded
     *
     */
}
