"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = __importDefault(require("../mongoose/MessageModel"));
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
class MessageDao {
    constructor() {
        /**
         * Retrieves all the messages sent by the user from the messages collection.
         * @param uid user that sent the message
         * @returns {Promise} of array type Message.
         */
        this.findAllMessagesSentByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ from: uid })
                .populate("sentBy")
                .exec();
        });
        /**
         * Retrieves all the messages sent to the user from the messages collection.
         * @param uid user to whom message is sent.
         * @returns {Promise} of array type Message.
         */
        this.findAllMessagesSentToUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ to: uid })
                .populate("sentTo")
                .exec();
        });
        /**
         * When user deletes a message.
         * @param messageId message that has to be deleted.
         * @returns {Promise} of type any.
         */
        this.userDeletesMessage = (messageId) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteOne({ _id: messageId }); });
        /**
         * Create a message when user sends a message to another user.
         * @param uid1  user 1
         * @param uid2 user 2
         * @param message messages that's sent.
         */
        this.userMessageUser = (uid1, uid2, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.create(Object.assign(Object.assign({}, message), { to: uid1, from: uid2 })); });
    }
    ;
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
//# sourceMappingURL=MessageDao.js.map