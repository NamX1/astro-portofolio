import { motion } from "motion/react";
import type { ReactNode } from "react";

import { springs } from "../../lib/motion";
import { MotionRoot } from "./MotionRoot";

interface RevealProps {
	/** Astro-rendered markup passed in as children. Survives hydration. */
	children?: ReactNode;
	className?: string;
	/** Seconds, used only when you want to override the soft preset. */
	delay?: number;
}

/**
 * Block-level scroll reveal: a short rise plus a fade, once, on entry into
 * view. Transform and opacity only - no blur, no layout animation.
 *
 * The pre-reveal state is server-rendered as an inline style. If scripting is
 * off, or the visitor prefers reduced motion, CSS in global.css forces
 * everything back to visible (see the `.rv` rules and the <noscript> block).
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
	return (
		<MotionRoot>
			<motion.div
				className={`rv ${className ?? ""}`.trim()}
				data-reveal=""
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ ...springs.soft, delay }}
			>
				{children}
			</motion.div>
		</MotionRoot>
	);
}