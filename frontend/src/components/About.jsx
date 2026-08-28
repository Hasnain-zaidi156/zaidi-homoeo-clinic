import { useLang } from "../i18n/LanguageContext.jsx";
import clinic from "../data/clinic.js";
import Reveal from "./Reveal.jsx";

export default function About() {
  const { t, pick } = useLang();
  const points = t("about.points"); // array

  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal className="about-card">
          {clinic.doctorPhoto && (
            <img
              className="ac-photo"
              src={clinic.doctorPhoto}
              alt={pick(clinic.doctor)}
              loading="lazy"
            />
          )}
          <h3>{pick(clinic.doctor)}</h3>
          {clinic.qualifications && (
            <div className="ac-quals">{pick(clinic.qualifications)}</div>
          )}
          <div className="ac-title">{pick(clinic.doctorTitle)}</div>
          <p className="ac-tag">{pick(clinic.tagline)}</p>
          {(clinic.regNo || clinic.shcc) && (
            <ul className="ac-reg">
              {clinic.regNo && (
                <li>
                  <span>{t("about.regLabel")}</span> {clinic.regNo}
                </li>
              )}
              {clinic.shcc && (
                <li>
                  <span>{t("about.shccLabel")}</span> {clinic.shcc}
                </li>
              )}
            </ul>
          )}
        </Reveal>

        <Reveal className="about-copy" delay={100}>
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h2 className="section-title">{t("about.title")}</h2>
          <p style={{ color: "var(--muted)", marginTop: "0.9rem" }}>
            {t("about.p1")}
          </p>
          <p style={{ color: "var(--muted)" }}>{t("about.p2")}</p>

          <ul className="about-points">
            {Array.isArray(points) &&
              points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
          </ul>

          <a
            className="btn btn-primary"
            href="#appointment"
            style={{ marginTop: "1.6rem" }}
          >
            {t("about.cta")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
