import { useState } from "react";
import axios from "axios";
import { useLang } from "../i18n/LanguageContext.jsx";
import clinic from "../data/clinic.js";
import { waLink, telLink } from "../lib/links.js";
import { IconCheck, IconWhatsapp, IconPhone } from "./Icons.jsx";

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export default function Appointment() {
  const { t, pick } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  const generalLabel = t("appt.serviceGeneral");

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim()) {
      setError(t("appt.errorRequired"));
      return;
    }
    setStatus("sending");
    try {
      await axios.post("/api/appointments", {
        ...form,
        service: form.service || generalLabel,
      });
      setStatus("done");
      setForm(EMPTY);
    } catch (err) {
      setStatus("error");
      setError(t("appt.errorGeneric"));
    }
  };

  // WhatsApp fallback message, pre-filled with whatever the patient typed.
  const waMsg = [
    `${pick(clinic.name)} — ${pick({ en: "Appointment request", ur: "اپائنٹمنٹ کی درخواست" })}`,
    form.name && `Name: ${form.name}`,
    form.phone && `Phone: ${form.phone}`,
    form.service && `Concern: ${form.service}`,
    form.preferredDate && `Date: ${form.preferredDate}`,
    form.preferredTime && `Time: ${form.preferredTime}`,
    form.message && `Message: ${form.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section id="appointment" className="section section-alt">
      <div className="container appt-grid">
        <div className="appt-aside">
          <span className="eyebrow">{t("appt.eyebrow")}</span>
          <h2>{t("appt.title")}</h2>
          <p>{t("appt.sub")}</p>

          <div className="appt-contactline">
            <a href={telLink()}>
              <IconPhone width={20} height={20} /> {clinic.phone}
            </a>
            <a href={waLink(waMsg)} target="_blank" rel="noreferrer">
              <IconWhatsapp width={20} height={20} /> {clinic.phone}
            </a>
          </div>
        </div>

        <div className="appt-form">
          {status === "done" ? (
            <div className="success-box">
              <div className="check">
                <IconCheck width={32} height={32} />
              </div>
              <h3>{t("appt.successTitle")}</h3>
              <p>{t("appt.successMsg")}</p>
              <button
                className="btn btn-outline"
                onClick={() => setStatus("idle")}
              >
                {t("appt.another")}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              {error && <div className="form-error">{error}</div>}

              <div className="field">
                <label htmlFor="name">
                  {t("appt.name")} <span className="req">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={update}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="phone">
                    {t("appt.phone")} <span className="req">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    inputMode="tel"
                    autoComplete="tel"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">{t("appt.email")}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="service">{t("appt.service")}</label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={update}
                >
                  <option value="">{t("appt.servicePlaceholder")}</option>
                  <option value={generalLabel}>{generalLabel}</option>
                  {clinic.services.map((s, i) => (
                    <option key={i} value={s.en.title}>
                      {pick(s).title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="preferredDate">{t("appt.date")}</label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={form.preferredDate}
                    onChange={update}
                  />
                </div>
                <div className="field">
                  <label htmlFor="preferredTime">{t("appt.time")}</label>
                  <input
                    id="preferredTime"
                    name="preferredTime"
                    type="time"
                    value={form.preferredTime}
                    onChange={update}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">{t("appt.message")}</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={update}
                  placeholder={t("appt.messagePlaceholder")}
                />
              </div>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? t("appt.submitting") : t("appt.submit")}
              </button>

              <div className="wa-line">
                <a href={waLink(waMsg)} target="_blank" rel="noreferrer">
                  {t("appt.orWhatsapp")}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
