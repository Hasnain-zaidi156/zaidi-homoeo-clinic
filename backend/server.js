require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const appointmentsRouter = require("./routes/appointments");
const reviewsRouter = require("./routes/reviews");
const { isEmailConfigured, verifyEmail } = require("./mailer");

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware -------------------------------------------------------------
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(express.json());

// --- Health check -----------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    email: isEmailConfigured() ? "configured" : "not-configured",
  });
});

// --- Admin login ------------------------------------------------------------
// The admin page posts the typed password here once. If it matches, the page
// keeps the password and sends it as the x-admin-password header afterwards.
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body || {};
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) {
    return res
      .status(500)
      .json({ error: "Admin password is not configured on the server." });
  }
  if (password !== expected) {
    return res.status(401).json({ error: "Wrong password." });
  }
  return res.json({ ok: true });
});

// --- API routes -------------------------------------------------------------
app.use("/api/appointments", appointmentsRouter);
app.use("/api/reviews", reviewsRouter);

// --- Optional: serve the built frontend in production -----------------------
// After `npm run build` in /frontend, this lets one server host everything.
const clientDist = path.join(__dirname, "..", "frontend", "dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// --- Start ------------------------------------------------------------------
async function start() {
  const uri =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/zaidi_homoeo_clinic";
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.name, "-", err.message);
    console.error("   Common causes:");
    console.error("   1) Your current IP is not allowed in MongoDB Atlas → Network Access (add 0.0.0.0/0).");
    console.error("   2) The Atlas cluster is paused — open the Atlas dashboard and click Resume.");
    console.error("   3) Wrong username/password in MONGO_URI.");
    console.error("   4) DNS cannot resolve the +srv address — try changing your DNS to 8.8.8.8.");
  }

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    if (!isEmailConfigured()) {
      console.log(
        "ℹ️  Email is not configured yet — bookings will save to the DB but no email is sent."
      );
      console.log(
        "   Fill EMAIL_USER / EMAIL_PASS / CLINIC_EMAIL in backend/.env to turn email on."
      );
    } else {
      verifyEmail()
        .then(() =>
          console.log("📧 Email is configured and the SMTP login works ✅")
        )
        .catch((e) =>
          console.error(
            "⚠️  Email is configured but the SMTP login FAILED:",
            e.message,
            "\n   For Gmail, make sure you used a 16-letter App Password (not your normal password)."
          )
        );
    }
  });
}

start();
