import FollowControllerI from "../interfaces/FollowController"
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";

export default class FollowController implements FollowControllerI{

    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid/follows/:uid",
                FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid/unfollows/:uid",
                FollowController.followController.userUnfollowsAnotherUser);
            app.get("/api/users/:uid/follows",
                FollowController.followController.findAllUsersFollowedByUser);
            app.get("/api/tuits/:uid/followers",
                FollowController.followController.findAllUsersFollowingUser);
        }
        return FollowController.followController;
    }
    private constructor() {}


    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao
            .findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    findAllUsersFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao
            .findAllUsersFollowingUser(req.params.uid)
            .then(followers => res.json(followers));

    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao
            .userFollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao
            .userUnfollowsAnotherUser(req.params.uid1, req.params.uid2).then(status => res.send(status));

}