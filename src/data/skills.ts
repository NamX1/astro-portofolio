export interface Skill {
	/** simple-icons slug - see `src/lib/brands.ts`. */
	slug: string;
	label: string;
}

/**
 * TODO(content): confirm this list before shipping. The grid reflows on its
 * own, so adding or removing a row needs no other changes.
 */
export const skills: Skill[] = [
	{ slug: "python", label: "Python" },
	{ slug: "typescript", label: "TypeScript" },
	{ slug: "nodedotjs", label: "Node.js" },
	{ slug: "react", label: "React" },
	{ slug: "astro", label: "Astro" },
	{ slug: "tailwindcss", label: "Tailwind CSS" },
];