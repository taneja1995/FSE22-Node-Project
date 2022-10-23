/**
 * @file Controller RESTful Web Service API for Bookmark resource
 */

import BookmarkControllerI from "../interfaces/BookmarkController";
import BookmarkDao from "../daos/BookmarkDao";
import {Express, Request, Response} from "express";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmark resource.
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to create a new bookmark instance for
 *     a given user</li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve bookmarks for a given user </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to remove a particular bookmark instance</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing tuit CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */

export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */

    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.userUnBookmarksTuit);
            app.get("/api/users/:uid/bookmarks",
                BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {
    };

    /**
     * Retrieves all tuits bookmarked by the user from the database and returns an array of bookmarks.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmarks objects
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Creates a bookmark for a tuit by the user in the database and return the new bookmark object.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the bookmark object
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));


    /**
     * Deletes a bookmark for a tuit by the user from the database and returns the delete status
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the status.
     */
    userUnBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

};