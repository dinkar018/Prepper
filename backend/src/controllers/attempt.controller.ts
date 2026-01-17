import { Request, Response } from "express";
import { startAttempt , syncResponses } from "../services/attempt.service";
import prisma from "../prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const startAttemptController = async (req: Request, res: Response) => {
  const { quizId } = req.body;
  const userId = req.user!.id; // assume auth middleware

   if (!quizId) {
    return res.status(400).json({ message: "quizId required" });
  }
  const attempt = await startAttempt(userId, quizId);

  res.json({
    attemptId: attempt.id,
    attemptNumber: attempt.attemptNumber,
  });
};

export const syncResponsesController = async (
  req: Request,
  res: Response
) => {
  const { attemptId } = req.params;
  const { responses } = req.body;

  await syncResponses(attemptId, responses);

  res.json({ success: true });
};

export const submitAttemptController = async (
  req: Request,
  res: Response
) => {
  const { attemptId } = req.params;

  await prisma.quizAttempt.update({
    where: { id: attemptId },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });

  res.json({ success: true });
};
