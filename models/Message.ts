/**
 * @file Message data model
 */
/**
 * @typedef Message represents the message sent from one user to other user.
 * @property {string} message
 * @property {ObjectId} to user to whom message is sent.
 * @property {ObjectId} from user from whom message is sent.
 * @property {Date} sentOn represents the date when message is sent/received.
 */
export default interface Message{

    message: string,
    to: string,
    from: string,
    sentOn: Date
};