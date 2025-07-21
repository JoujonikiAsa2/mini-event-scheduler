import { Router } from "express";
import { EventControllers } from "./event.controller";

const router = Router()

router.get('/',EventControllers.getEvent)

export const EventRoutes = router