import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import Follow from "../models/Follow";

const FollowSchema = new mongoose.Schema<Follow, any, any>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});

export default FollowSchema;