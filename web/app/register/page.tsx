"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async () => {
    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ mobile, password }),
      });
      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <input
        placeholder="Mobile"
        maxLength={10}
        onChange={(e) => setMobile(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={submit}>
        Register
      </button>
    </div>
  );
}
