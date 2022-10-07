import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";
import TuitModel from "../mongoose/TuitModel";


export default class TuitDao implements TuitDaoI {
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

     async deleteTuit(tid: string): Promise<any> {
         return await TuitModel.deleteOne({_id: tid});
    }

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        // @ts-ignore
        return await TuitModel.updateOne({id:tid}, {$set: tuit})
    }

}