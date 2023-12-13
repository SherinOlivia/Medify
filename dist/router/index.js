"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = exports.userRouter = exports.medicalPersonnelRouter = exports.medicalFacilityRouter = exports.adminAuthRouter = exports.authRouter = void 0;
var authRouter_1 = require("./authRouter");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(authRouter_1).default; } });
var adminAuthRouter_1 = require("./adminAuthRouter");
Object.defineProperty(exports, "adminAuthRouter", { enumerable: true, get: function () { return __importDefault(adminAuthRouter_1).default; } });
var medicalFacilityRouter_1 = require("./medicalFacilityRouter");
Object.defineProperty(exports, "medicalFacilityRouter", { enumerable: true, get: function () { return __importDefault(medicalFacilityRouter_1).default; } });
var medicalPersonnelRouter_1 = require("./medicalPersonnelRouter");
Object.defineProperty(exports, "medicalPersonnelRouter", { enumerable: true, get: function () { return __importDefault(medicalPersonnelRouter_1).default; } });
var userRouter_1 = require("./userRouter");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(userRouter_1).default; } });
var appointmentRouter_1 = require("./appointmentRouter");
Object.defineProperty(exports, "appointmentRouter", { enumerable: true, get: function () { return __importDefault(appointmentRouter_1).default; } });
