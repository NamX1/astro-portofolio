import { useEffect, useRef, useState } from "react";
import { Check, Copy, GitFork, Mail, MessageCircle } from "lucide-react";

import { Button } from "../ui/button";

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

export interface ContactCardsLabels {
	copyAction: string;
	copiedLabel: string;
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
 * Clipboard write with a fallback.
 *
 * `navigator.clipboard` is undefined on any non-secure origin, so a static
 * preview served over plain http would silently do nothing without this.
 */
async function writeToClipboard(text: string): Promise<boolean> {
	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(text);
			return true;
		}
	} catch {
		// Permission denied or a non-secure origin - fall through.
	}

	try {
		const field = document.createElement("textarea");
		field.value = text;
		field.setAttribute("readonly", "");
		field.style.position = "fixed";
		field.style.top = "0";
		field.style.opacity = "0";
		document.body.appendChild(field);
		field.select();
		const ok = (document as unknown as { execCommand(command: string): boolean }).execCommand("copy");
		document.body.removeChild(field);
		return ok;
	} catch {
		return false;
	}
}

/**
 * Three compact cards, one per channel.
 *
 * No toggle, no panel: the channels are visible directly, which is what a
 * contact section is for. Each card is a link to the channel, with a small
 * copy control in the corner. The two are siblings, not nested - an
 * interactive element inside a link is a keyboard trap and a broken tap
 * target.
 *
 * The cards are a grid, so they fill the row horizontally before another
 * row appears: three per row at 1152px, so the section grows by one row per
 * three channels rather than one row per channel.
 */
export default function ContactCards({
	channels,
	labels,
}: {
	channels: ContactChannel[];
	labels: ContactCardsLabels;
}) {
	const [copied, setCopied] = useState<string | null>(null);
	const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(
		() => () => {
			if (resetTimer.current) clearTimeout(resetTimer.current);
		},
		[],
	);

	async function handleCopy(channel: ContactChannel) {
		const written = await writeToClipboard(channel.copyValue);
		if (!written) return;

		setCopied(channel.id);
		if (resetTimer.current) clearTimeout(resetTimer.current);
		resetTimer.current = setTimeout(() => setCopied(null), 1800);
	}

	if (channels.length === 0) return null;

	return (
		<ul className="contact-cards">
			{channels.map((channel) => {
				const Icon = ICONS[channel.icon];
				const isCopied = copied === channel.id;

				return (
					<li key={channel.id}>
						<div className="contact-card">
							<a
								href={channel.href}
								target={channel.external ? "_blank" : undefined}
								rel={channel.external ? "noopener noreferrer" : undefined}
								className="contact-card-link"
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
							</a>

							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => handleCopy(channel)}
								aria-label={`${labels.copyAction} ${channel.label}`}
								className="contact-card-copy"
							>
								{isCopied ? (
									<Check strokeWidth={1.25} aria-hidden="true" />
								) : (
									<Copy strokeWidth={1.25} aria-hidden="true" />
								)}
							</Button>
						</div>
					</li>
				);
			})}
		</ul>
	);
}
