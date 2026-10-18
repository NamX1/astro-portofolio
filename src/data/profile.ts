/**
 * TODO(content): replace every placeholder below with real values.
 * Nothing here is invented copy - leave a field out rather than guessing.
 */
export const profile = {
	name: "Your Name",
	/** One-line positioning statement. Used as the default meta description. */
	role: "TODO",
	location: "TODO",
	email: "TODO",
	socials: {
		github: "TODO",
		linkedin: "TODO",
	},
	/** TODO(design): rendered by the Skills section. */
	skills: [],
} as const;

export type Profile = typeof profile;