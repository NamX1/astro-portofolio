import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { springs } from "../../lib/motion";
import { MotionRoot } from "./MotionRoot";

interface SectionHeadingProps {
	label: string;
	/** The heading text. A single string that wraps naturally; the mask-up
	 *  reveals the whole block as one piece. Do not split by words or
	 *  characters. */
	lines: readonly string[];
	/** 3 when nested under another heading, e.g. Credentials inside Skills. */
	level?: 2 | 3;
	headingId?: string;
	/** Astro-rendered section content, revealed with the heading. */
	children?: ReactNode;
	className?: string;
}

const group: Variants = {
	hidden: {},
	show: {
		transition: { delayChildren: 0.06, staggerChildren: 0.07 },
	},
};

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 8 },
	show: { opacity: 1, y: 0, transition: springs.default },
};

/**
 * Mask-up: the whole heading block starts translated fully below its own mask
 * and slides into place. `text-wrap: balance` on the `.display` utility keeps
 * wrapped lines even, so a heading that wraps onto two lines on a narrow
 * screen still animates cleanly as one piece.
 */
const maskUp: Variants = {
	hidden: { opacity: 0, y: "108%" },
	show: { opacity: 1, y: 0, transition: springs.soft },
};

/**
 * Section heading plus its content, revealed together.
 *
 * One island per section: the heading owns the reveal, and the Astro markup
 * passed as children rides along rather than needing its own island.
 */
export default function SectionHeading({
	label,
	lines,
	level = 2,
	headingId,
	children,
	className,
}: SectionHeadingProps) {
	const Heading = level === 2 ? "h2" : "h3";

	return (
		<MotionRoot>
			<motion.div
				className={className}
				data-reveal=""
				variants={group}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
			>
				<motion.p className="rv text-label uppercase tracking-label text-ink-2" variants={fadeUp}>
					{label}
				</motion.p>

				<Heading id={headingId} className="display mt-5 scroll-mt-24">
					<span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
						<motion.span className="rv block" variants={maskUp}>
							{lines.join(" ")}
						</motion.span>
					</span>
				</Heading>

				{children}
			</motion.div>
		</MotionRoot>
	);
}