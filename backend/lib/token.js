const Counter = require("../models/Counter");

// Token numbers start here. The first ever booking (appointment or medicine
// order) gets 1, then 2, 3, and so on. Change START if you want a different
// start. Appointments and medicine orders keep their own separate counters
// (each starts at 1) so they never mix up.
const START = 1;

// Atomically get the next token number for a given counter (e.g.
// "appointmentToken" or "orderToken"). This is safe even if two people book
// at the exact same moment, because MongoDB's $inc is atomic.
async function getNextToken(counterId = "appointmentToken") {
  const counter = await Counter.findByIdAndUpdate(
    counterId,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return START - 1 + counter.seq; // seq 1 -> 1, seq 2 -> 2, ...
}

module.exports = { getNextToken };
