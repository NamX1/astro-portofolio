# Design

Mood and rules only. Token values live in `src/styles/global.css`.

## Mood

Cigarettes After Sex-inspired — mood, palette and vibes only. Never lift their
artwork, typefaces or assets. Monochrome, grainy, dreamy, restrained.

## Type

- Tiny uppercase labels, wide tracking (0.15–0.3em), light weights.
- Display headings: large, light weight (300), tight tracking (≈ -0.02em),
  line-height ≈ 1.05, fluid `clamp()` from 2.5rem to 5rem+.
- Headings use `--color-ink-2`, not full white. At that size pure white glares
  on a dark page.
- Hero is centered.
- Sans: Inter Variable (self-hosted via Fontsource), for UI, labels and body.
- Serif: Instrument Serif (self-hosted via Fontsource), for headings and
  accents. The sans/serif split is the only typographic contrast in the design.

## Motion

CAS look, Apple behaviour: physical and calm, never bouncy.

- Springs live in `src/lib/motion.ts`. All three presets are critically damped
  (`bounce: 0`), built on the duration-based spring API:
  `soft` 0.65s (reveals), `default` 0.32s (UI), `quick` 0.18s (press).
- CSS transitions use `cubic-bezier(0.32, 0.72, 0, 1)` at 300–500ms
  (`--ease-out-apple`, `--duration-ui`, `--duration-reveal`).
- **Transform and opacity only.** No animated layout, and no animated
  filter/blur radius. Blur is used statically for glass, never tweened.
- Heading reveal is a line-by-line mask-up; scroll reveals are a short rise.
- Honour `prefers-reduced-motion`: transforms are dropped, scroll-linked
  effects are neutralised, and content renders at full opacity.
- Never animate the background blur radius; only the blobs' `transform`.

## Grain

- Static SVG feTurbulence overlay at 6–10% opacity, `pointer-events: none`.

## Background

- Large blurred gradient blobs, drifting slowly.
- Cursor spotlight on desktop; scroll-driven drift on touch.

## Frosted glass

Deliberately limited to four surfaces: the **sticky nav**, the **certificate
hover overlay**, **dialogs**, and the **contact channel panel**. Never more than
one on screen at a time besides the nav — which the contact panel satisfies, as
it sits at the bottom of the page where the nav is the only other glass.

Recipe: `rgb(28 28 30 / 0.6)` tint, `blur(20px) saturate(1.4)`, a 1px border at
8% white, and a faint inset top highlight. Falls back to a solid token where
`backdrop-filter` is unsupported, so text contrast never depends on the effect
landing. Text over glass must still clear 4.5:1.

## Icons

- Thin stroke, 1–1.25px — everywhere except the skills grid.
- The **skills grid is the one filled-brand-mark surface**: simple-icons SVG
  paths, greyscale at rest, brand hex on hover or tap. It is the page's only
  chromatic event and is meant to be.
- Contact channels use thin-stroke lucide glyphs (`MessageCircle`, `Mail`,
  `GitFork`) rather than the WhatsApp or GitHub logos, so three filled brand
  marks do not compete with the skills grid for attention.
- Hover is written out under `@media (hover: hover) and (pointer: fine)`.
  Tailwind emits a bare `:hover`, which on touch latches the brand colour on
  after a tap.

## Hierarchy

- Through opacity (100 / 60 / 40%), not colour.
- Generous vertical spacing.
- `--color-ink-muted` (40%) sits at 3.4:1 and is **decoration only** — hairlines
  and inert marks. Readable secondary text uses `--color-ink-2` (6.3:1).
- Any scroll-linked text effect must stay above 4.5:1 in its dimmest state.

## Sections

Hero, About, Skills (+ Credentials), Projects, Contact.

## Contact

One toggle, one panel, three channels (WhatsApp, Email, GitHub). A disclosure,
not a modal: focus stays on the toggle, nothing is trapped, and the panel
unmounts when closed so its links leave the tab order.

- Each row is `[icon] [label + address] [copy]` as **siblings**. A copy control
  nested inside the link would be a keyboard trap and a broken tap target.
- `value` is what a human reads, `copyValue` is what lands on the clipboard —
  they differ for GitHub, where nobody types `https://` into a message.
- Confirmation is an inline icon swap **plus** an `aria-live` region; the swap
  alone is invisible to a screen reader.
- Without JS the island never renders, so Contact.astro ships a `<noscript>`
  that hides the toggle and prints the three links expanded.
- Entrance is transform + opacity only, matching `.cert-panel`. Height is never
  animated.