/**
 * TODO(content): facts and bio. Every string here is placeholder copy.
 *
 * Voice: warm, first person, short sentences, contractions, a bit of humour,
 * talking to "you". No invented facts - no years of experience, clients,
 * results or employers. If a number isn't true, leave it out.
 */
export const profile = {
	name: "Kevin Charlie",

	/**
	 * TODO(content): one line, under about ten words. This is the promise the
	 * rest of the page has to keep.
	 */
	tagline: "The right person for the job, without the agency detour.",

	/**
	 * TODO(content): put a real address here to switch the email buttons on.
	 * While this is empty the Contact section hides its email button and the
	 * build prints a warning.
	 */
	email: "",

	/**
	 * TODO(content): set this to a city when you want to publish one.
	 *
	 * Deliberately `undefined`, not a TODO string. A truthy placeholder here
	 * renders in the eyebrow type style (12px, uppercase, 0.22em tracked),
	 * which makes a build-log string look like an intentional design element.
	 */
	location: undefined as string | undefined,

	links: {
		github: "https://github.com/NamX1",
	},

	/**
	 * TODO(content): about copy. Two short paragraphs. The word-by-word scroll
	 * reveal caps each paragraph at 60 words, so keep them under that.
	 */
	about: [
		"I build websites that load fast and then get out of the way. You tell me what you need, I build it, and you get the only thing that really matters here: a site that just works.",
		"No account managers, no discovery-call invoice, no “let's circle back”. Just me, the work, and one number on the quote.",
	],
} as const;

/** Convenience for the Contact section. */
export const hasEmail = profile.email.trim().length > 0;