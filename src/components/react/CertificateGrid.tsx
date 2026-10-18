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
	thumb: OptimizedImage;
	large: OptimizedImage;
	/** Shared UI copy, passed in so it still lives in src/data. */
	labels: {
		verifyAction: string;
	};
}

/**
 * Credentials grid plus its detail dialog.
 *
 * One island for the whole thing. Astro's <Image /> is an Astro component and
 * cannot render inside a React island, so the images are optimised in
 * Skills.astro with `getImage()` and passed in as plain props - same service,
 * same output, just serialisable.
 *
 * Hover and focus treatment is pure CSS (`group-hover:` / `group-focus-visible:`,
 * which Tailwind gates behind `@media (hover: hover)`). Motion is used only for
 * the dialog entrance.
 */
export default function CertificateGrid({ items }: { items: CertificateItem[] }) {
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
			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((item) => {
					const heading = [item.issuer, item.issued].filter(Boolean).join(" · ");

					return (
						<li key={item.verifyUrl} className="cert-group">
							<button
								type="button"
								onClick={() => show(item)}
								aria-label={`${item.title}, ${item.issuer}. Open certificate details.`}
								className="block w-full cursor-pointer overflow-hidden rounded-lg border border-border/60 bg-surface transition-colors duration-500 ease-out hover:border-ink-2/30"
							>
								<span className="relative block overflow-hidden">
									<img
										src={item.thumb.src}
										srcSet={item.thumb.srcSet}
										width={item.thumb.width}
										height={item.thumb.height}
										alt={item.alt}
										loading="lazy"
										decoding="async"
										className="cert-thumb"
									/>

									{/* Hover/focus detail. Hidden at rest, so touch devices
									    simply get the caption below instead. */}
									<span className="cert-overlay cert-panel">
										<span className="text-label uppercase tracking-label text-ink-2">
											{heading}
										</span>
										<span className="font-serif text-lead font-light text-ink">
											{item.title}
										</span>
										{item.summary && (
											<span className="line-clamp-2 text-body text-ink-2">
												{item.summary}
											</span>
										)}
										<span className="mt-1 inline-flex items-center gap-1.5 text-label uppercase tracking-label text-ink">
											{item.labels.verifyAction}
											<ArrowUpRight
												data-icon="inline-end"
												strokeWidth={1.25}
												aria-hidden="true"
											/>
										</span>
									</span>
								</span>
							</button>

							{/* Always visible. Carries the card on touch, where
							    there is no hover state to reveal the overlay. */}
							<div className="mt-3 px-0.5">
								<p className="text-body text-ink">{item.title}</p>
								<p className="mt-1 text-label uppercase tracking-label text-ink-2">
									{item.issuer}
									{item.issued ? ` · ${item.issued}` : ""}
								</p>
							</div>
						</li>
					);
				})}
			</ul>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-2xl">
					{active && (
						<motion.div
							className="flex flex-col gap-5"
							initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.22, ease: "easeOut" }}
						>
							<DialogHeader>
								<DialogTitle>{active.title}</DialogTitle>
								<DialogDescription>
									{[active.issuer, active.issued].filter(Boolean).join(" · ")}
									{active.summary ? ` — ${active.summary}` : ""}
								</DialogDescription>
							</DialogHeader>

							<img
								src={active.large.src}
								srcSet={active.large.srcSet}
								width={active.large.width}
								height={active.large.height}
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