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
exports.deletePatientHandler = exports.updatePatientHandler = exports.createPatientHandler = exports.getPatientHandler = exports.getAllPatientHandler = void 0;
const patient_service_1 = require("./patient.service");
function getAllPatientHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patients = yield (0, patient_service_1.getAllPatient)();
        if (!patients) {
            return res.sendStatus(404);
        }
        return res.status(200).json(patients);
    });
}
exports.getAllPatientHandler = getAllPatientHandler;
function getPatientHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patient = yield (0, patient_service_1.getPatient)({ id: req.params.id });
        if (!patient) {
            return res.sendStatus(404);
        }
        return res.status(200).json(patient);
    });
}
exports.getPatientHandler = getPatientHandler;
function createPatientHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patient = yield (0, patient_service_1.createPatient)(req.body);
        if (!patient) {
            return res.sendStatus(404);
        }
        return res.status(200).json({ message: 'Patient Created...', patient });
    });
}
exports.createPatientHandler = createPatientHandler;
function updatePatientHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patient = yield (0, patient_service_1.updatePatient)(req.body, req.params.id);
        if (!patient) {
            return res.sendStatus(404);
        }
        return res.status(200).json({ message: 'Patient Updated...', patient });
    });
}
exports.updatePatientHandler = updatePatientHandler;
function deletePatientHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patient = yield (0, patient_service_1.deletePatient)(req.params.id);
        if (!patient) {
            return res.sendStatus(404);
        }
        return res.status(200).json({ message: 'Patient Deleted...', patient });
    });
}
exports.deletePatientHandler = deletePatientHandler;
//# sourceMappingURL=patient.controller.js.map