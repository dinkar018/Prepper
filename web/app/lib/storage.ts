const KEY = "quiz_attempt";

export const saveAttempt = (data: any) =>
  localStorage.setItem(KEY, JSON.stringify(data));

export function loadAttempt() {
  const raw = localStorage.getItem("quiz_attempt");
  return raw ? JSON.parse(raw) : null;
}


export const clearAttempt = () => localStorage.removeItem(KEY);
