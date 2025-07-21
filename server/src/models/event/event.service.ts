import { events } from '../../app';
import { TEvent } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { sortEvents } from '../../utils/sort-events';
import status from 'http-status';
import apiError from '../../middlewares/api-error';
import validateInput from '../../utils/input-validation';
import { Response } from 'express';

// create event service
const createEventIntoDB = (payload: TEvent, res: Response) => {
    const { title, date, time, notes, archived = false } = payload;
    const validatedEvent = validateInput({
        title,
        date,
        time,
        notes,
        archived,
    });
    if (!validatedEvent.isValid) {
        return res
            .status(status.BAD_REQUEST)
            .json({ errors: validatedEvent.errors });
    }
    const category = "Other";
    const newEvent: TEvent = {
        id: uuidv4(),
        title,
        date,
        time,
        notes,
        category,
        archived,
    };

    events.push(newEvent);
    return events;
};

// get event service
const getEventFromDB = (query?: string) => {
    if (query) {
        const filteredEvents = events.filter(
            (event) => event.category === query,
        );
        return filteredEvents;
    }
    const sortedEvents = sortEvents(events);
    return sortedEvents;
};

// update event service
const updateEventIntoDB = (id: string) => {
    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
        throw new apiError('Event not found', status.NOT_FOUND);
    }
    events[eventIndex] = {
        ...events[eventIndex],
        archived: !events[eventIndex].archived,
    };
    return events;
};

//deelte event
const deleteEventFromDB = (id: string) => {
    const eventIndex = events.findIndex((event) => event.id === id);

    if (eventIndex === -1) {
        throw new apiError('Event not found', status.NOT_FOUND);
    }

    // Remove from events array
    events.splice(eventIndex, 1);
    return events;
};

export const EventServices = {
    getEventFromDB,
    createEventIntoDB,
    updateEventIntoDB,
    deleteEventFromDB,
};
