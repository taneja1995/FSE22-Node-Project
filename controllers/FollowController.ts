/**
 * @file Controller RESTful Web Service API for Follow resource
 */

import FollowControllerI from "../interfaces/FollowController"
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";

/**
 * @class FollowController Implements RESTful Web service API for follow resource.
 * <ul>
 *     <li>POST /api/users/:uid/follows/:uid to record a new follow instance for
 *     a given user</li>
 *     <li>GET /api/users/:uid/follows to retrieve followed by a given user </li>
 *     <li>GET /api/users/:uid/followers to retrieve followers for a given user </li>
 *     <li>DELETE /api/users/:uid/follows/:uid to record that a user no longer follows another user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing tuit CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */

export default class FollowController implements FollowControllerI{

    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid1/follows/:uid2",
                FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid1/follows/:uid2",
                FollowController.followController.userUnfollowsAnotherUser);
            app.get("/api/users/:uid/follows",
                FollowController.followController.findAllUsersFollowedByUser);
            app.get("/api/users/:uid/followers",
                FollowController.followController.findAllUsersFollowingUser);
        }
        return FollowController.followController;
    }
    private constructor() {}

    /**
     * Retrieves all users that are followed by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao
            .findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that are following the user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects who follow the given user.
     */
    findAllUsersFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao
            .findAllUsersFollowingUser(req.params.uid)
            .then(followers => res.json(followers));


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is following the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that were inserted in the
     * database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao
            .userFollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is unfollowing
     * the other user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao
            .userUnfollowsAnotherUser(req.params.uid1, req.params.uid2).then(status => res.send(status));

}