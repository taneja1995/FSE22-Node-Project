"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for bookmark
 */
const mongoose_1 = __importStar(require("mongoose"));
/**
 * @typedef Bookmark represents tuit bookmarked by a user entity.
 * @property {ObjectId} bookmarkedBy User who bookmarks the tuit
 * @property {ObjectId} tuit  tuit that gets bookmarked.
 */
const BookmarkSchema = new mongoose_1.default.Schema({
    tuit: { type: mongoose_1.Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "bookmarks" });
exports.default = BookmarkSchema;
//# sourceMappingURL=BookmarkSchema.js.map