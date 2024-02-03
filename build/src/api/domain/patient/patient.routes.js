"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const patient_controller_1 = require("./patient.controller");
router.get('/', patient_controller_1.getAllPatientHandler);
router.get('/:id', patient_controller_1.getPatientHandler);
router.post('/', patient_controller_1.createPatientHandler);
router.patch('/:id', patient_controller_1.updatePatientHandler);
router.delete('/:id', patient_controller_1.deletePatientHandler);
exports.default = router;
//# sourceMappingURL=patient.routes.js.map