/**
 * @file Implements mongoose schema for bookmark
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";

/**
 * @typedef Bookmark represents tuit bookmarked by a user entity.
 * @property {ObjectId} bookmarkedBy User who bookmarks the tuit
 * @property {ObjectId} tuit  tuit that gets bookmarked.
 */
const BookmarkSchema = new mongoose.Schema<Bookmark, any, any>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});

export default BookmarkSchema

