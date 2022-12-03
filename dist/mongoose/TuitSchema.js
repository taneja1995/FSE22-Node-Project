"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for tuit
 */
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
/**
 * @typedef Tuit represents the post sent by the user.
 * @property {string} tuit
 * @property {Date} postedOn date when the tuit is posted.
 * @property {ObjectId} postedBy user who posts the tuit.
 */
const TuitSchema = new mongoose_1.default.Schema({
    tuit: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    postedBy: { type: mongoose_2.Schema.Types.ObjectId, ref: "UserModel" },
<<<<<<< HEAD
    stats: {
        replies: { type: Number, default: 0 },
        retuits: { type: Number, default: 0 },
        likes: { type: Number, default: 0 }
    }
=======
>>>>>>> 15acddbb6eca3bd2dade6e9829d364ef2c764ae6
}, { collection: 'tuits' });
exports.default = TuitSchema;
//# sourceMappingURL=TuitSchema.js.map