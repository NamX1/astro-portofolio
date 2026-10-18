/**
 * The contact channels, derived from `profile` so there is exactly one place
 * to change an address.
 *
 * Kept out of `content.ts` on purpose: copy belongs there, addresses belong
 * in `profile.ts`, and this file is the join between them.
 *
 * `value` is what a human reads. `copyValue` is what lands on the clipboard.
 * They differ for GitHub - nobody types `https://` into a message - which is
 * why they are separate fields rather than one string used twice.
 */
import { copy } from "./content";
import { hasEmail, hasWhatsApp, profile } from "./profile";

export interface ContactChannel {
	id: "whatsapp" | "email" | "github";
	label: string;
	value: string;
	copyValue: string;
	href: string;
	/** External links open in a new tab; `mailto:` and `wa.me` do not. */
	external: boolean;
	/** Lucide icon name, resolved by the island. */
	icon: "message-circle" | "mail" | "github";
}

/** wa.me takes country code + digits only: no `+`, spaces or dashes. */
function whatsappHref(): string {
	const base = `https://wa.me/${profile.whatsapp.number}`;
	if (!profile.whatsapp.message) return base;
	return `${base}?text=${encodeURIComponent(profile.whatsapp.message)}`;
}

function githubHandle(url: string): string {
	return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

const all: ContactChannel[] = [
	{
		id: "whatsapp",
		label: copy.contact.channels.whatsapp,
		value: profile.whatsapp.display,
		copyValue: profile.whatsapp.display,
		href: whatsappHref(),
		external: true,
		icon: "message-circle",
	},
	{
		id: "email",
		label: copy.contact.channels.email,
		value: profile.email,
		copyValue: profile.email,
		href: `mailto:${profile.email}`,
		external: false,
		icon: "mail",
	},
	{
		id: "github",
		label: copy.contact.channels.github,
		value: githubHandle(profile.links.github),
		copyValue: profile.links.github,
		href: profile.links.github,
		external: true,
		icon: "github",
	},
];

export const contactChannels = all.filter((channel) => {
	if (channel.id === "whatsapp") return hasWhatsApp;
	if (channel.id === "email") return hasEmail;
	return true;
});
