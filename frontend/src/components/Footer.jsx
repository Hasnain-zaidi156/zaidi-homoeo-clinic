import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext.jsx";
import clinic from "../data/clinic.js";
import { telLink } from "../lib/links.js";

const NAV = [
  ["about", "#about"],
  ["services", "#services"],
  ["appointment", "#appointment"],
  ["contact", "#contact"],
];

export default function Footer() {
  const { t, pick } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <img src={clinic.logo} alt={pick(clinic.name)} />
              <b>{pick(clinic.name)}</b>
            </div>
            <p>{t("footer.tagline")}</p>
            <p className="disclaimer">{t("footer.disclaimer")}</p>
          </div>

          <div className="footer-col">
            <h4>{t("footer.quickLinks")}</h4>
            <ul>
              {NAV.map(([key, href]) => (
                <li key={key}>
                  <a href={href}>{t(`nav.${key}`)}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t("footer.contact")}</h4>
            <ul>
              <li>{pick(clinic.address)}</li>
              <li>
                <a href={telLink(clinic.phone)}>{clinic.phone}</a>
              </li>
              {clinic.phone2 && (
                <li>
                  <a href={telLink(clinic.phone2)}>{clinic.phone2}</a>
                </li>
              )}
              <li>
                <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {pick(clinic.name)}. {t("footer.rights")}
          </span>
          <Link to="/admin">{t("footer.admin")}</Link>
        </div>
      </div>
    </footer>
  );
}
