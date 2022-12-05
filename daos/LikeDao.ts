/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDao";
import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI{

    private static likeDao: LikeDao | null = null;

    /**
     * @class LikeDao Implements Data Access Object managing data storage
     * of Likes
     * @property {LikeDao} messageDao Private single instance of LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Retrieves all the users that like a tuit.
     * @param tid tuit that's liked by all the users.
     * @returns {Promise} of array Like type.
     */
    findAllUsersThatLikedTuit =
        async (tid: string): Promise<Like[]> =>
            LikeModel
                .find({tuit: tid})
                .populate("likedBy")
                .exec();

    /**
     * Retrieves all the tuits that are liked by a user.
     * @param uid user that likes all the tuit.
     * @returns {Promise} of array Like type.
     */
    async findAllTuitsLikedByUser(uid: string): Promise<any>{
            return await LikeModel
                .find({likedBy: uid})
                .populate({path: "tuit", populate: {
                    path:"postedBy"
                    }
}).exec();}

    /**
     * Creates a like collection when a user likes a tuit.
     * @param tid tuit that's being liked.
     * @param uid user that likes the tuit.
     */
    userLikesTuit=
    async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Deletes the like collection when a user unlikes a tuit.
     * @param uid user that unlikes.
     * @param tid tuit that gets unliked.
     */
    userUnlikesTuit=
        async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({likedBy: uid, tuit: tid});

    /**
     * Fetches the like collection for a user that likes a tuit.
     * @param uid user that likes.
     * @param tid tuit that gets liked.
     */
    findUserLikesTuit= async(uid:string, tid:string):Promise<Like>=>
        await LikeModel.findOne({tuit:tid, likedBy:uid});


    /**
     * Fetches the count of how many times tuit gets liked..
     * @param tid tuit that gets liked.
     */
    countHowManyLikedTuit= async(tid:string):Promise<any> =>
        LikeModel.count({tuit:tid});


}