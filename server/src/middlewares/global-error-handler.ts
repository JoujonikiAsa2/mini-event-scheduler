import { ErrorRequestHandler } from 'express';
import config from '../config';
import status from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err?.message,
        errorSources: err,
        stack: config.nodeEnv === 'development' ? err?.stack : null,
    });
    next();
};

export default globalErrorHandler;
