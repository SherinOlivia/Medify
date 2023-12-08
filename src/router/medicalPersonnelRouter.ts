import express from 'express'
import { getMedicalPersonnelProfile, getDoctorProfile, getDoctorsList } from '../controller/medicalPersonnelController';

const medicalPersonnelRouter = express.Router()

medicalPersonnelRouter.get('/profile', getMedicalPersonnelProfile);
medicalPersonnelRouter.post('/profile/:doctorId', getDoctorProfile);
medicalPersonnelRouter.post('/list', getDoctorsList)

export default medicalPersonnelRouter;