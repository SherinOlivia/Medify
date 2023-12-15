import { Request, Response } from 'express';
import MedicalReportModel from '../models/medicalReportModel';
import AppointmentModel from '../models/appointmentModel';
import { errorHandling } from './errorHandling';
import MedicalPersonnelModel from '../models/medicalPersonnelModel';

const createMedicalReport = async (req: Request, res: Response) => {
  try {
    const { appointmentId, doctorNote } = req.body;

    if (!appointmentId || !doctorNote) {
      return res.status(400).json(errorHandling(null, 'Invalid medical report data.'));
    }

    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json(errorHandling(null, 'Associated appointment not found.'));
    }

    const newMedicalReport = new MedicalReportModel({
      appointment: appointmentId,
      doctorNote,
    });

    const savedReport = await newMedicalReport.save();

    return res.status(201).json(
      errorHandling({
        message: 'Medical report successfully created',
        data: savedReport,
      }, null)
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(errorHandling(null, 'Internal Server Error.'));
  }
};

const getMedicalReports = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    let medicalReports = null;

    if (user.role === 'patient') {
      medicalReports = await MedicalReportModel.find({ patient: user.id });

    } else if (user.role === 'medical_admin') {
      const personnel = await MedicalPersonnelModel.findById(user.id);

      medicalReports = await MedicalReportModel.find({ hospital: personnel?.hospital });

    } else if (user.role === 'doctor') {

      medicalReports = await MedicalReportModel.find({ doctor: user.id });

    } else if (user.role === 'staff' || user.role === 'admin') {
 
      medicalReports = await MedicalReportModel.find();

    } else {

      return res.status(403).json(errorHandling(null, 'Forbidden Access'));
    }

    return res.status(200).json(
      errorHandling({
        message: 'List of Medical Reports',
        data: medicalReports,
      }, null)
    );

  } catch (error) {
    console.error(error);
    return res.status(500).json(errorHandling(null, 'Internal Server Error.'));
  }
};


export { createMedicalReport, getMedicalReports };