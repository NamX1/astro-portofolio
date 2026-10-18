/// <reference types="astro/client" />

/**
 * lucide-react exports the raw icon node arrays (`__iconData`) from deep ESM
 * paths, but only ships type declarations for the package root.
 *
 * `src/components/ui/Icon.astro` renders those nodes as static SVG so `.astro`
 * markup can use lucide geometry without a React island. This wildcard keeps
 * that type-safe without hand-writing a declaration per icon.
 */
declare module "lucide-react/dist/esm/icons/*.mjs" {
	export const __iconData: {
		name: string;
		size: number;
		node: readonly (readonly [string, Record<string, string>])[];
	};
}