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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
require("dotenv/config");
const uri = 'mongodb+srv://admin:admin@cluster0.kip1euw.mongodb.net/?retryWrites=true&w=majority';
const mongoMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let client = null;
    try {
        console.log("MongoDB Connection Test..!");
        client = yield new mongodb_1.MongoClient(uri).connect();
        const db = client.db('chatApp');
        req.db = db;
        if (db) {
            console.log("MongoDB Connection Succeed..!");
            next();
        }
        else {
            console.log("MongoDB Connection Failed...");
        }
    }
    catch (error) {
        console.log("MongoDB Connection Failed..:", error);
    }
    finally {
        res.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            if (client) {
                yield client.close();
                console.log("MongoDB Connection Closed..!");
            }
        }));
    }
});
exports.default = mongoMiddleware;
