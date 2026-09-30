# Full-screen envelope intro

## Goal
Add a session-only envelope opening before the existing one-page invitation, without changing any current content, sections, layout, or behavior.

## Implementation
- Create a self-contained `EnvelopeIntro` component in the root page and render it before the existing site.
- Start from an SSR-safe hidden state, then show the overlay only when the browser session has not opened it before.
- Skip the intro immediately when reduced motion is preferred.
- Treat a click or tap anywhere on the overlay as the open action and ignore later input once opening starts.
- Save a `sessionStorage` flag inside guarded `try/catch` blocks so the intro appears once per browser session.
- Lock body scrolling while the overlay is mounted and restore the prior scroll setting on cleanup.

## Visual and motion details
- Use the existing beige, blush, gold, magenta, and muted-text theme tokens.
- Build the envelope, flap, stamp, seal, and blank card entirely with CSS; add no imagery or libraries.
- Sequence the flap opening, card rise, and overlay exit with CSS delays matching 0.9s, 1.7s, and the final 0.6s fade.
- Keep the idle envelope gently floating after its initial fade-and-scale entrance.
- Add a small pulsing “Tap to open” hint below it.

## Verification
- Confirm the first visit shows the intro and one click reveals the unchanged invitation.
- Confirm repeated taps do not restart the sequence.
- Confirm reloads in the same session skip the intro.
- Confirm reduced-motion mode skips the intro.
- Check desktop and narrow-screen rendering, then confirm the current build has no errors.
