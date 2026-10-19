import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Expand, ArrowUpRight } from "lucide-react";

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
import { useBandReveal } from "./useBandReveal";

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
 * The certificates band.
 *
 * A credential is a claim, and a claim reads best small: who issued it, what
 * it is, and where to check. The screenshot is the least useful part of a
 * certificate - it cannot be read at thumbnail size, and a light rectangle on
 * a dark page is the loudest thing on it - so it lives behind a click instead
 * of taking up space.
 *
 * The cells are a grid, not a stack, and that is the whole answer to "what
 * happens when I have more certificates". The band is a fixed height for a
 * row of cells, and the cells fill the row horizontally before the band grows
 * another row. Three certificates cost the same vertical space as one.
 *
 * One island for the band, the cells and the lightbox, so there is one
 * island on the page instead of a grid island plus a dialog island.
 */
export default function CertificateBand({
	items,
	label,
}: {
	items: CertificateItem[];
	label: string;
}) {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<CertificateItem | null>(null);
	const prefersReducedMotion = useReducedMotion();
	const { ref, seen } = useBandReveal<HTMLDivElement>();

	function show(item: CertificateItem) {
		setActive(item);
		setOpen(true);
	}

	if (items.length === 0) return null;

	return (
		<MotionRoot>
			<div ref={ref} data-band={seen ? "in" : "out"}>
				<div className="band">
					<span className="band-rule band-rule-top" aria-hidden="true" />

					<div className="band-row">
						<h3 className="band-label text-label uppercase tracking-label text-ink-2">
							{label}
						</h3>

						<ul className="band-items band-items--grid">
							{items.map((item) => (
								<li className="band-item" key={item.verifyUrl}>
									<button
										type="button"
										onClick={() => show(item)}
										className="cert-cell"
										/* The title and the issuer are separate spans on
										   separate lines, so the computed name would run
										   them together - "Python (Basic)HackerRank". An
										   explicit label keeps them apart. */
										aria-label={`${item.title}, ${item.issuer}`}
									>
										<span className="cert-main">
											<span className="cert-title text-body text-ink">
												{item.title}
											</span>
											<Expand
												className="cert-expand"
												strokeWidth={1.25}
												aria-hidden="true"
											/>
										</span>
										<span className="cert-issuer text-label uppercase tracking-label text-ink-2">
											{item.issuer}
										</span>
									</button>
								</li>
							))}
						</ul>
					</div>

					<span className="band-rule band-rule-bottom" aria-hidden="true" />
				</div>
			</div>

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
