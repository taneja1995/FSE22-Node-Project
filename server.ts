/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/AuthenticationController";
const cors = require('cors');
const app = express();
const session = require("express-session");
require('dotenv').config();
app.use(bodyParser.json())
app.use(express.json());
app.use(cors({
credentials:true,
    origin:'http://localhost:3000',
}));
console.log("inside the server");
let sess = {
    resave:true,
    secret: 'mysecret',
    saveUninitialized: false,
    cookie: {
        sameSite: 'lax',
        secure: false
    }
}

if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

const userController= UserController.getInstance(app);
const tuitController= TuitController.getInstance(app);
const likeController= LikeController.getInstance(app);
const followController= FollowController.getInstance(app);
const bookmarkController=BookmarkController.getInstance(app);
const messageController= MessageController.getInstance(app);
const authController=AuthenticationController.getInstance(app);

// @ts-ignore
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yhvrg8t.mongodb.net/myFirstDB?retryWrites=true&w=majority` || 'mongodb://localhost:27017/Tuiter', options,(error => {
    if(!error){
        console.log("DB connected");
    }else{
        console.log("DB not connected")
    }
}));

// to test if server is running on local port.
app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/',(req,res) => res.send(
    'Welcome to FSE Node project'
));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
