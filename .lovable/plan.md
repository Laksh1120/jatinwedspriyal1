# Envelope → Video → Framed Invitation

## Goal
Turn the existing session-only envelope into one continuous opening: envelope, uploaded video, slap-on ticket frame, then the unchanged invitation scrolling inside that frame.

## Experience
- Keep the current beige envelope and begin only after one tap; ignore repeated taps.
- Morph the rising cream card into the uploaded portrait video with no blank gap.
- Play the muted video once, with only a discreet Skip control.
- When playback ends (or after a fallback timeout), expand the final video frame to the viewport and slap the invitation card on top.
- On repeat visits and for reduced-motion visitors, open directly in the completed framed state.

## Framed invitation
- Move the existing navigation and every existing section into one fixed, internally scrolling portrait card without changing their content or order.
- Use a measured SVG ticket path for the cutout and matching layered pink, cream, and gold border.
- Keep the video’s final frame fixed behind the card while its contents scroll.
- Make anchor links, the sticky navigation, and page locking work within the framed card on desktop and mobile.

## Technical details
- Store the uploaded video through the project asset flow and import its hosted URL.
- Keep the sequence self-contained in `src/routes/index.tsx`, using explicit envelope, video, transition, and final states.
- Use `ResizeObserver` to calculate the ticket path at the live card size.
- Use CSS transitions/keyframes only for the envelope, video expansion, impact shake, shadow tightening, border arrival, and delayed content reveal.
- Preserve the existing theme tokens, fonts, content, countdown, event cards, map, and all section IDs.
- Update the project architecture note to reflect the persistent framed-scroll presentation.

## Verification
- Test first visit: tap → envelope opens → video plays → frame lands → invitation scrolls.
- Test Skip, playback fallback, repeat visit, reduced motion, keyboard opening, and repeated taps.
- Check desktop and 360–430px mobile sizing, internal anchor navigation, background video framing, and preview errors.
