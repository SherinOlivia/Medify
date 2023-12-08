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
const console_1 = require("console");
const errorHandling_1 = require("./errorHandling");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, username, email, password } = req.body;
        const collection = req.db.collection("users");
        const user = yield collection.findOne({ username });
        if (user) {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Username already exists...!!"));
            return;
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield collection.insertOne({ first_name, last_name, username, email, password: passwordHash, role: 'patient' });
        const newUserData = yield collection.findOne({ _id: newUser.insertedId });
        res.status(200).json({
            message: 'User successfully registered',
            data: newUser.insertedId,
        });
        console.log("new user:", newUser, newUser.insertedId);
        console.log("new Userr:", newUserData);
    }
    catch (error) {
        res.status(500).json({ error: 'Invalid Register Request..!!' });
    }
    next(console_1.error);
});
exports.registerUser = registerUser;
const registerUserByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, username, email, password, role } = req.body;
        const rolesEnum = ['staff', 'patient'];
        const collection = req.db.collection("users");
        if (!rolesEnum.includes(role)) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, `Invalid role. Allowed roles are: ${rolesEnum.join(', ')}`));
        }
        const user = yield collection.findOne({ username });
        if (user) {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Username already exists...!!"));
            return;
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield collection.insertOne({ first_name, last_name, username, email, password: passwordHash, role });
        const newUserData = yield collection.findOne({ _id: newUser.insertedId });
        res.status(200).json({
            message: 'User successfully registered by admin',
            data: newUser.insertedId,
        });
        console.log("new user:", newUser, newUser.insertedId);
        console.log("new Userr:", newUserData);
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
        const collection = req.db.collection("medicalPersonnels");
        if (!rolesEnum.includes(role)) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, `Invalid role. Allowed roles are: ${rolesEnum.join(', ')}`));
        }
        const medicalPersonnel = yield collection.findOne({ username });
        if (medicalPersonnel) {
            res.status(400).json((0, errorHandling_1.errorHandling)(null, "Medical personnel with this username already exists...!!"));
            return;
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const newMedicalPersonnel = yield collection.insertOne({ first_name, last_name, username, email, password: passwordHash, specialization, hospital, role });
        const newMedicalPersonnelData = yield collection.findOne({ _id: newMedicalPersonnel.insertedId });
        res.status(200).json({
            message: 'Medical personnel successfully registered',
            data: newMedicalPersonnel.insertedId,
        });
        console.log("new medical personnel:", newMedicalPersonnel, newMedicalPersonnel.insertedId);
        console.log("new Medical Personnel:", newMedicalPersonnelData);
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
        const collection = req.db.collection("medicalFacilities");
        const existingFacility = yield collection.findOne({ name });
        if (existingFacility) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, `Medical facility with the name ${name} already exists...!!`));
        }
        const newFacility = yield collection.insertOne({ name, location, email, contact });
        const newFacilityData = yield collection.findOne({ _id: newFacility.insertedId });
        res.status(200).json({
            message: 'Medical facility successfully registered',
            data: newFacility.insertedId,
        });
        console.log("new medical facility:", newFacility, newFacility.insertedId);
        console.log("new medical facility:", newFacilityData);
    }
    catch (error) {
        res.status(500).json({ error: 'Invalid Register Request..!!' });
        next(error);
    }
});
exports.registerMedicalFacility = registerMedicalFacility;
