import { ArrowUpRight, GitFork, Mail, MessageCircle } from "lucide-react";

/**
 * Structural mirror of `ContactChannel` in src/data/contact.ts. Declared here
 * rather than imported so the island owns its own prop contract.
 */
export interface ContactChannel {
	id: "whatsapp" | "email" | "github";
	label: string;
	value: string;
	copyValue: string;
	href: string;
	external: boolean;
	icon: "message-circle" | "mail" | "github";
}

const ICONS = {
	"message-circle": MessageCircle,
	mail: Mail,
	// lucide-react 1.58 dropped every brand mark, so there is no GitHub
	// glyph to use. A thin-stroke fork icon keeps the row consistent with
	// the other two; a filled simple-icons mark would read as the only
	// chromatic object on a monochrome page.
	github: GitFork,
} as const;

/**
 * Three compact cards, one per channel.
 *
 * Each card is a single button: one click opens the channel - WhatsApp chat,
 * email compose, GitHub profile - directly. No copy step, no copy-paste.
 * The address is still selectable text for anyone who wants it, but the
 * primary action is to message.
 *
 * The cards are a grid, so they fill the row horizontally before another
 * row appears: three per row at 1152px, so the section grows by one row per
 * three channels rather than one row per channel.
 */
export default function ContactCards({
	channels,
}: {
	channels: ContactChannel[];
}) {
	if (channels.length === 0) return null;

	function open(channel: ContactChannel) {
		if (channel.external) {
			window.open(channel.href, "_blank", "noopener,noreferrer");
		} else {
			window.location.href = channel.href;
		}
	}

	return (
		<ul className="contact-cards">
			{channels.map((channel) => {
				const Icon = ICONS[channel.icon];

				return (
					<li key={channel.id}>
						<button
							type="button"
							onClick={() => open(channel)}
							className="contact-card"
						>
							<span className="contact-card-head">
								<Icon
									strokeWidth={1.25}
									aria-hidden="true"
									className="size-4 text-ink-2"
								/>
								<span className="contact-card-label text-label uppercase tracking-label text-ink-2">
									{channel.label}
								</span>
							</span>
							<span className="contact-card-value text-body text-ink">
								{channel.value}
							</span>
							<ArrowUpRight
								className="contact-card-arrow"
								strokeWidth={1.25}
								aria-hidden="true"
							/>
						</button>
					</li>
				);
			})}
		</ul>
	);
}
