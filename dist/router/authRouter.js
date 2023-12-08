"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerController_1 = require("../controller/registerController");
const loginController_1 = __importDefault(require("../controller/loginController"));
const authRouter = express_1.default.Router();
authRouter.post('/register', registerController_1.registerUser);
authRouter.post('/login', loginController_1.default);
exports.default = authRouter;
