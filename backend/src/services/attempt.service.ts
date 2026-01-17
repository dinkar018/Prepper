import prisma from "../prisma/client";

export const startAttempt = async (userId: string, quizId: string) => {
  // Check if there's an incomplete attempt
  const incompleteAttempt = await prisma.quizAttempt.findFirst({
    where: { 
      userId, 
      quizId,
      status: "IN_PROGRESS" // or whatever your pending status is
    },
    orderBy: { createdAt: "desc" },
  });

  // If there's an incomplete attempt, return it instead of creating a new one
  if (incompleteAttempt) {
    return incompleteAttempt;
  }

  // Find the last attempt number
  const lastAttempt = await prisma.quizAttempt.findFirst({
    where: { userId, quizId },
    orderBy: { attemptNumber: "desc" },
  });

  const attemptNumber = lastAttempt ? lastAttempt.attemptNumber + 1 : 1;

  // Use a transaction to prevent race conditions
  return prisma.quizAttempt.create({
    data: {
      userId,
      quizId,
      attemptNumber,
      status: "IN_PROGRESS", // Make sure to set initial status
    },
  });
};
export const syncResponses = async (
  attemptId: string,
  responses: { questionId: string; optionId: string }[]
) => {
  const ops = responses.map(r =>
    prisma.response.upsert({
      where: {
        attemptId_questionId: {
          attemptId,
          questionId: r.questionId,
        },
      },
      update: {
        optionId: r.optionId,
      },
      create: {
        attemptId,
        questionId: r.questionId,
        optionId: r.optionId,
      },
    })
  );

  await prisma.$transaction(ops);
};

