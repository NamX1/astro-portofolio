import { motion } from "motion/react";
import type { ReactNode } from "react";

import { MotionRoot } from "./MotionRoot";

interface RevealProps {
	/** Astro-rendered markup passed in as children. Survives hydration. */
	children?: ReactNode;
	className?: string;
	/** Seconds. docs/DESIGN.md asks for 0.8-1.2s. */
	duration?: number;
	/** Seconds. */
	delay?: number;
}

/**
 * Scroll reveal: fade plus blur-to-sharp, once, on entry into view.
 *
 * The pre-reveal state is server-rendered as an inline style. If scripting is
 * off, or the visitor prefers reduced motion, CSS in global.css forces it back
 * to fully visible - see the `[data-reveal]` rules and the <noscript> block.
 */
export default function Reveal({
	children,
	className,
	duration = 1,
	delay = 0,
}: RevealProps) {
	return (
		<MotionRoot>
			<motion.div
				data-reveal=""
				className={className}
				initial={{ opacity: 0, filter: "blur(8px)" }}
				whileInView={{ opacity: 1, filter: "blur(0px)" }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration, delay, ease: "easeOut" }}
			>
				{children}
			</motion.div>
		</MotionRoot>
	);
}