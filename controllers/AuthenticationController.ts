import UserDao from "../daos/UserDao";
import {Express, Request, Response} from "express";
// @ts-ignore
import bcrypt from "bcrypt";
const saltRounds = 10;

export default class AuthenticationController {
    private static userDao: UserDao = UserDao.getInstance();
    private static authController: AuthenticationController | null = null;

    public static getInstance = (app: Express): AuthenticationController => {
        if (AuthenticationController.authController == null) {
            AuthenticationController.authController = new AuthenticationController();
            app.post('/api/auth/signup', AuthenticationController.authController.signup);
            app.post('/api/auth/profile', AuthenticationController.authController.profile);
            app.post('/api/auth/logout', AuthenticationController.authController.logout);
            app.post('/api/auth/login', AuthenticationController.authController.login);
        }
        return AuthenticationController.authController;
    }
    private constructor() {}

    signup = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await AuthenticationController.userDao
            .findUserByUsername(newUser.username);
        if (existingUser) {
            res.sendStatus(403);
        } else {
            const insertedUser = await AuthenticationController.userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            profile.password = '';
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy((err) => {});
        res.sendStatus(200);
    }

    login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await AuthenticationController.userDao
            .findUserByUsername(username);
        if (!existingUser) {
            res.sendStatus(403);
            return;
        }

        const match = await bcrypt
            .compare(password, existingUser.password);
        if (match) {
            existingUser.password = '******';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }

    }
}