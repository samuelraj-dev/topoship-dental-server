import express from "express";
import requireUser from "../../../middleware/requireUser";

const router = express.Router();

import {
  loginClinicHandler,
} from "./login.controller";

router.post('/', loginClinicHandler);
// router.get('/me', getCurrentUserHandler);
// router.get('/refresh', refreshAccessTokenHandler);
// router.delete('/delete', requireUser, deleteSessionHandler)

export default router;