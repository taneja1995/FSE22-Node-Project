/**
 * @file Implements mongoose schema for message
 */
import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @typedef Message represents the message sent from one user to other user.
 * @property {string} message
 * @property {ObjectId} to user to whom message is sent.
 * @property {ObjectId} from user from whom message is sent.
 * @property {Date} sentOn represents the date when message is sent/received.
 */
const MessageSchema = new mongoose.Schema<Message, any, any>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection:'messages'});

export default MessageSchema;


