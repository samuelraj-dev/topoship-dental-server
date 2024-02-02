import express from "express";
import requireUser from "../../../middleware/requireUser";

const router = express.Router();

import {
  createSessionHandler,
  getCurrentUserHandler,
  refreshAccessTokenHandler,
  deleteSessionHandler,
} from "./login.controller";

router.post('/', createSessionHandler);
router.get('/me', getCurrentUserHandler);
router.get('/refresh', refreshAccessTokenHandler);
router.delete('/delete', requireUser, deleteSessionHandler)

export default router;