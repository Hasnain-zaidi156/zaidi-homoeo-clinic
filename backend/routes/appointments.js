const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const requireAdmin = require("../middleware/auth");
const { sendAppointmentEmail, sendConfirmationEmail } = require("../mailer");
const { getNextToken } = require("../lib/token");

// POST /api/appointments  (public) — a patient books an appointment
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, service, preferredDate, preferredTime, message } =
      req.body || {};

    if (!name || !name.trim() || !phone || !phone.trim()) {
      return res
        .status(400)
        .json({ error: "Name and phone number are required." });
    }

    const appointment = await Appointment.create({
      token: await getNextToken("appointmentToken"),
      name,
      phone,
      email,
      service,
      preferredDate,
      preferredTime,
      message,
    });

    // Send the email notification but never let a mail failure break the booking.
    let emailed = false;
    try {
      emailed = await sendAppointmentEmail(appointment);
    } catch (err) {
      console.error("[appointments] Email send failed:", err.message);
    }

    return res.status(201).json({ ok: true, appointment, emailed });
  } catch (err) {
    console.error("[appointments] Create failed:", err.message);
    return res.status(500).json({ error: "Could not save the appointment." });
  }
});

// GET /api/appointments  (admin) — list all, newest first, optional ?status=
router.get("/", requireAdmin, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status && req.query.status !== "all") {
      filter.status = req.query.status;
    }
    const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
    return res.json({ appointments });
  } catch (err) {
    console.error("[appointments] List failed:", err.message);
    return res.status(500).json({ error: "Could not load appointments." });
  }
});

// PATCH /api/appointments/:id  (admin) — change status
router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body || {};
    const allowed = ["pending", "confirmed", "completed", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found." });

    // When the doctor confirms, email the patient. A mail failure must never
    // break the status update, so we catch and log it separately.
    let emailed = false;
    if (status === "confirmed") {
      try {
        emailed = await sendConfirmationEmail(updated);
      } catch (err) {
        console.error("[appointments] Confirmation email failed:", err.message);
      }
    }
    return res.json({ ok: true, appointment: updated, emailed });
  } catch (err) {
    console.error("[appointments] Update failed:", err.message);
    return res.status(500).json({ error: "Could not update the appointment." });
  }
});

// DELETE /api/appointments/:id  (admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found." });
    return res.json({ ok: true });
  } catch (err) {
    console.error("[appointments] Delete failed:", err.message);
    return res.status(500).json({ error: "Could not delete the appointment." });
  }
});

module.exports = router;
