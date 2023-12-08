"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorsList = exports.getMedicalPersonnelProfile = exports.getDoctorProfile = void 0;
const medicalPersonnelModel_1 = __importDefault(require("../models/medicalPersonnelModel"));
const errorHandling_1 = require("./errorHandling");
const getDoctorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorId = req.params.doctorId;
        const doctor = yield medicalPersonnelModel_1.default.findById(doctorId);
        if (doctor) {
            return res.status(200).json((0, errorHandling_1.errorHandling)({
                message: `${doctor.username}'s Profile`,
                data: doctor
            }, null));
        }
        else {
            return res.status(404).json((0, errorHandling_1.errorHandling)(null, 'Doctor/Specialist not found.'));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, 'Internal Server Error.'));
    }
});
exports.getDoctorProfile = getDoctorProfile;
const getMedicalPersonnelProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const medicalPersonnelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!medicalPersonnelId) {
            return res.status(403).json((0, errorHandling_1.errorHandling)(null, 'Forbidden Access'));
        }
        const medicalPersonnel = yield medicalPersonnelModel_1.default.findById(medicalPersonnelId);
        if (medicalPersonnel) {
            return res.status(200).json((0, errorHandling_1.errorHandling)({
                message: `${medicalPersonnel.username}'s Profile`,
                data: medicalPersonnel
            }, null));
        }
        else {
            return res.status(404).json((0, errorHandling_1.errorHandling)(null, 'Medical personnel not found.'));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, 'Internal Server Error.'));
    }
});
exports.getMedicalPersonnelProfile = getMedicalPersonnelProfile;
// List Medical Personnel
const getDoctorsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield medicalPersonnelModel_1.default.find({ role: 'doctor' });
        return res.status(200).json((0, errorHandling_1.errorHandling)({
            message: "List of Doctors and Specialists",
            data: doctors
        }, null));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, 'Internal Server Error.'));
    }
});
exports.getDoctorsList = getDoctorsList;
