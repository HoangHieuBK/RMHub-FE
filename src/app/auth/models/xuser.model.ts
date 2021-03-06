export class UserForm {
    public client_id: any;
    public client_secret: any;
    public grant_type: any;
    public scope: any;
    public username: string;
    public password: string;
    public userID: number;
    public chiefID: number;
    public primaryUserID: number;
    public permissionGroupID: number;
    public grantPermGroupID: number;
    public xProfileID: number;
    public modulID: number;
    public sachbearbeiterID: number;
    public mitarbeiterNr: string;
    public logonName: string;
    public passwordHash: string;
    public firstName: string;
    public lastName: string;
    public shortName: string;
    public isLocked: boolean;
    public isUserAdmin: boolean;
    public isUserBIAGAdmin: boolean;
    public isMandatsTraeger: boolean;
    public genderCode: number;
    public geburtstag: Date;
    public languageCode: number;
    public phone: string;
    public phoneMobile: string;
    public phoneOffice: string;
    public phonenumberern: string;
    public phonePrivat: string;
    public fax: string;
    public eMail: string;
    public userProfileCode: number;
    public funktion: string;
    public roleTitleCode: number;
    public qualificationTitleCode: number;
    public bemerkungen: string;
    public text1: string;
    public text2: string;
    public jobPercentage: number;
    public hoursPerYearForCaseMgmt: number;
    public enumberrittsdatum: Date;
    public austrittsdatum: Date;
    public lohntypCode: number;
    public kostentraeger: number;
    public weitereKostentraeger: string;
    public kostenart: number;
    public keinBDEExport: boolean;
    public migHerkunft: string;
    public migMAKuerzel: string;
    public migUserFix: boolean;
    public visdat36Area: string;
    public visdat36SourceFile: string;
    public visdat36ID: string;
    public visdat36Name: string;
    public verID: number;
    public creator: string;
    public created: Date;
    public modifier: string;
    public modified: Date;
    public xUserTS: boolean;
    public orgUnitID: number;
    public orgUnitID_Parent: number;
    public rechtsdienstUserID: number;
    public orgChiefID: number;
    public lang: number;

    constructor(data?: IUserForm) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IUserForm {
    client_id: any;
    client_secret: any;
    grant_type: any;
    scope: any;
    username: string;
    password: string;
    userID: number;
    chiefID: number;
    primaryUserID: number;
    permissionGroupID: number;
    grantPermGroupID: number;
    xProfileID: number;
    modulID: number;
    sachbearbeiterID: number;
    mitarbeiterNr: string;
    logonName: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    shortName: string;
    isLocked: boolean;
    isUserAdmin: boolean;
    isUserBIAGAdmin: boolean;
    isMandatsTraeger: boolean;
    genderCode: number;
    geburtstag: Date;
    languageCode: number;
    phone: string;
    phoneMobile: string;
    phoneOffice: string;
    phonenumberern: string;
    phonePrivat: string;
    fax: string;
    eMail: string;
    userProfileCode: number;
    funktion: string;
    roleTitleCode: number;
    qualificationTitleCode: number;
    bemerkungen: string;
    text1: string;
    text2: string;
    jobPercentage: number;
    hoursPerYearForCaseMgmt: number;
    enumberrittsdatum: Date;
    austrittsdatum: Date;
    lohntypCode: number;
    kostentraeger: number;
    weitereKostentraeger: string;
    kostenart: number;
    keinBDEExport: boolean;
    migHerkunft: string;
    migMAKuerzel: string;
    migUserFix: boolean;
    visdat36Area: string;
    visdat36SourceFile: string;
    visdat36ID: string;
    visdat36Name: string;
    verID: number;
    creator: string;
    created: Date;
    modifier: string;
    modified: Date;
    xUserTS: boolean;
    orgUnitID: number;
    orgUnitID_Parent: number;
    rechtsdienstUserID: number;
    orgChiefID: number;
    lang: number;
}
