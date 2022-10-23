/**
 * @file Like data model
 */
import User from "./User";
import Tuit from "./Tuit";

/**
 * @typedef Like represents the tuit liked by the user.
 * @property {Tuit} tuit liked by user.
 * @property {User} likedBy user who likes the tuit.
 */
export default interface Like{

     tuit:Tuit,
     likedBy: User,
};