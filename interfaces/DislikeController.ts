import {Request, Response} from "express";

/**
 * @file Declares API request/response methods for Like Controller.
 */
export default interface DislikeController{

    userDislikesTuit (req: Request, res: Response): void;
    userUnDislikesTuit (req: Request, res: Response): void;
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userTogglesTuitDislikes(req: Request, res: Response): void;
};
