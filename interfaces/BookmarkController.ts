import {Request, Response} from "express";

/**
 * @file Declares API request/response methods for Bookmark Controller.
 */
export default interface BookmarkController{

    userBookmarksTuit (req: Request, res: Response): void;
    userUnBookmarksTuit (req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;

};
