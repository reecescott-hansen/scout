# Scout — Student Opportunity Finder

AI-powered opportunity discovery for students. Scout uses the Anthropic Claude API to match scholarships, internships, summer programs, and competitions to a student's profile.

## Features

- **AI Matching** — Claude Sonnet generates 6 tailored, real opportunities based on grade, GPA, interests, and bio
- **Find Page** — Sidebar filters + animated result cards with type badges (scholarship / internship / program / competition)
- **Saved Page** — Bookmark opportunities, track status (Planning → In progress → Applied), filter by status
- **Profile Page** — Persistent profile stored in localStorage, auto-loaded into the Find sidebar
- **Dark design** — Emerald green (#00C853) accent, deep charcoal background, Syne + Inter typefaces
- **Fully responsive** — Desktop sidebar layout + mobile bottom-nav

## Stack

Vanilla HTML, CSS, and JavaScript — zero dependencies, zero build step.

## Deployment (Vercel)

### Option A: Drag & Drop

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project → Browse** and upload the `scout/` folder
3. Vercel auto-detects a static site — click **Deploy**
4. Done. Share the URL.

### Option B: Vercel CLI

```bash
npm i -g vercel
cd scout
vercel
```

Follow the prompts. The project deploys in ~10 seconds.

### Option C: GitHub → Vercel

1. Push this folder to a GitHub repo
2. In Vercel, **Import** the repo
3. Framework preset: **Other** (static)
4. Deploy

## Setup

1. Open the deployed URL (or `index.html` directly in a browser)
2. Click **API Key** in the top-right navbar
3. Paste your [Anthropic API key](https://console.anthropic.com/) — it stays in your browser's localStorage only
4. Set your profile on the **Profile** tab
5. Hit **Find Opportunities** on the **Find** tab

## File Structure

```
scout/
├── index.html   — App shell, all three views
├── style.css    — Design system, animations, responsive layout
├── app.js       — Tab routing, Claude API, localStorage CRUD
└── README.md
```

## Notes

- The API key is stored in `localStorage` and sent only to `api.anthropic.com` — it never touches any other server
- The `anthropic-dangerous-direct-browser-access: true` header is required for direct browser → Anthropic API calls (documented by Anthropic for client-side apps)
- Recommended model: `claude-sonnet-4-20250514` (set in `app.js`)
