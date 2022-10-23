import {Request, Response} from "express";

/**
 * @file Declares API request/response methods for Follow Controller.
 */
export default interface FollowController{

    userFollowsAnotherUser (req: Request, res: Response): void;
    userUnfollowsAnotherUser (req: Request, res: Response): void;
    findAllUsersFollowingUser (req: Request, res: Response): void;
    findAllUsersFollowedByUser (req: Request, res: Response): void;
};
