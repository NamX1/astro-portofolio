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
server-rendered markup.

| Island | Mounts | Why it exists |
| :----- | :----- | :------------ |
| `HeroEntrance` | `client:load` | Staggered blur-to-sharp entrance. Above the fold, so it cannot wait on an IntersectionObserver. |
| `Reveal` | `client:visible` | Shared fade + blur-to-sharp scroll reveal (`once: true`), used by About, Skills and Contact. |
| `ProjectGrid` | `client:visible` | `whileHover` card lift. One island for all cards, not one per card. |
| `CursorSpotlight` | `client:load` | rAF loop writing `--spot-x/y`. Fine pointers only; idles when the pointer stops. |
| `SmoothScroll` | `client:load` | Lenis. Desktop pointers only, behind `ENABLE_SMOOTH_SCROLL`. Renders nothing. |

Motion's pre-reveal state is server-rendered as an inline style. If scripting is
off, or the visitor prefers reduced motion, CSS in `global.css` plus the
`<noscript>` block in `Layout.astro` force everything back to fully visible.

## Configuration

`src/lib/config.ts` holds the runtime switches:

- `ENABLE_SMOOTH_SCROLL` — drop Lenis from the client bundle entirely.
- `ENABLE_SPOTLIGHT` — drop the cursor spotlight.

## Editing content

All copy lives in `src/data/*.ts`. Strings marked `TODO(content)` are
placeholder text waiting to be replaced. `profile.email` is empty on purpose:
while it is, the Contact email button is hidden and the build prints a warning.