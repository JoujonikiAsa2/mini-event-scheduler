"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventControllers = void 0;
const event_service_1 = require("./event.service");
const http_status_1 = __importDefault(require("http-status"));
const getEvent = (req, res) => {
    const result = event_service_1.EventServices.getEventFromDB();
    res.status(http_status_1.default.OK).json(result);
};
exports.EventControllers = {
    getEvent,
};
