# Portfolio

Single-page personal site. Astro + React islands, Tailwind CSS v4, shadcn/ui.

See [`docs/DESIGN.md`](docs/DESIGN.md) for the design mood and rules. Tokens live
in `src/styles/global.css`.

## Commands

| Command            | Action                                     |
| :----------------- | :----------------------------------------- |
| `pnpm install`     | Install dependencies                       |
| `pnpm dev`         | Start dev server at `localhost:4321`       |
| `pnpm build`       | Build to `./dist/`                         |
| `pnpm preview`     | Preview the production build               |
| `pnpm check`       | Type-check `.astro` and `.ts(x)` files     |

In this environment prefer background mode: `astro dev --background`, managed
with `astro dev stop` / `astro dev status` / `astro dev logs`.

## Layout

```
src/
  components/
    react/      React islands; all Motion code lives here (.tsx only)
    sections/   Page sections (.astro)
    ui/         shadcn/ui components + Icon.astro (static lucide SVG)
  data/         profile, projects, certificates, skills, content (all copy)
  layouts/      Layout.astro
  lib/          config switches, brand icons
  pages/        index.astro
  styles/       global.css (design tokens)
```

## Islands

Motion is used only where it earns its keep. Everything else is CSS or
server-rendered markup. Spring presets live in `src/lib/motion.ts`; CSS
transitions use `--ease-out-apple`.

| Island | Mounts | Why it exists |
| :----- | :----- | :------------ |
| `HeroEntrance` | `client:load` | Staggered entrance plus the scroll-linked exit (scale, fade, drift). Above the fold, so it cannot wait on an IntersectionObserver. |
| `SectionHeading` | `client:visible` | Line-by-line mask-up heading. Also carries each section's content as children, so it is usually the only island a section needs. |
| `WordReveal` | `client:visible` | About copy brightens word by word against scroll position. |
| `Reveal` | `client:visible` | Shared short rise + fade for content blocks. |
| `ProjectGrid` | `client:visible` | Press feedback and hover lift on the cards. One island for all three. |
| `CertificateGrid` | `client:visible` | Card press feedback plus the detail dialog. Hover/focus styling is pure CSS. |
| `ContactPanel` | `client:visible` | The contact disclosure: one toggle, three channels, copy-to-clipboard. Falls back to plain links in Contact.astro's `<noscript>`. |
| `CursorSpotlight` | `client:load` | rAF loop writing `--spot-x/y` and the hero parallax vars. Fine pointers only; idles when the pointer stops. |
| `SmoothScroll` | `client:load` | Lenis. Desktop pointers only, behind `ENABLE_SMOOTH_SCROLL`. Renders nothing. |

Motion server-renders its pre-reveal state as inline styles. If scripting is
off, or the visitor prefers reduced motion, the `<noscript>` block in
`Layout.astro` and the rules at the bottom of `global.css` force everything
back to visible.

### Glass surfaces

Only three, by design: the sticky nav, the certificate hover overlay, and
dialogs. Project cards deliberately are not glass.

## Configuration

`src/lib/config.ts` holds the runtime switches:

- `ENABLE_SMOOTH_SCROLL` — drop Lenis from the client bundle entirely.
- `ENABLE_SPOTLIGHT` — drop the cursor spotlight and hero parallax.

## Editing content

All copy lives in `src/data/*.ts`. Strings marked `TODO(content)` are
placeholder text waiting to be replaced. `profile.email` is empty on purpose:
while it is, the Contact email button is hidden and the build prints a warning.

Section headings are arrays, one entry per rendered line, so the mask-up can
animate them line by line.

The About copy is capped at 60 words per paragraph for the word-brightening
reveal; the build warns if you go over.