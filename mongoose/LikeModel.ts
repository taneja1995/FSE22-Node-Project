/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";
import Like from "../models/Like";

const LikeModel= mongoose.model<Like>("LikeModel", LikeSchema);
export  default LikeModel;