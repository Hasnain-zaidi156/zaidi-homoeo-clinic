import { useState } from "react";
import axios from "axios";
import { useLang } from "../i18n/LanguageContext.jsx";
import { IconCheck, IconStar } from "./Icons.jsx";
import Reveal from "./Reveal.jsx";

const STARS = [1, 2, 3, 4, 5];

// Public "rate your experience" widget. Anyone can leave a star rating +
// optional comment; the doctor sees every submission in the admin panel.
export default function Reviews() {
  const { t } = useLang();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError(t("reviews.errorName"));
      return;
    }
    if (!rating) {
      setError(t("reviews.errorRating"));
      return;
    }
    setStatus("sending");
    try {
      await axios.post("/api/reviews", { name, rating, comment });
      setStatus("done");
      setName("");
      setRating(0);
      setComment("");
    } catch (err) {
      setStatus("error");
      setError(t("reviews.errorGeneric"));
    }
  };

  return (
    <section id="reviews" className="section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">{t("reviews.eyebrow")}</span>
          <h2 className="section-title">{t("reviews.title")}</h2>
          <p className="section-sub">{t("reviews.sub")}</p>
        </div>

        <Reveal className="reviews-form-wrap">
          {status === "done" ? (
            <div className="success-box">
              <div className="check">
                <IconCheck width={32} height={32} />
              </div>
              <h3>{t("reviews.successTitle")}</h3>
              <p>{t("reviews.successMsg")}</p>
              <button className="btn btn-outline" onClick={() => setStatus("idle")}>
                {t("reviews.another")}
              </button>
            </div>
          ) : (
            <form className="reviews-form" onSubmit={submit} noValidate>
              {error && <div className="form-error">{error}</div>}

              <div className="field star-field">
                <label>{t("reviews.ratingLabel")}</label>
                <div className="star-picker" role="radiogroup" aria-label={t("reviews.ratingLabel")}>
                  {STARS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`star-btn ${(hover || rating) >= n ? "filled" : ""}`}
                      role="radio"
                      aria-checked={rating === n}
                      aria-label={`${n} / 5`}
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(n)}
                    >
                      <IconStar />
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label htmlFor="rv-name">
                  {t("reviews.name")} <span className="req">*</span>
                </label>
                <input
                  id="rv-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="rv-comment">{t("reviews.comment")}</label>
                <textarea
                  id="rv-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t("reviews.commentPlaceholder")}
                />
              </div>

              <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? t("reviews.submitting") : t("reviews.submit")}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
