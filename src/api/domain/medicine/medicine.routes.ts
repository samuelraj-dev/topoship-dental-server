import express from "express";
// import { createPatientSchema } from "./medicine.schema";
import validateResource from "../../middleware/validateResource";

const router = express.Router();

import {
    getAllMedicineHandler,
    getMedicineHandler,
    createMedicineHandler,
    updateMedicineHandler,
    deleteMedicineHandler,
} from "./medicine.controller";

router.get('/', getAllMedicineHandler)
router.get('/:id', getMedicineHandler)
router.post('/', createMedicineHandler)
// router.post('/', validateResource(createPatientSchema), createPatientHandler)
router.patch('/:id', updateMedicineHandler)
router.delete('/:id', deleteMedicineHandler)

export default router;