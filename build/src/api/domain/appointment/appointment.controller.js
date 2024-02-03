"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointmentHandler = exports.updateAppointmentHandler = exports.createAppointmentHandler = exports.getAppointmentHandler = exports.getAllAppointmentHandler = void 0;
const appointment_service_1 = require("./appointment.service");
function getAllAppointmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const appointments = yield (0, appointment_service_1.getAllAppointment)();
        if (!appointments) {
            return res.sendStatus(404);
        }
        return res.status(200).json(appointments);
    });
}
exports.getAllAppointmentHandler = getAllAppointmentHandler;
function getAppointmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const appointment = yield (0, appointment_service_1.getAppointment)({ id: req.params.id });
        if (!appointment) {
            return res.sendStatus(404);
        }
        return res.status(200).json(appointment);
    });
}
exports.getAppointmentHandler = getAppointmentHandler;
function createAppointmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patient = yield (0, appointment_service_1.createAppointment)(req.body);
        if (!patient) {
            return res.sendStatus(404);
        }
        return res.status(200).json({ message: 'Appointment Created...', patient });
    });
}
exports.createAppointmentHandler = createAppointmentHandler;
function updateAppointmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patient = yield (0, appointment_service_1.updateAppointment)(req.body, req.params.id);
        if (!patient) {
            return res.sendStatus(404);
        }
        return res.status(200).json({ message: 'Appointment Updated...', patient });
    });
}
exports.updateAppointmentHandler = updateAppointmentHandler;
function deleteAppointmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patient = yield (0, appointment_service_1.deleteAppointment)(req.params.id);
        if (!patient) {
            return res.sendStatus(404);
        }
        return res.status(200).json({ message: 'Appointment Deleted...', patient });
    });
}
exports.deleteAppointmentHandler = deleteAppointmentHandler;
//# sourceMappingURL=appointment.controller.js.map