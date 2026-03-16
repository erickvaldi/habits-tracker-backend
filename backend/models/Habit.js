const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  // Semana 4: usuario dueño del hábito
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Semana 4: rachas / seguimiento de días
  currentStreak: {
    type: Number,
    default: 0
  },
  bestStreak: {
    type: Number,
    default: 0
  },
  lastDoneDate: {
    type: Date,
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Habit", habitSchema);