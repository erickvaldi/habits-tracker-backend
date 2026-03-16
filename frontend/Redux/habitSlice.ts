import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHabits, doneHabit } from "../services/habits";

type Habit = {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;

  // Semana 4 (racha)
  currentStreak?: number;
  bestStreak?: number;
  lastDoneDate?: string | null;
};

type HabitState = {
  habits: Habit[];
  loading: boolean;
  error: string | null;
};

const initialState: HabitState = {
  habits: [],
  loading: false,
  error: null,
};

export const fetchHabitsThunk = createAsyncThunk("habit/fetchHabits", async () => {
  return await fetchHabits();
});

export const doneHabitThunk = createAsyncThunk("habit/doneHabit", async (id: string) => {
  return await doneHabit(id);
});

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchHabits
      .addCase(fetchHabitsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabitsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabitsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      // doneHabit
      .addCase(doneHabitThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.habits.findIndex((h) => h._id === updated._id);
        if (idx !== -1) {
          state.habits[idx] = updated;
        }
      });
  },
});

export default habitSlice.reducer;