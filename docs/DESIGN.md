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

- Thin stroke, 1–1.25px — everywhere except the skills marks.
- The **skills marquee and grouped block are the one filled-brand-mark
  surface**: simple-icons SVG paths, greyscale at rest, brand hex on hover or
  tap. It is the page's only chromatic event and is meant to be.
- SQL has no simple-icons entry, so it uses lucide's `Database` at the
  project's 1.25 stroke — the one thin glyph among filled marks.
- Contact channels use thin-stroke lucide glyphs (`MessageCircle`, `Mail`,
  `GitFork`) rather than the WhatsApp or GitHub logos, so three filled brand
  marks do not compete with the skills marks for attention.
- Hover is written out under `@media (hover: hover) and (pointer: fine)`.
  Tailwind emits a bare `:hover`, which on touch latches the brand colour on
  after a tap.
- The `.skill` rules live in `global.css`, not in `Skills.astro`. Astro scopes
  a component's `<style>` to that component's own scope id, and the `<svg>`
  comes from `SkillMark.astro` — a rule in `Skills.astro` would never reach
  it. Same reason `.cert-*` is global.

## Hierarchy

- Through opacity (100 / 60 / 40%), not colour.
- Generous vertical spacing.
- `--color-ink-muted` (40%) sits at 3.4:1 and is **decoration only** — hairlines
  and inert marks. Readable secondary text uses `--color-ink-2` (6.3:1).
- Any scroll-linked text effect must stay above 4.5:1 in its dimmest state.

## Sections

Hero, About, Skills (marquee + grouped block + Credentials), Projects, Contact.

## Skills

Two blocks, because they answer different questions.

- **Marquee** — Python, Go, TypeScript, Astro, Tailwind CSS, Linux, SQL. What
  he writes in. CSS only, no island, no JS shipped.
- **Grouped block** — what he ships on. Currently one group, `Workflow`
  (Git, GitHub, Linux). Linux appears in both on purpose: the marquee says
  what he writes, the group says what he ships on.
- **No levels, bars or percentages anywhere.** A self-assigned proficiency
  score is not something a visitor can check.

The marquee repeats its list three times and translates by exactly one third,
so the seam lands on an identical copy of the start. Two copies only works
while one set is wider than the viewport, which stops being true on a wide
monitor.

Pausing is available on hover *and* `focus-within` — a keyboard user cannot
hover, and WCAG 2.2.2 asks for a way to stop auto-moving content. Under
`prefers-reduced-motion` the scroll stops and the list wraps once, so all
seven stay readable.

### The bands

The grouped block and the credentials are both **ruled bands**: a hairline
above, a hairline below, a group label anchored left, the contents in the
rest of the width. It is the still counterpart to the marquee directly above
them — a title plate under a title sequence, which is the end-credit language
this page borrows from.

The earlier version of the grouped block was a label plus three
icon-and-word pairs clustered in the left third of the column. Under a
full-bleed marquee that read as a stray list, and a list of tools is the
generic way to show tools. The band fixes the composition — the block now
spans the full column — and gives the tools a reason to be structured.

The entrance is the same shutter gesture: the top rule draws in from the left,
the items rise in sequence, the bottom rule closes from the right. One
authored moment, horizontal, slower than the marquee.

`useBandReveal()` sets `data-band` and the stylesheet does the rest. It is
deliberately not Motion — Motion animates inline styles on the element it is
given and cannot flip a descendant's transition, and the band needs to drive
rules and items it does not own. The band rules live in `global.css` for the
same reason `.skill` does: the trigger is set across an island boundary, and
Astro scopes a component's `<style>` to its own scope id.

### The credentials band

A credential is a claim, and a claim reads best small: who issued it, what it
is, and where to check. The screenshot is the least useful part of a
certificate — it cannot be read at thumbnail size, and a light rectangle on a
dark page is the loudest thing on it — so it lives behind a click rather than
taking up space.

The cells are a **grid, not a stack**, and that is the answer to "what happens
when there are more certificates". The band is a fixed height for a row of
cells, and the cells fill the row horizontally before the band grows another
row. Measured at 1152px: three certificates per row, and the band grows one
61px row per *three* certificates. Nine certificates occupy three rows inside
one band.

`auto-fill`, not `auto-fit`: `auto-fit` collapses the empty tracks and
stretches a lone cell across the whole width, which puts a single credential
in a row of dead space. `auto-fill` keeps the tracks fixed, so the cells stay
compact and the empty slots read as room for more.

The cell is title over issuer, not issuer over title. Real certificate titles
are long — "AWS Certified Solutions Architect" — and the title needs the whole
track to itself, not whatever is left after a tracked uppercase issuer has
taken its share.

**The old hover overlay is gone.** It had `pointer-events: none`, which made
its "Verify credential" link unreachable: the hit test landed on the thumbnail
underneath. The link now lives in the lightbox, where it is a real button.

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