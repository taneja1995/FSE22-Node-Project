"use strict";
/**
 * @file Controller RESTful Web Service API for Tuit resource
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/tuits/:tuitid to retrieve a particular tuit instances</li>
 *     <li>POST /api/tuits to create a new tuit instance</li>
 *     <li>DELETE /api/tuits/:tuitid to remove a particular tuit instance</li>
 *     <li>PUT /api/tuits/:tuitid to update an individual tuit instance </li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
class TuitController {
    constructor() {
        /**
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new tuit to be inserted in the
         * database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new tuit that was inserted in the
         * database
         */
        this.createTuit = (req, res) => {
            let userId = req.params.uid === "me"
                && req.session['profile'] ?
                req.session['profile']._id :
                req.params.uid;
            TuitController.tuitDao.createTuit(userId, req.body)
                .then((tuit) => res.json(tuit));
        };
        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.deleteTuit = (req, res) => TuitController.tuitDao.deleteTuit(req.params.tuitid)
            .then((status) => res.send(status));
        /**
         * Retrieves all tuits from the database and returns an array of tuits.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllTuits = (req, res) => TuitController.tuitDao.findAllTuits()
            .then((tuits) => res.json(tuits));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit that matches the user ID
         */
        this.findTuitById = (req, res) => TuitController.tuitDao.findTuitById(req.params.tuitid)
            .then((tuit) => res.json(tuit));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter uid to fetch all tuits for a particular user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit objects.
         */
        this.findTuitsByUser = (req, res) => {
            let userId = req.params.uid === "me"
                && req.session['profile'] ?
                req.session['profile']._id : req.params.uid;
            TuitController.tuitDao.findTuitsByUser(userId)
                .then((tuits) => res.json(tuits));
        };
        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a tuit was successful or not
         */
        this.updateTuit = (req, res) => TuitController.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then((status) => res.send(status));
    }
}
exports.default = TuitController;
TuitController.tuitDao = TuitDao_1.default.getInstance();
TuitController.tuitController = null;
TuitController.getInstance = (app) => {
    if (TuitController.tuitController === null) {
        TuitController.tuitController = new TuitController();
        /**
         * Creates singleton controller instance
         * @param {Express} app Express instance to declare the RESTful Web service
         * API
         * @return TuitController
         */
        app.get("/api/tuits", TuitController.tuitController.findAllTuits);
        app.get("/api/tuits/:tuitid", TuitController.tuitController.findTuitById);
        app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuit);
        app.delete("/api/tuits/:tuitid", TuitController.tuitController.deleteTuit);
        app.put("/api/tuits/:tuitid", TuitController.tuitController.updateTuit);
        app.get("/api/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
    }
    return TuitController.tuitController;
};
//# sourceMappingURL=TuitController.js.map