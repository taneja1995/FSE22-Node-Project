/**
 * @file User data model
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @typedef User Represents an active user in tuiter.
 * @typedef User represents an active user in the Tuiter app.
 * @property {string} username
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} profilePhoto
 * @property {string} headerImage
 * @property {string} accountType
 * @property {string} maritalStatus
 * @property {string} biography
 * @property {Date} dateOfBirth user birth date
 * @property {Date} joined when the user joined on tuiter.
 * @property {Number} location user's location
 */


export default class User {
    private username: string = '';
    password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}
