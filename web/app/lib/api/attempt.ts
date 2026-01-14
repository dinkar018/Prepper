const BASE = process.env.NEXT_PUBLIC_API_BASE_URL + "/attempt";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function startAttempt(quizId: string) {
  const res = await fetch(`${BASE}/start`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ quizId }),
  });
  return res.json();
}

export async function syncResponses(
  attemptId: string,
  payload: { questionId: string; optionId: string }[]
) {
  await fetch(`${BASE}/${attemptId}/responses`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });
}

export async function submitAttempt(attemptId: string) {
  await fetch(`${BASE}/${attemptId}/submit`, {
    method: "POST",
    headers: headers(),
  });
}
