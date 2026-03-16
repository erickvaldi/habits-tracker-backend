const express = require("express");
const router = express.Router();

const Habit = require("../models/Habit");
const auth = require("../middleware/auth");
const { startOfDay, daysDiff } = require("../utils/date");

/**
 * IMPORTANTE:
 * Este router se monta en app.js así:
 *   app.use("/habits", habitsRouter);
 * Por eso aquí las rutas empiezan con "/" y no con "/habits".
 */

/**
 * GET /habits
 * - Solo hábitos del usuario
 * - Si perdió racha (diff > 1), resetea currentStreak a 0
 */
router.get("/", auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id }).sort({ createdAt: -1 });

    const now = new Date();

    for (const h of habits) {
      if (h.lastDoneDate) {
        const diff = daysDiff(now, h.lastDoneDate);
        // si pasaron 2 o más días desde el último done, perdió racha
        if (diff > 1 && h.currentStreak !== 0) {
          h.currentStreak = 0;
          await h.save();
        }
      }
    }

    const updatedHabits = await Habit.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(updatedHabits);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving habits" });
  }
});

/**
 * POST /habits
 * Crea hábito para el usuario logueado
 */
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "title and description are required" });
    }

    const habit = await Habit.create({
      title,
      description,
      userId: req.user.id,
    });

    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ message: "Error creating habit" });
  }
});

/**
 * PUT /habits/:id
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedHabit) return res.status(404).json({ message: "Habit not found" });

    res.json(updatedHabit);
  } catch (err) {
    res.status(400).json({ message: "Error updating habit" });
  }
});

/**
 * DELETE /habits/:id
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Habit not found" });

    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting habit" });
  }
});

/**
 * POST /habits/:id/done
 * Marca el hábito como realizado hoy y maneja racha:
 * - si ya lo hizo hoy: no cambia
 * - si es día consecutivo: incrementa
 * - si perdió racha: vuelve a 1
 */
router.post("/:id/done", auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, userId: req.user.id });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const today = startOfDay(new Date());

    if (habit.lastDoneDate) {
      const last = startOfDay(habit.lastDoneDate);
      const diff = daysDiff(today, last);

      if (diff === 0) {
        // ya lo marcó hoy
        return res.json(habit);
      } else if (diff === 1) {
        habit.currentStreak += 1;
      } else {
        // perdió racha
        habit.currentStreak = 1;
      }
    } else {
      habit.currentStreak = 1;
    }

    habit.lastDoneDate = today;
    habit.bestStreak = Math.max(habit.bestStreak, habit.currentStreak);

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: "Error marking done" });
  }
});

module.exports = router;
