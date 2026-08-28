import { useLang } from "../i18n/LanguageContext.jsx";
import Reveal from "./Reveal.jsx";

export default function WhyChoose() {
  const { t } = useLang();
  const items = t("why.items"); // array of { t, d }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">{t("why.eyebrow")}</span>
          <h2 className="section-title">{t("why.title")}</h2>
        </div>

        <div className="why-grid">
          {Array.isArray(items) &&
            items.map((it, i) => (
              <Reveal className="why-card" key={i} delay={(i % 4) * 80}>
                <div className="why-num">{i + 1}</div>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
