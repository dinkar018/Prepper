import { Router } from "express";
import {
  startAttemptController,
  syncResponsesController,
  submitAttemptController,
} from "../controllers/attempt.controller";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

router.post("/start", authMiddleware, startAttemptController);
router.post("/:attemptId/responses", authMiddleware, syncResponsesController);
router.post("/:attemptId/submit", authMiddleware, submitAttemptController);

export default router;
