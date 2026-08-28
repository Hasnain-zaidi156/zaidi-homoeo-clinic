import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLang } from "../i18n/LanguageContext.jsx";
import clinic from "../data/clinic.js";
import { IconStar } from "../components/Icons.jsx";

const PW_KEY = "zhc_admin";
const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

// Small read-only star row (1-5), used for both the average and each review.
function StarsDisplay({ value }) {
  return (
    <span className="stars-display">
      {[1, 2, 3, 4, 5].map((n) => (
        <IconStar key={n} className={n <= Math.round(value) ? "on" : ""} />
      ))}
    </span>
  );
}

export default function Admin() {
  const { t, pick, toggle } = useLang();

  const [pw, setPw] = useState(() => localStorage.getItem(PW_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [tab, setTab] = useState("appointments"); // appointments | reviews

  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const [reviews, setReviews] = useState([]);
  const [reviewAvg, setReviewAvg] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  const authHeader = useCallback(
    (password) => ({ headers: { "x-admin-password": password || pw } }),
    [pw]
  );

  const load = useCallback(
    async (password = pw, status = filter) => {
      setLoading(true);
      try {
        const q = status && status !== "all" ? `?status=${status}` : "";
        const res = await axios.get(`/api/appointments${q}`, {
          headers: { "x-admin-password": password },
        });
        setAppts(res.data.appointments || []);
        setAuthed(true);
        return true;
      } catch (err) {
        if (err?.response?.status === 401) {
          setAuthed(false);
          localStorage.removeItem(PW_KEY);
        }
        return false;
      } finally {
        setLoading(false);
      }
    },
    [pw, filter]
  );

  const loadReviews = useCallback(
    async (password = pw) => {
      setReviewsLoading(true);
      try {
        const res = await axios.get("/api/reviews", {
          headers: { "x-admin-password": password },
        });
        setReviews(res.data.reviews || []);
        setReviewAvg(res.data.average || 0);
        setReviewsLoaded(true);
      } catch (err) {
        // ignore — the appointments tab already handles 401 / auth state
      } finally {
        setReviewsLoading(false);
      }
    },
    [pw]
  );

  // Auto-login if a password was saved from a previous visit.
  useEffect(() => {
    const saved = localStorage.getItem(PW_KEY);
    if (saved) load(saved, "all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reload when the filter changes (only while logged in).
  useEffect(() => {
    if (authed) load(pw, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // Load reviews the first time the doctor switches to that tab.
  useEffect(() => {
    if (authed && tab === "reviews" && !reviewsLoaded) loadReviews(pw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, authed]);

  const doLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      await axios.post("/api/admin/login", { password: pw });
      localStorage.setItem(PW_KEY, pw);
      await load(pw, filter);
    } catch (err) {
      setLoginError(t("admin.loginError"));
    }
  };

  const logout = () => {
    localStorage.removeItem(PW_KEY);
    setPw("");
    setAuthed(false);
    setAppts([]);
    setReviews([]);
    setReviewsLoaded(false);
  };

  const setStatus = async (id, status) => {
    try {
      await axios.patch(`/api/appointments/${id}`, { status }, authHeader());
      setAppts((list) =>
        list.map((a) => (a._id === id ? { ...a, status } : a))
      );
      // If a filter is active, drop rows that no longer match.
      if (filter !== "all" && status !== filter) {
        setAppts((list) => list.filter((a) => a._id !== id));
      }
    } catch (err) {
      alert(t("admin.loginError"));
    }
  };

  const remove = async (id) => {
    if (!window.confirm(t("admin.confirmDelete"))) return;
    try {
      await axios.delete(`/api/appointments/${id}`, authHeader());
      setAppts((list) => list.filter((a) => a._id !== id));
    } catch (err) {
      alert(t("admin.loginError"));
    }
  };

  const removeReview = async (id) => {
    if (!window.confirm(t("admin.confirmDeleteReview"))) return;
    try {
      await axios.delete(`/api/reviews/${id}`, authHeader());
      setReviews((list) => {
        const next = list.filter((r) => r._id !== id);
        const avg =
          next.length === 0
            ? 0
            : Math.round((next.reduce((s, r) => s + r.rating, 0) / next.length) * 10) / 10;
        setReviewAvg(avg);
        return next;
      });
    } catch (err) {
      alert(t("admin.loginError"));
    }
  };

  const fmt = (d) =>
    d ? new Date(d).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—";

  // ---- Login screen --------------------------------------------------------
  if (!authed) {
    return (
      <div className="admin-wrap">
        <div className="admin-login">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src={clinic.logo} alt="" style={{ width: 44, height: 44 }} />
            <button className="lang-btn" onClick={toggle}>{t("langName")}</button>
          </div>
          <h1 style={{ marginTop: "0.8rem" }}>{t("admin.title")}</h1>
          <p>{t("admin.subtitle")}</p>
          <form onSubmit={doLogin}>
            {loginError && <div className="form-error">{loginError}</div>}
            <div className="field">
              <label htmlFor="pw">{t("admin.passwordLabel")}</label>
              <input
                id="pw"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                autoFocus
              />
            </div>
            <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>
              {t("admin.login")}
            </button>
          </form>
          <p style={{ marginTop: "1.2rem", marginBottom: 0 }}>
            <Link to="/" className="muted">{t("admin.backToSite")}</Link>
          </p>
        </div>
      </div>
    );
  }

  // ---- Dashboard -----------------------------------------------------------
  return (
    <div className="admin-wrap">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>{t("admin.title")}</h1>
            <div className="sub">{t("admin.subtitle")}</div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <button className="lang-btn" onClick={toggle}>{t("langName")}</button>
            <Link to="/" className="btn btn-ghost">{t("admin.backToSite")}</Link>
            <button className="btn btn-outline" onClick={logout}>{t("admin.logout")}</button>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            className={`chip ${tab === "appointments" ? "active" : ""}`}
            onClick={() => setTab("appointments")}
          >
            {t("admin.tabAppointments")}
          </button>
          <button
            className={`chip ${tab === "reviews" ? "active" : ""}`}
            onClick={() => setTab("reviews")}
          >
            {t("admin.tabReviews")}
          </button>
        </div>

        {tab === "appointments" ? (
          <>
            <div className="admin-toolbar">
              <span className="muted" style={{ fontWeight: 700 }}>{t("admin.filterLabel")}:</span>
              {["all", ...STATUSES].map((s) => (
                <button
                  key={s}
                  className={`chip ${filter === s ? "active" : ""}`}
                  onClick={() => setFilter(s)}
                >
                  {t(`admin.${s}`)}
                </button>
              ))}
              <span className="muted" style={{ marginInlineStart: "auto" }}>
                {appts.length} {t("admin.total")}
              </span>
            </div>

            <div className="table-wrap">
              <table className="appts">
                <thead>
                  <tr>
                    <th>{t("admin.colName")}</th>
                    <th>{t("admin.colContact")}</th>
                    <th>{t("admin.colService")}</th>
                    <th>{t("admin.colWhen")}</th>
                    <th>{t("admin.colStatus")}</th>
                    <th>{t("admin.colSubmitted")}</th>
                    <th>{t("admin.colActions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="muted" style={{ textAlign: "center", padding: "2rem" }}>
                        {t("admin.loading")}
                      </td>
                    </tr>
                  ) : appts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="muted" style={{ textAlign: "center", padding: "2rem" }}>
                        {t("admin.empty")}
                      </td>
                    </tr>
                  ) : (
                    appts.map((a) => (
                      <tr key={a._id}>
                        <td>
                          <strong>{a.name}</strong>
                          {a.email ? <div className="muted">{a.email}</div> : null}
                        </td>
                        <td>
                          <a href={`tel:${a.phone}`}>{a.phone}</a>
                        </td>
                        <td>{a.service || "—"}</td>
                        <td>
                          {a.preferredDate || "—"}
                          {a.preferredTime ? ` · ${a.preferredTime}` : ""}
                          {a.message ? (
                            <div className="muted" style={{ maxWidth: 220 }}>{a.message}</div>
                          ) : null}
                        </td>
                        <td>
                          <span className={`badge ${a.status}`} style={{ marginBottom: 6, display: "inline-block" }}>
                            {t(`admin.${a.status}`)}
                          </span>
                          <div>
                            <select
                              className="status-select"
                              value={a.status}
                              onChange={(e) => setStatus(a._id, e.target.value)}
                            >
                              {STATUSES.map((s) => (
                                <option key={s} value={s}>{t(`admin.${s}`)}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="muted">{fmt(a.createdAt)}</td>
                        <td>
                          <button className="link-btn" onClick={() => remove(a._id)}>
                            {t("admin.delete")}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="admin-reviews">
            <div className="admin-toolbar">
              <div className="review-average">
                <StarsDisplay value={reviewAvg} />
                <span>
                  {reviewAvg || "—"} <span className="muted" style={{ fontWeight: 500 }}>({t("admin.avgRating")})</span>
                </span>
              </div>
              <span className="muted" style={{ marginInlineStart: "auto" }}>
                {reviews.length} {t("admin.reviewsTotal")}
              </span>
            </div>

            {reviewsLoading ? (
              <p className="muted" style={{ textAlign: "center", padding: "2rem" }}>
                {t("admin.loading")}
              </p>
            ) : reviews.length === 0 ? (
              <p className="muted" style={{ textAlign: "center", padding: "2rem" }}>
                {t("admin.reviewsEmpty")}
              </p>
            ) : (
              reviews.map((r) => (
                <div className="review-card" key={r._id}>
                  <div className="rv-top">
                    <div>
                      <span className="rv-name">{r.name}</span>{" "}
                      <StarsDisplay value={r.rating} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      <span className="rv-date">{fmt(r.createdAt)}</span>
                      <button className="link-btn" onClick={() => removeReview(r._id)}>
                        {t("admin.delete")}
                      </button>
                    </div>
                  </div>
                  {r.comment && <div className="rv-comment">{r.comment}</div>}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
