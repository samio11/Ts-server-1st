import { lookup } from 'dns';
import express, { NextFunction, Request, Response } from 'express';
const app = express();
app.use(express.json());

//MiddleWare
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.url, req.body)
    next();
}

//Router
const userRouter = express.Router();
app.use('/api/v1/users',userRouter);
userRouter.get('/createUser',logger,(req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = req.body;
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (err) {
        next(err);
    }
})
app.get('/', logger, (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Samio Server Running...')
        res.status(200).json({ message: 'Welcome to the API!' });
    }
    catch (err) {
        next(err);
    }
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(404).json({
            message: error.message || 'Something went wrong!'
        })
    }
})

export default app;