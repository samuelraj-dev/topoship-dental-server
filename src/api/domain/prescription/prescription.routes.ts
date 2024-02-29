import express from "express";
// import { createPatientSchema } from "./appointment.schema";
// import validateResource from "../../middleware/validateResource";

const router = express.Router();

import {
    getAllPrescriptionHandler,
    getPrescriptionHandler,
    createPrescriptionHandler,
    // updateVisitHandler,
    // deleteVisitHandler,
} from "./prescription.controller";

router.get('/', getAllPrescriptionHandler)
router.get('/:id', getPrescriptionHandler)
router.post('/:id', createPrescriptionHandler)
// router.post('/', validateResource(createPatientSchema), createPatientHandler)
// router.patch('/:id', updateVisitHandler)
// router.delete('/:id', deleteVisitHandler)

export default router;