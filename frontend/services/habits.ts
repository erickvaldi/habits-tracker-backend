const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleErrors = async (res: Response, defaultMessage: string) => {
  if (res.ok) return;

  // mensaje más claro para 401
  if (res.status === 401) {
    throw new Error("Unauthorized: debes iniciar sesión (token)");
  }

  // intenta leer mensaje del backend si existe
  try {
    const data = await res.json();
    throw new Error(data?.message || defaultMessage);
  } catch {
    throw new Error(defaultMessage);
  }
};

export const fetchHabits = async () => {
  const res = await fetch(`${API}/habits`, {
    headers: { ...authHeaders() },
  });

  await handleErrors(res, "Failed to fetch habits");
  return res.json();
};

export const doneHabit = async (id: string) => {
  const res = await fetch(`${API}/habits/${id}/done`, {
    method: "POST",
    headers: { ...authHeaders() },
  });

  await handleErrors(res, "Failed to mark done");
  return res.json();
};

// Semana 5: crear hábitos desde el frontend
export const createHabit = async (title: string, description: string) => {
  const res = await fetch(`${API}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ title, description }),
  });

  await handleErrors(res, "Failed to create habit");
  return res.json();
};