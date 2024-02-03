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
exports.deleteMedicineHandler = exports.updateMedicineHandler = exports.createMedicineHandler = exports.getMedicineHandler = exports.getAllMedicineHandler = void 0;
const medicine_service_1 = require("./medicine.service");
function getAllMedicineHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const appointments = yield (0, medicine_service_1.getAllMedicine)();
        if (!appointments) {
            return res.sendStatus(404);
        }
        return res.status(200).json(appointments);
    });
}
exports.getAllMedicineHandler = getAllMedicineHandler;
function getMedicineHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const appointment = yield (0, medicine_service_1.getMedicine)({ id: req.params.id });
        if (!appointment) {
            return res.sendStatus(404);
        }
        return res.status(200).json(appointment);
    });
}
exports.getMedicineHandler = getMedicineHandler;
function createMedicineHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patient = yield (0, medicine_service_1.createMedicine)(req.body);
        if (!patient) {
            return res.sendStatus(404);
        }
        return res.status(200).json({ message: 'Patient Created...', patient });
    });
}
exports.createMedicineHandler = createMedicineHandler;
function updateMedicineHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.updateMedicineHandler = updateMedicineHandler;
function deleteMedicineHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.deleteMedicineHandler = deleteMedicineHandler;
//# sourceMappingURL=medicine.controller.js.map