import mongoose from "mongoose";
import User from "../models/User";
import Tuit from "../models/Tuit";
const TuitSchema = new mongoose.Schema<Tuit>({

    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: User, default:null},

}, {collection: 'tuits'});
export default TuitSchema;