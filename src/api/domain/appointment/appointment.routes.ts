import express from "express";
import { createPatientSchema } from "./appointment.schema";
import validateResource from "../../middleware/validateResource";

const router = express.Router();

import {
    getAllAppointmentHandler,
    getUpcomingAppointmentHandler,
    getAppointmentHandler,
    createAppointmentHandler,
    updateAppointmentHandler,
    deleteAppointmentHandler,
    getTodayAppointmentHandler,
} from "./appointment.controller";
// import { upload } from "utils/image-uploder";

router.get('/all', getAllAppointmentHandler)
router.get('/upcoming', getUpcomingAppointmentHandler)
router.get('/today', getTodayAppointmentHandler)
router.get('/:id', getAppointmentHandler)

router.post('/', createAppointmentHandler)
// router.post('/', validateResource(createPatientSchema), createPatientHandler)
router.patch('/:id', updateAppointmentHandler)
router.delete('/:id', deleteAppointmentHandler)

export default router;