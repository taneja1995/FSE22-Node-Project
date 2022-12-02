"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>Users</li>
 *     <li>Tuits</li>
 *     <li>Likes</li>
 *     <li>Follows</li>
 *     <li>Bookmarks</li>
 *     <li>Messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database service.
 */
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
const app = (0, express_1.default)();
let sess = {
    secret: "mysecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false
    }
};
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}
app.use(session(sess));
app.use(express_1.default.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
const connectionString = "mongodb+srv://tanejai:welcometaneja@cluster0.yhvrg8t.mongodb.net/myFirstDB?retryWrites=true&w=majority";
mongoose_1.default.connect(connectionString);
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likeController = LikeController_1.default.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const bookmarkController = BookmarkController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
const authController = AuthenticationController_1.default.getInstance(app);
// to test if server is running on local port.
app.get('/hello', (req, res) => res.send('Hello World!'));
app.get('/', (req, res) => res.send('Welcome to FSE Node Project'));
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
//# sourceMappingURL=server.js.map