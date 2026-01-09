export const api = async (
  path: string,
  options?: RequestInit
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  console.log("FETCHING:", url);

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("ERROR RESPONSE:", text);
    throw new Error("Request failed");
  }

  return res.json();
};
