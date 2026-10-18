# Design

Mood and rules only. Token values live in `src/styles/global.css`.

## Mood

Cigarettes After Sex-inspired — mood, palette and vibes only. Never lift their
artwork, typefaces or assets. Monochrome, grainy, dreamy, restrained.

## Type

- Small, uppercase, wide tracking (0.15–0.3em), light weight.
- Hero is centered.
- TODO: fonts undecided. Currently a system font stack.

## Motion

- Slow: 0.8–1.2s. `ease-out`.
- Fade + blur-to-sharp reveals. No bounce, no spring.
- Honour `prefers-reduced-motion`: reveal content immediately, no motion.

## Grain

- Static SVG noise overlay at 6–10% opacity, `pointer-events: none`.

## Background

- Large blurred gradient blobs, drifting slowly.
- Cursor spotlight on desktop; scroll-driven fallback on touch.

## Icons

- Thin stroke, 1–1.25px.
- Tech logos grayscale by default, color on hover/tap.

## Hierarchy

- Through opacity (100 / 60 / 40%), not color.
- Generous vertical spacing.

## Sections

Hero, About, Skills (+ Credentials subsection), Projects, Contact.