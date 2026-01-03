import { Request, Response } from "express";
import { getQuizWithQuestions } from "../services/quiz.service";

export const getQuizQuestionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { quizId } = req.params;

    const quiz = await getQuizWithQuestions(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const formattedResponse = {
      quizId: quiz.id,
      title: quiz.title,
      description: quiz.description,
      assessments: quiz.assessments.map(q => ({
        id: q.assessment.id,
        name: q.assessment.name,
        uiType: q.assessment.uiType,
        questions: q.assessment.questions.map(question => ({
          id: question.id,
          code: question.code,
          text: question.text,
          type: question.type,
          options: question.options
        }))
      }))
    };

    return res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
