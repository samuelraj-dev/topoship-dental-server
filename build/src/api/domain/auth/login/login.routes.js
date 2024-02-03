"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireUser_1 = __importDefault(require("../../../middleware/requireUser"));
const router = express_1.default.Router();
const login_controller_1 = require("./login.controller");
router.post('/', login_controller_1.createSessionHandler);
router.get('/me', login_controller_1.getCurrentUserHandler);
router.get('/refresh', login_controller_1.refreshAccessTokenHandler);
router.delete('/delete', requireUser_1.default, login_controller_1.deleteSessionHandler);
exports.default = router;
//# sourceMappingURL=login.routes.js.map