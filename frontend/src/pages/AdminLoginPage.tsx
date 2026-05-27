import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SelfLogo } from "../components/SelfLogo";
import { api } from "../api/client";

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post<{ token: string; email: string }>("/auth/admin/login", { email, password });
      localStorage.setItem("admin_token", res.token);
      localStorage.setItem("admin_email", res.email);
      navigate("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-12 w-full max-w-md shadow-xl border border-[#0d4b3e]/10"
      >
        <div className="flex justify-center mb-8">
          <SelfLogo className="h-12" />
        </div>
        <h1 className="font-display text-3xl text-center mb-2">Admin Access</h1>
        <p className="text-[#777777] text-sm text-center mb-10">Sign in to the SELF Wellness dashboard</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-[#777777] mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent text-[#1c1c1c]"
              placeholder="admin@selfwellness.com"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-[#777777] mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent text-[#1c1c1c]"
              placeholder="••••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff7a00] hover:bg-[#ff9a33] disabled:opacity-50 text-white py-4 rounded-full tracking-wider uppercase text-sm font-medium transition-all mt-4 shadow-lg shadow-[#ff7a00]/30"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
