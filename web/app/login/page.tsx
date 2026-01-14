"use client";

import { useState } from "react";
import { loginUser } from "../lib/api/auth";
import { useAuth } from "../lib/auth/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  async function handleLogin() {
  try {
    const res = await loginUser({ mobile, password });

    console.log("Login response:", res);
    
    if (!res?.token) {
      alert("Login failed: token not received");
      return;
    }

    login(res.token);
    router.push("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
  }
}


  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Mobile" onChange={e => setMobile(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
