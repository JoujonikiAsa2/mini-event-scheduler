import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import notFound from './middlewares/not-found';
import globalErrorHandler from './middlewares/global-error-handler';
import status from 'http-status';
const app: Application = express();

// middlewares
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'http://localhost:5174',
            'https://mini-event-scheduler-nu.vercel.app',
        ],
    }),
);
app.use(express.json());

//routes
app.use('/', router);

//health check
app.get('/', (req: Request, res: Response) => {
    res.status(status.OK).json({
        success: true,
        message: 'Application running on the background successfully!',
    });
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
