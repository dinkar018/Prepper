import { Router } from "express";
import {
  startAttemptController,
  syncResponsesController,
  submitAttemptController,
} from "../controllers/attempt.controller";

const router = Router();

router.post("/start", startAttemptController);
router.post("/:attemptId/responses", syncResponsesController);
router.post("/:attemptId/submit", submitAttemptController);

export default router;
