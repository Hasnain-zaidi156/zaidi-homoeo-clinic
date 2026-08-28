// Lightweight inline SVG icons (stroke = currentColor). No external icon library.

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconPhone = (p) => (
  <svg {...base} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const IconMail = (p) => (
  <svg {...base} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export const IconLocation = (p) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const IconClock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const IconDirections = (p) => (
  <svg {...base} {...p}>
    <path d="m21.7 11.3-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4Z" />
    <path d="M9 13v-2a2 2 0 0 1 2-2h4" />
    <path d="m13 7 3 2-3 2" />
  </svg>
);

export const IconWhatsapp = (p) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" {...p}>
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    <path d="M12 2a10 10 0 0 0-8.6 15.05L2 22l5.06-1.33A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3 .79.8-2.93-.2-.31A8.2 8.2 0 1 1 12 20.2Z" />
  </svg>
);

export const IconFacebook = (p) => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" {...p}>
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.75-1.6 1.5V12h2.7l-.43 2.9h-2.27v7A10 10 0 0 0 22 12Z" />
  </svg>
);

export const IconInstagram = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const IconStar = (p) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" {...p}>
    <path d="M12 2.5 15 8.7l6.8.9-4.9 4.7 1.2 6.7L12 17.8l-6.1 3.2 1.2-6.7-4.9-4.7 6.8-.9L12 2.5Z" />
  </svg>
);

/* -------- Service icons (keyed by clinic.js service.icon) ------------------ */
export const serviceIcons = {
  chronic: (p) => (
    <svg {...base} {...p}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M3.5 12h4l1.5-3 3 6 1.5-3h4" />
    </svg>
  ),
  skin: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="10" r="1" />
      <circle cx="14" cy="9" r="1" />
      <circle cx="13" cy="14" r="1" />
      <circle cx="9.5" cy="15" r="1" />
    </svg>
  ),
  digestive: (p) => (
    <svg {...base} {...p}>
      <path d="M8 3v4a4 4 0 0 0 4 4 3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H9" />
      <path d="M8 7h4" />
    </svg>
  ),
  joints: (p) => (
    <svg {...base} {...p}>
      <path d="M6 4c2 1 3 3 3 5s-1 3-1 4 1 2 1 4-1 3-3 3" />
      <path d="M18 4c-2 1-3 3-3 5s1 3 1 4-1 2-1 4 1 3 3 3" />
      <circle cx="12" cy="12" r="1.4" />
    </svg>
  ),
  respiratory: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3v6" />
      <path d="M12 9c-1 3-4 3-4 6a4 4 0 0 0 8 0c0-3-3-3-4-6Z" />
      <path d="M6 21c0-3 2-4 2-6M18 21c0-3-2-4-2-6" />
    </svg>
  ),
  migraine: (p) => (
    <svg {...base} {...p}>
      <path d="M9 21c-.5-2-2-2.5-2-5a5 5 0 0 1 10 0c0 2.5-1.5 3-2 5" />
      <path d="M10 21h4" />
      <path d="M12 3v2M5 6l1.5 1.5M19 6l-1.5 1.5" />
    </svg>
  ),
  child: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
      <path d="M10 6.5h.01M14 6.5h.01" />
    </svg>
  ),
  mind: (p) => (
    <svg {...base} {...p}>
      <path d="M9.5 21v-2.2A6 6 0 1 1 16 8.5c0 1.6-.7 2.5-1.5 3.4-.7.8-1 1.4-1 2.6v.5" />
      <path d="M9.5 18h4" />
      <path d="M11.5 8.5v3" />
    </svg>
  ),

  /* --- Condition icons for Zaidi Homoeo Clinic (from the card) ------------- */
  stone: (p) => (
    <svg {...base} {...p}>
      <path d="M5 14.5a5 5 0 0 1 4.3-5.4 4.5 4.5 0 0 1 8.4 1.8 3.5 3.5 0 0 1-1 6.8H8.5a3.5 3.5 0 0 1-3.5-3.2Z" />
      <circle cx="10.5" cy="13" r="1" />
      <circle cx="14" cy="14.5" r="1" />
    </svg>
  ),
  kidney: (p) => (
    <svg {...base} {...p}>
      <path d="M9.2 4.5C6.5 4.5 5.5 7.5 5.5 10.5s1 6 3.7 6c1.9 0 2-2.2 2-4.2s0-7.8-2-7.8Z" />
      <path d="M14.8 4.5c2.7 0 3.7 3 3.7 6s-1 6-3.7 6c-1.9 0-2-2.2-2-4.2s0-7.8 2-7.8Z" />
    </svg>
  ),
  liver: (p) => (
    <svg {...base} {...p}>
      <path d="M3.5 7.5c5.5-2.2 11.5-2.2 17 0-.2 5-3.4 9-8.5 9-4.2 0-7.3-3.2-8.5-6.5Z" />
      <path d="M13 8.5c.9 1 2 1.2 3.2 1" />
    </svg>
  ),
  intestine: (p) => (
    <svg {...base} {...p}>
      <path d="M7 4v6.5a2.5 2.5 0 0 0 5 0 2 2 0 0 1 4 0V20" />
      <path d="M7 4h4" />
      <path d="M16 20h3" />
    </svg>
  ),
  spine: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3c1.2 0 2 .9 2 2s-.8 2-2 2-2-.9-2-2M12 7c1.2 0 2 .9 2 2s-.8 2-2 2-2-.9-2-2M12 11c1.2 0 2 .9 2 2s-.8 2-2 2-2-.9-2-2M12 15c1.2 0 2 .9 2 2s-.8 2-2 2-2-.9-2-2" />
    </svg>
  ),
  brain: (p) => (
    <svg {...base} {...p}>
      <path d="M8.5 4.5A3 3 0 0 0 5.5 8 2.8 2.8 0 0 0 4.5 13a2.8 2.8 0 0 0 3 3.8A2.8 2.8 0 0 0 12 18a2.8 2.8 0 0 0 4.5-1.2 2.8 2.8 0 0 0 3-3.8A2.8 2.8 0 0 0 18.5 8 3 3 0 0 0 15.5 4.5 2.8 2.8 0 0 0 12 5.5a2.8 2.8 0 0 0-3.5-1Z" />
      <path d="M12 5.5V18" />
    </svg>
  ),
  shield: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z" />
      <path d="M12 9v5M9.5 11.5h5" />
    </svg>
  ),
};
