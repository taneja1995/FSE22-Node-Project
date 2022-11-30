"use strict";
/**
 * @file Controller RESTful Web Service API for Message resource
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDao_1 = __importDefault(require("../daos/MessageDao"));
/**
 * @class MessageController Implements RESTful Web service API for message resource.
 * <ul>
 *     <li>POST /api/users/:uid1/messages/:uid2 to record a new message instance for
 *     between two users</li>
 *     <li>GET /api/users/:uid/messages/sentBy to find all messages sent by the user </li>
 *     <li>GET /api/users/:uid/messages/sentTo to find all messages sent to a user </li>
 *     <li>DELETE /api/users/:uid/messages/:messageId to delete the message sent by the user</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing tuit CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
class MessageController {
    constructor() {
        /**
         * Retrieves all messages that are sent by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the messages objects
         */
        this.findAllMessagesSentByUser = (req, res) => MessageController.messageDao
            .findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));
        /**
         * Retrieves all messages that are sent to a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the messages objects
         */
        this.findAllMessagesSentToUser = (req, res) => MessageController.messageDao
            .findAllMessagesSentToUser(req.params.uid)
            .then(messages => res.json(messages));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters messageId that needs to be deleted
         * @param {Response} res Represents response to client, including status
         * on whether deleting the message was successful or not
         */
        this.userDeletesMessage = (req, res) => MessageController.messageDao
            .userDeletesMessage(req.params.messageId)
            .then(status => res.json(status));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid1,uid2 and request body representing the users sending the message
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new message that was inserted in the
         * database
         */
        this.userMessageUser = (req, res) => MessageController.messageDao.userMessageUser(req.params.uid1, req.params.uid2, req.body)
            .then(message => res.json(message));
    }
    ;
}
exports.default = MessageController;
MessageController.messageDao = MessageDao_1.default.getInstance();
MessageController.messageController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return MessageController
 */
MessageController.getInstance = (app) => {
    if (MessageController.messageController === null) {
        MessageController.messageController = new MessageController();
        app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userMessageUser);
        app.delete("/api/messages/:messageId", MessageController.messageController.userDeletesMessage);
        app.get("/api/users/:uid/sentBy", MessageController.messageController.findAllMessagesSentByUser);
        app.get("/api/users/:uid/sentTo", MessageController.messageController.findAllMessagesSentToUser);
    }
    return MessageController.messageController;
};
//# sourceMappingURL=MessageController.js.map