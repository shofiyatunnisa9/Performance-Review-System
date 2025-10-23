"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  //REGISTER
  const register = async (
    name: string,
    email: string,
    passwordHash: string
  ) => {
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", { name, email, passwordHash });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed Register");
    } finally {
      setLoading(false);
    }
  };

  //LOGIN
  const login = async (email: string, passwordHash: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, passwordHash });
      localStorage.setItem("token", res.data.token);
      router.push("/employees");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed login");
    } finally {
      setLoading(false);
    }
  };

  //LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return { login, register, logout, loading, error };
}
