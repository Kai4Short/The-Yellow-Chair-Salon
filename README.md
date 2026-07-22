# The Yellow Chair Salon

A professional hair consultation web app built for hairstylists to guide clients through a structured, in-session consultation — from hair analysis to personalized recommendations to a saved (or emailed) summary.

**Live app:** [the-yellow-chair-salon.vercel.app](https://the-yellow-chair-salon.vercel.app)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3ECF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)

---

## ✨ Overview

The Yellow Chair Salon guides a stylist through a **10-step consultation methodology**:

1. **Hair Analysis** — thickness, density, texture, natural level, grey percentage & distribution
2. **Client Goals** — desired direction and current condition
3. **Expert Results** — colour direction, technique, haircut guidance, grey coverage strategy, home haircare, and curated colour/haircut options
4. **Confirm & Save** — lock in the agreed service, investment, and maintenance plan, then save the consultation (or email it to a guest client)

The app supports both **authenticated stylist accounts** (consultations saved to their history) and a **guest flow** (results emailed at the end of the session, no account required).

---

## 🖥️ Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React 19 (Create React App) |
| Auth & Database | Supabase (email/password + guest magic-link) |
| Hosting | Vercel |
| Fonts | Cormorant Garamond (serif) + Jost (sans-serif) |
| Styling | Inline styles + a shared design system (warm gold/cream palette) |

---

## 📁 Project Structure

```
salon-app/
├── public/
├── src/
│   ├── components/       # Reusable UI (ProgressBar, ScreenHeader, GoldDivider, ProfileMenu...)
│   ├── constants/        # colors.js — the shared design palette
│   ├── lib/              # supabase.js — Supabase client setup
│   ├── screens/          # One component per consultation step
│   ├── utils/
│   │   └── recommendations.js   # Core recommendation engine logic
│   ├── App.js            # Screen routing, global styles, auth state
│   └── index.js
├── .env                  # Supabase URL & anon key (not committed)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- A [Supabase](https://supabase.com) project (for auth + consultation storage)

### Installation

```bash
git clone https://github.com/<your-username>/the-yellow-chair-salon.git
cd salon-app
npm install
```

### Environment Variables

Create a `.env` file in `salon-app/` with your Supabase credentials:

```
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Run locally

```bash
npm start
```

Runs at [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

---

## 🗄️ Supabase Setup

The app expects a `consultations` table with columns roughly matching:

```
user_id (uuid, nullable)
client_name (text)
notes (text)
hair_data (jsonb)
goal_data (jsonb)
confirmed_services (jsonb, nullable)
```

**Row Level Security:** authenticated users should be able to insert/select rows where `user_id = auth.uid()`. Guest consultations insert with `user_id = null`, so a permissive insert policy for `user_id is null` is also required.

Guest sign-in uses `supabase.auth.signInWithOtp` (magic link) to deliver session results.

---

## 🧠 Recommendation Engine

All stylist-facing recommendations (colour direction, technique, haircut guidance, grey coverage strategy, home haircare, and future-look options) are generated in [`src/utils/recommendations.js`](salon-app/src/utils/recommendations.js) from the client's hair profile and stated goals — no external AI calls required for the core logic.

---

## 🛣️ Roadmap

- [ ] AI-assisted hair analysis (Gemini API) with full manual override
- [ ] Formatted HTML consultation summary emails for guests (EmailJS / Supabase Edge Function)
- [ ] Guest RLS insert policy hardening
- [ ] PWA support
- [ ] Custom domain
- [ ] Potential React Native migration

---

## 📄 License

This project is currently private/unlicensed. Add a license here if you intend to open-source it.
