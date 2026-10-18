import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Copy, GitFork, Mail, MessageCircle } from "lucide-react";

import { Button } from "../ui/button";
import { springs } from "../../lib/motion";
import { MotionRoot } from "./MotionRoot";

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

export interface ContactPanelLabels {
	toggleLabel: string;
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

const PANEL_ID = "contact-channels";

/**
 * `document.execCommand` is deprecated but still the only clipboard path that
 * works on a non-secure origin. Reached through this alias so the deliberate
 * use of a legacy API is visible at the call site instead of hidden behind a
 * suppression comment.
 */
interface LegacyClipboard {
	execCommand(command: string): boolean;
}

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
		const ok = (document as unknown as LegacyClipboard).execCommand("copy");
		document.body.removeChild(field);
		return ok;
	} catch {
		return false;
	}
}

/**
 * The whole contact affordance: one toggle, one panel, three channels.
 *
 * A disclosure rather than a dialog. Focus deliberately stays on the toggle -
 * nothing here is modal, so trapping or moving focus would be wrong - and the
 * panel unmounts when closed, so its links leave the tab order entirely.
 *
 * The entrance is transform + opacity only, matching `.cert-panel`. Height is
 * never animated, so the panel appears at full size and settles rather than
 * growing.
 */
export default function ContactPanel({
	channels,
	labels,
}: {
	channels: ContactChannel[];
	labels: ContactPanelLabels;
}) {
	const [open, setOpen] = useState(false);
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

	const panelId = `${PANEL_ID}-${channels.map((c) => c.id).join("-")}`;

	return (
		<MotionRoot>
			<div data-contact-toggle className="mt-10">
				<Button
					type="button"
					aria-expanded={open}
					aria-controls={panelId}
					onClick={() => setOpen((value) => !value)}
				>
					{labels.toggleLabel}
					<ChevronDown
						data-icon="inline-end"
						strokeWidth={1.25}
						aria-hidden="true"
						className={`transition-transform duration-[var(--duration-ui)] ease-[var(--ease-out-apple)] ${
							open ? "rotate-180" : "rotate-0"
						}`}
					/>
				</Button>
			</div>

			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						key="panel"
						id={panelId}
						data-contact-panel
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={springs.default}
						className="glass mt-4 overflow-hidden rounded-lg"
					>
						<ul className="px-4 sm:px-5">
							{channels.map((channel, index) => {
								const Icon = ICONS[channel.icon];
								const isCopied = copied === channel.id;

								return (
									<li
										key={channel.id}
										className={`grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-4 ${
											index === 0 ? "" : "border-t border-border/40"
										}`}
									>
										<Icon
											strokeWidth={1.25}
											aria-hidden="true"
											className="size-4 text-ink-2"
										/>

										{/* Link and copy control are siblings, never nested -
										    an interactive element inside a link is a keyboard
										    trap and a broken tap target. */}
										<a
											href={channel.href}
											target={channel.external ? "_blank" : undefined}
											rel={channel.external ? "noopener noreferrer" : undefined}
											className="min-w-0 rounded-sm"
										>
											<span className="block text-label uppercase tracking-label text-ink-2">
												{channel.label}
											</span>
											{/* Sans, not `--font-mono`. The mono token resolves to
											    platform system faces (SF Mono / Consolas), which
											    would be the one unself-hosted face on a page that
											    self-hosts both of its others. */}
											<span className="mt-1 block text-body tracking-tight text-ink">
												{channel.value}
											</span>
										</a>

										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => handleCopy(channel)}
																aria-label={`${labels.copyAction} ${channel.label}`}
											className="text-ink-2"
										>
											{isCopied ? (
												<Check strokeWidth={1.25} aria-hidden="true" />
											) : (
												<Copy strokeWidth={1.25} aria-hidden="true" />
											)}
										</Button>
									</li>
								);
							})}
						</ul>

						{/* Confirmation the copy actually happened. A swap of the icon
						    alone is invisible to a screen reader. */}
						<p aria-live="polite" className="sr-only">
							{copied
								? `${channels.find((c) => c.id === copied)?.label} ${labels.copiedLabel.toLowerCase()}`
								: ""}
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</MotionRoot>
	);
}
