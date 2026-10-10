# NearU prototype

An interactive, no-backend prototype of **NearU**, a campus marketplace for student sellers and buyers (Anant National University).
Built with React, TypeScript, Vite and Tailwind v4.

- Onboarding, buyer flow (feed, search, product, wishlist, cart, checkout, orders, messages), seller flow (storefront setup, listings, orders, analytics, payouts, collab)
- Light and dark mode (onboarding stays light)
- Brand: Futura (display) and Liberation Sans (body), with Jost and Arimo bundled as fallbacks

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

Deep links for a known start state: `?screen=<Tab>` (for example `?screen=Product`), `&mode=seller`, `&theme=dark`.

Dark theme CSS is generated from the light styles: `node gen-dark.cjs`.

Product photos are from Wikimedia Commons; credits are in `public/CREDITS-order-photos.txt`.
