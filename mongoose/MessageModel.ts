import mongoose from "mongoose";
import MessageSchema from "./MessgeSchema";

const MessageModel= mongoose.model("MessageModel", MessageSchema);
export  default MessageModel;