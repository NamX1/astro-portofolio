/**
 * TODO(content): facts and bio. Every string here is placeholder copy.
 *
 * Tone for the whole page is casual with light humour. Edit freely, but keep
 * it short - this is a one-page site and restraint is the whole aesthetic.
 */
export const profile = {
	name: "Kevin Charlie",

	/**
	 * TODO(content): one line, under about ten words. This is the promise the
	 * rest of the page has to keep.
	 */
	tagline: "The right person for the job — minus the agency markup.",

	/**
	 * TODO(content): put a real address here to switch the email buttons on.
	 * While this is empty the Contact section hides its email button and the
	 * build prints a warning.
	 */
	email: "",

	/** TODO(content): city, or delete this key if you would rather not say. */
	location: "TODO(content): city",

	links: {
		github: "https://github.com/NamX1",
	},

	/** TODO(content): about copy. Casual, credible, two short paragraphs. */
	about: [
		"I build fast, quiet websites for people who would rather be doing literally anything else. Python, TypeScript, the whole stack — if it loads in under a second and nobody has to squint at it, I did my job.",
		"No agency, no account manager, no “let’s circle back on that” email. You talk to me, I do the work, and the invoice has exactly one number on it.",
	],
} as const;

/** Convenience for the Contact section. */
export const hasEmail = profile.email.trim().length > 0;