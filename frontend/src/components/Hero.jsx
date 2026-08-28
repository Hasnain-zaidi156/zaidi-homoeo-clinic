import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import clinic from "../data/clinic.js";
import { waLink } from "../lib/links.js";
import { IconWhatsapp } from "./Icons.jsx";

// How long each product photo stays on screen before crossfading to the next.
const SLIDE_MS = 3500;

export default function Hero() {
  const { t, pick } = useLang();
  const waMsg = `${pick(clinic.name)} — ${
    pick({ en: "I'd like to book an appointment.", ur: "میں اپائنٹمنٹ لینا چاہتا/چاہتی ہوں۔" })
  }`;

  const images = Array.isArray(clinic.heroImages) ? clinic.heroImages.filter(Boolean) : [];
  const [active, setActive] = useState(0);

  // Auto-advance through the product photos. Only runs when there's more
  // than one image to rotate between.
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section id="home" className="hero">
      <div className="hero-leaf" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow">{t("hero.eyebrow")}</span>
          <h1 className="hero-title">{t("hero.headline")}</h1>
          <p className="hero-sub">{t("hero.sub")}</p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#appointment">
              {t("hero.ctaBook")}
            </a>
            <a
              className="btn btn-whatsapp"
              href={waLink(waMsg)}
              target="_blank"
              rel="noreferrer"
            >
              <IconWhatsapp width={20} height={20} />
              {t("hero.ctaWhatsapp")}
            </a>
          </div>

          <div className="hero-stats">
            {clinic.stats
              .filter((s) => s.value)
              .map((s, i) => (
                <div className="stat" key={i}>
                  <div className="stat-val">{s.value}</div>
                  <div className="stat-lbl">{pick(s.label)}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="hero-media">
          <div className="medallion">
            {images.length > 0 ? (
              <div className="medallion-slider">
                {images.map((src, i) => (
                  <img
                    key={src + i}
                    src={src}
                    alt={`${pick(clinic.name)} ${i + 1}`}
                    className={i === active ? "is-active" : ""}
                  />
                ))}
              </div>
            ) : (
              <img src={clinic.logo} alt={pick(clinic.name)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
