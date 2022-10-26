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

    /**
     * @class MessageDao Implements Data Access Object managing data storage
     * of Messages
     * @property {MessageDao} messageDao Private single instance of MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    };

    /**
     * Retrieves all the messages sent by the user from the messages collection.
     * @param uid user that sent the message
     * @returns {Promise} of array type Message.
     */
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("sentBy")
            .exec();

    /**
     * Retrieves all the messages sent to the user from the messages collection.
     * @param uid user to whom message is sent.
     * @returns {Promise} of array type Message.
     */
    findAllMessagesSentToUser= async (uid: string): Promise<Message[]> =>
       MessageModel
           .find({to: uid})
           .populate("sentTo")
           .exec();


    /**
     * When user deletes a message.
     * @param messageId message that has to be deleted.
     * @returns {Promise} of type any.
     */
    userDeletesMessage= async (messageId: string): Promise<any> =>
       MessageModel.deleteOne({_id: messageId});

    /**
     * Create a message when user sends a message to another user.
     * @param uid1  user 1
     * @param uid2 user 2
     * @param message messages that's sent.
     */
    userMessageUser = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: uid1, from: uid2});


}