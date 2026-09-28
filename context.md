# Project Context — Lake & Love Wedding Invitation

A single-page wedding invitation website for **Priyal & Jatin**.
This file is the running log for the project: what it is, how it's built, and
every change made during development. Update the **Changelog** section at the
bottom every time something is added, changed, or fixed.

## Overview

- **Couple:** Priyal Bang & Jatin Mulchandani
- **Date:** November 12, 2026
- **Venue:** Praveg Lake Resort, Daman - 3 Kachigam, Kachigam Damanganga Garden, Daman 396215
- **Theme:** "Lakeside at dusk" tableau — deep emerald, blush pink, antique gold on warm cream; arched photo frames, ornate panels, checkerboard staging, wall sconces, paper texture
- **Type:** Single-page TanStack Start app (React 19 + Vite + Tailwind CSS v4, one route at `/`)
- **Content status:** unchanged from the original upload — names, parents, date, venue,
  dress code, timeline, story dates and copy are all verbatim

## File Structure

```
/dev-server
├── context.md                       # This file
├── AGENTS.md                        # Project rules (single-page composition)
├── src/
│   ├── routes/
│   │   ├── __root.tsx               # <html> shell, SEO meta, Google Fonts links
│   │   └── index.tsx                # The whole invitation: nav + all sections
│   ├── assets/
│   │   ├── couple.jpg.asset.json    # Real couple photo (Lovable asset pointer)
│   │   ├── lake.jpg.asset.json      # Lake backdrop (Lovable asset pointer)
│   │   ├── ganesha.png              # Generated gold Ganesha artwork (intro)
│   │   ├── story-proposal.jpg       # Generated story photo
│   │   ├── story-venue.jpg          # Generated story photo
│   │   └── story-engagement.jpg     # Generated story photo
│   ├── styles.css                   # Theme tokens + decorative classes
│   ├── components/ui/               # shadcn primitives (Button used here)
│   └── router.tsx / start.ts / server.ts
└── public/                          # favicon.ico, robots.txt
```

The original upload (`lake-and-love-invite.zip`, folder `win Copy/` with
`index.html`, `styles.css`, `script.js`, `images/couple.jpg`, `context.md`) is no
longer in the repo; its content now lives in `src/routes/index.tsx` and
`src/styles.css`.

## Sections in src/routes/index.tsx

1. **Ganpati intro** — full-screen emerald room: doors part, gold Ganesha and the mantra appear, then the invitation card unfolds and the site is revealed (auto after ~7s; tap or Skip to go straight in; `localStorage`-gated, respects reduced-motion, `?intro` forces it)
2. **Nav** — fixed gold-on-emerald bar, "Lake & Love" wordmark, mobile hamburger
3. **Hero (`#home`)** — names, date, faded lake photo, paper texture, two wall sconces, arched couple portrait, scroll cue
4. **Couple (`#couple`)** — arched portrait + two ornate panels (bride and groom with parent names)
5. **Event (`#event`)** — 4-stage timeline (Arrival, Ceremony, Reception, Farewell) on a checkerboard band + date/dress-code meta
6. **Venue (`#venue`)** — name, address, description, getting-there list, embedded Google Maps iframe, directions button
7. **Stories (`#blog`)** — 3 "our journey" cards with photo, date, title, copy, "Read more"
8. **Footer** — names, date, tagline "Where the lake meets forever"

## Design Tokens (src/styles.css `:root`, oklch)

| Token | Value | Use |
|---|---|---|
| `--emerald` | `oklch(0.34 0.09 158)` | Nav, hero, venue, panels |
| `--emerald-deep` | `oklch(0.25 0.065 157)` | Intro screen, footer |
| `--blush` | `oklch(0.76 0.13 350)` | Arches, accents, checker band |
| `--gold` | `oklch(0.74 0.11 80)` | Borders, labels, dividers |
| `--cream` | `oklch(0.965 0.025 83)` | Background, light text |
| `--foreground` | `oklch(0.28 0.045 157)` | Body copy on cream |
| `--font-display` | Bodoni Moda | Headings, names |
| `--font-body` | Montserrat | Body/UI text |

### Decorative classes (src/styles.css)

- `.paper-texture` — film-grain/mist overlay
- `.flourish` — gold rule + heart divider under headings
- `.arch-frame` / `.arch-inner` — arched photo frame with double gold outline
- `.ornate-panel` — emerald card, gold hairline, ✦ corners, blush offset shadow
- `.checker-section` / `.checker-footer` — checkerboard staging bands
- `.sconce` — wall-lamp ornament in the hero and in the intro
- `.ganpati-intro` / `.gi-*` — Ganpati opening sequence: emerald doors, blush arched screens, perspective checkered floor, gold halo, invitation card
- `.invitation-card` — leftover from the previous entry card, no longer rendered

Fonts load from `<link>` tags in `src/routes/__root.tsx` (Tailwind v4's build
cannot `@import` a remote URL).

## Known Gaps / Things to Revisit

- The three story photos are AI-generated stand-ins, not real photographs
- The Ganesha drawing in the intro is generated artwork, not a traditional illustration
- The intro was matched from the reel's cover frames and embed media; the reel itself
  cannot be opened by automation, so the exact animation is still worth a side-by-side check
- No RSVP form
- "Read more" links in the Stories cards are still dead `#` placeholders
- Google Maps iframe uses a text query, not verified exact coordinates
- No `og:image` set for link previews (no share-sized image yet)
- Site is not published yet — no public URL or custom domain
- The Instagram reference reel could not be opened directly (it blocks automated
  viewing); the look was matched from its embed media, so it is worth a side-by-side check

## Changelog

### 2026-09-25
- Initial analysis of uploaded project. No changes made yet — file structure and features documented above.
- Created this `context.md` to track future changes.
- **Envelope intro made interactive.** Previously it autoplayed on load and finished in ~4.5s regardless of whether anyone noticed. Now:
  - It no longer plays automatically — it waits, sealed shut, for the visitor to **click/tap the envelope, press Enter/Space on it, or scroll/swipe**.
  - Once triggered, the seal-break → flap-open → letter-out sequence is slowed down and re-timed (~5.8s total, up from ~2.7s) so each stage is clearly visible instead of blurring together.
  - Added a pulsing "Tap the seal or scroll to open" hint under the envelope, plus an idle glow/hover-scale on the seal, so it reads as interactive rather than decorative.
  - `localStorage` key bumped to `priyal-jatin-intro-v3` so returning testers/visitors see the new version once. It still only shows once per browser by default — add `?intro` to the URL to force it to replay for testing.
  - `prefers-reduced-motion` visitors and the Skip button still bypass it entirely/instantly, as before.

### 2026-09-26 — Redesign to the Instagram reference (content unchanged)
- **Rebuilt as a TanStack Start single-page app.** The static `index.html` /
  `styles.css` / `script.js` trio became `src/routes/index.tsx` (all sections in
  one route, per the rule recorded in `AGENTS.md`) and `src/styles.css`
  (Tailwind v4 with `@theme` tokens). All copy, names, dates, addresses and
  links were carried over word for word.
- **New palette.** Replaced the lake-blue/sage/gold hex scheme with an emerald /
  blush / antique-gold / cream set in `oklch`, matching the reference's vintage
  Indian wedding tableau.
- **New type pairing.** Cormorant Garamond + Josefin Sans → Bodoni Moda
  (display) + Montserrat (body), loaded via `<link>` in `src/routes/__root.tsx`.
- **New visual devices.** Arched photo frames, ornate emerald panels with ✦
  corners and blush offset shadows, checkerboard event/footer bands, hero wall
  sconces, paper-texture overlay, gold flourish dividers.
- **Intro replaced.** The animated envelope is now a tap-to-open invitation card
  on deep emerald; behaviour is the same (skippable, reduced-motion aware,
  `?intro` to force), and the `localStorage` key is bumped to
  `priyal-jatin-intro-v4`.
- **Flip cards simplified.** The bride/groom tap-to-flip cards became two
  standing ornate panels showing the same information.
- **Story photos swapped.** The Unsplash placeholders in the Stories section were
  replaced with three generated images in the new palette
  (`story-proposal.jpg`, `story-venue.jpg`, `story-engagement.jpg`).
- **Real photos are now Lovable assets.** `couple.jpg` (from the upload) and the
  lake backdrop are imported through `.asset.json` pointers instead of relative
  paths.
- **SEO/meta added.** Per-route title, description and `og:` tags for the
  invitation, plus the font preconnects.
- **Blank-screen fix.** The preview threw `Cannot read properties of null
  (reading 'useCallback')` — two copies of React were loaded from a stale Vite
  cache. Cleared the cache and restarted the dev server; no app code changed.
- **Verified:** build OK, page serves 200, and Playwright runs at 1280×1800 and
  390×844 show the intro card and every section with no console or page errors.

### 2026-09-28 — Ganpati opening sequence (content unchanged)
- **The envelope entry is gone.** The invitation-card intro is replaced by a
  Ganpati opening built on the third slide of the reference reel: emerald double
  doors slide apart, a gold Ganesha appears in a glowing halo above the mantra
  "॥ श्री गणेशाय नमः ॥", then the invitation card with the names and date
  unfolds beneath it. Once the card is revealed the sequence holds a moment and
  the overlay fades away to the website — no other section was touched.
- **The intro now sits in the reel's room** instead of a flat emerald
  backdrop: a textured emerald wall with a warm gold glow and an inset gold
  border, two flickering wall sconces, a pair of blush arched screens with gold
  edges behind the stage, and a black-and-cream checkered floor laid out in
  perspective.
- **New artwork:** `src/assets/ganesha.png`, a generated gold line drawing in
  the same palette as the rest of the site.
- **Timing from first paint:** doors 0.2s → Ganesha 1.1s → mantra 2.4s → card
  4.3s → auto-reveal 7.2s, then a 1.4s fade-out. The mantra is deep emerald so it
  reads clearly against the blush screens.
- **Behaviour unchanged:** tapping anywhere or pressing Skip goes straight to the
  site, `prefers-reduced-motion` visitors bypass the whole thing instantly, and
  `?intro` forces a replay. The `localStorage` key is bumped to
  `priyal-jatin-intro-v5`, so every browser sees the new opening once.
- **Dead style:** `.invitation-card` is still in `src/styles.css` but nothing
  renders it any more.
- **Verified:** build OK and Playwright runs at 1280×1800 and 390×844 step through
  the doors, Ganesha, mantra, card and the reveal into the site with no console or
  page errors.
