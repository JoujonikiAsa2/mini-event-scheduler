import { Router } from "express";
import { EventRoutes } from "../models/event/event.route";
const router = Router()

export const routes = [
    {
        path: '/events',
        route: EventRoutes, 
    },
];

routes.forEach(({ path, route }) => router.use(path, route));
export default router;