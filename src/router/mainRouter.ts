import express, { Request, Response } from 'express';
import authenMiddleware from '../middleware/authenticationMiddleware';
import authRouter from './authRouter';
import adminAuthRouter from './adminAuthRouter'
import userRouter from './userRouter';
import medicalPersonnelRouter from './medicalPersonnelRouter';

const router = express.Router();

router.get("/", function (req: Request, res: Response) {
    res.status(200).json({
        success: true,
        message: "Hello, this is Medify! Group [e]'s Final Project!"
    })
})

router.use('/api/v1/auth', authRouter)
router.use('/api/v1/admin/auth', authenMiddleware, adminAuthRouter)
router.use('/api/v1/user', authenMiddleware, userRouter)
router.use('/api/v1/medic', authenMiddleware, medicalPersonnelRouter)

export default router;