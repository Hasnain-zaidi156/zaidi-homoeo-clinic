import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import clinic from "../data/clinic.js";
import Reveal from "./Reveal.jsx";

// Clinic photo + doctor's certificates, shown large, with a click-to-zoom
// lightbox. Section auto-hides if nothing has been added in clinic.js yet.
export default function Gallery() {
  const { t, pick } = useLang();
  const [lightbox, setLightbox] = useState(null); // { src, caption } | null

  const clinicPhotos = (Array.isArray(clinic.clinicPhoto)
    ? clinic.clinicPhoto
    : [clinic.clinicPhoto]
  ).filter(Boolean);
  const hasClinicPhotos = clinicPhotos.length > 0;
  const certs = Array.isArray(clinic.certificates) ? clinic.certificates : [];
  const hasCerts = certs.length > 0;

  // Close the lightbox on Escape.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (!hasClinicPhotos && !hasCerts) return null; // nothing to show yet

  return (
    <section id="gallery" className="section section-alt">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">{t("gallery.eyebrow")}</span>
          <h2 className="section-title">{t("gallery.title")}</h2>
          <p className="section-sub">{t("gallery.sub")}</p>
        </div>

        {hasClinicPhotos && (
          <div
            className={
              clinicPhotos.length > 1
                ? "gallery-clinic-grid"
                : "gallery-clinic"
            }
          >
            {clinicPhotos.map((src, i) => (
              <Reveal key={i} delay={(i % 3) * 80}>
                <button
                  type="button"
                  className="gallery-clinic-btn"
                  onClick={() =>
                    setLightbox({ src, caption: t("gallery.clinicPhotoAlt") })
                  }
                  aria-label={t("gallery.clinicPhotoAlt")}
                >
                  <img src={src} alt={t("gallery.clinicPhotoAlt")} loading="lazy" />
                  <span className="gallery-zoom-hint">{t("gallery.zoomHint")}</span>
                </button>
              </Reveal>
            ))}
          </div>
        )}

        {hasCerts && (
          <>
            <h3 className="gallery-certs-title">{t("gallery.certsTitle")}</h3>
            <div className="gallery-certs-grid">
              {certs.map((c, i) => (
                <Reveal className="gallery-cert-card" key={i} delay={(i % 4) * 80}>
                  <button
                    type="button"
                    className="gallery-cert-btn"
                    onClick={() => setLightbox({ src: c.image, caption: pick(c.caption) })}
                    aria-label={pick(c.caption) || t("gallery.certAlt")}
                  >
                    <img
                      src={c.image}
                      alt={pick(c.caption) || t("gallery.certAlt")}
                      loading="lazy"
                    />
                    <span className="gallery-zoom-hint">{t("gallery.zoomHint")}</span>
                  </button>
                  {c.caption && <div className="gallery-cert-caption">{pick(c.caption)}</div>}
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button
            type="button"
            className="lightbox-close"
            aria-label={t("gallery.close")}
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.caption || ""}
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox.caption && (
            <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
              {lightbox.caption}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
