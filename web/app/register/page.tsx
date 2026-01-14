"use client";

import { useState } from "react";
import { registerUser } from "../lib/api/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  async function handleRegister() {
    await registerUser({ mobile, password, name });
    router.push("/login");
  }

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Mobile" onChange={e => setMobile(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
