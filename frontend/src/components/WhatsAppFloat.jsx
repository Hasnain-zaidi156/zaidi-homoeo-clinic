import { useLang } from "../i18n/LanguageContext.jsx";
import clinic from "../data/clinic.js";
import { waLink } from "../lib/links.js";
import { IconWhatsapp } from "./Icons.jsx";

export default function WhatsAppFloat() {
  const { pick } = useLang();
  const msg = `${pick(clinic.name)} — ${pick({
    en: "I'd like to book an appointment.",
    ur: "میں اپائنٹمنٹ لینا چاہتا/چاہتی ہوں۔",
  })}`;
  return (
    <a
      className="wa-float"
      href={waLink(msg)}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
    >
      <IconWhatsapp />
    </a>
  );
}
