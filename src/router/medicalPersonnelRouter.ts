import express from 'express'
import { getMedicalPersonnelProfile, getDoctorProfile, getDoctorsList } from '../controller/medicalPersonnelController';

const medicalPersonnelRouter = express.Router()

medicalPersonnelRouter.get('/profile', getMedicalPersonnelProfile);
medicalPersonnelRouter.get('/profile/:doctorId', getDoctorProfile);
medicalPersonnelRouter.get('/list', getDoctorsList)

export default medicalPersonnelRouter;