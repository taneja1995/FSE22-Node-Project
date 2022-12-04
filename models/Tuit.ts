/**
 * @file Declares Tuit data type
 */
import mongoose from "mongoose";
import Stats from "./Stats";

/**
 * @typedef Tuit Represents a post made by the user.
 * @property {Tuit} tuit
 * @property {User} postedBy User
 * @property {Date} postedOn when the tuit was posted
 */
export default class Tuit {
     private tuit: string = '';
     private postedOn: Date = new Date();
     private postedBy:  {type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
     }
    stats:Stats
}
