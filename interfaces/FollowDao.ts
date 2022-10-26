import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDao{

    userFollowsAnotherUser(uid1: string, uid2:string):Promise<any>;
    userUnfollowsAnotherUser(uid1: string, uid2:string):Promise<any>;
    findAllUsersFollowingUser(uid:string):Promise<Follow[]>;
    findAllUsersFollowedByUser(uid:string):Promise<Follow[]>;
}