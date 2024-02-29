import express from "express";

const router = express.Router();

import { upload } from "../../../../utils/image-uploder";

import {
    // createClinicHandler,
    registerClinicHandler,
    verifyClinicHandler,
    // getClinicDataHandler,
} from "./register.controller";

// router.post('/create', createClinicHandler)
router.post('/:registration_number', upload.single("doctor_image"), registerClinicHandler)
router.post('/verify/:registration_number', verifyClinicHandler)
// router.post('/get-data', getClinicDataHandler);

export default router;