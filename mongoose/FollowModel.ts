/**
 * @file Implements mongoose model to CRUD
 * documents in the follows collection
 */
import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";
import Follow from "../models/Follow";

const FollowModel= mongoose.model("FollowModel",FollowSchema);
export default FollowModel;