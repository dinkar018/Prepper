"use client";

import RequireAuth from "../../lib/auth/RequireAuth";
import QuizContainer from "../../components/quiz/QuizContainer";

export default function QuizPage({
  params,
}: {
  params: { quizId: string };
}) {
  return (
    <RequireAuth>
      <QuizContainer quizId={params.quizId} />
    </RequireAuth>
  );
}
