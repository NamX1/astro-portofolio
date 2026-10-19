import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { springs } from "../../lib/motion";
import { MotionRoot } from "./MotionRoot";

/** Output of `getImage()` in Skills.astro, flattened for serialisation. */
export interface OptimizedImage {
	src: string;
	width?: number;
	height?: number;
	srcSet?: string;
}

export interface CertificateItem {
	title: string;
	issuer: string;
	verifyUrl: string;
	alt: string;
	issued?: number;
	summary?: string;
	image: OptimizedImage;
	/** Shared UI copy, passed in so it still lives in src/data. */
	labels: {
		verifyAction: string;
	};
}

/**
 * The certificates.
 *
 * A certificate is a document, so it gets a card and the image stays in it.
 * The previous version was a list row with the image hidden behind a click,
 * which threw away the one thing that makes a certificate legible at a
 * glance: the certificate itself.
 *
 * The image is the loudest thing on a monochrome page, so it is greyscaled and
 * dimmed to a paper-grey plate at rest and warms slightly on hover. The
 * lightbox shows the real thing, in colour, at full size.
 *
 * The cards are a grid, so they fill the row horizontally before another row
 * appears. Three per row at 1152px, and the group grows by one row of cards
 * per three certificates rather than one card per certificate.
 */
export default function CertificateCards({ items }: { items: CertificateItem[] }) {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<CertificateItem | null>(null);
	const prefersReducedMotion = useReducedMotion();

	function show(item: CertificateItem) {
		setActive(item);
		setOpen(true);
	}

	if (items.length === 0) return null;

	return (
		<MotionRoot>
			<ul className="cert-cards">
				{items.map((item) => (
					<li key={item.verifyUrl}>
						<button
							type="button"
							onClick={() => show(item)}
							className="cert-card"
						>
							<span className="cert-frame">
								{/* Decorative here: the button's name already comes
								    from the title and issuer below, so the image
								    would only be announced twice. The lightbox
								    image carries the full description. */}
								<img
									src={item.image.src}
									srcSet={item.image.srcSet}
									width={item.image.width}
									height={item.image.height}
									alt=""
									loading="lazy"
									decoding="async"
									className="cert-image"
								/>
							</span>

							<span className="cert-meta">
								{/* The display face, not UI type. The page's whole
								    typographic voice is the serif, and a card
								    caption in Inter reads like a settings panel
								    rather than a portfolio. */}
								<span className="cert-title font-serif text-lead font-light text-ink">
									{item.title}
								</span>
								{/* A real space between the two, so the button's
								    accessible name reads "Python (Basic) HackerRank"
								    rather than running them together. It collapses
								    visually - the meta block is a flex column, and
								    a whitespace-only child is not rendered as a
								    flex item.

								    Deliberately no aria-label. An explicit one
								    would have to restate the visible text, and
								    anything short of an exact match fails
								    WCAG 2.5.3, Label in Name. */}
								{" "}
								<span className="cert-issuer text-label uppercase tracking-label text-ink-2">
									{item.issuer}
									{item.issued ? ` · ${item.issued}` : ""}
								</span>
							</span>
						</button>
					</li>
				))}
			</ul>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-2xl">
					{active && (
						<motion.div
							className="flex flex-col gap-5"
							initial={
								prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }
							}
							animate={{ opacity: 1, scale: 1 }}
							transition={springs.default}
						>
							<DialogHeader>
								<DialogTitle>{active.title}</DialogTitle>
								<DialogDescription>
									{[active.issuer, active.issued]
										.filter(Boolean)
										.join(" · ")}
									{active.summary ? ` — ${active.summary}` : ""}
								</DialogDescription>
							</DialogHeader>

							<img
								src={active.image.src}
								srcSet={active.image.srcSet}
								width={active.image.width}
								height={active.image.height}
								alt={active.alt}
								decoding="async"
								className="w-full rounded-md border border-border/60"
							/>

							<div className="flex justify-end">
								<a
									href={active.verifyUrl}
									target="_blank"
									rel="noopener noreferrer"
									className={buttonVariants()}
								>
									{active.labels.verifyAction}
									<ArrowUpRight
										data-icon="inline-end"
										strokeWidth={1.25}
										aria-hidden="true"
									/>
								</a>
							</div>
						</motion.div>
					)}
				</DialogContent>
			</Dialog>
		</MotionRoot>
	);
}
