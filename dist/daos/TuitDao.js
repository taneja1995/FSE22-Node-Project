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
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
class TuitDao {
    constructor() {
        /**
         * Retrieves the tuit by the user from the tuits collection.
         * @param uid user id that needs to be retrieved.
         * @returns {Promise} of array type Tuit.
         */
        this.findTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default
                .find({ postedBy: uid })
                .populate('postedBy', 'username');
        });
    }
    /**
     * Creates Tuit in the collection.
     * @param tuit
     * @returns {Promise} of type Tuit.
     */
    createTuit(uid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid }));
        });
    }
    /**
     * Deletes the tuit from the collection.
     * @param tid tuit id that needs to be deleted.
     * @returns {Promise}
     */
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.deleteOne({ _id: tid });
        });
    }
    /**
     * Retrieves all the tuits from the tuit collection.
     * @returns {Promise} of array type Tuit.
     */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.find();
        });
    }
    /**
     * Retrieves the tuit by its id from the tuits collection.
     * @param tid tuit id that needs to be retrieved.
     * @returns {Promise} of type any.
     */
    findTuitById(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.findById(tid);
        });
    }
    /**
     * @param tid the tuit that needs to be updated
     * @param tuit the tuit body with updated content
     * @returns {Promise} of type any.
     */
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return yield TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Creates a singleton Dao Instance
 * @returns tuitDao
 */
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
//# sourceMappingURL=TuitDao.js.map