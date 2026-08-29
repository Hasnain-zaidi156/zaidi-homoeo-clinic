const nodemailer = require("nodemailer");

// --- Clinic details shown in every email (edit here anytime) ----------------
const CLINIC = {
  name: "Zaidi Homoeo Clinic",
  nameUr: "زیدی ہومیو کلینک",
  doctor: "Dr. Syed Faraz Ahmed Zaidi",
  phone: "0300 3139170",
  phone2: "0311 3139170",
  address: "Dhak Bazar, Rohri, Sindh, Pakistan",
  hours: "Morning 10:00 AM – 1:30 PM  •  Evening 5:30 PM – 9:30 PM",
};

// --- Detect whether real SMTP credentials have been provided ----------------
// If the .env still holds the example placeholders (or is empty), we skip
// sending mail instead of crashing — the appointment is still saved to the DB.
function isEmailConfigured() {
  const { EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS) return false;
  const placeholders = ["your-email@gmail.com", "your-app-password"];
  if (placeholders.includes(EMAIL_USER) || placeholders.includes(EMAIL_PASS))
    return false;
  return true;
}

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: Number(process.env.EMAIL_PORT) === 465, // 465 = SSL, else STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return transporter;
}

// Escape user-supplied text before putting it inside HTML.
function esc(v) {
  return String(v == null ? "" : v).replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"
  );
}

// Plain-text version of an appointment (used as the email fallback text).
function formatAppointment(appt) {
  return [
    appt.token != null ? `Token:    #${appt.token}` : null,
    `Name:     ${appt.name}`,
    `Phone:    ${appt.phone}`,
    `Email:    ${appt.email || "—"}`,
    `Service:  ${appt.service || "—"}`,
    `Date:     ${appt.preferredDate || "—"}`,
    `Time:     ${appt.preferredTime || "—"}`,
    `Message:  ${appt.message || "—"}`,
    ``,
    `Submitted: ${new Date(appt.createdAt || Date.now()).toLocaleString()}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

// A styled outer shell so every email looks consistent and branded.
function emailShell(innerHtml) {
  return `
  <div style="background:#f1f5f2;padding:24px 0;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e9e3">
      <div style="background:#1f5c43;padding:18px 24px;color:#ffffff">
        <div style="font-size:18px;font-weight:700">${CLINIC.name}</div>
        <div style="font-size:14px;opacity:.85" dir="rtl">${CLINIC.nameUr}</div>
      </div>
      <div style="padding:24px;color:#1b2a24">${innerHtml}</div>
      <div style="padding:16px 24px;background:#f6f8f5;color:#5b6b63;font-size:13px;border-top:1px solid #e2e9e3;line-height:1.7">
        <div><strong>${CLINIC.doctor}</strong></div>
        <div>Phone: ${CLINIC.phone} · ${CLINIC.phone2}</div>
        <div>Address: ${CLINIC.address}</div>
        <div>Hours: ${CLINIC.hours}</div>
      </div>
    </div>
  </div>`;
}

// Big centered token number.
function tokenBadge(token) {
  if (token == null) return "";
  return `
  <div style="text-align:center;margin:8px 0 20px;padding:16px;background:#f6f8f5;border:1px dashed #bcd3c5;border-radius:12px">
    <div style="font-size:12px;color:#5b6b63;letter-spacing:.08em;text-transform:uppercase">Your token number</div>
    <div style="font-size:42px;font-weight:800;color:#1f5c43;line-height:1.15">#${token}</div>
    <div style="font-size:13px;color:#5b6b63" dir="rtl">آپ کا ٹوکن نمبر</div>
  </div>`;
}

// Details rows as an HTML table.
function detailsTable(appt) {
  const rows = [
    appt.token != null ? ["Token", `#${appt.token}`] : null,
    ["Name", appt.name],
    ["Phone", appt.phone],
    ["Email", appt.email || "—"],
    ["Service", appt.service || "—"],
    ["Preferred date", appt.preferredDate || "—"],
    ["Preferred time", appt.preferredTime || "—"],
    ["Message", appt.message || "—"],
  ].filter(Boolean);

  return `
    <table style="border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([k, v]) =>
            `<tr>
               <td style="padding:8px 12px;border:1px solid #e2e9e3;background:#f6f8f5;font-weight:700;white-space:nowrap">${k}</td>
               <td style="padding:8px 12px;border:1px solid #e2e9e3">${esc(v)}</td>
             </tr>`
        )
        .join("")}
    </table>`;
}

// ── 1) A new booking: notify the clinic + acknowledge the patient ───────────
// Returns true if an email was actually sent.
async function sendAppointmentEmail(appt) {
  if (!isEmailConfigured()) {
    console.log(
      "[mailer] Email not configured — skipping notification (appointment still saved)."
    );
    return false;
  }

  // (a) Notify the clinic inbox.
  const to = process.env.CLINIC_EMAIL || process.env.EMAIL_USER;
  const clinicHtml = emailShell(`
    <h2 style="color:#1f5c43;margin:0 0 4px">New appointment request</h2>
    <p style="margin:0 0 16px;color:#5b6b63">Website booking${
      appt.token != null ? ` — Token #${appt.token}` : ""
    }</p>
    ${detailsTable(appt)}
  `);
  await getTransporter().sendMail({
    from: `"${CLINIC.name}" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: appt.email || undefined,
    subject: `New appointment${appt.token != null ? ` #${appt.token}` : ""}: ${
      appt.name
    } (${appt.phone})`,
    text: formatAppointment(appt),
    html: clinicHtml,
  });

  // (b) Send the patient a friendly acknowledgement with their token number.
  if (appt.email) {
    try {
      const patientHtml = emailShell(`
        <p style="margin:0 0 4px;font-size:16px">Assalam-o-Alaikum <strong>${esc(
          appt.name
        )}</strong>,</p>
        <p style="margin:0 0 16px;color:#3a4a42">Thank you for booking with ${
          CLINIC.name
        }. We have received your appointment request. Please keep your token number safe and mention it when you visit or call.</p>
        ${tokenBadge(appt.token)}
        ${detailsTable(appt)}
        <p style="margin:18px 0 0;color:#3a4a42">We will confirm your timing with you shortly.</p>
        <p style="margin:6px 0 0;color:#3a4a42" dir="rtl">ہم جلد ہی آپ سے وقت کی تصدیق کریں گے۔ شکریہ!</p>
      `);
      await getTransporter().sendMail({
        from: `"${CLINIC.name}" <${process.env.EMAIL_USER}>`,
        to: appt.email,
        subject: `We received your request${
          appt.token != null ? ` — Token #${appt.token}` : ""
        } — ${CLINIC.name}`,
        text:
          `Assalam-o-Alaikum ${appt.name},\n\n` +
          `Thank you for contacting ${CLINIC.name}. We have received your appointment request.\n\n` +
          (appt.token != null ? `YOUR TOKEN NUMBER: #${appt.token}\n\n` : "") +
          `${formatAppointment(appt)}\n\n` +
          `We will confirm your timing with you shortly.\n\n— ${CLINIC.name}\n${CLINIC.phone}`,
        html: patientHtml,
      });
    } catch (e) {
      console.log("[mailer] Could not send patient acknowledgement:", e.message);
    }
  }

  return true;
}

// ── 2) The doctor confirmed the appointment: tell the patient ───────────────
// Returns true if the confirmation email was actually sent.
async function sendConfirmationEmail(appt) {
  if (!isEmailConfigured()) {
    console.log("[mailer] Email not configured — skipping confirmation email.");
    return false;
  }
  if (!appt.email) {
    console.log(
      "[mailer] Appointment has no patient email — cannot send confirmation."
    );
    return false;
  }

  const when =
    [appt.preferredDate, appt.preferredTime].filter(Boolean).join(" · ") ||
    "to be advised";

  const rows = [
    appt.token != null ? ["Token", `#${appt.token}`] : null,
    ["When", when],
    ["Service", appt.service || "General consultation"],
  ].filter(Boolean);

  const table = `
    <table style="border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([k, v]) =>
            `<tr>
               <td style="padding:8px 12px;border:1px solid #e2e9e3;background:#f6f8f5;font-weight:700;white-space:nowrap">${k}</td>
               <td style="padding:8px 12px;border:1px solid #e2e9e3">${esc(v)}</td>
             </tr>`
        )
        .join("")}
    </table>`;

  const html = emailShell(`
    <div style="text-align:center;margin:0 0 8px">
      <span style="display:inline-block;background:#e7f4ec;color:#1f5c43;font-weight:700;padding:6px 14px;border-radius:999px;font-size:13px">✓ Appointment confirmed</span>
    </div>
    <p style="margin:12px 0 4px;font-size:16px">Assalam-o-Alaikum <strong>${esc(
      appt.name
    )}</strong>,</p>
    <p style="margin:0 0 16px;color:#3a4a42">Good news — your appointment at ${
      CLINIC.name
    } has been <strong>confirmed</strong>. Please arrive a few minutes early and bring your token number.</p>
    ${tokenBadge(appt.token)}
    ${table}
    <p style="margin:18px 0 0;color:#3a4a42" dir="rtl">آپ کی اپائنٹمنٹ کی تصدیق ہو گئی ہے۔ براہِ کرم مقررہ وقت پر تشریف لائیں۔ شکریہ!</p>
  `);

  await getTransporter().sendMail({
    from: `"${CLINIC.name}" <${process.env.EMAIL_USER}>`,
    to: appt.email,
    subject: `Appointment confirmed${
      appt.token != null ? ` — Token #${appt.token}` : ""
    } — ${CLINIC.name}`,
    text:
      `Assalam-o-Alaikum ${appt.name},\n\n` +
      `Your appointment at ${CLINIC.name} is CONFIRMED.\n\n` +
      (appt.token != null ? `Token: #${appt.token}\n` : "") +
      `When: ${when}\n` +
      `Service: ${appt.service || "General consultation"}\n\n` +
      `Please arrive a few minutes early and mention your token.\n\n— ${CLINIC.name}\n${CLINIC.phone}`,
    html,
  });

  return true;
}


// Check the SMTP credentials at startup so problems surface immediately
// instead of only when the first patient tries to book.
async function verifyEmail() {
  if (!isEmailConfigured()) return false;
  await getTransporter().verify();
  return true;
}

module.exports = {
  sendAppointmentEmail,
  sendConfirmationEmail,
  isEmailConfigured,
  verifyEmail,
};
