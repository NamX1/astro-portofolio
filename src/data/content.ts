/**
 * UI chrome: SEO strings, labels and calls to action.
 *
 * TODO(content): every string here is placeholder copy written to be replaced.
 * Section bodies live with their data - see `profile.ts` for the bio and
 * `projects.ts` / `certificates.ts` for content.
 */
export const seo = {
	title: "Kevin Charlie — Web Developer",
	/** TODO(content): 150-160 characters, written for a human not a crawler. */
	description:
		"Kevin Charlie builds fast, quiet websites for people who would rather be doing anything else. Python, TypeScript, Astro, Tailwind. Direct contact, no agency in the middle.",
	ogAlt: "Kevin Charlie — web developer",
} as const;

export const nav = {
	/** Shown on the left. Deliberately the name and nothing else. */
	brand: "Kevin Charlie",
	contactLabel: "Contact",
} as const;

export const copy = {
	hero: {
		contactLabel: "Get in touch",
		projectsLabel: "See the work",
	},
	about: {
		label: "About",
		heading: "A short version of this page.",
	},
	skills: {
		label: "Skills",
		heading: "What I reach for.",
	},
	credentials: {
		label: "Credentials",
		heading: "Certificates",
		verifyLabel: "Verify",
	},
	projects: {
		label: "Projects",
		heading: "Things I'm building.",
	},
	contact: {
		label: "Contact",
		heading: "Say hello.",
		body: "Tell me what you need and roughly when. If I am not right for it, I will say so — that costs neither of us anything.",
		emailLabel: "Send an email",
		githubLabel: "GitHub",
	},
	footer: {
		/** TODO(content): one quiet line. */
		line: "Built slowly, in the dark.",
	},
} as const;