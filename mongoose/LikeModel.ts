import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";
import Like from "../models/Like";


const LikeModel= mongoose.model("LikeModel", LikeSchema);
export  default LikeModel;