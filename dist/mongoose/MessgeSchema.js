"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for message
 */
const mongoose = __importStar(require("mongoose"));
/**
 * @typedef Message represents the message sent from one user to other user.
 * @property {string} message
 * @property {ObjectId} to user to whom message is sent.
 * @property {ObjectId} from user from whom message is sent.
 * @property {Date} sentOn represents the date when message is sent/received.
 */
const MessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    to: { type: String, required: true },
    from: { type: String, required: true },
    sentOn: { type: Date, default: Date.now }
}, { collection: 'messages' });
exports.default = MessageSchema;
//# sourceMappingURL=MessgeSchema.js.map