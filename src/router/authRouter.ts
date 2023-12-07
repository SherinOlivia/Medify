import express from 'express'
import { registerUser } from '../controller/registerController';
import loginUser from '../controller/loginController';

const authRouter = express.Router()

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

export default authRouter;