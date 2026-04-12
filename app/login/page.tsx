"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IceCream, Eye, EyeOff, LogIn } from "lucide-react";
import { saveAdminToken } from "@/lib/cart-store";

// Mock credentials: admin@sorveteria.com / admin123
const MOCK_USERS = [
  { email: "admin@sorveteria.com", password: "admin123", name: "Administrador" },
  { email: "staff@sorveteria.com", password: "staff123", name: "Funcionário" },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (user) {
      saveAdminToken(`mock-jwt-${user.name}-${Date.now()}`);
      router.push("/admin");
    } else {
      setError("E-mail ou senha inválidos. Tente: admin@sorveteria.com / admin123");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center shadow-warm-lg mb-4">
            <IceCream className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-white">Área Administrativa</h1>
          <p className="text-sm text-gray-400 mt-1">Gelato &amp; Pizza · Painel interno</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-5">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sorveteria.com"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-900 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Senha</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-950 border border-red-900 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all mt-1"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="border-t border-gray-800 pt-4">
            <p className="text-xs text-gray-500 text-center">
              Credenciais de demo:<br />
              <span className="text-gray-400 font-mono">admin@sorveteria.com</span> / <span className="text-gray-400 font-mono">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
