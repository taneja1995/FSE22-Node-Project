/**
 * @file Follow data model
 */
import User from "./User";

/**
 * @typedef Follow represents the user followed/following another user/
 * @property {User} userFollowed user who is followed by another user
 * @property {User} userFollowing user who is following another user.
 */
export default interface Follow{
    userFollowed:User,
    userFollowing:User,
};