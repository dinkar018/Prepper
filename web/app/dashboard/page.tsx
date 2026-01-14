"use client";

import RequireAuth from "../lib/auth/RequireAuth";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const QUIZ_ID = "4c6635c4-0409-4901-b4cb-82c5dc94f65c";

  return (
    <RequireAuth>
      <h1>Dashboard</h1>

      <button onClick={() => router.push(`/quizzes/${QUIZ_ID}`)}>
        Start Quiz
      </button>

      <button onClick={logout}>Logout</button>
    </RequireAuth>
  );
}
