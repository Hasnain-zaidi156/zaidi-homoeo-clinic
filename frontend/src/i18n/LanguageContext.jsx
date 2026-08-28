import { createContext, useContext, useEffect, useMemo, useState } from "react";
import translations from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "zhc_lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ur") return saved;
    }
    return "en";
  });

  const dir = translations[lang].dir;

  // Keep <html lang/dir> in sync so RTL and fonts apply correctly.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore storage errors */
    }
  }, [lang, dir]);

  const value = useMemo(() => {
    // Resolve a dotted key ("nav.book") to a string/array in the current language.
    const t = (path) => {
      const parts = path.split(".");
      let node = translations[lang];
      for (const p of parts) {
        if (node && typeof node === "object" && p in node) node = node[p];
        else return path; // key missing — show the key so it's easy to spot
      }
      return node;
    };

    // Pick the right side of a {en, ur} object from clinic config.
    const pick = (obj) => {
      if (obj == null) return "";
      if (typeof obj === "string") return obj;
      return obj[lang] ?? obj.en ?? "";
    };

    const toggle = () => setLang((l) => (l === "en" ? "ur" : "en"));

    return { lang, dir, setLang, toggle, t, pick, isUrdu: lang === "ur" };
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

// Convenience hook when you only need the translate function.
export function useT() {
  return useLang().t;
}
