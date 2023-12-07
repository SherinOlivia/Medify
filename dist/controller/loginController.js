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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtconfig_1 = __importDefault(require("../config/jwtconfig"));
const errorHandling_1 = require("./errorHandling");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usernameOrEmail, password } = req.body;
        const collection = req.db.collection("users");
        let user;
        if (usernameOrEmail.includes('@')) {
            user = yield collection.findOne({ email: usernameOrEmail });
        }
        else {
            user = yield collection.findOne({ username: usernameOrEmail });
        }
        if (!user) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "User not found. Please check your credentials."));
        }
        const passwordCheck = yield bcrypt_1.default.compare(password, user.password);
        if (passwordCheck) {
            const token = jsonwebtoken_1.default.sign({ username: user.username, id: user._id, role: user.role }, jwtconfig_1.default);
            res.status(200).json((0, errorHandling_1.errorHandling)({
                message: `${user.username} Successfully logged in as ${user.role}`,
                data: token
            }, null));
        }
        else {
            res.status(400).json((0, errorHandling_1.errorHandling)("Password is incorrect", null));
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, errorHandling_1.errorHandling)("Cannot Connect!! Internal Error!", null));
    }
});
exports.default = loginUser;
