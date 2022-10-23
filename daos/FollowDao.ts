/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDao";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
 export default class FollowDao implements FollowDaoI{

    private static followDao: FollowDao | null =null;
    public static getInstance = (): FollowDao =>{
        if(FollowDao.followDao === null){
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {};

     findAllUsersFollowedByUser= async(uid: string): Promise<Follow[]> =>
         FollowModel
             .find({userFollowed:uid})
             .populate("userFollowing")
             .exec()

     findAllUsersFollowingUser= async(uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing:uid})
            .populate("userFollowed")
            .exec();


    userFollowsAnotherUser = async(uid1: string, uid2: string): Promise<Follow> =>
         FollowModel.create({userFollowed:uid1, userFollowing:uid2});


     userUnfollowsAnotherUser = async(uid1: string, uid2: string): Promise<any> =>
         FollowModel.deleteOne({userFollowed: uid1, userFollowing: uid2});

}
