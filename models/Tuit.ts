/**
 * @file Declares Tuit data type
 */
import User from "./User";

/**
 * @typedef Tuit Represents a post made by the user.
 * @property {Tuit} tuit
 * @property {User} postedBy User
 * @property {Date} postedOn when the tuit was posted
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}
