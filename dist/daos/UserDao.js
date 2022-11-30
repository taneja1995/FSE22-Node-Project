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
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
class UserDao {
    constructor() {
        this.deleteUsersByUsername = (username) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.deleteMany({ username }); });
        this.findUserByUsername = (username) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.findOne({ username: username }); });
    }
    /**
     * Retrieves all the users from the users collection.
     * @returns {Promise} of array type User.
     */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.find();
        });
    }
    /**
     * Retrieves the user by its id from the users collection.
     * @param uid user id that needs to be retrieved.
     * @returns {Promise} of type any.
     */
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findById(uid);
        });
    }
    /**
     * Creates User in the collection.
     * @param user
     * @returns {Promise} of type User.
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return UserModel_1.default.create(user);
        });
    }
    /**
     * Deletes the user from the collection.
     * @param uid user id that needs to be deleted.
     * @returns {Promise}
     */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    /**
     * Updates the user in the collection.
     * @param uid user id that needs to be updated.
     * @param user User
     * @returns {Promise} of type User.
     */
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return yield UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
    }
}
exports.default = UserDao;
UserDao.userDao = null;
/**
 * Creates a singleton Dao Instance
 * @returns userDao
 */
UserDao.getInstance = () => {
    if (UserDao.userDao === null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
//# sourceMappingURL=UserDao.js.map