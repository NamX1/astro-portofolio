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

Deliberately limited to three surfaces: the **sticky nav**, the **certificate
hover overlay**, and **dialogs**. Never more than one on screen at a time
besides the nav.

Recipe: `rgb(28 28 30 / 0.6)` tint, `blur(20px) saturate(1.4)`, a 1px border at
8% white, and a faint inset top highlight. Falls back to a solid token where
`backdrop-filter` is unsupported, so text contrast never depends on the effect
landing. Text over glass must still clear 4.5:1.

## Icons

- Thin stroke, 1–1.25px.
- Tech logos grayscale by default, brand hex on hover/tap.

## Hierarchy

- Through opacity (100 / 60 / 40%), not colour.
- Generous vertical spacing.
- `--color-ink-muted` (40%) sits at 3.4:1 and is **decoration only** — hairlines
  and inert marks. Readable secondary text uses `--color-ink-2` (6.3:1).
- Any scroll-linked text effect must stay above 4.5:1 in its dimmest state.

## Sections

Hero, About, Skills (+ Credentials subsection), Projects, Contact.