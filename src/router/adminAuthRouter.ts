import express from 'express'
import authorMiddleware from '../middleware/authorizationMiddleware';
import { registerUserByAdmin, registerMedicalPersonnel, registerMedicalFacility } from '../controller/registerController';

const adminAuthRouter = express.Router()

adminAuthRouter.post('/admin/registeruser', authorMiddleware(['admin']), registerUserByAdmin);
adminAuthRouter.post('/admin/registerpersonnel', authorMiddleware(['staff','admin']), registerMedicalPersonnel);
adminAuthRouter.post('/admin/registerfacility', authorMiddleware(['admin']), registerMedicalFacility);

export default adminAuthRouter;