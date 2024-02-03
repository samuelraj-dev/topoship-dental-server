"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("../routes/index"));
const deserializeUser_1 = __importDefault(require("../api/middleware/deserializeUser"));
function createServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: config_1.default.get('origin'),
        credentials: true,
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use(deserializeUser_1.default);
    (0, index_1.default)(app);
    return app;
}
exports.default = createServer;
//# sourceMappingURL=server.js.map