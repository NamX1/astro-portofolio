import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { ArrowDown } from "lucide-react";

import { buttonVariants } from "../ui/button";
import { springs } from "../../lib/motion";
import { MotionRoot } from "./MotionRoot";

/**
 * Hero entrance plus its scroll-linked exit.
 *
 * This is the one island that mounts with `client:load` rather than
 * `client:visible`. It owns the first impression - if it waited on an
 * IntersectionObserver the page would sit invisible above the fold, which is
 * exactly the moment nobody should have to wait.
 */
interface HeroEntranceProps {
	name: string;
	tagline: string;
	contactLabel: string;
	projectsLabel: string;
	/** Empty string hides the direct mail link. */
	email: string;
}

const group: Variants = {
	hidden: {},
	show: {
		transition: { delayChildren: 0.12, staggerChildren: 0.09 },
	},
};

const rise: Variants = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: springs.soft },
};

export default function HeroEntrance({
	name,
	tagline,
	contactLabel,
	projectsLabel,
	email,
}: HeroEntranceProps) {
	const ref = useRef<HTMLDivElement>(null);

	const hasEmail = email.trim().length > 0;
	// With no address on file, "contact" walks down to the Contact section
	// rather than linking to a mailto that would silently fail.
	const contactHref = hasEmail ? `mailto:${email}` : "#contact";

	// Scroll-linked exit: the hero recedes as it leaves. Subtle by design.
	// These values are written straight to style rather than animated, so
	// prefers-reduced-motion is handled in CSS via [data-hero-scroll] - a JS
	// branch here would render differently on the client and risk a hydration
	// mismatch.
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
	const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
	const drift = useTransform(scrollYProgress, [0, 1], [0, 60]);

	return (
		<MotionRoot>
			<motion.div
				ref={ref}
				data-hero-scroll=""
				data-reveal=""
				variants={group}
				initial="hidden"
				animate="show"
				style={{ scale, opacity, y: drift }}
				className="rv mx-auto flex max-w-3xl flex-col items-center text-center"
			>
				{/* The promise is the page's subject, so it carries the <h1>.
				    The name is an overline above it, not the title. */}
				<motion.p
					variants={rise}
					className="rv text-label font-normal uppercase tracking-label text-ink-2"
				>
					{name}
				</motion.p>

				{/* Pointer parallax lives on an inner wrapper so it never fights
				    the scroll transform on the element above. */}
				<div className="hero-parallax">
					<motion.h1
						variants={rise}
						className="rv mt-6 font-serif text-hero leading-[1.05] font-light tracking-tight text-balance text-ink-2"
					>
						{tagline}
					</motion.h1>
				</div>

				<motion.div
					variants={rise}
					className="rv mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
				>
					<a
						href={contactHref}
						className={buttonVariants({ size: "lg" })}
					>
						{contactLabel}
					</a>
					<a
						href="#projects"
						className={buttonVariants({ variant: "outline", size: "lg" })}
					>
						{projectsLabel}
						<ArrowDown
							data-icon="inline-end"
							strokeWidth={1.25}
							aria-hidden="true"
						/>
					</a>
				</motion.div>
			</motion.div>
		</MotionRoot>
	);
}