/**
 * @file Bookmark data model
 */
import Tuit from "./Tuit";
import User from "./User";

/**
 * @typedef Bookmark represents the tuit bookmarked by another user.
 * @property {Tuit} tuit bookmarked
 * @property {User} bookmarkedBy user who bookmarks a tuit.
 */
export default interface Bookmark {
    tuit: Tuit,
    bookmarkedBy: User;
};