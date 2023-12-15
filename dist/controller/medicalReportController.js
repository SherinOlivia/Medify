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
exports.getMedicalReports = exports.createMedicalReport = void 0;
const medicalReportModel_1 = __importDefault(require("../models/medicalReportModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const errorHandling_1 = require("./errorHandling");
const medicalPersonnelModel_1 = __importDefault(require("../models/medicalPersonnelModel"));
const createMedicalReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointmentId, doctorNote } = req.body;
        if (!appointmentId || !doctorNote) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, 'Invalid medical report data.'));
        }
        const appointment = yield appointmentModel_1.default.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json((0, errorHandling_1.errorHandling)(null, 'Associated appointment not found.'));
        }
        const newMedicalReport = new medicalReportModel_1.default({
            appointment: appointmentId,
            doctorNote,
        });
        const savedReport = yield newMedicalReport.save();
        return res.status(201).json((0, errorHandling_1.errorHandling)({
            message: 'Medical report successfully created',
            data: savedReport,
        }, null));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, 'Internal Server Error.'));
    }
});
exports.createMedicalReport = createMedicalReport;
const getMedicalReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        let medicalReports = null;
        if (user.role === 'patient') {
            medicalReports = yield medicalReportModel_1.default.find({ patient: user.id });
        }
        else if (user.role === 'medical_admin') {
            const personnel = yield medicalPersonnelModel_1.default.findById(user.id);
            medicalReports = yield medicalReportModel_1.default.find({ hospital: personnel === null || personnel === void 0 ? void 0 : personnel.hospital });
        }
        else if (user.role === 'doctor') {
            medicalReports = yield medicalReportModel_1.default.find({ doctor: user.id });
        }
        else if (user.role === 'staff' || user.role === 'admin') {
            medicalReports = yield medicalReportModel_1.default.find();
        }
        else {
            return res.status(403).json((0, errorHandling_1.errorHandling)(null, 'Forbidden Access'));
        }
        return res.status(200).json((0, errorHandling_1.errorHandling)({
            message: 'List of Medical Reports',
            data: medicalReports,
        }, null));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, 'Internal Server Error.'));
    }
});
exports.getMedicalReports = getMedicalReports;
