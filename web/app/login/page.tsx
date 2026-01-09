"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async () => {
    await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ mobile, password }),
    });
    router.push("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Mobile"
        maxLength={10}
        onChange={e => setMobile(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={submit}>Login</button>
    </div>
  );
}
