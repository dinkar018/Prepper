const BASE = process.env.NEXT_PUBLIC_API_BASE_URL + "/quizzes";

export async function getQuiz(quizId: string, token: string) {
  const res = await fetch(`${BASE}/${quizId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch quiz");
  }
  
  return res.json();
}