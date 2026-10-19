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

Deliberately limited to three surfaces: the **sticky nav**, the **certificate\nhover overlay**, and **dialogs**. Never more than one on screen at a time besides\nthe nav.

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

Hero, About, Skills (marquee + workflow band + certificate cards), Projects, Contact.

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

The grouped block is a **ruled band**: a hairline above, a hairline below, a
group label anchored left, the contents in the rest of the width. It is the
still counterpart to the marquee directly above it — a title plate under a
title sequence, which is the end-credit language this page borrows from.

The credentials are *not* a band. They are cards, and they sit under a plain
group label. The contrast between the two treatments is the point: a list of
tools is a ruled index, a set of documents is a gallery.

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

### The certificates

Credentials are **cards**, not a list. A certificate is a document, so it gets
a document card and the image stays in it — the certificate itself is the one
thing that makes a credential legible at a glance.

A sheet of white paper is the brightest thing on a dark page, whatever filter
you put on it. So the image is **inverted**: `invert(1) hue-rotate(180deg)`
turns the paper dark and the text light, so the certificate reads as
light-on-dark and is native to the page rather than a light rectangle sitting
on it. `hue-rotate(180deg)` puts the hues back afterwards, so the HackerRank
green stays green instead of turning magenta. `brightness` is held at 0.78
because the black banner around "Python (Basic)" inverts to near-white and
would otherwise become a white bar across the middle of the card.

The lightbox shows the **real** document, in full colour, at full size. The
card is a dark-mode preview; the lightbox is the thing itself.

The title is set in the **display serif**, not UI type. The page's whole
typographic voice is Instrument Serif, and a card caption in Inter reads like
a settings panel rather than a portfolio.

The card has **no mat**: the certificate is flush to the card's edges, and
the card clips it with its own radius. A padded frame around the document
reads as "an image of a certificate"; flush reads as the certificate itself.

The cards are a **grid**, so they fill the row horizontally before another row
appears: three per row at 1152px, so the group grows by one row per three
certificates rather than one row per certificate. `auto-fill`, not `auto-fit`:
`auto-fit` collapses the empty tracks and stretches a lone card across the
whole width.

**The old hover overlay is gone.** It had `pointer-events: none`, which made
its "Verify credential" link unreachable: the hit test landed on the thumbnail
underneath. The link now lives in the lightbox, where it is a real button.

**No `aria-label` on the card.** An explicit label would have to restate the
visible text, and anything short of an exact match fails WCAG 2.5.3, Label in
Name — Lighthouse caught it. The name comes from the visible text instead,
with a real space between the title and the issuer so it reads "Python
(Basic) HackerRank" rather than running them together. The space collapses
visually: the meta block is a flex column, and a whitespace-only child is not
rendered as a flex item.

### The certificate image

The file in `src/assets/certificates/` is the screenshot **embedded in the
HackerRank PDF**, extracted losslessly with PyMuPDF rather than re-rendered
from the page. The PDF holds one 1600×1200 PNG; extracting it avoids a
resample. `getImage()` then produces 800/1200 webp for the card and the
lightbox.

Two things about that extraction matter:

- The PDF stores the colour image and a **separate soft mask**. The mask is
  what draws the certificate's rounded corners. Extracting the colour image on
  its own flattens those transparent corners to **black**, which the card's
  invert filter then turns **white** — a bright notch in the corner of every
  card. The file keeps the alpha.
- The file is **cropped to the certificate's inner panel**, inside the
  ornamental guilloche band. At card size that band is grey mush, and the
  parts worth reading are the name, the date and the signature. The frame's
  aspect ratio is `1476 / 1076` to match.

The certificate is real, so the data is real: issued 2024, and an alt text
naming the issuer, the certification and the date.

### The issuer mark

Each card carries the issuer's **brand mark** next to their name, from
`simple-icons`. It is grey at rest like every other brand mark on the page
and picks up its brand colour on hover, so it never fights the certificate
for attention. `src/data/certificates.ts` resolves it from a slug, so a new
issuer is one entry in a lookup table.

## Contact

Three compact cards in a row, one per channel. No toggle, no panel: the
channels are visible directly, which is what a contact section is for. Each
card is a single button: one click opens the channel - WhatsApp chat, email
compose, GitHub profile - directly. The address is still selectable text, but
the primary action is to message, not to copy.

- The cards are a grid, so they fill the row horizontally before another
  row appears: three per row at 1152px, so the section grows by one row per
  three channels rather than one row per channel.
- Each card carries a small arrow in the corner that moves on hover, so the
  action reads as "opens something" rather than "runs something".
- The section is quiet: compact cards, muted text, small. It is the last
  section on the page and does not dominate.
- Without JS the island never hydrates and the buttons are inert, so
  Contact.astro ships a `<noscript>` that prints the three channels as plain
  links. The island server-renders the cards, so they still appear.
