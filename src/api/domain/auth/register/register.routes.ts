import express from "express";

const router = express.Router();

import {
    createClinicHandler,
    registerClinicHandler,
    verifyClinicHandler,
    getClinicDataHandler,
} from "./register.controller";

router.post('/create', createClinicHandler)
router.post('/', registerClinicHandler)
router.post('/verify/:id/:verificationCode', verifyClinicHandler)
router.post('/get-data', getClinicDataHandler);

export default router;