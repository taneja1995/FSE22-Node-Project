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

    /**
     * @class FollowDao Implements Data Access Object managing data storage
     * of Follows
     * @property {FollowDao} followDao Private single instance of FollowDao
     */
    public static getInstance = (): FollowDao =>{
        if(FollowDao.followDao === null){
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {};

    /**
     * Retrieves all the users that are followed by another user.
     * @param uid user that follows all other users.
     * @returns {Promise} of array Follow type.
     */
     findAllUsersFollowedByUser= async(uid: string): Promise<Follow[]> =>
         FollowModel
             .find({userFollowed:uid})
             .populate("userFollowing")
             .exec()

    /**
     * Retrieves all the users a user is following.
     * @param uid user that is being followed.
     * @returns {Promise} of array Follow type.
     */
     findAllUsersFollowingUser= async(uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing:uid})
            .populate("userFollowed")
            .exec();


    /**
     * Creates a follow collection when one user follows another user.
     * @param uid1 user 1
     * @param uid2 user 2
     * @returns {Promise} of type any.
     */
    userFollowsAnotherUser = async(uid1: string, uid2: string): Promise<any> =>
         FollowModel.create({userFollowed:uid1, userFollowing:uid2});


    /**
     * Deletes a follow collection when one user unfollows another user.
     * @param uid1 user 1
     * @param uid2 user 2
     * @returns {Promise} of type any.
     */
     userUnfollowsAnotherUser = async(uid1: string, uid2: string): Promise<any> =>
         FollowModel.deleteOne({userFollowed: uid1, userFollowing: uid2});

}
