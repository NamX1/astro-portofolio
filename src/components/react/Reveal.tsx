import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
	children: ReactNode;
	className?: string;
	/** Seconds. Slow by design - see docs/DESIGN.md. */
	duration?: number;
	/** Seconds. */
	delay?: number;
}

/**
 * The one sanctioned scroll-reveal primitive. Every Motion island in this
 * project belongs in this folder and must be a `.tsx` file mounted from an
 * `.astro` file with `client:visible`.
 *
 * Timing follows docs/DESIGN.md: slow (0.8-1.2s), ease-out, fade + blur to
 * sharp, no spring/bounce. `prefers-reduced-motion` is honoured by rendering
 * the children plainly.
 */
export function Reveal({
	children,
	className,
	duration = 1,
	delay = 0,
}: RevealProps) {
	const prefersReducedMotion = useReducedMotion();

	if (prefersReducedMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, filter: "blur(6px)" }}
			whileInView={{ opacity: 1, filter: "blur(0px)" }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration, delay, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}