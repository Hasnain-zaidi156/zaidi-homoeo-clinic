const Counter = require("../models/Counter");

// Token numbers start here. The first ever appointment gets 500,
// then 501, 502, and so on. Change START if you want a different start.
const START = 500;

// Atomically get the next token number. This is safe even if two patients
// book at the exact same moment, because MongoDB's $inc is atomic.
async function getNextToken() {
  const counter = await Counter.findByIdAndUpdate(
    "appointmentToken",
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return START - 1 + counter.seq; // seq 1 -> 500, seq 2 -> 501, ...
}

module.exports = { getNextToken };
