"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventControllers = void 0;
const event_service_1 = require("./event.service");
const http_status_1 = __importDefault(require("http-status"));
const createEvent = (req, res) => {
    const result = event_service_1.EventServices.createEventIntoDB(req.body, res);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: 'Events created successfully',
        data: result,
    });
};
const getEvent = (req, res) => {
    const result = event_service_1.EventServices.getEventFromDB(req.query.filterBy);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Events fetched successfully',
        data: result,
    });
};
const updateEvent = (req, res) => {
    const result = event_service_1.EventServices.updateEventIntoDB(req.params.id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Events updated successfully',
        data: result,
    });
};
const deleteEvent = (req, res) => {
    const result = event_service_1.EventServices.deleteEventFromDB(req.params.id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Events deleted successfully',
        data: result,
    });
};
exports.EventControllers = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
};
