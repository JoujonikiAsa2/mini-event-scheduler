"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventServices = void 0;
const app_1 = require("../../app");
const uuid_1 = require("uuid");
const sort_events_1 = require("../../utils/sort-events");
const http_status_1 = __importDefault(require("http-status"));
const api_error_1 = __importDefault(require("../../middlewares/api-error"));
const input_validation_1 = __importDefault(require("../../utils/input-validation"));
const categorize_event_1 = require("../../utils/categorize-event");
// create event service
const createEventIntoDB = (payload, res) => {
    const { title, date, time, notes, archived = false } = payload;
    const validatedEvent = (0, input_validation_1.default)({
        title,
        date,
        time,
        notes,
        archived,
    });
    if (!validatedEvent.isValid) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .json({ errors: validatedEvent.errors });
    }
    const category = (0, categorize_event_1.categorizeEvent)(title, notes);
    const newEvent = {
        id: (0, uuid_1.v4)(),
        title,
        date,
        time,
        notes,
        category,
        archived,
    };
    app_1.events.push(newEvent);
    return app_1.events;
};
// get event service
const getEventFromDB = (query) => {
    if (query) {
        const filteredEvents = app_1.events.filter((event) => event.category === query);
        return filteredEvents;
    }
    const sortedEvents = (0, sort_events_1.sortEvents)(app_1.events);
    return sortedEvents;
};
// update event service
const updateEventIntoDB = (id) => {
    const eventIndex = app_1.events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
        throw new api_error_1.default('Event not found', http_status_1.default.NOT_FOUND);
    }
    app_1.events[eventIndex] = {
        ...app_1.events[eventIndex],
        archived: !app_1.events[eventIndex].archived,
    };
    return app_1.events;
};
//deelte event
const deleteEventFromDB = (id) => {
    const eventIndex = app_1.events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
        throw new api_error_1.default('Event not found', http_status_1.default.NOT_FOUND);
    }
    // Remove from events array
    app_1.events.splice(eventIndex, 1);
    return app_1.events;
};
exports.EventServices = {
    getEventFromDB,
    createEventIntoDB,
    updateEventIntoDB,
    deleteEventFromDB,
};
