"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for likes
 */
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
/**
 * @typedef  Like represents the tuit liked by a user
 * @property {ObjectId} tuit tuit that is liked
 * @property {ObjectId} likedBy represents user who likes the tuit.
 */
const LikeSchema = new mongoose_1.default.Schema({
    tuit: { type: mongoose_2.Schema.Types.ObjectId, ref: "TuitModel" },
    likedBy: { type: mongoose_2.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: 'likes' });
exports.default = LikeSchema;
//# sourceMappingURL=LikeSchema.js.map