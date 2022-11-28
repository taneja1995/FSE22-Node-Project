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
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

}

