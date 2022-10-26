/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";
import TuitModel from "../mongoose/TuitModel";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null =null;

    /**
     * Creates a singleton Dao Instance
     * @returns tuitDao
     */
    public static getInstance = (): TuitDao =>{
        if(TuitDao.tuitDao === null){
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Creates Tuit in the collection.
     * @param tuit
     * @returns {Promise} of type Tuit.
     */
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

    /**
     * Deletes the tuit from the collection.
     * @param tid tuit id that needs to be deleted.
     * @returns {Promise}
     */
     async deleteTuit(tid: string): Promise<any> {
         return await TuitModel.deleteOne({_id: tid});
    }

    /**
     * Retrieves all the tuits from the tuit collection.
     * @returns {Promise} of array type Tuit.
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Retrieves the tuit by its id from the tuits collection.
     * @param tid tuit id that needs to be retrieved.
     * @returns {Promise} of type any.
     */
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }

    /**
     * Retrieves the tuit by the user from the tuits collection.
     * @param uid user id that needs to be retrieved.
     * @returns {Promise} of array type Tuit.
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Updates the tuit from the tuit collection.
     * @param tid the tuit that needs to be updated
     * @param tuit the tuit body with updated content
     * @returns {Promise} of type any.
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        // @ts-ignore
        return await TuitModel.updateOne({_id:tid}, {$set: tuit})
    }

}