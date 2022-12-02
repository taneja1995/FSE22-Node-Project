"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file User data model
 */
const AccountType_1 = __importDefault(require("./AccountType"));
const MaritalStatus_1 = __importDefault(require("./MaritalStatus"));
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
class User {
    constructor() {
        this.username = '';
        this.password = '';
        this.firstName = null;
        this.lastName = null;
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.accountType = AccountType_1.default.Personal;
        this.maritalStatus = MaritalStatus_1.default.Single;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        this.location = null;
    }
}
exports.default = User;
;
//# sourceMappingURL=User.js.map