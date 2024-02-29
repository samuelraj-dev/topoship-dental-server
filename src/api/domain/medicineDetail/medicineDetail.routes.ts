import express from "express";
// import { createPatientSchema } from "./appointment.schema";
// import validateResource from "../../middleware/validateResource";

const router = express.Router();

import {
    getAllMedicineDetailHandler,
    getMedicineDetailHandler,
    createMedicineDetailHandler,
    // updateVisitHandler,
    // deleteVisitHandler,
} from "./medicineDetail.controller";

router.get('/', getAllMedicineDetailHandler)
router.get('/:id', getMedicineDetailHandler)
router.post('/:id', createMedicineDetailHandler)
// router.post('/', validateResource(createPatientSchema), createPatientHandler)
// router.patch('/:id', updateVisitHandler)
// router.delete('/:id', deleteVisitHandler)

export default router;