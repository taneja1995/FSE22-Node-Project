"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkModel_1 = __importDefault(require("../mongoose/BookmarkModel"));
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmark
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() {
        /**
         * Creates a bookmark from the collection when user bookmarks a tuit.
         * @param uid user that bookmarks.
         * @param tid tuit that is being bookmarked.
         * @returns {Promise} of type Bookmark.
         */
        this.userBookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.create({ bookmarkedBy: uid, tuit: tid }); });
        /**
         * Deletes a bookmark from the collection when user unbookmarks a tuit.
         * @param uid user
         * @param tid tuit
         * @returns{Promise} of type any.
         */
        this.userUnbookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteOne({ bookmarkedBy: uid, tuit: tid }); });
    }
    ;
    /**
     * Retrieves all the tuits that is being bookmarked by the user.
     * @param uid user
     * @return{Promise} of array type Bookmark.
     */
    findAllTuitsBookmarkedByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default.find({ bookmarkedBy: uid })
                .populate('bookmarkedTuit', 'tuit')
                .exec();
        });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmark
 * @property {bookmarkDao} followDao Private single instance of BookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
;
//# sourceMappingURL=BookmarkDao.js.map