/**
 * Runtime switches. Nothing here changes the design — these only decide which
 * optional JavaScript gets shipped.
 */

/**
 * Smooth scrolling (Lenis). Set to false and the island stops rendering,
 * dropping the dependency from the client bundle entirely.
 *
 * Only ever applies on fine-pointer devices; touch keeps native scrolling.
 */
export const ENABLE_SMOOTH_SCROLL = true;

export const SMOOTH_SCROLL = {
	/** Lower is slower and dreamier. Lenis default is 0.1. */
	lerp: 0.09,
	/**
	 * Negative px offset so anchored headings clear the sticky nav.
	 * Keep in sync with `scroll-padding-top` in global.css.
	 */
	anchorOffset: -80,
} as const;

/** Cursor spotlight. Fine pointers only; touch falls back to a scroll drift. */
export const ENABLE_SPOTLIGHT = true;