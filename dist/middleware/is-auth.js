"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handling_1 = require("../util/error-handling");
const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new error_handling_1.CustomError("Not authenticated", 401);
        throw error;
    }
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, "someLongSecretString");
    }
    catch (error) {
        throw error;
    }
    if (!decodedToken) {
        const error = new error_handling_1.CustomError("Not authenticated", 401);
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};
exports.isAuth = isAuth;
