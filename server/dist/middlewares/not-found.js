"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const notFound = (req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        status: false,
        message: `The requested URL [${req.url}] was not found on this server`,
    });
};
exports.default = notFound;
