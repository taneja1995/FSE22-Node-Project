import User from "../models/User";

/**
 * @file Declares API for Users related data access object methods
 */
export default interface UserDao {
    findAllUsers(): Promise<User[]>;
    findUserById(uid: string): Promise<any>;
    createUser(user: User): Promise<User>;
    updateUser(uid: string, user: User): Promise<User>;
    deleteUser(uid: string): Promise<any>;
}
