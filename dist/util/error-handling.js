"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, code, errData) {
        super(message);
        this.statusCode = code;
        this.data = errData;
    }
}
exports.CustomError = CustomError;
