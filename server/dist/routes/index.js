"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const event_route_1 = require("../models/event/event.route");
const router = (0, express_1.Router)();
exports.routes = [
    {
        path: '/events',
        route: event_route_1.EventRoutes,
    },
];
exports.routes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
