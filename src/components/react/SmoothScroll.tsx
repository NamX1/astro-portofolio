import { useEffect } from "react";

import { ENABLE_SMOOTH_SCROLL, SMOOTH_SCROLL } from "../../lib/config";

/**
 * Smooth scrolling via Lenis.
 *
 * Desktop pointer devices only. Touch keeps native scrolling, which is both
 * faster and better behaved on mobile - so this island does nothing on a
 * phone.
 *
 * Two details that matter, both from the Lenis docs:
 *  - `anchors` must be enabled or Lenis actively *breaks* in-page anchors.
 *    The offset is negative so the sticky nav does not cover the heading.
 *  - `respectReducedMotion` defaults to true, which disables smoothing and
 *    makes programmatic scrolls instant. Left alone on purpose.
 *
 * Renders nothing. Gated by `ENABLE_SMOOTH_SCROLL` in index.astro.
 */
export default function SmoothScroll() {
	useEffect(() => {
		if (!ENABLE_SMOOTH_SCROLL) return;

		// Fine pointers only - touch keeps native scrolling.
		if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
			return;
		}

		let cleanup = () => {};

		// Imported lazily so a touch device never downloads Lenis at all.
		void import("lenis").then(({ default: Lenis }) => {
			const lenis = new Lenis({
				lerp: SMOOTH_SCROLL.lerp,
				autoRaf: true,
				anchors: { offset: SMOOTH_SCROLL.anchorOffset },
			});

			cleanup = () => lenis.destroy();
		});

		return () => cleanup();
	}, []);

	return null;
}