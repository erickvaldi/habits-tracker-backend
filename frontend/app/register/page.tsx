"use client";

import { useState } from "react";
import { registerUser } from "../../services/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const onRegister = async () => {
    try {
      setMsg("Creando usuario...");
      await registerUser(name, email, password);
      setMsg("✅ Usuario creado. Ahora ve a /login");
    } catch (e: any) {
      setMsg("❌ No se pudo registrar: " + (e?.message || "Error"));
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-red-500">Register</h1>

        <input className="w-full p-3 rounded bg-zinc-900 border border-zinc-800"
          placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />

        <input className="w-full p-3 rounded bg-zinc-900 border border-zinc-800"
          placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="w-full p-3 rounded bg-zinc-900 border border-zinc-800"
          placeholder="Password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <button onClick={onRegister}
          className="w-full py-3 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700">
          Crear cuenta
        </button>

        <p className="text-zinc-400">{msg}</p>
        <p className="text-zinc-500 text-sm">Luego inicia sesión en /login</p>
      </div>
    </main>
  );
}