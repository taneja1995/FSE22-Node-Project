/**
 * @file Controller RESTful Web Service API for Like resource
 */

import LikeControllerI from "../interfaces/LikeController";
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";

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
    findAllTuitsLikedByUser= (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit
        (req.params.uid).then(likes => res.json(likes));

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

}