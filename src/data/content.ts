/**
 * UI chrome: SEO strings, labels and calls to action.
 *
 * TODO(content): every string here is placeholder copy written to be replaced.
 * Headings are arrays so the mask-up reveal can animate them line by line -
 * each entry is one line. Section bodies live with their data.
 */
export const seo = {
	title: "Kevin Charlie — Portfolio",
	/** TODO(content): 150-160 characters, written for a human not a crawler. */
	description:
		"Portfolio of Kevin Charlie: projects, skills, and certificates. Mostly Python and Go, plus a growing habit of building things for the web. Say hello.",
	ogAlt: "Kevin Charlie — portfolio",
} as const;

export const nav = {
	/** Shown on the left. Deliberately the name and nothing else. */
	brand: "Kevin Charlie",
	contactLabel: "Contact",
} as const;

export const copy = {
	hero: {
		contactLabel: "Say hello",
		projectsLabel: "Projects",
	},
	about: {
		label: "About",
		lines: ["A little", "about me."],
	},
	skills: {
		label: "Skills",
		lines: ["Tools I", "keep close."],
	},
	credentials: {
		label: "Credentials",
		/** TODO(content): wording for the lightbox. */
		verifyAction: "Verify credential",
	},
	projects: {
		label: "Projects",
		lines: ["Still", "in progress."],
	},
	contact: {
		label: "Contact",
		lines: ["Don't be", "a stranger."],
		body: "Tell me what's on your mind: a project, a question, or just hello. I usually reply within a day.",
		channels: {
			whatsapp: "WhatsApp",
			email: "Email",
			github: "GitHub",
		},
	},
	footer: {
		/** TODO(content): one quiet line. */
		line: "Built slowly, on purpose.",
	},
} as const;