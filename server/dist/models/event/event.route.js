"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = require("express");
const event_controller_1 = require("./event.controller");
const router = (0, express_1.Router)();
router.get('/', event_controller_1.EventControllers.getEvent);
exports.EventRoutes = router;
