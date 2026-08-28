const mongoose = require("mongoose");

// A tiny collection that holds auto-incrementing counters.
// We use it to give every appointment a human-friendly token number.
const counterSchema = new mongoose.Schema({
  _id: { type: String }, // e.g. "appointmentToken"
  seq: { type: Number, default: 0 },
});

module.exports = mongoose.model("Counter", counterSchema);
