import { Request, Response } from 'express';
import { EventServices } from './event.service';
import status from 'http-status';

const createEvent = (req: Request, res: Response) => {
    const result = EventServices.createEventIntoDB(req.body,res);
    res.status(status.CREATED).json({
        success: true,
        message: 'Events created successfully',
        data: result,
    });
};

const getEvent = (req: Request, res: Response) => {
    const result = EventServices.getEventFromDB(req.query.filterBy as string);
    res.status(status.OK).json({
        success: true,
        message: 'Events fetched successfully',
        data: result,
    });
};

const updateEvent = (req: Request, res: Response) => {
    const result = EventServices.updateEventIntoDB(req.params.id);
    res.status(status.OK).json({
        success: true,
        message: 'Events updated successfully',
        data: result,
    });
};


const deleteEvent = (req: Request, res: Response) => {
    const result = EventServices.deleteEventFromDB(req.params.id);
    res.status(status.OK).json({
        success: true,
        message: 'Events deleted successfully',
        data: result,
    });
};

export const EventControllers = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
};
