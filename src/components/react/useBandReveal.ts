import { useEffect, useRef, useState } from "react";

/**
 * Drives the band entrance.
 *
 * The band needs a *class change* to drive CSS transitions on rules and
 * items it does not own, and Motion animates inline styles on the element it
 * is given - it cannot flip a descendant's transition. So this flips one
 * attribute and the stylesheet does the rest.
 *
 * The pre-reveal state is server-rendered as `data-band="out"`. Two
 * overrides rescue it if the island never runs - see the <noscript> block in
 * Layout.astro and the prefers-reduced-motion block in global.css.
 */
export function useBandReveal<T extends HTMLElement>() {
	const ref = useRef<T>(null);
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

	return { ref, seen };
}
