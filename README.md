# ⚽ SweepCup — FIFA World Cup 2026 Sweepstake

A fun, fully-featured sweepstake draw app for the **FIFA World Cup 2026** (USA · Canada · Mexico). Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.

---

## Features

- **All 48 teams** across 6 confederations (UEFA, CONMEBOL, CONCACAF, CAF, AFC, OFC) with flag emojis
- **Flexible team allocation** — each player can receive 1, 2, 3 or a **custom number** (up to 48) of teams
- **Mixed modes** — different players in the same draw can have different team counts (e.g. 4 players × 12 teams = 48 teams)
- **Animated draw** — spinning football, cycling team names, and a staggered card reveal
- **Save & Resume** — progress is auto-saved to `localStorage`; pick up where you left off on next visit
- **Copy results** — one-tap copy of the full draw summary to clipboard
- **Mobile-friendly** — responsive layout, works great on phones
- **SweepCup branding** with gold gradient, dark pitch background and floating football decorations

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
app/
├── types/
│   └── index.ts          # Shared TypeScript types (Team, Player, Screen, …)
├── data/
│   └── teams.ts          # 48 teams + confederation colour maps
├── lib/
│   ├── draw.ts           # Sweepstake draw logic (Fisher-Yates shuffle)
│   ├── storage.ts        # localStorage helpers (load / save / clear)
│   └── utils.ts          # uid(), mkPlayer(), timeAgo(), shuffle()
├── components/
│   ├── NavBar.tsx        # Sticky nav with save indicator & share button
│   ├── ResumeBanner.tsx  # Resume-saved-session prompt
│   ├── SetupScreen.tsx   # Player setup, slot picker, draw CTA
│   ├── DrawingScreen.tsx # Animated draw sequence
│   ├── ResultsScreen.tsx # Results grid + undrawn teams
│   ├── PlayerCard.tsx    # Individual result card
│   ├── TeamBadge.tsx     # Confederation-coloured flag badge
│   └── SlotPill.tsx      # 1 / 2 / 3 team selector button
├── page.tsx              # Root page — state orchestration only
├── layout.tsx            # Root layout + metadata + favicon
└── globals.css           # Tailwind base + custom animations
```

---

## How it works

1. **Set up** — enter player names and choose how many teams each person receives (1–48, can vary per player)
2. **Draw** — click *Start the Draw!* to randomly assign teams from the shuffled 48-team pool
3. **Results** — each player's card shows their assigned team(s) with confederation badge and flag
4. **Share** — copy the results to clipboard and paste into your group chat

---

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)

---

Made with ♥ by **Rushi**

