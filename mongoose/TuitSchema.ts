import mongoose from "mongoose";
import Tuit from "../models/Tuit";
import {Schema} from "mongoose";
const TuitSchema = new mongoose.Schema<Tuit>({

    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref:"UserModel"},

}, {collection: 'tuits'});
export default TuitSchema;