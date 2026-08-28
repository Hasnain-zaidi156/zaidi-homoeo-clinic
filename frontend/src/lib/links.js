import clinic from "../data/clinic.js";

// Build a wa.me link with an optional pre-filled message.
export function waLink(text) {
  const num = (clinic.whatsapp || "").replace(/[^0-9]/g, "");
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${num}${q}`;
}

// tel: link from a display phone number (defaults to the primary number).
export function telLink(num) {
  const n = (num || clinic.phone || "").replace(/[^0-9+]/g, "");
  return `tel:${n}`;
}
