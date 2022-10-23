/**
 * @file Implements mongoose schema for tuit
 */
import mongoose from "mongoose";
import Tuit from "../models/Tuit";
import {Schema} from "mongoose";

/**
 * @typedef Tuit represents the post sent by the user.
 * @property {string} tuit
 * @property {Date} postedOn date when the tuit is posted.
 * @property {ObjectId} postedBy user who posts the tuit.
 */
const TuitSchema = new mongoose.Schema<Tuit>({

    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref:"UserModel"},

}, {collection: 'tuits'});
export default TuitSchema;