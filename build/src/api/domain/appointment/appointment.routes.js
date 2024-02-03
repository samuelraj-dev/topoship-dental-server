"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const appointment_controller_1 = require("./appointment.controller");
router.get('/', appointment_controller_1.getAllAppointmentHandler);
router.get('/:id', appointment_controller_1.getAppointmentHandler);
router.post('/', appointment_controller_1.createAppointmentHandler);
router.patch('/:id', appointment_controller_1.updateAppointmentHandler);
router.delete('/:id', appointment_controller_1.deleteAppointmentHandler);
exports.default = router;
//# sourceMappingURL=appointment.routes.js.map