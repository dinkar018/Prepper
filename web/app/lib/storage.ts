const KEY = "quiz_attempt";

export const saveAttempt = (data: any) =>
  localStorage.setItem(KEY, JSON.stringify(data));

export const loadAttempt = () => {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearAttempt = () => localStorage.removeItem(KEY);
