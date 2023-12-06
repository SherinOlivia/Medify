import express from 'express'
import { registerUser } from '../controller/registerController';
// import { loginUser } from '.././controller/loginController';

const authrouter = express.Router()

authrouter.post('/register', registerUser);
// authrouter.post('/login', loginUser);

export default authrouter;