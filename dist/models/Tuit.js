"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Tuit Represents a post made by the user.
 * @property {Tuit} tuit
 * @property {User} postedBy User
 * @property {Date} postedOn when the tuit was posted
 */
class Tuit {
    constructor() {
        this.tuit = '';
        this.postedOn = new Date();
    }
}
exports.default = Tuit;
//# sourceMappingURL=Tuit.js.map