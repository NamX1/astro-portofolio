import { useEffect } from "react";

import { ENABLE_SPOTLIGHT } from "../../lib/config";

/** Max hero parallax travel in px. A few px is the whole idea. */
const PARALLAX_X = 6;
const PARALLAX_Y = 4;

/**
 * Cursor spotlight plus a whisper of hero parallax.
 *
 * Writes `--spot-x/y` (radial gradient centre) and `--hero-px/py` (a few px of
 * offset consumed by `.hero-parallax` in CSS) on <html>. Fine pointers only -
 * on touch the variables are never written, so the parallax offset stays at
 * its zero default and the spotlight layer is `opacity: 0`.
 *
 * The rAF loop idles until the pointer first moves, then stops again once the
 * spotlight has caught up. A permanent 60fps loop on a static page is wasted
 * battery.
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

			// Offset from viewport centre, clamped hard. This is meant to be
			// felt rather than seen.
			const offsetX = currentX - window.innerWidth / 2;
			const offsetY = currentY - window.innerHeight / 2;
			const clamp = (value: number, limit: number) =>
				Math.max(-limit, Math.min(limit, value));

			root.style.setProperty(
				"--hero-px",
				`${clamp(offsetX * 0.012, PARALLAX_X).toFixed(2)}px`,
			);
			root.style.setProperty(
				"--hero-py",
				`${clamp(offsetY * 0.012, PARALLAX_Y).toFixed(2)}px`,
			);

			if (
				Math.abs(targetX - currentX) < SNAP &&
				Math.abs(targetY - currentY) < SNAP
			) {
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