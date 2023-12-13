import express from 'express'
import authorMiddleware from '../middleware/authorizationMiddleware';
import { getUserProfile, getUserProfileByAdmin, getUsersList, updateUser } from '../controller/userController';

const userRouter = express.Router()

userRouter.get('/profile', getUserProfile);
userRouter.get('/profile/:userId', authorMiddleware(['staff','admin']), getUserProfileByAdmin);
userRouter.get('/list', authorMiddleware(['staff','admin']), getUsersList)
userRouter.put('/update/:userId', updateUser);

export default userRouter;