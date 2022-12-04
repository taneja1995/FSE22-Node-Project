/**
 * @file Implements mongoose schema for likes
 */
import mongoose from "mongoose";
import {Schema} from "mongoose";
import Dislike from "../models/Dislike";

/**
 * @typedef  Like represents the tuit liked by a user
 * @property {ObjectId} tuit tuit that is liked
 * @property {ObjectId} likedBy represents user who likes the tuit.
 */
const DislikeSchema= new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref:"TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection:'dislikes'});

export  default DislikeSchema;