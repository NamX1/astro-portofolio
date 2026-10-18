import { motion, type Variants } from "motion/react";
import { ArrowDown } from "lucide-react";

import { buttonVariants } from "../ui/button";
import { MotionRoot } from "./MotionRoot";

/**
 * Hero entrance: a slow, staggered blur-to-sharp reveal.
 *
 * This is the one island on the page that mounts with `client:load` instead of
 * `client:visible`. It owns the first impression - if it waited for an
 * IntersectionObserver the page would sit invisible above the fold, which is
 * exactly the moment nobody should have to wait.
 *
 * Timing follows docs/DESIGN.md: 1s, ease-out, no spring. The only transform
 * is a 10px rise, which Motion drops automatically under reduced motion.
 */
interface HeroEntranceProps {
	name: string;
	tagline: string;
	contactLabel: string;
	projectsLabel: string;
	/** Empty string hides the direct mail link. */
	email: string;
}

const container: Variants = {
	hidden: {},
	show: {
		transition: { delayChildren: 0.15, staggerChildren: 0.16 },
	},
};

const item: Variants = {
	hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
	show: {
		opacity: 1,
		filter: "blur(0px)",
		y: 0,
		transition: { duration: 1, ease: "easeOut" },
	},
};

export default function HeroEntrance({
	name,
	tagline,
	contactLabel,
	projectsLabel,
	email,
}: HeroEntranceProps) {
	const hasEmail = email.trim().length > 0;
	// With no address on file, "contact" walks down to the Contact section
	// rather than linking to a mailto that would silently fail.
	const contactHref = hasEmail ? `mailto:${email}` : "#contact";

	return (
		<MotionRoot>
			<motion.div
				data-reveal=""
				variants={container}
				initial="hidden"
				animate="show"
				className="mx-auto flex max-w-3xl flex-col items-center text-center"
			>
				<motion.h1
					variants={item}
					className="text-label font-normal uppercase tracking-label text-ink-2"
				>
					{name}
				</motion.h1>

				<motion.p
					variants={item}
					className="mt-6 font-serif text-hero leading-[1.08] font-light text-balance text-ink"
				>
					{tagline}
				</motion.p>

				<motion.div
					variants={item}
					className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
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