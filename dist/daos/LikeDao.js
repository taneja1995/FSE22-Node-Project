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
const LikeModel_1 = __importDefault(require("../mongoose/LikeModel"));
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
class LikeDao {
    constructor() {
        /**
         * Retrieves all the users that like a tuit.
         * @param tid tuit that's liked by all the users.
         * @returns {Promise} of array Like type.
         */
        this.findAllUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ tuit: tid })
                .populate("likedBy")
                .exec();
        });
        /**
         * Creates a like collection when a user likes a tuit.
         * @param tid tuit that's being liked.
         * @param uid user that likes the tuit.
         */
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.create({ tuit: tid, likedBy: uid }); });
        /**
         * Deletes the like collection when a user unlikes a tuit.
         * @param uid user that unlikes.
         * @param tid tuit that gets unliked.
         */
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.deleteOne({ likedBy: uid, tuit: tid }); });
        /**
         * Fetches the like collection for a user that likes a tuit.
         * @param uid user that likes.
         * @param tid tuit that gets liked.
         */
        this.findUserLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return yield LikeModel_1.default.findOne({ tuit: tid, likedBy: uid }); });
        /**
         * Fetches the count of how many times tuit gets liked..
         * @param tid tuit that gets liked.
         */
        this.countHowManyLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.count({ tuit: tid }); });
    }
    /**
     * Retrieves all the tuits that are liked by a user.
     * @param uid user that likes all the tuit.
     * @returns {Promise} of array Like type.
     */
    findAllTuitsLikedByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield LikeModel_1.default
                .find({ likedBy: uid })
                .populate({ path: "tuit", populate: {
                    path: "postedBy"
                }
            }).exec();
        });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} messageDao Private single instance of LikeDao
 */
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
//# sourceMappingURL=LikeDao.js.map