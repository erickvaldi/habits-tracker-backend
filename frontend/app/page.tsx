"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "../Redux/store";
import { fetchHabitsThunk, doneHabitThunk, createHabitThunk } from "../Redux/habitSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { habits, loading, error } = useSelector((state: AppState) => state.habit);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchHabitsThunk());
  }, [dispatch]);

  const hasToken = useMemo(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  }, []);

  const onCreateHabit = () => {
    if (!title.trim() || !description.trim()) return;
    dispatch(createHabitThunk({ title: title.trim(), description: description.trim() }));
    setTitle("");
    setDescription("");
  };

  const progressColor = (percent: number) => {
    // Semana 5: rojo -> amarillo -> verde, acercándose a 66 días
    if (percent < 34) return "bg-red-500";
    if (percent < 67) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-red-500">Habits Tracker</h1>
          <p className="text-zinc-400">
            Semana 5: Login/Registro en frontend + JWT + crear hábitos + Done + progreso rojo→verde.
          </p>

          {!hasToken && (
            <div className="text-sm text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-xl p-3">
              <p className="font-semibold">No hay token guardado.</p>
              <p className="text-zinc-400">
                Ve a <span className="font-mono">/login</span> para iniciar sesión o{" "}
                <span className="font-mono">/register</span> para crear cuenta.
              </p>
            </div>
          )}
        </header>

        {/* Form: Crear hábito */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
          <h2 className="font-semibold">Agregar hábito</h2>

          <input
            className="w-full p-3 rounded bg-zinc-950 border border-zinc-800"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full p-3 rounded bg-zinc-950 border border-zinc-800"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="button"
            onClick={onCreateHabit}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
          >
            Guardar
          </button>

          <p className="text-xs text-zinc-500">
            Nota: necesitas estar logueado (token) para crear y listar hábitos.
          </p>
        </section>

        {loading && <p className="text-zinc-300">Cargando...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {/* Lista */}
        <section className="space-y-3">
          {habits.map((h) => {
            const streak = h.currentStreak ?? 0;
            const percent = Math.min(100, Math.round((streak / 66) * 100));
            const barColor = progressColor(percent);

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
                    <div className={`h-3 ${barColor}`} style={{ width: `${percent}%` }} />
                  </div>

                  <p className="text-[11px] text-zinc-500 mt-1">
                    Rojo → Amarillo → Verde conforme te acercas a 66 días.
                  </p>
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