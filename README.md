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
    ui/         shadcn/ui components
  data/         profile, projects, certificates
  layouts/      Layout.astro
  pages/        index.astro
  styles/       global.css (design tokens)
```