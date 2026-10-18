import { useEffect } from "react";

import { ENABLE_SPOTLIGHT } from "../../lib/config";

/**
 * Cursor spotlight. Writes `--spot-x` / `--spot-y` on <html> each frame; the
 * `.spotlight` layer in global.css turns those into a soft radial gradient.
 *
 * Fine pointers only - the layer is `opacity: 0` everywhere else, so touch
 * devices get the scroll-driven blob drift instead.
 *
 * The rAF loop is idle until the pointer first moves, then stops again once
 * the spotlight has caught up. A permanent 60fps loop on a static page is
 * wasted battery.
 */
export default function CursorSpotlight() {
	useEffect(() => {
		if (!ENABLE_SPOTLIGHT) return;
		if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
			return;
		}

		const root = document.documentElement;
		const EASE = 0.12;
		const SNAP = 0.1;

		let frame = 0;
		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;
		let running = false;

		const tick = () => {
			currentX += (targetX - currentX) * EASE;
			currentY += (targetY - currentY) * EASE;

			root.style.setProperty("--spot-x", `${currentX.toFixed(1)}px`);
			root.style.setProperty("--spot-y", `${currentY.toFixed(1)}px`);

			if (Math.abs(targetX - currentX) < SNAP && Math.abs(targetY - currentY) < SNAP) {
				running = false;
				return;
			}
			frame = requestAnimationFrame(tick);
		};

		const onMove = (event: PointerEvent) => {
			targetX = event.clientX;
			targetY = event.clientY;
			if (!running) {
				running = true;
				frame = requestAnimationFrame(tick);
			}
		};

		window.addEventListener("pointermove", onMove, { passive: true });

		return () => {
			window.removeEventListener("pointermove", onMove);
			cancelAnimationFrame(frame);
		};
	}, []);

	return null;
}