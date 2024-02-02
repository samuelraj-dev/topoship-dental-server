import express from "express";
import { patientSchema } from "./patient.schema";
import validateResource from "../../middleware/validateResource";

const router = express.Router();

import {
    getAllPatientHandler,
    getPatientHandler,
    createPatientHandler,
    updatePatientHandler,
    deletePatientHandler,
} from "./patient.controller";

// router.get('/', validateResource(patientSchema), getAllPatientHandler)
router.get('/', getAllPatientHandler)
router.get('/:id', getPatientHandler)
router.post('/', createPatientHandler)
router.patch('/:id', updatePatientHandler)
router.delete('/:id', deletePatientHandler)

export default router;