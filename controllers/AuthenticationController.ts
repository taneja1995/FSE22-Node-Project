import UserDao from "../daos/UserDao";
import {Express,Request,Response} from "express";

const bcrypt = require('bcrypt');
const saltRounds = 10;

export default  class AuthenticationController {

    private static userDao: UserDao = UserDao.getInstance();
    private static authController: AuthenticationController | null = null;

    public static getInstance = (app: Express): AuthenticationController => {
        if (AuthenticationController.authController == null) {
            AuthenticationController.authController = new AuthenticationController();
            app.post("/api/auth/signup", AuthenticationController.authController.signup);
            app.post("/api/auth/profile", AuthenticationController.authController.profile);
            app.post("/api/auth/logout", AuthenticationController.authController.logout);
            app.post("/api/auth/login", AuthenticationController.authController.login);
        }
        return AuthenticationController.authController;
    }
     private constructor() {
     }
     signup = async (req:Request, res:Response) => {
        console.log("inside the signup method----node ")
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await AuthenticationController.userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await AuthenticationController.userDao
                .createUser(newUser);
            insertedUser.password = '';
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    profile = (req:Request, res:Response) => {
        console.log("the req is"+req.body.key);
        const profile =  req.session['profile'];
        console.log(profile);
        if (profile) {
            profile.password = "";
            res.json(profile);
        } else {
            console.log("403 error caught in profile");
            res.sendStatus(403);
        }

    }
    logout = (req:Request, res:Response) => {
        //req.session.destroy();
        res.sendStatus(200);
    }

    login = async (req:Request, res:Response) => {
        console.log("inside the login method")
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser =  await AuthenticationController.userDao.findUserByUsername(username);

        if (!existingUser) {
            console.log("didnt find user");
            res.sendStatus(403);
            return;
        }
        const match = await bcrypt
            .compare(password, existingUser.password);
         console.log("the match is"+match);
        if (match) {
            existingUser.password = '*****';
            req.session['profile'] = existingUser;
            console.log("the session profile is"+req.session['profile']);
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    };



}

