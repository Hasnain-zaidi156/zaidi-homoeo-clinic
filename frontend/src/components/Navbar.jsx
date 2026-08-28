import { useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import clinic from "../data/clinic.js";

const NAV = [
  ["home", "#home"],
  ["about", "#about"],
  ["services", "#services"],
  ["gallery", "#gallery"],
  ["appointment", "#appointment"],
  ["contact", "#contact"],
];

const kicker = { en: "Homeopathic Clinic", ur: "ہومیوپیتھک کلینک" };

export default function Navbar() {
  const { t, pick, toggle } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#home" className="nav-logo" onClick={() => setOpen(false)}>
          <img src={clinic.logo} alt={pick(clinic.name)} />
          <span>
            <span className="n-name">{pick(clinic.name)}</span>
            <span className="n-sub">{pick(kicker)}</span>
          </span>
        </a>

        <nav>
          <ul className="nav-links">
            {NAV.map(([key, href]) => (
              <li key={key}>
                <a className="nav-link" href={href}>
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button className="lang-btn" onClick={toggle} aria-label="Switch language">
            {t("langName")}
          </button>
          <a className="btn btn-primary desktop-only" href="#appointment">
            {t("nav.book")}
          </a>
          <button
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-mobile">
          <ul>
            {NAV.map(([key, href]) => (
              <li key={key}>
                <a href={href} onClick={() => setOpen(false)}>
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
            <li>
              <a href="#appointment" onClick={() => setOpen(false)}>
                <strong style={{ color: "var(--green-800)" }}>{t("nav.book")}</strong>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
