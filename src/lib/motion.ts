import type { Transition } from "motion/react";

/**
 * Shared motion language. CAS look, Apple behaviour: physical, calm, never bouncy.
 *
 * All three presets use the duration-based spring API (`visualDuration` +
 * `bounce`), where `bounce: 0` is critically damped - the value arrives at the
 * target with no overshoot and no oscillation. `visualDuration` overrides
 * `duration` and is the time the motion appears to take to settle, which makes
 * these easier to reason about than stiffness/damping pairs.
 *
 * These are deliberately *not* set via `MotionConfig transition`, because a
 * global default would also apply to opacity and colour, which should stay on
 * the CSS easing curve below.
 */
export const springs = {
	/** Reveals: slow enough to read as calm rather than animated. */
	soft: { type: "spring", visualDuration: 0.65, bounce: 0 },
	/** UI affordances: hover states, small entrances. */
	default: { type: "spring", visualDuration: 0.32, bounce: 0 },
	/** Press feedback. */
	quick: { type: "spring", visualDuration: 0.18, bounce: 0 },
} satisfies Record<string, Transition>;

/**
 * iOS-style easing for CSS transitions (hover overlays, colour, opacity).
 * Fast out of the gate, long calm settle.
 */
export const easeOutApple = [0.32, 0.72, 0, 1] as const;

/** Matches `--ease-out-apple` in global.css, for Motion-driven tweens. */
export const cssEaseOutApple = "cubic-bezier(0.32, 0.72, 0, 1)";

/** Scale applied on press. Used by `whileTap` and `active:scale-*`. */
export const PRESS_SCALE = 0.97;

/**
 * Opacity floor for the word-by-word scroll reveal.
 *
 * Deliberately not 0.25. At 0.25 the composited text over --palette-bg lands
 * at ~1.5:1, which fails WCAG AA and trips Lighthouse. These words animate
 * from full `--palette-text` rather than from the muted ink, so a floor of
 * 0.58 still measures ~5:1 at its dimmest while keeping a clearly visible
 * brighten as you scroll.
 */
export const WORD_REVEAL_MIN_OPACITY = 0.58;

/** Word-brightening is capped so long paragraphs do not become a scrub bar. */
export const WORD_REVEAL_MAX_WORDS = 60;