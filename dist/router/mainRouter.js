"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const authRouter_1 = __importDefault(require("./authRouter"));
const adminAuthRouter_1 = __importDefault(require("./adminAuthRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const medicalPersonnelRouter_1 = __importDefault(require("./medicalPersonnelRouter"));
const medicalFacilityRouter_1 = __importDefault(require("./medicalFacilityRouter"));
const router = express_1.default.Router();
router.get("/", function (req, res) {
    res.status(200).json({
        success: true,
        message: "Hello, this is Medify! Group [e]'s Final Project!"
    });
});
router.use('/api/v1/auth', authRouter_1.default);
router.use('/api/v1/admin/auth', authenticationMiddleware_1.default, adminAuthRouter_1.default);
router.use('/api/v1/user', authenticationMiddleware_1.default, userRouter_1.default);
router.use('/api/v1/medic', authenticationMiddleware_1.default, medicalPersonnelRouter_1.default);
router.use('/api/v1/facility', authenticationMiddleware_1.default, medicalFacilityRouter_1.default);
exports.default = router;
