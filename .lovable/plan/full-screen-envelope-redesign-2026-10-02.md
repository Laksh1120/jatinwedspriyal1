# Full-screen Envelope Redesign

## Goal
Replace the current small envelope, sliding card, and floating video window with the uploaded brief’s full-screen four-flap envelope reveal, while preserving the existing framed invitation, content, theme, and one-page behavior.

## Experience
- Show the existing intro video as one fixed, full-viewport layer, paused on its first frame beneath the envelope.
- Cover it with a responsive four-flap blush-paper envelope, embossed floral details, champagne wax seal, invitation text, and a satin ribbon bow.
- Start from one tap anywhere, ignore repeated taps, open the top flap, slide the remaining flaps away, separate the bow, and reveal the video.
- Start the video with sound from the tap interaction and show a small top-right mute/unmute control after the reveal.
- When playback ends or reaches the fallback timeout, reuse the existing slap-on ticket frame and internally scrolling invitation unchanged.
- Keep repeat visits and reduced-motion visitors going directly to the completed framed state with the video paused on its last frame.

## Technical details
- Keep the sequence self-contained in `src/routes/index.tsx` and reuse the existing video element and asset sources.
- Replace the envelope markup with four fixed flap layers, inline SVG ribbon/bow artwork, embossed decorative SVG/CSS details, a plain wax seal, and the requested two-line text.
- Update only the intro-related styles in `src/styles.css`, using viewport-safe `100dvw × 100dvh`, percentage clip paths, perspective transforms, and the brief’s staggered CSS timing.
- Preserve session storage, scroll locking, keyboard opening, reduced-motion behavior, ticket path calculation, final video background, frame animation, and all site sections.
- Record the revised sequence in the project architecture note and changelog.

## Verification
- Test first visit: tap → seal press → top flap opens → side/bottom flaps clear → bow separates → video plays with sound → frame lands.
- Test mute/unmute, playback fallback, repeat visit, reduced motion, keyboard activation, and repeated taps.
- Check desktop and phone viewports, including browser-bar-safe sizing, internal scrolling, and preview errors.
