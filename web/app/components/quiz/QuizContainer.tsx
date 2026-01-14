"use client";

import { useEffect, useState } from "react";
import { getQuiz } from "../../lib/api/quiz";
import {
  startAttempt,
  syncResponses,
  submitAttempt,
} from "../../lib/api/attempt";
import {
  saveAttempt,
  loadAttempt,
  clearAttempt,
} from "../../lib/storage";
import QuestionCard from "./QuestionCard";
import { useRouter } from "next/navigation";

export default function QuizContainer({ quizId }: { quizId: string }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    async function init() {
      const saved = loadAttempt();

      if (saved?.quizId === quizId) {
        setAttemptId(saved.attemptId);
        setIndex(saved.index);
        setAnswers(saved.answers);
      } else {
        const attempt = await startAttempt(quizId);
        setAttemptId(attempt.id);

        saveAttempt({
          quizId,
          attemptId: attempt.id,
          index: 0,
          answers: {},
        });
      }

      const quizData = await getQuiz(quizId);
      setQuiz(quizData);
    }

    init();
  }, [quizId]);

  if (!quiz || !attemptId) return <div>Loading...</div>;

  const questions = quiz.assessments[0].questions;
  const question = questions[index];

  async function answer(optionId: string) {
    const updated = { ...answers, [question.id]: optionId };
    setAnswers(updated);

    saveAttempt({ quizId, attemptId, index, answers: updated });

    await syncResponses(attemptId, [
      { questionId: question.id, optionId },
    ]);
  }

  function next() {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    saveAttempt({ quizId, attemptId, index: nextIndex, answers });
  }

  async function submit() {
    await submitAttempt(attemptId);
    clearAttempt();
    router.push("/dashboard");
  }

  return (
    <QuestionCard
      question={question}
      current={index + 1}
      total={questions.length}
      selected={answers[question.id]}
      onSelect={answer}
      onNext={index === questions.length - 1 ? submit : next}
      isLast={index === questions.length - 1}
    />
  );
}
