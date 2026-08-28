import { useLang } from "../i18n/LanguageContext.jsx";
import clinic from "../data/clinic.js";
import Reveal from "./Reveal.jsx";
import { serviceIcons } from "./Icons.jsx";

export default function Services() {
  const { t, pick } = useLang();

  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">{t("services.eyebrow")}</span>
          <h2 className="section-title">{t("services.title")}</h2>
          <p className="section-sub">{t("services.sub")}</p>
        </div>

        <div className="services-grid">
          {clinic.services.map((s, i) => {
            const Icon = serviceIcons[s.icon] || serviceIcons.chronic;
            const item = pick(s); // { title, desc } in the active language
            return (
              <Reveal className="service-card" key={i} delay={(i % 4) * 80}>
                <div className="service-icon">
                  <Icon />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Reveal>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.2rem" }}>
          <a className="btn btn-outline" href="#appointment">
            {t("services.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
