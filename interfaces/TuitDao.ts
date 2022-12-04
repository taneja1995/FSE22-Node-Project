import Tuit from "../models/Tuit";
import Stats from "../models/Stats";

/**
 * @file Declares API for Tuits related data access object methods
 */
export default interface TuitDao {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(uid: string): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<Tuit>;
    createTuit(uid: string ,tuit: Tuit): Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;
    updateStats (tid:string, newStats:Stats) :Promise<any>
}
