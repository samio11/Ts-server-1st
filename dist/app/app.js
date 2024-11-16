"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//MiddleWare
const logger = (req, res, next) => {
    console.log(req.method, req.url, req.body);
    next();
};
//Router
const userRouter = express_1.default.Router();
app.use('/api/v1/users', userRouter);
userRouter.get('/createUser', logger, (req, res, next) => {
    try {
        const user = req.body;
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (err) {
        next(err);
    }
});
app.get('/', logger, (req, res, next) => {
    try {
        console.log('Samio Server Running...');
        res.status(200).json({ message: 'Welcome to the API!' });
    }
    catch (err) {
        next(err);
    }
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(404).json({
            message: error.message || 'Something went wrong!'
        });
    }
});
exports.default = app;
