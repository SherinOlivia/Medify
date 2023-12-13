import express from 'express'
import { getMedicalPersonnelProfile, getDoctorProfile, getDoctorsList, updatePersonnel } from '../controller/medicalPersonnelController';

const medicalPersonnelRouter = express.Router()

medicalPersonnelRouter.get('/profile', getMedicalPersonnelProfile);
medicalPersonnelRouter.get('/profile/:doctorId', getDoctorProfile);
medicalPersonnelRouter.get('/list', getDoctorsList)
medicalPersonnelRouter.put('/update/:personnelId', updatePersonnel);

export default medicalPersonnelRouter;