/**
 * @file Like data model
 */
import User from "./User";
import Tuit from "./Tuit";

/**
 * @typedef Dislike represents the tuit liked by the user.
 * @property {Tuit} tuit liked by user.
 * @property {User} likedBy user who likes the tuit.
 */
export default interface Dislike{

    tuit:Tuit,
    dislikedBy: User,
};