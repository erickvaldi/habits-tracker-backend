"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "../Redux/store";
import { fetchHabitsThunk, doneHabitThunk } from "../Redux/habitSlice";

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
          <p className="text-zinc-400">
            Semana 4: Done funcional + progreso dinámico según racha.
          </p>
          <p className="text-xs text-zinc-500">
            Nota: Debes tener un token en localStorage para que funcione el GET /habits.
          </p>
        </header>

        {loading && <p className="text-zinc-300">Cargando...</p>}
        {error && <p className="text-red-400">{error}</p>}

        <section className="space-y-3">
          {habits.map((h) => {
            const streak = h.currentStreak ?? 0;
            const percent = Math.min(100, Math.round((streak / 66) * 100));

            return (
              <div key={h._id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{h.title}</h3>
                    <p className="text-zinc-400">{h.description}</p>
                    <p className="text-xs text-zinc-400 mt-2">Racha: {streak} día(s)</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => dispatch(doneHabitThunk(h._id))}
                    className="shrink-0 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
                  >
                    Done
                  </button>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>Progreso</span>
                    <span>{percent}%</span>
                  </div>

                  <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-3 bg-red-500" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              </div>
            );
          })}

          {!loading && habits.length === 0 && (
            <p className="text-zinc-400">No hay hábitos todavía.</p>
          )}
        </section>
      </div>
    </main>
  );
}