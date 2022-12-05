import DislikeControllerI from "../interfaces/DislikeController";
import TuitDao from "../daos/TuitDao";
import {Express, Request, Response} from "express";
import DislikeDao from "../daos/DislikeDao";
import LikeDao from "../daos/LikeDao";

export default class DislikeController implements DislikeControllerI{

    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static dislikeController: DislikeController | null = null;
    private static tuitDao:TuitDao = TuitDao.getInstance();
    //private static likeDao: LikeDao = LikeDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return DislikeController
     */

    public static getInstance = (app: Express): DislikeController => {
        if(DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.post("/api/users/:uid/dislikes/:tid",
                DislikeController.dislikeController.userDislikesTuit);
            app.delete("/api/users/:uid/dislikes/:tid",
                DislikeController.dislikeController.userUnDislikesTuit);
            app.get("/api/users/:uid/dislikes",
                DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.get("/api/tuits/:tid/dislikes",
                DislikeController.dislikeController.findAllUsersThatDislikedTuit);
            app.put("/api/users/:uid/dislikes/:tid",
                DislikeController.dislikeController.userTogglesTuitDislikes);

        }
        return DislikeController.dislikeController;
    }

    private constructor() {}

    /**
     * Retrieves all tuits that are disliked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllTuitsDislikedByUser= (req: Request, res: Response) => {

        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        DislikeController.dislikeDao.findAllTuitsDislikedByUser
        (userId).then(dislikes => {
            const likesNonNullTuits =
                dislikes.filter(dislike => dislike.tuit);
            const tuitsFromDislikes =
                likesNonNullTuits.map(dislike => dislike.tuit);
            res.json(tuitsFromDislikes);
            res.json(dislikes)});
    }
    /**
     * Retrieves all users that dislike a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the tuit liked by the users.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects.
     */
    findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findAllUsersThatDislikedTuit
        (req.params.tid).then(dislikes => res.json(dislikes));


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking the tuit
     * and the tuit being disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislikes that was inserted in the
     * database
     */
    userDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userDislikesTuit
        (req.params.uid, req.params.tid)
            .then(dislikes => res.json(dislikes));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is undisliking
     * the tuit and the tuit being undisliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the disliked was successful or not
     */
    userUnDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userUnDislikesTuit
        (req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking
     * the tuit and the tuit being disliked and gets toggled.
     * @param {Response} res Represents response to client, including status
     * on whether disliking the tuit was successful or not
     */
    userTogglesTuitDislikes =  async (req:Request, res:Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyDislikedTuit = await DislikeController.dislikeDao.findUserDislikesTuit(userId, tid);
            const howManyDislikedTuit = await DislikeController.dislikeDao.countHowManyDislikedTuit(tid);
            let tuit = await DislikeController.tuitDao.findTuitById(tid);
            if (userAlreadyDislikedTuit) {
                await DislikeController.dislikeDao.userUnDislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            } else {
                await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
                // if user has liked the tuit before
                if(tuit.stats.likes==1) {
                    tuit.stats.likes = tuit.stats.likes - 1;
                }
            };
            await DislikeController.tuitDao.updateStats(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }



}