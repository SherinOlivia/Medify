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
exports.registerMedicalFacility = exports.registerMedicalPersonnel = exports.registerUserByAdmin = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const userModel_1 = __importDefault(require("../models/userModel"));
const medicalPersonnelModel_1 = __importDefault(require("../models/medicalPersonnelModel"));
const medicalFacilityModel_1 = __importDefault(require("../models/medicalFacilityModel"));
const errorHandling_1 = require("./errorHandling");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, username, email, password } = req.body;
        if (!validator_1.default.isEmail(email)) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Invalid email format"));
        }
        const existingUser = yield userModel_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Username already exists...!!"));
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield userModel_1.default.create({ first_name, last_name, username, email, password: passwordHash, role: 'patient' });
        res.status(200).json({
            message: 'User successfully registered',
            data: newUser._id,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Invalid Register Request..!!' });
        next(error);
    }
});
exports.registerUser = registerUser;
const registerUserByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, username, email, password, role } = req.body;
        const rolesEnum = ['staff', 'patient'];
        if (!rolesEnum.includes(role)) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, `Invalid role. Allowed roles are: ${rolesEnum.join(', ')}`));
        }
        const existingUser = yield userModel_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Username already exists...!!"));
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield userModel_1.default.create({ first_name, last_name, username, email, password: passwordHash, role });
        res.status(200).json({
            message: 'User successfully registered by admin',
            data: newUser._id,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Invalid Register Request..!!' });
        next(error);
    }
});
exports.registerUserByAdmin = registerUserByAdmin;
const registerMedicalPersonnel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, username, email, password, specialization, hospital, role } = req.body;
        const rolesEnum = ['medical_admin', 'doctor'];
        if (!rolesEnum.includes(role)) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, `Invalid role. Allowed roles are: ${rolesEnum.join(', ')}`));
        }
        const existingMedicalPersonnel = yield medicalPersonnelModel_1.default.findOne({ username });
        if (existingMedicalPersonnel) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Medical personnel with this username already exists...!!"));
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const newMedicalPersonnel = yield medicalPersonnelModel_1.default.create({ first_name, last_name, username, email, password: passwordHash, specialization, hospital, role });
        res.status(200).json({
            message: 'Medical personnel successfully registered',
            data: newMedicalPersonnel._id,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Invalid Register Request..!!' });
        next(error);
    }
});
exports.registerMedicalPersonnel = registerMedicalPersonnel;
const registerMedicalFacility = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location, email, contact } = req.body;
        if (!validator_1.default.isEmail(email)) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Invalid email format"));
        }
        const existingFacility = yield medicalFacilityModel_1.default.findOne({ name });
        if (existingFacility) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, `Medical facility with the name ${name} already exists...!!`));
        }
        const newFacility = yield medicalFacilityModel_1.default.create({ name, location, email, contact });
        res.status(200).json({
            message: 'Medical facility successfully registered',
            data: newFacility._id,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Invalid Register Request..!!' });
        next(error);
    }
});
exports.registerMedicalFacility = registerMedicalFacility;
