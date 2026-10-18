/**
 * Brand marks, resolved in exactly one place.
 *
 * Icons come from `simple-icons` as raw SVG path data so they can be rendered
 * straight into `.astro` markup - no React component needed just to hold a
 * path string.
 */
import {
	siAstro,
	siGithub,
	siNodedotjs,
	siPython,
	siReact,
	siTailwindcss,
	siTypescript,
} from "simple-icons";

export type BrandIcon = (typeof siPython);

/** Keyed by simple-icons slug. Add new marks here as the skill list grows. */
const brands: Record<string, BrandIcon> = {
	python: siPython,
	typescript: siTypescript,
	nodedotjs: siNodedotjs,
	react: siReact,
	astro: siAstro,
	tailwindcss: siTailwindcss,
	github: siGithub,
};

/** Returns the brand mark for a slug, or undefined if it is not registered. */
export function brand(slug: string): BrandIcon | undefined {
	return brands[slug];
}