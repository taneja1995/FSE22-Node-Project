import Bookmark from "../models/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDao{

    userBookmarksTuit (uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit (uid: string, tid:string): Promise<any>;
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;

};