import Follow from "../models/Follow";

export default interface FollowDao{

    userFollowsAnotherUser(uid1: string, uid2:string):Promise<Follow>;
    userUnfollowsAnotherUser(uid1: string, uid2:string):Promise<any>;
    findAllUsersFollowingUser(uid:string):Promise<Follow[]>;
    findAllUsersFollowedByUser(uid:string):Promise<Follow[]>;
}