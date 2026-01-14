const BASE = process.env.NEXT_PUBLIC_API_BASE_URL + "/quizzes";

export async function getQuiz(quizId: string) {
  const res = await fetch(`${BASE}/${quizId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
}
