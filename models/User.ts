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
    username: string = '';
    password: string = '';
    firstName: string | null = null;
    lastName: string | null = null;
    email: string = '';
    profilePhoto: string | null = null;
    headerImage: string | null = null;
    accountType: AccountType = AccountType.Personal;
    maritalStatus: MaritalStatus = MaritalStatus.Single;
    biography: string | null = null;
    dateOfBirth: Date | null = null;
    joined: Date = new Date();
    location: Location | null = null;
};
