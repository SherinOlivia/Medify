import express, { Request, Response } from 'express';
// import authenMiddleware from '../middleware/authenticationMiddleware';
// import userrouter from './userRouter';
import authrouter from './authRouter';

const router = express.Router();

router.get("/", function (req: Request, res: Response) {
    res.status(200).json({
        success: true,
        message: "Hello, this is Medify! Group [e]'s Final Project!"
    })
})

router.use('/api/auth',  authrouter)
// router.use('/api/users', userrouter)

export default router;