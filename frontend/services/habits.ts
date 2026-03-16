const API = "http://localhost:3001";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchHabits = async () => {
  const res = await fetch(`${API}/habits`, {
    headers: { ...authHeaders() },
  });

  if (!res.ok) throw new Error("Failed to fetch habits");
  return res.json();
};

export const doneHabit = async (id: string) => {
  const res = await fetch(`${API}/habits/${id}/done`, {
    method: "POST",
    headers: { ...authHeaders() },
  });

  if (!res.ok) throw new Error("Failed to mark done");
  return res.json();
};