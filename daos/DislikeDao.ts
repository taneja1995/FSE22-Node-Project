/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */

import DislikeDaoI from "../interfaces/DislikeDao";
import DislikeModel from "../mongoose/DislikeModel";
import Dislike from "../models/Dislike";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class DislikeDao implements DislikeDaoI{

    private static dislikeDao: DislikeDao | null = null;

    /**
     * @class LikeDao Implements Data Access Object managing data storage
     * of Likes
     * @property {LikeDao} messageDao Private single instance of LikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Retrieves all the users that like a tuit.
     * @param tid tuit that's liked by all the users.
     * @returns {Promise} of array Like type.
     */
    findAllUsersThatDislikedTuit =
        async (tid: string): Promise<any> =>
            DislikeModel
                .find({tuit: tid})
                .populate("dislikedBy")
                .exec();

    /**
     * Retrieves all the tuits that are liked by a user.
     * @param uid user that likes all the tuit.
     * @returns {Promise} of array Like type.
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
     * Creates a like collection when a user likes a tuit.
     * @param tid tuit that's being liked.
     * @param uid user that likes the tuit.
     */
    userDislikesTuit=
        async (tid: string, uid: string): Promise<any> =>
            DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Deletes the like collection when a user unlikes a tuit.
     * @param uid user that unlikes.
     * @param tid tuit that gets unliked.
     */
    userUnDislikesTuit=
        async (uid: string, tid: string): Promise<any> =>
            DislikeModel.deleteOne({dislikedBy: uid, tuit: tid});

    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit:tid});

    findUserDislikesTuit= async(uid:string, tid:string):Promise<Dislike>=>
         DislikeModel.findOne({tuit:tid, dislikedBy:uid});


}