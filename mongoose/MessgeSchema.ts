import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import Message from "../models/Message";

const MessageSchema = new mongoose.Schema<Message, any, any>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection:'messages'});

export default MessageSchema;


