import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHabits } from "../services/habits";

type Habit = {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
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

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default habitSlice.reducer;