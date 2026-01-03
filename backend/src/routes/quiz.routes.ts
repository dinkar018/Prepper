import { Router } from "express";
import { getQuizQuestionsController } from "../controllers/quiz.controller";
// import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// GET quiz with all questions
router.get("/:quizId", getQuizQuestionsController);

export default router;
