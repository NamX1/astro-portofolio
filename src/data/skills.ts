import {
	siAstro,
	siGit,
	siGithub,
	siGo,
	siLinux,
	siPython,
	siTailwindcss,
	siTypescript,
} from "simple-icons";

/** The shape simple-icons hands back. */
type BrandMark = typeof siPython;

/**
 * A skill's icon, resolved here rather than looked up from a slug at render
 * time. Two sources, so it is a union:
 *
 * - `brand` - a filled simple-icons path plus its official hex, used for the
 *   logo marquee.
 * - `lucide` - a thin-stroke glyph. SQL has no simple-icons entry, so it uses
 *   lucide's `Database` at the project's 1.25 stroke, which also keeps it from
 *   being the one filled mark in a row of them.
 */
export type SkillIcon =
	| { readonly kind: "brand"; readonly path: string; readonly hex: string }
	| { readonly kind: "lucide"; readonly name: "database" };

export interface Skill {
	label: string;
	icon: SkillIcon;
	/** A short qualifier, shown next to the label. Facts only. */
	note?: string;
}

export interface SkillGroup {
	label: string;
	skills: Skill[];
}

function brand(icon: BrandMark): SkillIcon {
	return { kind: "brand", path: icon.path, hex: icon.hex };
}

const lucide = (name: "database"): SkillIcon => ({ kind: "lucide", name });

/**
 * The scrolling marquee, in this order.
 *
 * Git and GitHub are deliberately absent - they belong to the Workflow group
 * below, and a tool you use day to day is not the same claim as a language
 * you write in.
 *
 * Label is "Go", not "Golang": that is what the toolchain calls itself.
 */
export const marqueeSkills: Skill[] = [
	{ label: "Python", icon: brand(siPython) },
	{ label: "Go", icon: brand(siGo) },
	{ label: "TypeScript", icon: brand(siTypescript) },
	{ label: "Astro", icon: brand(siAstro) },
	{ label: "Tailwind CSS", icon: brand(siTailwindcss) },
	{ label: "Linux", icon: brand(siLinux) },
	{ label: "SQL", icon: lucide("database") },
];

/**
 * Skills that are not languages or frameworks, grouped by what they are for.
 *
 * Linux appears here as well as in the marquee. That is intentional - the
 * marquee says what he writes, this says what he ships on.
 *
 * No levels, bars or percentages anywhere: a self-assigned proficiency score
 * is not something a visitor can check.
 */
export const skillGroups: SkillGroup[] = [
	{
		label: "Workflow",
		skills: [
			{ label: "Git", icon: brand(siGit), note: "basics" },
			{ label: "GitHub", icon: brand(siGithub) },
			{ label: "Linux", icon: brand(siLinux), note: "basic commands & server operation" },
		],
	},
];
