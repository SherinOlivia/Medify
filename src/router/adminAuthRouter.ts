import express from 'express'
import authorMiddleware from '../middleware/authorizationMiddleware';
import { registerUserByAdmin, registerMedicalPersonnel, registerMedicalFacility } from '../controller/registerController';

const adminAuthRouter = express.Router()

adminAuthRouter.post('/registeruser', authorMiddleware(['admin']), registerUserByAdmin);
adminAuthRouter.post('/registerpersonnel', authorMiddleware(['staff','admin']), registerMedicalPersonnel);
adminAuthRouter.post('/registerfacility', authorMiddleware(['admin']), registerMedicalFacility);

export default adminAuthRouter;