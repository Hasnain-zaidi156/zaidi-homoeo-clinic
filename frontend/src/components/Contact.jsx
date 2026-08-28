import { useLang } from "../i18n/LanguageContext.jsx";
import clinic from "../data/clinic.js";
import { waLink, telLink } from "../lib/links.js";
import {
  IconLocation,
  IconPhone,
  IconMail,
  IconClock,
  IconDirections,
  IconWhatsapp,
} from "./Icons.jsx";

export default function Contact() {
  const { t, pick } = useLang();

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h2 className="section-title">{t("contact.title")}</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <span className="ci-icon">
                <IconLocation />
              </span>
              <div>
                <h4>{t("contact.addressLabel")}</h4>
                <p>{pick(clinic.address)}</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="ci-icon">
                <IconPhone />
              </span>
              <div>
                <h4>{t("contact.phoneLabel")}</h4>
                <p style={{ margin: 0 }}>
                  <a href={telLink(clinic.phone)}>{clinic.phone}</a>{" "}
                  <span className="muted" style={{ fontSize: "0.85rem" }}>
                    ({pick({ en: "WhatsApp", ur: "واٹس ایپ" })})
                  </span>
                </p>
                {clinic.phone2 && (
                  <p style={{ margin: 0 }}>
                    <a href={telLink(clinic.phone2)}>{clinic.phone2}</a>
                  </p>
                )}
              </div>
            </div>

            <div className="contact-item">
              <span className="ci-icon">
                <IconMail />
              </span>
              <div>
                <h4>{t("contact.emailLabel")}</h4>
                <p>
                  <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <span className="ci-icon">
                <IconClock />
              </span>
              <div style={{ flex: 1 }}>
                <h4>{t("contact.hoursLabel")}</h4>
                <div className="contact-hours">
                  {clinic.hours.map((h, i) => (
                    <div className="row" key={i}>
                      <span>{pick(h.day)}</span>
                      <span>{pick(h.time)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-actions">
              <a
                className="btn btn-primary"
                href={clinic.mapLink}
                target="_blank"
                rel="noreferrer"
              >
                <IconDirections width={20} height={20} /> {t("contact.directions")}
              </a>
              <a
                className="btn btn-whatsapp"
                href={waLink(pick(clinic.name))}
                target="_blank"
                rel="noreferrer"
              >
                <IconWhatsapp width={20} height={20} /> {t("contact.whatsappBtn")}
              </a>
            </div>
          </div>

          <div className="contact-map">
            <iframe
              title="Clinic location"
              src={clinic.mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
