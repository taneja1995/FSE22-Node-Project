import Message from "../models/Message";

export default interface MessageDao{

    userMessageUser (uid1:string, uid2:string, message: Message): Promise<Message>;
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    findAllMessagesSentToUser (uid: string): Promise<Message[]>;
    userDeletesMessage (messageId: string): Promise<any>;
};