/**
 * @file Implements mongoose schema for likes
 */
import mongoose from "mongoose";
import {Schema} from "mongoose";
import Like from "../models/Like";

/**
 * @typedef  Like represents the tuit liked by a user
 * @property {ObjectId} tuit tuit that is liked
 * @property {ObjectId} likedBy represents user who likes the tuit.
 */
const LikeSchema= new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref:"TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection:'likes'});

export  default LikeSchema;