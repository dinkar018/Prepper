"use client";

import { use } from "react";
import RequireAuth from "../../lib/auth/RequireAuth";
import QuizContainer from "../../components/quiz/QuizContainer";

export default function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = use(params);

  return (
    <RequireAuth>
      <QuizContainer quizId={quizId} />
    </RequireAuth>
  );
}