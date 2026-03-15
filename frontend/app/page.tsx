"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "../Redux/store";
import { fetchHabitsThunk } from "../Redux/habitSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { habits, loading, error } = useSelector((state: AppState) => state.habit);

  useEffect(() => {
    dispatch(fetchHabitsThunk());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-red-500">Habits Tracker</h1>
          <p className="text-zinc-400">Lista dinámica desde Redux (GET al backend).</p>
        </header>

        {/* Barra de progreso (estática) */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Progreso (0/66)</h2>
            <span className="text-sm text-zinc-400">0%</span>
          </div>

          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            {/* Progreso fijo (no dinámico) */}
            <div className="h-3 w-[20%] bg-red-500" />
          </div>

          <p className="text-xs text-zinc-400 mt-2">
            *Barra de progreso no dinámica (Semana 3).
          </p>
        </section>

        {loading && <p className="text-zinc-300">Cargando...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {/* Lista dinámica */}
        <section className="space-y-3">
          {habits.map((h) => (
            <div
              key={h._id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold text-lg">{h.title}</h3>
                <p className="text-zinc-400">{h.description}</p>
              </div>

              {/* Botón Done (sin funcionalidad) */}
              <button
                type="button"
                className="shrink-0 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
              >
                Done
              </button>
            </div>
          ))}

          {!loading && habits.length === 0 && (
            <p className="text-zinc-400">No hay hábitos todavía.</p>
          )}
        </section>
      </div>
    </main>
  );
}