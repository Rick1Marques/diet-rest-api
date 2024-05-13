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
exports.postLogin = exports.postSignup = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const error_handling_1 = require("../util/error-handling");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new error_handling_1.CustomError("Validation failed", 422, errors.array());
            throw error;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const user = new user_1.default({ name: name, email: email, password: hashedPassword });
        yield user.save();
        res.status(201).json({ message: "New user created!", user: user });
    }
    catch (error) {
        next(error);
    }
});
exports.postSignup = postSignup;
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const user = yield user_1.default.findOne({ name: name });
        const token = jsonwebtoken_1.default.sign({ name: name, userId: user._id.toString() }, "someLongSecretString", {
            expiresIn: "1h",
        });
        res.status(200).json({ token: token, userId: user._id.toString() });
    }
    catch (error) {
        next(error);
    }
});
exports.postLogin = postLogin;
