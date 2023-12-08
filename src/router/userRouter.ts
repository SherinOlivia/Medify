import express from 'express'
import authorMiddleware from '../middleware/authorizationMiddleware';
import { getUserProfile, getUserProfileByAdmin, getUsersList } from '../controller/userController';

const userRouter = express.Router()

userRouter.get('/profile', getUserProfile);
userRouter.post('/profile/:userId', authorMiddleware(['staff','admin']), getUserProfileByAdmin);
userRouter.post('/list', getUsersList)

export default userRouter;