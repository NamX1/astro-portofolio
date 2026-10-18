import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import {
	WORD_REVEAL_MAX_WORDS,
	WORD_REVEAL_MIN_OPACITY,
} from "../../lib/motion";

interface WordRevealProps {
	text: string;
	className?: string;
}

/**
 * Words brighten from dim to full as the paragraph scrolls through the
 * viewport. Pure opacity, driven by scroll position.
 *
 * Reduced motion is handled in CSS (`[data-word-reveal] span`), not by
 * branching here: the server always renders the word spans, and a client-side
 * conditional would render different markup and risk a hydration mismatch.
 * Same reasoning for the no-JS case - see the <noscript> block in Layout.
 *
 * Capped at 60 words so a long paragraph does not become a slow scrub bar.
 */
export default function WordReveal({ text, className }: WordRevealProps) {
	const ref = useRef<HTMLParagraphElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.9", "start 0.35"],
	});

	const words = text.trim().split(/\s+/);
	const capped = words.slice(0, WORD_REVEAL_MAX_WORDS);

	if (words.length > WORD_REVEAL_MAX_WORDS) {
		console.warn(
			`[content] WordReveal capped at ${WORD_REVEAL_MAX_WORDS} words (got ${words.length}). Shorten the paragraph.`,
		);
	}

	const step = 1 / capped.length;

	return (
		<p ref={ref} data-word-reveal="" className={className}>
			{capped.map((word, index) => (
				<Word
					key={`${word}-${index}`}
					word={word}
					range={[index * step, index * step + step * 1.8]}
					progress={scrollYProgress}
				/>
			))}
			{words.length > capped.length && "…"}
		</p>
	);
}

function Word({
	word,
	range,
	progress,
}: {
	word: string;
	range: [number, number];
	progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
	const opacity = useTransform(
		progress,
		range,
		[WORD_REVEAL_MIN_OPACITY, 1],
	);

	return (
		<motion.span className="inline" style={{ opacity }}>
			{word}{" "}
		</motion.span>
	);
}