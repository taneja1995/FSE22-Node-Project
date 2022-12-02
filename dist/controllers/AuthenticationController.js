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
const UserDao_1 = __importDefault(require("../daos/UserDao"));
// @ts-ignore
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
class AuthenticationController {
    constructor() {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            const password = newUser.password;
            const hash = yield bcrypt_1.default.hash(password, saltRounds);
            newUser.password = hash;
            const existingUser = yield AuthenticationController.userDao
                .findUserByUsername(newUser.username);
            if (existingUser) {
                res.sendStatus(403);
            }
            else {
                const insertedUser = yield AuthenticationController.userDao
                    .createUser(newUser);
                insertedUser.password = '';
                // @ts-ignore
                req.session['profile'] = insertedUser;
                res.json(insertedUser);
            }
        });
        this.profile = (req, res) => {
            // @ts-ignore
            const profile = req.session['profile'];
            if (profile) {
                profile.password = '';
                res.json(profile);
            }
            else {
                res.sendStatus(403);
            }
        };
        this.logout = (req, res) => {
            // @ts-ignore
            req.session.destroy((err) => { });
            res.sendStatus(200);
        };
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const username = user.username;
            const password = user.password;
            const existingUser = yield AuthenticationController.userDao
                .findUserByUsername(username);
            if (!existingUser) {
                res.sendStatus(403);
                return;
            }
            const match = yield bcrypt_1.default
                .compare(password, existingUser.password);
            if (match) {
                existingUser.password = '******';
                // @ts-ignore
                req.session['profile'] = existingUser;
                res.json(existingUser);
            }
            else {
                res.sendStatus(403);
            }
        });
    }
}
exports.default = AuthenticationController;
AuthenticationController.userDao = UserDao_1.default.getInstance();
AuthenticationController.authController = null;
AuthenticationController.getInstance = (app) => {
    if (AuthenticationController.authController == null) {
        AuthenticationController.authController = new AuthenticationController();
        app.post('/api/auth/signup', AuthenticationController.authController.signup);
        app.post('/api/auth/profile', AuthenticationController.authController.profile);
        app.post('/api/auth/logout', AuthenticationController.authController.logout);
        app.post('/api/auth/login', AuthenticationController.authController.login);
    }
    return AuthenticationController.authController;
};
//# sourceMappingURL=AuthenticationController.js.map