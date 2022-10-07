/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import * as mongoose from "mongoose";
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
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

const username= process.env.USERNAME;
const password=process.env.PASSWORD;

mongoose.connect('mongodb+srv://tanejai:ishita1995@cluster0.yhvrg8t.mongodb.net/myFirstDB?retryWrites=true&w=majority', options,(error => {
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

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
