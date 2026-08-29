// ============================================================================
//  CLINIC CONFIG  —  real details filled in. Edit here anytime.
//  Everything the website shows about the clinic comes from this file.
// ============================================================================

const clinic = {
    // Clinic + doctor names
    name: { en: "Zaidi Homoeo Clinic", ur: "زیدی ہومیو کلینک" },
    doctor: { en: "Dr. Syed Faraz Ahmed Zaidi", ur: "ڈاکٹر سید فراز احمد زیدی" },
    doctorTitle: {
        en: "Homeopathic Physician",
        ur: "ہومیوپیتھک فزیشن",
    },
    // Qualifications & registration (from the doctor's card)
    qualifications: {
        en: "DHMS, RHMP, B.Sc, M.A",
        ur: "ڈی ایچ ایم ایس، آر ایچ ایم پی، بی ایس سی، ایم اے",
    },
    regNo: "156186",
    shcc: "SHCC/RSUK/0211", // Sindh Health Care Commission no.
    tagline: {
        en: "Gentle, natural homeopathic care for the whole family.",
        ur: "پورے خاندان کے لیے نرم اور قدرتی ہومیوپیتھک علاج۔",
    },
    established: "", // e.g. "2008" — leave "" to hide

    // --- Contact --------------------------------------------------------------
    phone: "0300 3139170", // primary (also on WhatsApp)
    phone2: "0311 3139170", // secondary
    // WhatsApp number in international format, digits only (0300… → 92300…)
    whatsapp: "923003139170",
    email: "zaidihomoeoclinic@gmail.com", // change if you have a different email
    address: {
        en: "Dhak Bazar, Rohri, Sindh, Pakistan",
        ur: "ڈھک بازار، روہڑی، سندھ، پاکستان",
    },

    // Opening hours — two daily sessions
    hours: [{
            day: { en: "Morning", ur: "صبح" },
            time: { en: "10:00 AM – 1:30 PM", ur: "صبح 10:00 – دوپہر 1:30" },
        },
        {
            day: { en: "Evening", ur: "شام" },
            time: { en: "5:30 PM – 9:30 PM", ur: "شام 5:30 – رات 9:30" },
        },
    ],

    // --- Map ------------------------------------------------------------------
    // "Get directions" opens the exact Google Maps place you shared:
    mapLink: "https://maps.app.goo.gl/93AR99B2yv8raHvY7",
    // Embedded preview (no API key needed). Searches for the clinic by name + area.
    mapEmbedSrc: "https://www.google.com/maps?q=Zaidi+Homoeo+Clinic+Dhak+Bazar+Rohri&output=embed",

    // Optional social links — leave "" to hide the icon
    social: {
        facebook: "",
        instagram: "",
    },

    // Logo (the image you provided)
    logo: "https://i.ibb.co/Cr5FLyK/Untitled-design.png",

    // --- Hero medallion: rotating product photos --------------------------
    // The circle on the homepage can show your product photos instead of the
    // logo, auto-changing one after another. Upload photos (transparent PNG
    // works best) to https://imgbb.com and paste the links below — 3 or 4 is
    // ideal. Leave the array empty ([]) to keep showing the logo.
    heroImages: [
        "https://i.ibb.co/8LqJ3rrT/05b20b99-c464-40bc-8a99-0a6953f8d8de.png",
        "https://i.ibb.co/Cr5FLyK/Untitled-design.png",
        "https://i.ibb.co/C5x4CCXY/8a7c4572-b050-4d5c-b5d3-5dcb26fbcce1.png",
        "https://i.ibb.co/Cr5FLyK/Untitled-design.png",
        "https://i.ibb.co/KxxnbMqj/c2c17079-ceed-4b41-b515-9530c50cb50e.png",
        "https://i.ibb.co/Cr5FLyK/Untitled-design.png",
    ],

    // Photo of the doctor (shown in the About section)
    doctorPhoto: "https://i.ibb.co/d0g024Gg/f21fde13-57b0-4a06-997f-b485fa082495.png",

    // --- Gallery: clinic photos + certificates ----------------------------------
    // Upload your images to a free host like https://imgbb.com (same as the
    // logo/doctorPhoto above), then paste the direct image links here.
    // Photos of the clinic itself (exterior/interior/reception, waiting area,
    // dispensary, etc.) — add as many as you like, the gallery shows them all.
    clinicPhoto: [
        "https://i.ibb.co/ycXbRmdr/image.png",
        // "https://i.ibb.co/xxxxxxx/clinic-reception.jpg",
        // "https://i.ibb.co/xxxxxxx/clinic-dispensary.jpg",
    ],

    // Doctor's certificates / degrees / registration documents.
    // Add as many as you like — each needs an "image" link and an optional caption.
    certificates: [{
            image: "https://i.ibb.co/svsJgGxJ/certificate-with-new-photo.png",
            caption: { en: "Authority Certificate", ur: "اسناد و سرٹیفکیٹس" },
        },
        {
            image: "https://i.ibb.co/8LTc7CPV/03e01a05-f773-4dbd-89b5-b731c12a0f1e.png",
            caption: { en: "SHCC Registration", ur: "ایس ایچ سی سی رجسٹریشن" },
        },
    ],

    // Small trust points shown in the hero (edit freely; leave value "" to hide)
    stats: [
        { value: "100%", label: { en: "Natural remedies", ur: "قدرتی ادویات" } },
        { value: "All ages", label: { en: "Safe & gentle care", ur: "ہر عمر کے لیے" } },
        { value: "2", label: { en: "Daily sessions (AM/PM)", ur: "روزانہ دو اوقات" } },
    ],

    // --- Services / Treatments -------------------------------------------------
    // The real conditions the clinic specialises in (from the doctor's card).
    // icon must be one of the keys defined in components/Icons.jsx (serviceIcons)
    services: [{
            icon: "stone",
            en: { title: "Stones — Without Surgery", desc: "Kidney, bladder and gallbladder stones cleared with homeopathic medicine — no operation needed." },
            ur: { title: "پتھری — بغیر آپریشن", desc: "گردہ، مثانہ اور پتہ کی پتھری کا ہومیوپیتھک علاج — بغیر آپریشن، بغیر چیر پھاڑ۔" },
        },
        {
            icon: "kidney",
            en: { title: "Kidney & Bladder Stones", desc: "Renal and bladder stones treated gently and dissolved naturally." },
            ur: { title: "گردہ و مثانہ کی پتھری", desc: "گردے اور مثانے کی پتھری کا نرم اور قدرتی علاج۔" },
        },
        {
            icon: "liver",
            en: { title: "Liver Diseases", desc: "Fatty liver, hepatitis, jaundice and other liver complaints." },
            ur: { title: "جگر کے امراض", desc: "فیٹی لیور، یرقان، ہیپاٹائٹس اور جگر کی دیگر شکایات۔" },
        },
        {
            icon: "digestive",
            en: { title: "Stomach & Gastric", desc: "Acidity, ulcer, gas, indigestion and long-standing gastric trouble." },
            ur: { title: "معدہ کے امراض", desc: "تیزابیت، السر، گیس، بدہضمی اور معدے کے پرانے امراض۔" },
        },
        {
            icon: "intestine",
            en: { title: "Piles (Bawaseer)", desc: "Bleeding and non-bleeding piles, fissure and fistula — treated without surgery." },
            ur: { title: "بواسیر", desc: "خونی و بادی بواسیر، شگاف اور ناسور کا علاج — بغیر آپریشن۔" },
        },
        {
            icon: "respiratory",
            en: { title: "Asthma & Breathing", desc: "Asthma, allergic cough, chest tightness and shortness of breath." },
            ur: { title: "دمہ و تنفس", desc: "دمہ، الرجی والی کھانسی، سینے کی جکڑن اور سانس کی تکلیف۔" },
        },
        {
            icon: "joints",
            en: { title: "Joint Pain", desc: "Arthritis, gout and joint stiffness eased gently over time." },
            ur: { title: "جوڑوں کا درد", desc: "گٹھیا، جوڑوں کا درد اور اکڑن میں نرم علاج۔" },
        },
        {
            icon: "spine",
            en: { title: "Back & Leg Pain", desc: "Backache, sciatica and leg pain relieved without harsh medicines." },
            ur: { title: "کمر و ٹانگوں کا درد", desc: "کمر درد، عرق النسا اور ٹانگوں کے درد کا نرم علاج۔" },
        },
        {
            icon: "brain",
            en: { title: "Children's Fits & Nerves", desc: "Fits, seizures and other nervous complaints in children." },
            ur: { title: "بچوں کے دماغی جھٹکے", desc: "بچوں کے دماغی جھٹکے (مرگی) اور دیگر اعصابی امراض۔" },
        },
        {
            icon: "shield",
            en: { title: "Men's & Women's Private Care", desc: "Confidential homeopathic treatment for men's and women's private health concerns." },
            ur: { title: "مردانہ و زنانہ پوشیدہ امراض", desc: "مردانہ و زنانہ پوشیدہ امراض کا رازدارانہ اور پُر اعتماد علاج۔" },
        },
    ],
};

export default clinic;