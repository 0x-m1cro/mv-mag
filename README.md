# Where's Maldives Magazine

React + Vite + Tailwind single-page experience for the Maldives-only, subscriber-first travel magazine described in the PRD.

## Getting started
```bash
npm install
npm run dev   # start locally
npm run build # production build
npm run lint  # lint with ESLint
```

## Notes
- Routes: Home, Magazine, Blog, Itineraries, About.
- Tailwind theme includes Playfair Display + Inter, oceanic palette, and glass panels for the calm aesthetic.
- Subscription modal, paywall overlay, search + filters, personalization (history + saves), and an admin draft uploader are wired with local state/localStorage for now. Replace with Firebase/Stripe when backends are ready.
