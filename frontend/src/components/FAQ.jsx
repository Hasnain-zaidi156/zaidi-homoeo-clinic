import { useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { IconChevronDown } from "./Icons.jsx";
import Reveal from "./Reveal.jsx";

export default function FAQ() {
  const { t } = useLang();
  const items = t("faq.items"); // array of { q, a }
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section id="faq" className="section section-alt">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">{t("faq.eyebrow")}</span>
          <h2 className="section-title">{t("faq.title")}</h2>
          <p className="section-sub">{t("faq.sub")}</p>
        </div>

        <Reveal className="faq-list">
          {Array.isArray(items) &&
            items.map((it, i) => {
              const open = openIndex === i;
              return (
                <div className={`faq-item ${open ? "open" : ""}`} key={i}>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={open}
                    onClick={() => toggle(i)}
                  >
                    <span>{it.q}</span>
                    <IconChevronDown className="faq-chevron" width={20} height={20} />
                  </button>
                  <div className="faq-a" style={{ maxHeight: open ? "480px" : "0px" }}>
                    <p>{it.a}</p>
                  </div>
                </div>
              );
            })}
        </Reveal>
      </div>
    </section>
  );
}
