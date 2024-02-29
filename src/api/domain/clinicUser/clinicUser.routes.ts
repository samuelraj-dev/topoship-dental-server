import express from "express";
// import { createPatientSchema } from "./medicine.schema";

const router = express.Router();

import {
    getClinicUserHandler,
} from "./clinicUser.controller";

router.get('/:id', getClinicUserHandler)

export default router;