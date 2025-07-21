import { Router } from "express";
import { EventControllers } from "./event.controller";

const router = Router()

router.post('/',EventControllers.createEvent)
router.get('/',EventControllers.getEvent)
router.put('/:id',EventControllers.updateEvent)
router.delete('/:id',EventControllers.deleteEvent)

export const EventRoutes = router