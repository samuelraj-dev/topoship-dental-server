"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const resetPassword_controller_1 = require("./resetPassword.controller");
router.post('/', resetPassword_controller_1.resetPasswordEmailHandler);
router.post('/:id/:passwordResetCode', resetPassword_controller_1.resetPasswordHandler);
exports.default = router;
//# sourceMappingURL=resetPassword.routes.js.map