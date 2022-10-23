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
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    findAllUsersThatLikedTuit =
        async (tid: string): Promise<Like[]> =>
            LikeModel
                .find({tuit: tid})
                .populate("likedBy")
                .exec();


    findAllTuitsLikedByUser =
        async (uid: string): Promise<Like[]> =>
            LikeModel
                .find({likedBy: uid})
                .populate("tuit")
                .exec();

    userLikesTuit=
    async (tid: string, uid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    userUnlikesTuit=
        async (tid: string, uid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

}