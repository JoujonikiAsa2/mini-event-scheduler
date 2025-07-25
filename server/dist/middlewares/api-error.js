"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class apiError extends Error {
    constructor(message, statusCode, stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = apiError;
