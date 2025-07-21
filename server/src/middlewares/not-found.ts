import { Request, Response } from 'express';
import status from 'http-status';

const notFound = (req: Request, res: Response) => {
    res.status(status.NOT_FOUND).json({
        status: false,
        message: `The requested URL [${req.url}] was not found on this server`,
    });
};

export default notFound;
