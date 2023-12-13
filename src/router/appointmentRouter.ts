import express from 'express'
import { createAppointment, updateAppointment, getAppointmentList, cancelAppointment, updateAppointmentStatus } from '../controller/appointmentController'
import authorMiddleware from '../middleware/authorizationMiddleware';
const appointmentRouter = express.Router()

appointmentRouter.get('/list', getAppointmentList)
appointmentRouter.post('/new', authorMiddleware(['user']), createAppointment);
appointmentRouter.put('/update/:appointmentId', updateAppointment);
appointmentRouter.patch('/cancel/:appointmentId', authorMiddleware(['user']), cancelAppointment);
appointmentRouter.patch('/update/:appointmentId', authorMiddleware(['medical_admin','staff','admin']), updateAppointmentStatus);

export default appointmentRouter;