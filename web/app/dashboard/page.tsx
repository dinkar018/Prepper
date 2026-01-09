"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    api("/auth/me")
      .then(setUser)
      .catch(() => router.push("/login"));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User ID: {user.id}</p>
    </div>
  );
}
