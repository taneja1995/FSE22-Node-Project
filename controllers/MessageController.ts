import MessageControllerI from "../interfaces/MessageController";
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";

export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid1/messages/:uid2",
                MessageController.messageController.userMessageUser);
            app.delete("/api/users/:uid/messages/:messageId",
                MessageController.messageController.userDeletesMessage);
            app.get("/api/users/:uid/messages/sentBy",
                MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/:uid/messages/sentTo",
                MessageController.messageController.findAllMessagesSentToUser);
        }
        return MessageController.messageController;
    }

    private constructor() {
    };

    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao
            .findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    findAllMessagesSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao
            .findAllMessagesSentToUser(req.params.uid)
            .then(messages => res.json(messages));

    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .userDeletesMessage(req.params.messageId)
            .then(status => res.json(status));

    userMessageUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessageUser(req.params.uid1, req.params.uid2, req.body)
            .then(message => res.json(message))

}