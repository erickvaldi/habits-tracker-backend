"use client";

import { useState } from "react";
import { loginUser } from "../../services/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const onLogin = async () => {
    try {
      setMsg("Iniciando sesión...");
      const data = await loginUser(email, password); // { token }
      localStorage.setItem("token", data.token);
      setMsg("✅ Login OK. Ve a /");
    } catch (e: any) {
      setMsg("❌ Login failed: " + (e?.message || "Error"));
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-red-500">Login</h1>

        <input className="w-full p-3 rounded bg-zinc-900 border border-zinc-800"
          placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="w-full p-3 rounded bg-zinc-900 border border-zinc-800"
          placeholder="Password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <button onClick={onLogin}
          className="w-full py-3 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700">
          Iniciar sesión
        </button>

        <p className="text-zinc-400">{msg}</p>
        <p className="text-zinc-500 text-sm">Si no tienes cuenta, ve a /register</p>
      </div>
    </main>
  );
}