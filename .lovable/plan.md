# Invitation Hero redesign

## What will change
- Replace the current lake-photo hero and “Meet the Couple” section with one full-height invitation section.
- Keep the navigation, countdown, events, venue, stories, and footer unchanged.
- Update the “Us” navigation link to point to the new combined invitation section.

## Invitation design
- Use the uploaded floral invitation image as the visual reference only, recreating its tall Mughal-arch composition without embedding the reference screenshot.
- Apply a warm handmade-paper beige background across the page, with a very subtle grain texture.
- Build a centered arch card with a faint blush damask border, hanging pink florals and foliage above, and watercolor-style lotus flowers and leaves along the bottom.
- Keep the center open and readable, with the exact names and family lines supplied in the brief.
- Add a small, restrained Ganesh blessing above the invitation line only if it remains uncluttered.

## Typography and motion
- Add an elegant serif and script font through the document head.
- Stagger a soft fade-up across the text blocks and add slow floral sway.
- Disable decorative motion when reduced motion is requested.
- Scale names fluidly so “Jatin Mulchandani” remains on one line at 360–430px widths.

## Verification
- Check the page at mobile and desktop sizes for text fit, decoration overlap, navigation, and unchanged lower sections.
- Confirm the preview builds and runs without browser errors.

## Technical details
- Keep all page content in the existing single TanStack Start route.
- Add semantic invitation color/font tokens and scoped decorative styles in the global stylesheet.
- Remove imports and styles used only by the two deleted sections.
