import express, { Request, Response } from 'express';
import authRouter from './authRouter';
import adminAuthRouter from './adminAuthRouter'
// import userrouter from './userRouter';
import authenMiddleware from '../middleware/authenticationMiddleware';

const router = express.Router();

router.get("/", function (req: Request, res: Response) {
    res.status(200).json({
        success: true,
        message: "Hello, this is Medify! Group [e]'s Final Project!"
    })
})

router.use('/api/auth', authRouter)
router.use('/api/admin/auth', authenMiddleware, adminAuthRouter)
// router.use('/api/users', userrouter)

export default router;