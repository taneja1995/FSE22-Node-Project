/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDao";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    };

    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message")
            .exec();

    findAllMessagesSentToUser= async (uid: string): Promise<Message[]> =>
       MessageModel
           .find({to: uid})
           .populate("message")
           .exec();


    userDeletesMessage= async (messageId: string): Promise<any> =>
       MessageModel.deleteOne({_id: messageId});

    userMessageUser = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: uid1, from: uid2});


}