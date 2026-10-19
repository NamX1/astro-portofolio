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
	tagline: "Python, Go, and the quiet parts of the web.",

	/** TODO(content): swap in the address you actually want on the page. */
	email: "hello@kevincharlie.dev",

	/**
	 * WhatsApp. `number` is the only part the wa.me link needs: country code
	 * and subscriber digits, no `+`, spaces or dashes. `display` is what a
	 * human reads, so the two are stored side by side rather than derived -
	 * change one and you must change the other.
	 */
	whatsapp: {
		number: "6281510767097",
		display: "+62 815-1076-7097",
		/**
		 * TODO(content): confirm wording.
		 */
		message: "Hi Kevin, I found your portfolio and wanted to say hello.",
	},

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
		"I'm Kevin Charlie. I write Python and Go, and this site is where I keep what I make.",
	],
} as const;

/**
 * Both drive a build-time warning, because a contact section that silently
 * drops a channel you meant to publish is worse than one that tells you.
 */
export const hasEmail = profile.email.trim().length > 0;
export const hasWhatsApp = /^\d{8,15}$/.test(profile.whatsapp.number);