const BASE = process.env.NEXT_PUBLIC_API_BASE_URL + "/attempt";

export const authHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export async function startAttempt(quizId: string, token: string) {
  const res = await fetch(`${BASE}/start`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ quizId }),
  });

  if (!res.ok) {
    throw new Error("Failed to start attempt");
  }

  return res.json();
}
export async function syncResponses(
  attemptId: string,
  token: string,
  payload: { questionId: string; optionId: string }[]
) {
  await fetch(`${BASE}/${attemptId}/responses`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ responses: payload }), // Wrap in responses object
  });
}
export async function submitAttempt(attemptId: string, token: string) {
  await fetch(`${BASE}/${attemptId}/submit`, {
    method: "POST",
    headers: authHeaders(token),
  });
}
