import type { ReactNode } from "react";

import { useBandReveal } from "./useBandReveal";

/**
 * Triggers the band entrance for a band whose contents are Astro-rendered
 * markup passed in as children.
 *
 * Astro children pass through untouched, which keeps the skill marks in
 * `SkillMark.astro` rather than duplicating them here in React.
 */
export default function BandReveal({ children }: { children?: ReactNode }) {
	const { ref, seen } = useBandReveal<HTMLDivElement>();

	return (
		<div ref={ref} data-band={seen ? "in" : "out"}>
			{children}
		</div>
	);
}
