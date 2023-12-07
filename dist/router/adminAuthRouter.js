"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorizationMiddleware_1 = __importDefault(require("../middleware/authorizationMiddleware"));
const registerController_1 = require("../controller/registerController");
const adminAuthRouter = express_1.default.Router();
adminAuthRouter.post('/admin/registeruser', (0, authorizationMiddleware_1.default)(['admin']), registerController_1.registerUserByAdmin);
adminAuthRouter.post('/admin/registerpersonnel', (0, authorizationMiddleware_1.default)(['staff', 'admin']), registerController_1.registerMedicalPersonnel);
adminAuthRouter.post('/admin/registerfacility', (0, authorizationMiddleware_1.default)(['admin']), registerController_1.registerMedicalFacility);
exports.default = adminAuthRouter;
