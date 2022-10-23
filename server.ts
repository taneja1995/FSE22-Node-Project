/**
 * @file Implements an Express Node HTTP server.
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
const cors = require('cors')
const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

require('dotenv').config();

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

// @ts-ignore
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yhvrg8t.mongodb.net/myFirstDB?retryWrites=true&w=majority` || 'mongodb://localhost:27017/Tuiter', options,(error => {
    if(!error){
        console.log("DB connected");
    }else{
        console.log("DB not connected")
    }
}));

/*
mongoose.connect('mongodb://localhost:27017/Tuiter', options,(error => {
    if(!error){
        console.log("DB connected");
    }else{
        console.log("DB not connected")
    }
}));
*/

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
