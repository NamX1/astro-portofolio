import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Triggers the skill band entrance.
 *
 * Deliberately not Motion. The band needs a *class change* to drive CSS
 * transitions on rules and items it does not own, and Motion animates
 * inline styles on the element it is given - it cannot flip a descendant's
 * transition. So this flips one attribute and the stylesheet does the rest.
 *
 * Astro children pass through untouched, which keeps the skill marks in
 * `SkillMark.astro` rather than duplicating them here in React.
 *
 * The pre-reveal state is `data-band="out"`, server-rendered. Two overrides
 * rescue it if the island never runs - see the <noscript> block in
 * Layout.astro and the prefers-reduced-motion block in global.css.
 */
export default function BandReveal({ children }: { children?: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [seen, setSeen] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		if (typeof IntersectionObserver === "undefined") {
			setSeen(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setSeen(true);
				observer.disconnect();
			},
			{ threshold: 0.3 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} data-band={seen ? "in" : "out"}>
			{children}
		</div>
	);
}
