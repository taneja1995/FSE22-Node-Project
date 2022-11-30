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
const FollowModel_1 = __importDefault(require("../mongoose/FollowModel"));
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
class FollowDao {
    constructor() {
        /**
         * Retrieves all the users that are followed by another user.
         * @param uid user that follows all other users.
         * @returns {Promise} of array Follow type.
         */
        this.findAllUsersFollowedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ userFollowed: uid })
                .populate("userFollowing")
                .exec();
        });
        /**
         * Retrieves all the users a user is following.
         * @param uid user that is being followed.
         * @returns {Promise} of array Follow type.
         */
        this.findAllUsersFollowingUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default.find({ userFollowing: uid })
                .populate("userFollowed")
                .exec();
        });
        /**
         * Creates a follow collection when one user follows another user.
         * @param uid1 user 1
         * @param uid2 user 2
         * @returns {Promise} of type any.
         */
        this.userFollowsAnotherUser = (uid1, uid2) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ userFollowed: uid1, userFollowing: uid2 }); });
        /**
         * Deletes a follow collection when one user unfollows another user.
         * @param uid1 user 1
         * @param uid2 user 2
         * @returns {Promise} of type any.
         */
        this.userUnfollowsAnotherUser = (uid1, uid2) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ userFollowed: uid1, userFollowing: uid2 }); });
    }
    ;
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
//# sourceMappingURL=FollowDao.js.map