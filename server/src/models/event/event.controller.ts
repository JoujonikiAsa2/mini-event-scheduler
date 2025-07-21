import { Request, Response } from 'express';
import { EventServices } from './event.service';
import status from 'http-status';

const getEvent = (req: Request, res: Response) => {
    const result = EventServices.getEventFromDB();
    res.status(status.OK).json(result);
};

export const EventControllers = {
    getEvent,
};
