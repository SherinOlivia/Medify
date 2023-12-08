import express from 'express'
import { registerUser } from '../controller/registerController';
import { loginUser, logoutUser } from '../controller/loginController';

const authRouter = express.Router()

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser)

export default authRouter;