import prisma from "../prisma/client";

export const getQuizWithQuestions = async (quizId: string) => {
  return prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      assessments: {
        orderBy: { order: "asc" },
        include: {
          assessment: {
            include: {
              questions: {
                orderBy: { code: "asc" },
                include: {
                  options: {
                    select: {
                      id: true,
                      text: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
};
