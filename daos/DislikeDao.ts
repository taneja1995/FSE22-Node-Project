/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */

import DislikeDaoI from "../interfaces/DislikeDao";
import DislikeModel from "../mongoose/DislikeModel";
import Dislike from "../models/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI{

    private static dislikeDao: DislikeDao | null = null;

    /**
     * @class DislikeDao Implements Data Access Object managing data storage
     * of Dislikes
     * @property {DislikeDao} messageDao Private single instance of DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Retrieves all the users that dislike a tuit.
     * @param tid tuit that's disliked by all the users.
     * @returns {Promise} of array Dislike type.
     */
    findAllUsersThatDislikedTuit =
        async (tid: string): Promise<any> =>
            DislikeModel
                .find({tuit: tid})
                .populate("dislikedBy")
                .exec();

    /**
     * Retrieves all the tuits that are disliked by a user.
     * @param uid user that dislikes all the tuit.
     * @returns {Promise} of array Dislike type.
     */
    findAllTuitsDislikedByUser =
        async (uid: string): Promise<any> =>
            DislikeModel
                .find({dislikedBy: uid})
                .populate({path: "tuit", populate:{
                    path:"postedBy"
                    }})
                .exec();

    /**
     * Creates a dislike collection when a user dislikes a tuit.
     * @param tid tuit that's being disliked.
     * @param uid user that dislikes the tuit.
     */
    userDislikesTuit=
        async (uid: string, tid: string): Promise<any> =>
            DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Deletes the dislike collection when a user undislikes a tuit.
     * @param uid user that undislikes.
     * @param tid tuit that gets undislikes.
     */
    userUnDislikesTuit=
        async (uid: string, tid: string): Promise<any> =>
            DislikeModel.deleteOne({dislikedBy: uid, tuit: tid});

    /**
     * Fetches the dislike collection for a user that dislikes a tuit.
     * @param uid user that dislikes.
     * @param tid tuit that gets disliked.
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit:tid});


    /**
     * Fetches the count of how many times tuit gets disliked.
     * @param tid tuit that gets disliked.
     */
    findUserDislikesTuit= async(uid:string, tid:string):Promise<Dislike>=>
         DislikeModel.findOne({tuit:tid, dislikedBy:uid});


}