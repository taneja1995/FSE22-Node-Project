import {Request, Response, Express} from "express";
import TuitDao from  "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import Tuit from "../models/Tuit";

export default  class TuitController implements TuitControllerI {

    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();

            app.get("/api/tuits",TuitController.tuitController.findAllTuits);
            app.get("/api/tuits/:tuitid",TuitController.tuitController.findTuitById);
            app.post("/api/tuits",TuitController.tuitController.createTuit);
            app.delete("/api/tuits/:tuitid",TuitController.tuitController.deleteTuit);
            app.put("/api/tuits/:tuitid",TuitController.tuitController.updateTuit);
        }
        return TuitController.tuitController;
    }
    private constructor() {}

    createTuit = (req:Request, res:Response) =>
       TuitController.tuitDao.createTuit(req.body)
           .then((tuit:Tuit) => res.json(tuit));

    deleteTuit = (req:Request, res:Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tuitid)
            .then((status) => res.send(status));

    findAllTuits=(req:Request, res:Response) =>
       TuitController.tuitDao.findAllTuits()
           .then((tuits:Tuit[]) => res.json(tuits))

    findTuitById=(req:Request, res:Response) =>
        TuitController.tuitDao.findTuitById(req.params.tuitid)
            .then((tuit:Tuit) => res.json(tuit));


    findTuitsByUser=(req:Request, res:Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.userid)
            .then((tuits:Tuit[]) => res.json(tuits));


    updateTuit= (req:Request, res:Response) =>
        TuitController.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then((status) => res.send(status));

}