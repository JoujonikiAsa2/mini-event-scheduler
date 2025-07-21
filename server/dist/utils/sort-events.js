"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortEvents = void 0;
const sortEvents = (events) => {
    return [...events].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        console.log(dateA, dateB);
        return dateA.getTime() - dateB.getTime();
    });
};
exports.sortEvents = sortEvents;
