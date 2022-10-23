import Message from "../models/Message";

/**
 * @file Declares API for Message related data access object methods
 */
export default interface MessageDao{

    userMessageUser (uid1:string, uid2:string, message: Message): Promise<Message>;
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    findAllMessagesSentToUser (uid: string): Promise<Message[]>;
    userDeletesMessage (messageId: string): Promise<any>;
};