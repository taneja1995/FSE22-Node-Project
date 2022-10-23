import mongoose from "mongoose";
import {Schema} from "mongoose";
import Like from "../models/Like";

const LikeSchema= new mongoose.Schema<Like, any, any>({
    tuit: {type: Schema.Types.ObjectId, ref:"TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection:'likes'});

export  default LikeSchema;