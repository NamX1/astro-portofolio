import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Single place where reduced motion is wired up.
 *
 * `reducedMotion="user"` makes every `motion` component below it drop transform
 * and layout animations when the visitor prefers reduced motion, while still
 * animating opacity. Astro renders each island as its own React root, so this
 * wrapper is what makes the setting apply page-wide rather than per island.
 *
 * Blur-based reveals are handled separately in CSS - see the `[data-reveal]`
 * rules in global.css - because `filter` is not a transform and Motion keeps it.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
	return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}