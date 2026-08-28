const mongoose = require("mongoose");

// One appointment request submitted by a patient from the website.
const appointmentSchema = new mongoose.Schema(
  {
    // Human-friendly booking number shown to the patient (starts at 500).
    token: { type: Number, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    email: { type: String, trim: true, lowercase: true, maxlength: 160, default: "" },
    service: { type: String, trim: true, maxlength: 120, default: "General consultation" },
    preferredDate: { type: String, trim: true, default: "" },
    preferredTime: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, maxlength: 2000, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
