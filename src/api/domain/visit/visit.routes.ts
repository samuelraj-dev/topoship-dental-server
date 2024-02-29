import express from "express";
// import { createPatientSchema } from "./appointment.schema";
// import validateResource from "../../middleware/validateResource";

const router = express.Router();

import {
    getAllVisitHandler,
    getVisitHandler,
    createVisitHandler,
    updateVisitHandler,
    // deleteVisitHandler,
} from "./visit.controller";

router.get('/', getAllVisitHandler)
router.get('/:id', getVisitHandler)
router.post('/:id', createVisitHandler)
// router.post('/', validateResource(createPatientSchema), createPatientHandler)
router.patch('/:id', updateVisitHandler)
// router.delete('/:id', deleteVisitHandler)

export default router;