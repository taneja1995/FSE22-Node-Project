/**
 * @file Controller RESTful Web Service API for Like resource
 */

import LikeControllerI from "../interfaces/LikeController";
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
import DislikeDao from "../daos/DislikeDao";

/**
 * @class LikeController Implements RESTful Web service API for like resource.
 * <ul>
 *     <li>POST /api/users/:uid/likes/:tid to record a new like instance for
 *     a given user</li>
 *     <li>GET /api/users/:uid/likes to find all tuits liked by the user </li>
 *     <li>GET /api/tuits/:tid/likes to find all users that liked a tuit </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user that no longer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing tuit CRUD operations
 * @property {LikeController} likeController Singleton controller implementing
 * RESTful Web service API
 */

export default class LikeController implements LikeControllerI{

    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;
    private static tuitDao:TuitDao = TuitDao.getInstance();
    //private static dislikeDao: DislikeDao = DislikeDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */

    public static getInstance = (app: Express): LikeController => {
        if(LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.post("/api/users/:uid/likes/:tid",
                LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/likes/:tid",
                LikeController.likeController.userUnlikesTuit);
            app.get("/api/users/:uid/likes",
                LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes",
                LikeController.likeController.findAllUsersThatLikedTuit);
            app.put("/api/users/:uid/likes/:tid",
                LikeController.likeController.userTogglesTuitLikes);

        }
        return LikeController.likeController;
    }


    private constructor() {}

    /**
     * Retrieves all tuits that are liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllTuitsLikedByUser= async (req: Request, res: Response) => {
        console.log("inside the find all tuits liked by user");
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        await LikeController.likeDao.findAllTuitsLikedByUser(userId).then(likes =>{
            console.log("yhe user id is",userId);
            console.log("the likes are", likes);
            const likesNonNullTuits =
                likes.filter(like => like.tuit);
            console.log("111111111111" +likesNonNullTuits);
            const tuitsFromLikes =
                likesNonNullTuits.map(like => like.tuit);
            console.log("the tuit from likes r"+tuitsFromLikes);
            res.json(tuitsFromLikes);
        });

    }
    /**
     * Retrieves all users that like a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the tuit liked by the users.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects.
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllTuitsLikedByUser
        (req.params.tid).then(likes => res.json(likes));


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit
        (req.params.uid, req.params.tid)
            .then(likes => res.json(likes));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit
        (req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking
     * the tuit and the tuit being liked and gets toggled.
     * @param {Response} res Represents response to client, including status
     * on whether liking the tuit was successful or not
     */
    userTogglesTuitLikes =  async (req:Request, res:Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.likeDao.findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao.countHowManyLikedTuit(tid);
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            } else {
                await LikeController.likeDao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
            };
            await LikeController.tuitDao.updateStats(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }


}