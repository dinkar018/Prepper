"use client";

import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAuth();
  const router = useRouter();

  console.log("🔐 RequireAuth", { loading, token });

  useEffect(() => {
    console.log("✅ AuthProvider mounted");
    if (!loading && !token) {
      router.replace("/login");
    }
  }, [loading, token, router]);

  if (loading) return <div>Checking authentication...</div>;
  if (!token) return null;

  return <>{children}</>;
}