"use client";
console.log("🧩 QuizContainer render");

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
import { useAuth } from "@/app/lib/auth/AuthContext";

export default function QuizContainer({ quizId }: { quizId: string }) {
  const router = useRouter();
  const { token } = useAuth();

  const [quiz, setQuiz] = useState<any>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

useEffect(() => {
  console.log("⚡ useEffect fired", { token, quizId });
  
  if (!token) {
    console.log("⛔ token missing, effect aborted");
    return;
  }
  
  let isMounted = true; // Prevent state updates after unmount

  async function init() {
    console.log("▶ init called");
    const saved = loadAttempt();

    if (saved && saved.quizId === quizId && saved.attemptId) {
      if (!isMounted) return;
      setAttemptId(saved.attemptId);
      setIndex(saved.index);
      setAnswers(saved.answers);
      
      // Still fetch quiz data
      const quizData = await getQuiz(quizId, token);
      if (!isMounted) return;
      setQuiz(quizData);
    } else {
      const attempt = await startAttempt(quizId, token);
      if (!isMounted) return;
      
      setAttemptId(attempt.attemptId); // Use attemptId from response
      
      saveAttempt({
        quizId,
        attemptId: attempt.attemptId,
        index: 0,
        answers: {},
      });

      const quizData = await getQuiz(quizId, token);
      if (!isMounted) return;
      setQuiz(quizData);
    }
  }

  init();

  return () => {
    isMounted = false; // Cleanup
  };
}, [quizId, token]);

  if (!quiz || !attemptId) return <div>Loading quiz...</div>;

  const questions = quiz.assessments[0].questions;
  const question = questions[index];

  async function answer(optionId: string) {
    if (!attemptId || !token) return;

    const updated = { ...answers, [question.id]: optionId };
    setAnswers(updated);

    saveAttempt({ quizId, attemptId, index, answers: updated });

    await syncResponses(
  attemptId,
  token, // Add token as second parameter
  [{ questionId: question.id, optionId }]
);
  }

  function next() {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    saveAttempt({ quizId, attemptId, index: nextIndex, answers });
  }

  async function submit() {
    if (!attemptId || !token) return;

    await submitAttempt(attemptId, token);
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