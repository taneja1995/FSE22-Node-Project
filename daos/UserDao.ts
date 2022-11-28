/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {

    private static userDao: UserDao | null =null;

    /**
     * Creates a singleton Dao Instance
     * @returns userDao
     */
    public static getInstance = (): UserDao =>{
        if(UserDao.userDao === null){
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    private constructor() {}

    /**
     * Retrieves all the users from the users collection.
     * @returns {Promise} of array type User.
     */
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }

    /**
     * Retrieves the user by its id from the users collection.
     * @param uid user id that needs to be retrieved.
     * @returns {Promise} of type any.
     */
    async findUserById(uid: string): Promise<any> {
        return await UserModel.findById(uid);
    }

    /**
     * Creates User in the collection.
     * @param user
     * @returns {Promise} of type User.
     */
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    /**
     * Deletes the user from the collection.
     * @param uid user id that needs to be deleted.
     * @returns {Promise}
     */
    async deleteUser(uid: string):  Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }

    /**
     * Updates the user in the collection.
     * @param uid user id that needs to be updated.
     * @param user User
     * @returns {Promise} of type User.
     */
    async updateUser(uid: string, user: User): Promise<User> {
        // @ts-ignore
        return await UserModel.updateOne({_id: uid}, {$set: user});
    }

    deleteUsersByUsername = async (username: string): Promise<any> =>
        UserModel.deleteMany({username});

    findUserByUsername = async (username: string): Promise<any> =>
        UserModel.findOne({username:username});
}
