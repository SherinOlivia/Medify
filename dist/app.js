"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoMiddleware_1 = __importDefault(require("./middleware/mongoMiddleware"));
// import router from './router/mainRouter';
require("dotenv/config");
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(mongoMiddleware_1.default);
// app.use(router)
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});
