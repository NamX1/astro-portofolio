import { motion } from "motion/react";

import { MotionRoot } from "./MotionRoot";

export interface ProjectCardData {
	slug: string;
	title: string;
	/** Already resolved to display copy - see `projectStatusLabels`. */
	statusLabel: string;
	summary?: string;
	tech: string[];
}

/**
 * Project cards.
 *
 * One island for the whole grid rather than one per card: three separate
 * islands would triple the hydration bookkeeping for the same effect.
 *
 * Motion owns the lift (`whileHover`) because the prompt calls for it. Surface
 * brightening is left to CSS so it can transition independently - mixing a
 * 1s reveal duration into the hover would make the lift feel sluggish.
 *
 * Cards are deliberately not links yet.
 */
export default function ProjectGrid({ items }: { items: ProjectCardData[] }) {
	return (
		<MotionRoot>
			<ul className="grid gap-3 sm:gap-4">
				{items.map((project) => (
					<motion.li
						key={project.slug}
						data-reveal=""
						initial={{ opacity: 0, filter: "blur(8px)" }}
						whileInView={{ opacity: 1, filter: "blur(0px)" }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 1, ease: "easeOut" }}
						whileHover={{ y: -4 }}
						className="glass rounded-lg border p-6 transition-[background-color,border-color] duration-500 ease-out hover:border-ink-2/30 hover:bg-raised/30 sm:p-8"
					>
						<div className="flex items-start justify-between gap-4">
							<h3 className="font-serif text-lead font-light text-ink">
								{project.title}
							</h3>
							<span className="text-label shrink-0 rounded-full border px-3 py-1 uppercase tracking-label text-ink-2">
								{project.statusLabel}
							</span>
						</div>

						{project.summary && (
							<p className="mt-3 max-w-prose text-body text-ink-2">
								{project.summary}
							</p>
						)}

						{project.tech.length > 0 && (
							<ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
								{project.tech.map((item) => (
									<li
										key={item}
										className="text-label uppercase tracking-label text-ink-2"
									>
										{item}
									</li>
								))}
							</ul>
						)}
					</motion.li>
				))}
			</ul>
		</MotionRoot>
	);
}