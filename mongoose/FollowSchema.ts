/**
 * @file Implements mongoose schema for follow
 */
import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
* @typedef Follow represents user followed by another user entity.
* @property {ObjectId} userFollowed user followed by another user.
* @property {ObjectId} userFollowing  user following the another user.
*/
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});

export default FollowSchema;