"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventServices = void 0;
const getEventFromDB = () => {
    const response = {
        success: true,
        message: 'Events fetched successfully',
    };
    return response;
};
exports.EventServices = {
    getEventFromDB,
};
