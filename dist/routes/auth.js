"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const authControllers = __importStar(require("../controllers/auth"));
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_handling_1 = require("../util/error-handling");
const router = (0, express_1.Router)();
router.post("/signup", [
    (0, express_validator_1.check)("name")
        .notEmpty()
        .withMessage("Name is required")
        .isAlphanumeric()
        .withMessage("Name must countain only alphanumeric characters")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ name: value });
        if (user) {
            return Promise.reject("Name is already in use");
        }
    })),
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("Email address must be valid")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email: value });
        if (user) {
            return Promise.reject("Email address is already in use");
        }
    })),
    (0, express_validator_1.check)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[$&+,:;=?@#|'<>.^*()%!-]/)
        .withMessage("Password must contain at least one symbol"),
    (0, express_validator_1.check)("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password does not match");
        }
        return true;
    }),
], authControllers.postSignup);
router.post("/login", [
    (0, express_validator_1.check)("name")
        .notEmpty()
        .withMessage("Name is required")
        .isAlphanumeric()
        .withMessage("Name must countain only alphanumeric characters")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ name: value });
        if (!user) {
            return Promise.reject("Password and/or name of user is/are wrong");
        }
    })),
    (0, express_validator_1.check)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[$&+,:;=?@#|'<>.^*()%!-]/)
        .withMessage("Password must contain at least one symbol")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ name: req.body.name });
        const doMatch = yield bcrypt_1.default.compare(value, user.password);
        if (!doMatch) {
            const error = new error_handling_1.CustomError("Password and/or name of user is/are wrong", 401);
            throw error;
        }
        return true;
    })),
], authControllers.postLogin);
exports.default = router;
