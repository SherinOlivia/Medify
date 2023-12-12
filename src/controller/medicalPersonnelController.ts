import { Request, Response } from 'express';
import MedicalPersonnelModel from '../models/medicalPersonnelModel';
import { errorHandling } from './errorHandling';

const getDoctorProfile = async (req: Request, res: Response) => {
    try {
        const doctorId = req.params.doctorId;
        const doctor = await MedicalPersonnelModel.findById(doctorId);

        if (doctor) {
            return res.status(200).json(
                errorHandling({
                    message: `${doctor.username}'s Profile`,
                    data: doctor
                },
                null)
            );
        } else {
            return res.status(404).json(errorHandling(null, 'Doctor/Specialist not found.'));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(errorHandling(null, 'Internal Server Error.'));
    }
};

const getMedicalPersonnelProfile = async (req: Request, res: Response) => {
    try {
        const medicalPersonnelId = req.user?.id;

        if (!medicalPersonnelId) {
            return res.status(403).json(errorHandling(null, 'Forbidden Access'));
        }

        const medicalPersonnel = await MedicalPersonnelModel.findById(medicalPersonnelId);

        if (medicalPersonnel) {
            return res.status(200).json(
                errorHandling({
                    message: `${medicalPersonnel.username}'s Profile`,
                    data: medicalPersonnel
                },
                null)
            );
        } else {
            return res.status(404).json(errorHandling(null, 'Medical personnel not found.'));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(errorHandling(null, 'Internal Server Error.'));
    }
};

const getDoctorsList = async (req: Request, res: Response) => {
    try {
        const doctors = await MedicalPersonnelModel.find({ role: 'doctor' });

        return res.status(200).json(
            errorHandling({
                message: "List of Doctors and Specialists",
                data: doctors
            },
            null)
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json(errorHandling(null, 'Internal Server Error.'));
    }
};

export { getDoctorProfile, getMedicalPersonnelProfile, getDoctorsList };
