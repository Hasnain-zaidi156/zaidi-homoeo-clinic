# Zaidi Homoeo Clinic — Full-Stack Website

A bilingual (English + اردو) website for **Zaidi Homoeo Clinic** — *Dr. Syed Faraz Ahmed Zaidi*.
Patients can read about the clinic, browse treatments, view the location on Google Maps,
**book an appointment online**, and **rate their experience**. Bookings are saved to **MongoDB**,
an **email** is sent to the clinic (Nodemailer), and staff can review everything in a simple
**admin panel**.

---

## ✨ Features

- Sober, professional homeopathy design (green & white, "apothecary" style)
- **Bilingual** — one click switches the whole site between **English** and **Urdu** (proper RTL + Nastaliq font)
- **Online appointment booking** → saved in MongoDB, with an auto-incrementing token number (starts at 500)
- **Email notifications** — patient gets an acknowledgement with their token when booking, and a
  confirmation email when the doctor confirms the appointment
- **Gallery** — clinic photo + doctor's certificates, shown large with a click-to-zoom lightbox
- **Customer ratings** — patients can leave a 1–5 star rating + comment; the doctor sees every
  rating (with the average) in the admin panel
- **WhatsApp** buttons everywhere (float button, hero, form fallback, contact)
- **Admin panel** at `/admin` — two tabs: *Appointments* (filter, change status, delete) and
  *Ratings* (average + full list, delete)
- Services / treatments section, doctor intro, opening hours, embedded Google Map
- Fully responsive (mobile → desktop)

## 🧰 Tech stack

| Layer     | Tech                                   |
| --------- | -------------------------------------- |
| Frontend  | React 18 + Vite, React Router          |
| Backend   | Node.js + Express                      |
| Database  | MongoDB + Mongoose                     |
| Email     | Nodemailer (SMTP / Gmail)              |

## 📁 Folder structure

```
zaidi-homoeo-clinic/
├── frontend/                # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Navbar, Hero, About, Services, Gallery, Appointment, Reviews, Contact, Footer …
│   │   ├── pages/           # Home.jsx, Admin.jsx
│   │   ├── i18n/            # English + Urdu translations + language context
│   │   └── data/clinic.js   # ← EDIT your clinic details here
│   └── ...
└── backend/                 # Express + MongoDB backend
    ├── models/Appointment.js
    ├── models/Review.js
    ├── models/Counter.js
    ├── routes/appointments.js
    ├── routes/reviews.js
    ├── lib/token.js
    ├── mailer.js
    ├── server.js
    └── .env.example          # ← copy to .env and fill in
```

---

## 🚀 Setup (step by step)

### 0. Requirements
- **Node.js 18+**
- **MongoDB** — either local ([Community Server](https://www.mongodb.com/try/download/community)) or a free
  cloud database on [MongoDB Atlas](https://www.mongodb.com/atlas/database).

### 1. Backend

```bash
cd backend
cp .env.example .env      # Windows: copy .env.example .env
# open .env and fill in the values (see "Configuration" below)
npm install
npm start
```

You should see `✅ MongoDB connected` and `✅ Server running on http://localhost:5000`.

### 2. Frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open the printed URL (usually **http://localhost:5173**). The dev server automatically forwards
`/api/...` calls to the backend on port 5000, so no extra config is needed.

---

## ⚙️ Configuration

### A. Clinic details — `frontend/src/data/clinic.js`
This one file controls everything the site shows. Your real details are already filled in:

- **Address:** Dhak Bazar, Rohri, Sindh
- **Phone:** 0300 3139170 (also on WhatsApp) and 0311 3139170
- **Hours:** Morning 10:00 AM – 1:30 PM · Evening 5:30 PM – 9:30 PM
- **Map:** "Get directions" opens the exact Google Maps link you shared

The only value you may want to change is **`email`** — it's set to `info@zaidihomoeoclinic.com`
as a default; update it to the clinic's real inbox if different. Everything here (services,
hours, numbers, map) can be edited anytime — English and Urdu text sit side by side.

**Gallery images:** the same file also has `clinicPhoto` and `certificates` — upload your images
to a free host like [imgbb.com](https://imgbb.com) (same as the logo/doctor photo) and paste the
links there.

### B. Backend settings — `backend/.env`

```
MONGO_URI=mongodb://127.0.0.1:27017/zaidi_homoeo_clinic
ADMIN_PASSWORD=choose-a-strong-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLINIC_EMAIL=where-to-receive-bookings@gmail.com
```

**Gmail tip:** turn on 2-step verification, then create an **App Password**
(Google Account → Security → App passwords) and paste it as `EMAIL_PASS`.
If you leave the email fields as placeholders, bookings still save to the database —
they just won't send an email.

---

## 🔐 Admin panel

1. Go to **/admin** (there's also a "Staff login" link in the footer).
2. Enter the `ADMIN_PASSWORD` you set in `backend/.env`.
3. **Appointments tab** — filter by status, change status, or delete. When you mark an
   appointment **confirmed**, the patient automatically gets a confirmation email with their
   token number.
4. **Ratings tab** — see the average rating and every patient review, with a delete option.

> This is a lightweight password guard suitable for a small clinic. For a larger deployment,
> consider proper user accounts + JWT sessions.

---

## 🌐 Going live (production build)

```bash
cd frontend
npm run build      # creates frontend/dist
```

The backend automatically serves `frontend/dist` if it exists, so in production you can run just
the backend (`cd backend && npm start`) and it will host both the API and the website on port 5000.
Set `CLIENT_ORIGIN` in `.env` to your real domain.

---

## 🗒️ Roman Urdu — chhoti guide

- **Clinic ki details** (phone, address, timings, WhatsApp) sab `frontend/src/data/clinic.js` me hain — wahin edit karein.
- **Gallery images** (clinic photo, certificates) bhi isi file me `clinicPhoto` aur `certificates` me daalein — pehle imgbb.com par upload karein, phir link paste karein.
- **Admin password** aur **email** settings `backend/.env` file me hain.
- Site chalane ke liye: pehle `backend` folder me `npm install` phir `npm start`, dusre terminal me `frontend` folder me `npm install` phir `npm run dev`.
- **Appointments aur Ratings dekhne** ke liye website par `/admin` kholein aur password daalein — do tabs milenge.
- Upar right corner me button se **English ⇄ اردو** switch hota hai.
