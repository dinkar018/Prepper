import prisma from "../prisma/client";

export const startAttempt = async (userId: string, quizId: string) => {
  const lastAttempt = await prisma.quizAttempt.findFirst({
    where: { userId, quizId },
    orderBy: { attemptNumber: "desc" },
  });

  const attemptNumber = lastAttempt ? lastAttempt.attemptNumber + 1 : 1;

  return prisma.quizAttempt.create({
    data: {
      userId,
      quizId,
      attemptNumber,
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

