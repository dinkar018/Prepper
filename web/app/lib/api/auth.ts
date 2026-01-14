const BASE = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth";

export async function loginUser(payload: {
  mobile: string;
  password: string;
}) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function registerUser(payload: {
  mobile: string;
  password: string;
  name?: string;
}) {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
