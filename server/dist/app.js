"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const not_found_1 = __importDefault(require("./middlewares/not-found"));
const global_error_handler_1 = __importDefault(require("./middlewares/global-error-handler"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)({ origin: ['http://localhost:5173', 'http://localhost:5174/'] }));
app.use(express_1.default.json());
//routes
app.use('/', routes_1.default);
//health check
app.get('/', (req, res) => {
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Application running on the background successfully!',
    });
});
app.use(not_found_1.default);
app.use(global_error_handler_1.default);
exports.default = app;
