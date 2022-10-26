/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDao";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmark
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * @class BookmarkDao Implements Data Access Object managing data storage
     * of Bookmark
     * @property {bookmarkDao} followDao Private single instance of BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    };

    /**
     * Creates a bookmark from the collection when user bookmarks a tuit.
     * @param uid user that bookmarks.
     * @param tid tuit that is being bookmarked.
     * @returns {Promise} of type Bookmark.
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedBy: uid, tuit: tid});


    /**
     * Deletes a bookmark from the collection when user unbookmarks a tuit.
     * @param uid user
     * @param tid tuit
     * @returns{Promise} of type any.
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy: uid, tuit: tid});


    /**
     * Retrieves all the tuits that is being bookmarked by the user.
     * @param uid user
     * @return{Promise} of array type Bookmark.
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();
}
;
