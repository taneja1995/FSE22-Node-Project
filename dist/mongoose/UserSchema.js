"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for users
 */
const mongoose_1 = __importDefault(require("mongoose"));
/**
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
 * @property {Date} dateOfBirth
 * @property {Date} joined
 * @property {Number} location
 */
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {
        type: String, default: 'PERSONAL',
        enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']
    },
    maritalStatus: {
        type: String, default: 'SINGLE',
        enum: ['MARRIED', 'SINGLE', 'WIDOWED']
    },
    biography: String,
    dateOfBirth: Date,
    joined: { type: Date, default: Date.now },
    location: {
        latitude: { type: Number, default: 0.0 },
        longitude: { type: Number, default: 0.0 },
    }
}, { collection: 'users' });
exports.default = UserSchema;
//# sourceMappingURL=UserSchema.js.map