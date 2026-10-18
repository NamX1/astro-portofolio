---
target: my website
total_score: 24
max_score: 36
na_heuristics: 10
p0_count: 2
p1_count: 2
target_identity: "file:C:\\Users\\kc830\\OneDrive\\Documents\\myprojects\\astro-portofolio\\src\\pages\\index.astro"
target_fingerprint: "sha256:2dfdf5449c1f187fc14248de9e41cef9fe2b505c7aeace708fb6927035ecae01"
target_path: "C:\\Users\\kc830\\OneDrive\\Documents\\myprojects\\astro-portofolio\\src\\pages\\index.astro"
timestamp: 2026-10-18T12-56-13Z
slug: src-pages-index-astro
---
# Critique — one-page portfolio (src/pages/index.astro)

Method: dual-agent (A: design review, unanchored · B: detector + browser evidence)
Mode: Experience (portfolio) with Persuade surface characteristics.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Persistent Contact affordance; no section nav, so no scroll position |
| 2 | Match System / Real World | 2 | "Credentials" then "Certificates" doubles vocabulary; contact invites a conversation with no way to have one |
| 3 | User Control and Freedom | 3 | Dialog dismissible, anchors clear nav, overscroll desktop-only |
| 4 | Consistency and Standards | 3 | Two labels for one destination ("Contact" nav vs "Get in touch" hero, both #contact) |
| 5 | Error Prevention | 4 | Build fails loudly on missing assets; warns on missing email and over-cap paragraphs |
| 6 | Recognition Rather Than Recall | 2 | Nav offers one action for five sections; all signposting is an 11px eyebrow |
| 7 | Flexibility and Efficiency | 2 | Primary conversion path disabled (email empty); no mailto, no copy-address, no repo links |
| 8 | Aesthetic and Minimalist Design | 2 | Craft high, minimalism absent: redundant headings, duplicate tech display, badge on 3/3 cards |
| 9 | Error Recovery | 3 | No in-normal-use errors; dead external URL has no fallback |
| 10 | Help and Documentation | n/a | Single-page portfolio; no learnable system to document |
| **Total** | | **24/36** | **Acceptable (67%)** |

Renormalised max is 36 (9 scored x 4). Assessment A reported "24/32, max 30" — the
arithmetic was inconsistent; recomputed here from its own scores.

## Design Specificity Verdict

**Locally slop, globally authored.** The craft layer is not generated: three
critically-damped springs, transform/opacity-only motion, three independent
reduced-motion safety nets, touch fallbacks behind explicit media queries, and
content engineering that refuses to lie.

The content layer is interchangeable. Only two domain-specific strings exist on
the page: "GitHub" and the tech logos. Five label+heading pairs carry four
headings that describe their section rather than making a claim. "A short
version / of this page." is a note-to-self about layout that escaped into an h2.

Voice is inverted: the prose about *working with this person* is real; the prose
about *this person* is filler. All five good lines are 60% ink at 11-19px. All
the generic filler is 40-84px display type.

Detector (URL mode): 15 findings. 5x kicker-above-heading (true, largest true
cluster), 3x nested-cards, 2x clipped-overflow-container, 1 each buried-raster /
overused-font / tight-leading / low-contrast / content-hidden-at-rest.
False positives: overused-font (claimed 69% Instrument Serif; measured 8.4%),
tight-leading (flagged 1.05 display leading; body is 1.43-1.5),
low-contrast (claimed 1.1:1; nominal is 6.3:1), content-hidden-at-rest
(samples the SSR pre-reveal state before the observer runs; controlled slow-scroll
confirmed all reveals reach opacity 1 and hold on `once: true`).

DETECTOR COVERAGE CAVEAT: `impeccable detect --json src` returns [] because
v0.1.6 does not scan .astro/.tsx/.jsx/.vue files or CSS. Proven with a controlled
A/B on byte-identical markup. Any file-mode "clean" result on this repo is vacuous.

## Responsive Design Score: 3/4 (Good)

Measured at 9 widths via CDP Emulation.setDeviceMetricsOverride (real viewports).

- Zero horizontal overflow at 320/360/390/414/768/1024/1280/1440/1920.
- Fluid clamps land exactly on declared floor/ceiling: hero 40px@320 to 88px@1440;
  h2 40px@320 to 84px@1440.
- Sticky nav 66px at every width, never overlapped or pushed; anchor targets
  verified with real hash jumps at 320px (139-179px clearance).
- Grid reflow verified: skills 2/2/2/2/3/6/6/6/6; certificates 1/1/1/1/2/3/3/3/3.
- Root font-size 20px scaling: layout holds, no overflow.

Real defects:
- **Unbroken strings overflow 381px at a 390px viewport.** Nothing in the
  codebase sets overflow-wrap/word-break/hyphens; measured `normal` everywhere.
  `html { overflow-x: clip }` hides the scrollbar, so the overflow is silently
  unrecoverable. A long URL or slug breaks the layout.
- **Dialog close button is 36x36** (dialog.tsx:66) — the only sub-44px target.
- `.hero-parallax` holds `will-change: transform` while static.

## Priority Issues

**P0 — `TODO(content): city` renders on the live page as a design element.**
profile.ts:25 -> About.astro:29. Truthy string passes the guard and renders at
12px uppercase 0.22em tracked — the identical visual register as the ABOUT and
SKILLS eyebrows. It reads as intentional design. The `profile.location &&` guard
can never be false while the key exists, so the comment's "delete this key"
advice does not work.

**P0 — The certificate image is a placeholder containing a filesystem path, and
hover sharpens it into legibility.** .cert-thumb dims to opacity .55 /
grayscale .55; .cert-group:hover restores full colour. The alt text also begins
with the word "Placeholder".

**P1 — The Contact section has no way to contact him.** email is "" so the email
button does not render; the section is headed "Say hello." with copy inviting a
conversation, and the only control is an outbound GitHub link. The nav's
persistent Contact button is also a dead end.

**P1 — Five label+heading pairs, four meaningless, all at the same ink.**
SectionHeading.tsx:67 uses text-ink-2; global.css `.display` uses
--palette-text-2. Same value. The design's primary hierarchy step is zero.
--color-ink-muted (40%, documented as for hairlines and inert marks) is defined
and used in zero components. Meanwhile the h1 is 11px and the real headline is
an anonymous p.

**P2 — The skills grid is the most interchangeable object on the page and the
only chromatic event.** Six grey framework logos duplicating empty `tech` chips,
and `.skill:hover svg { color: var(--brand) }` injects six brand hexes into a page
whose premise is monochrome.

## Persona Red Flags

**Casey (distracted mobile, 390px)** — Two stacked full-width buttons, no
indication of where he is, six screens and one visible exit. Note: the hero-fold
risk raised in Assessment A was checked and **did not reproduce** — headline is
3 lines (139px), not 8-9; the last CTA bottoms out at 659px against an 844px
fold.

**Jordan (first-timer)** — Cannot answer "who is this and are they any good" in
30s. A HackerRank Python (Basic) certificate sits immediately after a headline
promising seniority. Three cards titled One/Two/Three, all "In progress", no
images, no links. Nothing in the portfolio is clickable.

**Alex (power user)** — No GitHub in the nav although `siGithub` is already
imported and registered in brands.ts and `brand("github")` is never called. No
mailto, no copy-address, no vCard. `Project.links` is declared and never read, so
there is literally nothing to click.

## Minor Observations

- HeroEntrance.tsx sets className twice on one element (line 70 then 76); the
  second silently wins, so line 70 is discarded. Tidying the order would strip
  the hero's entire layout class list.
- `copy.credentials.verifyLabel` ("Verify") is never consumed.
- `ProjectStatus` declares shipped and archived with zero instances.
- `.cert-panel` is pointer-events:none yet contains a "Verify credential" link
  with an external-link arrow, implying a second affordance that is not a target.
- config.ts:3 claims "nothing here changes the design"; ENABLE_SMOOTH_SCROLL
  changes the feel of every section transition.
- DESIGN.md prescribes "Skills (+ Credentials subsection)" — the brief itself
  carries part of the problem.

## Single Highest-Leverage Fix

**Make the eyebrow and the headline different inks.** Two declarations:

1. `global.css` `.display { color: var(--palette-text) }` (was --palette-text-2)
2. `SectionHeading.tsx:67` eyebrow `text-ink-2` -> `text-ink-muted`

This creates the 40/60/100 ramp DESIGN.md already specifies but which currently
does not exist: 40% eyebrow, 60% body, 100% headline. It simultaneously resolves
the largest cluster of true detector findings (5x kicker-above-heading) and costs
two lines. Everything else on this list is either editorial (headings that make
claims instead of describing sections) or content the owner must supply.
