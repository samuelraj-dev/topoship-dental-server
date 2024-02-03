"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const medicine_controller_1 = require("./medicine.controller");
router.get('/', medicine_controller_1.getAllMedicineHandler);
router.get('/:id', medicine_controller_1.getMedicineHandler);
router.post('/', medicine_controller_1.createMedicineHandler);
router.patch('/:id', medicine_controller_1.updateMedicineHandler);
router.delete('/:id', medicine_controller_1.deleteMedicineHandler);
exports.default = router;
//# sourceMappingURL=medicine.routes.js.map