/**
 * @file Implements mongoose schema for dislikes
 */
import mongoose from "mongoose";
import {Schema} from "mongoose";
import Dislike from "../models/Dislike";

/**
 * @typedef  Dislike represents the tuit disliked by a user
 * @property {ObjectId} tuit tuit that is disliked
 * @property {ObjectId} dislikedBy represents user who dislikes the tuit.
 */
const DislikeSchema= new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref:"TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection:'dislikes'});

export  default DislikeSchema;