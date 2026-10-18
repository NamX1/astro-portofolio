/**
 * UI chrome: SEO strings, labels and calls to action.
 *
 * TODO(content): every string here is placeholder copy written to be replaced.
 * Headings are arrays so the mask-up reveal can animate them line by line -
 * each entry is one line. Section bodies live with their data.
 */
export const seo = {
	title: "Kevin Charlie — Web Developer",
	/** TODO(content): 150-160 characters, written for a human not a crawler. */
	description:
		"Kevin Charlie builds fast, quiet websites for people who'd rather be doing something else. Python, TypeScript, Astro, Tailwind. You talk to me directly, and the invoice has one number on it.",
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
		lines: ["A short version", "of this page."],
	},
	skills: {
		label: "Skills",
		lines: ["What I reach", "for."],
	},
	credentials: {
		label: "Credentials",
		lines: ["Certificates"],
		verifyLabel: "Verify",
		/** TODO(content): wording for the in-card overlay and the dialog. */
		verifyAction: "Verify credential",
	},
	projects: {
		label: "Projects",
		lines: ["Things I'm", "building."],
	},
	contact: {
		label: "Contact",
		lines: ["Say", "hello."],
		body: "Tell me what you're after and roughly when. If I'm not the right fit I'll say so, and that costs neither of us anything.",
		emailLabel: "Send an email",
		githubLabel: "GitHub",
	},
	footer: {
		/** TODO(content): one quiet line. */
		line: "Made slowly, in the dark.",
	},
} as const;