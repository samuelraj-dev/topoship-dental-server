"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const register_controller_1 = require("./register.controller");
router.post('/create', register_controller_1.createClinicHandler);
router.post('/', register_controller_1.registerClinicHandler);
router.post('/verify/:id/:verificationCode', register_controller_1.verifyClinicHandler);
router.post('/get-data', register_controller_1.getClinicDataHandler);
exports.default = router;
//# sourceMappingURL=register.routes.js.map