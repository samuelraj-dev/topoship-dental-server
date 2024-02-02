import express from "express";
// import { createPatientSchema } from "./resetPassword.schema";
// import validateResource from "../../../middleware/validateResource";

const router = express.Router();

import {
  resetPasswordEmailHandler,
  resetPasswordHandler,
} from "./resetPassword.controller";

router.post('/', resetPasswordEmailHandler);
router.post('/:id/:passwordResetCode', resetPasswordHandler);

export default router;